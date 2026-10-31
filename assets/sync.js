/**
 * s1 ERP · 平台接口同步引擎
 * ---------------------------------------------------------------
 * 真实环境的平台对接不是"调一次接口就完事"，而是：
 *  - 限流（429 + Retry-After）
 *  - 超时 / 5xx 重试，指数退避 + 抖动
 *  - 幂等（同一业务事件重复投递，平台不能重复扣库存）
 *  - 死信（重试到上限仍失败，进人工队列）
 *  - 可观测（每个任务有状态、次数、下次重试时间、错误）
 *
 * 这个引擎只管"任务生命周期"，真正的 HTTP 由 transport 注入，
 * 所以既可以接真实平台，也可以在本地用模拟传输做故障演练。
 */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) module.exports = factory();
  else root.ERPSync = factory();
})(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  var VERSION = 1;

  function nowMs() { return Date.now(); }

  function Engine(opts) {
    opts = opts || {};
    this.jobs = [];
    this.logs = [];
    this.seq = 0;
    this.maxAttempts = opts.maxAttempts || 4;
    this.baseDelay = opts.baseDelay || 2000;
    this.maxDelay = opts.maxDelay || 60000;
    this.now = opts.now || nowMs;
    this.transport = opts.transport || function () { return { ok: true }; };
  }

  Engine.VERSION = VERSION;

  /* ---------------- 任务入队 ---------------- */

  Engine.prototype.enqueue = function (job) {
    var self = this;
    var idem = job.idemKey || '';

    // 幂等：同一业务键在未死信前只保留一个任务
    if (idem) {
      var dup = null;
      this.jobs.forEach(function (j) {
        if (j.idemKey === idem && j.status !== 'dead') dup = j;
      });
      if (dup) return dup;
    }

    var t = this.now();
    var j = {
      id: 'J' + (++this.seq),
      type: job.type,
      ref: job.ref || '',
      payload: job.payload || {},
      idemKey: idem,
      attempts: 0,
      status: 'pending',      // pending | done | dead
      nextAt: t,
      lastError: '',
      createdAt: t,
      doneAt: 0
    };
    this.jobs.push(j);
    this.log(j, 'enqueue', job.type + (job.ref ? ' · ' + job.ref : ''));
    return j;
  };

  /* ---------------- 调度 ---------------- */

  Engine.prototype.due = function (t) {
    var now = t == null ? this.now() : t;
    return this.jobs.filter(function (j) {
      return j.status === 'pending' && j.nextAt <= now;
    });
  };

  /** 处理所有到期任务，返回本次成功 / 死信数量 */
  Engine.prototype.drain = function (t) {
    var self = this;
    var done = 0, dead = 0;
    this.due(t).forEach(function (j) {
      var r = self.run(j);
      if (r === 'done') done++;
      if (r === 'dead') dead++;
    });
    return { done: done, dead: dead };
  };

  Engine.prototype.run = function (job) {
    job.attempts++;
    var res;
    try {
      res = this.transport(job) || { ok: false, error: 'empty response', retryable: true };
    } catch (e) {
      res = { ok: false, error: e && e.message ? e.message : 'network error', retryable: true };
    }

    if (res.ok) {
      job.status = 'done';
      job.doneAt = this.now();
      job.nextAt = 0;
      job.lastError = '';
      this.log(job, 'success', res.platformId ? '平台受理 ' + res.platformId : '成功');
      return 'done';
    }

    var retryable = res.retryable !== false;
    var exhausted = job.attempts >= this.maxAttempts;

    if (!retryable || exhausted) {
      job.status = 'dead';
      job.lastError = res.error || 'failed';
      this.log(job, 'dead', job.lastError + (retryable ? '（重试 ' + job.attempts + ' 次仍失败）' : '（不可重试）'));
      return 'dead';
    }

    var delay = res.retryAfter ? res.retryAfter : this.backoff(job.attempts);
    job.status = 'pending';
    job.nextAt = this.now() + delay;
    job.lastError = res.error || 'retry';
    this.log(job, 'retry', job.lastError + '，' + Math.round(delay / 1000) + 's 后重试（第 ' + job.attempts + ' 次）');
    return 'retry';
  };

  /** 指数退避 + 抖动，避免同一时刻集体重试 */
  Engine.prototype.backoff = function (attempt) {
    var base = this.baseDelay * Math.pow(2, Math.max(0, attempt - 1));
    var capped = Math.min(base, this.maxDelay);
    return Math.round(capped * (0.8 + Math.random() * 0.4));
  };

  Engine.prototype.retry = function (id) {
    var job = this.job(id);
    if (!job) return false;
    if (job.status === 'done') return false;
    job.status = 'pending';
    job.attempts = 0;
    job.nextAt = this.now();
    job.lastError = '';
    this.log(job, 'manual-retry', '人工重试');
    return true;
  };

  Engine.prototype.retryAllDead = function () {
    var self = this;
    var n = 0;
    this.jobs.forEach(function (j) {
      if (j.status === 'dead') { self.retry(j.id); n++; }
    });
    return n;
  };

  /* ---------------- 查询 / 观测 ---------------- */

  Engine.prototype.job = function (id) {
    var found = null;
    this.jobs.forEach(function (j) { if (j.id === id) found = j; });
    return found;
  };

  Engine.prototype.stats = function () {
    var s = { total: this.jobs.length, pending: 0, done: 0, dead: 0, retrying: 0 };
    var now = this.now();
    this.jobs.forEach(function (j) {
      if (j.status === 'done') s.done++;
      else if (j.status === 'dead') s.dead++;
      else {
        s.pending++;
        if (j.attempts > 0 && j.nextAt > now) s.retrying++;
      }
    });
    return s;
  };

  Engine.prototype.byType = function () {
    var map = {};
    this.jobs.forEach(function (j) {
      if (!map[j.type]) map[j.type] = { type: j.type, total: 0, done: 0, dead: 0 };
      map[j.type].total++;
      if (j.status === 'done') map[j.type].done++;
      if (j.status === 'dead') map[j.type].dead++;
    });
    return map;
  };

  Engine.prototype.log = function (job, kind, msg) {
    this.logs.unshift({
      at: this.now(), job: job.id, type: job.type, kind: kind, msg: msg,
      ref: job.ref || ''
    });
    if (this.logs.length > 200) this.logs.pop();
  };

  /* ---------------- 持久化 ---------------- */

  Engine.prototype.dump = function () {
    return JSON.stringify({ version: VERSION, seq: this.seq, jobs: this.jobs, logs: this.logs.slice(0, 50) });
  };

  Engine.prototype.load = function (json) {
    if (!json) return false;
    var s;
    try { s = JSON.parse(json); } catch (e) { return false; }
    if (!s || s.version !== VERSION || !Array.isArray(s.jobs)) return false;
    this.jobs = s.jobs;
    this.logs = s.logs || [];
    this.seq = s.seq || this.jobs.length;
    return true;
  };

  Engine.prototype.reset = function () {
    this.jobs = [];
    this.logs = [];
    this.seq = 0;
  };

  return Engine;
});
