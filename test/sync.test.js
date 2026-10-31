/**
 * 同步引擎单测（Node 直接跑）
 *   node test/sync.test.js
 */
const assert = require('node:assert');
const Engine = require('../assets/sync.js');

let passed = 0;
const failures = [];

function test(name, fn) {
  try { fn(); passed++; console.log('  ✓ ' + name); }
  catch (e) { failures.push({ name, e }); console.log('  ✗ ' + name + '\n      ' + e.message); }
}

/** 可编程传输层：按脚本依次返回 */
function scripted(script) {
  let i = 0;
  return () => {
    const r = script[Math.min(i, script.length - 1)];
    i++;
    return r;
  };
}

function make(script, opts = {}) {
  let clock = 1000;
  const eng = new Engine({
    transport: scripted(script),
    now: () => clock,
    baseDelay: 1000,
    maxAttempts: 3,
    ...opts
  });
  eng.__tick = (ms) => { clock += ms; };
  eng.__now = () => clock;
  return eng;
}

console.log('\n[入队与幂等]');

test('入队后立即到期', () => {
  const e = make([{ ok: true }]);
  const j = e.enqueue({ type: 'PUSH_TRACKING', ref: 'SO1', idemKey: 'SO1:SF123' });
  assert.strictEqual(j.status, 'pending');
  assert.strictEqual(e.due().length, 1);
});

test('相同幂等键只保留一个任务', () => {
  const e = make([{ ok: true }]);
  const a = e.enqueue({ type: 'PUSH_TRACKING', ref: 'SO1', idemKey: 'SO1:SF123' });
  const b = e.enqueue({ type: 'PUSH_TRACKING', ref: 'SO1', idemKey: 'SO1:SF123' });
  assert.strictEqual(a.id, b.id, '返回同一个任务');
  assert.strictEqual(e.jobs.length, 1);
});

test('死信后相同幂等键可以重新入队', () => {
  const e = make([{ ok: false, error: 'bad', retryable: false }]);
  e.enqueue({ type: 'PUSH_STOCK', idemKey: 'SKU1' });
  e.drain();
  assert.strictEqual(e.jobs[0].status, 'dead');
  e.enqueue({ type: 'PUSH_STOCK', idemKey: 'SKU1' });
  assert.strictEqual(e.jobs.length, 2, '死信不阻塞新的业务事件');
});

console.log('\n[重试与退避]');

test('成功即完成', () => {
  const e = make([{ ok: true, platformId: 'TB123' }]);
  e.enqueue({ type: 'PUSH_TRACKING', ref: 'SO1' });
  const r = e.drain();
  assert.strictEqual(r.done, 1);
  assert.strictEqual(e.stats().done, 1);
});

test('429 按 Retry-After 延迟，不消耗重试次数上限', () => {
  const e = make([{ ok: false, error: 'rate limited', retryAfter: 5000 }, { ok: true }]);
  const j = e.enqueue({ type: 'PULL_ORDERS' });
  e.drain();
  assert.strictEqual(j.status, 'pending');
  assert.strictEqual(j.attempts, 1);
  assert.strictEqual(j.nextAt, e.__now() + 5000);
  assert.strictEqual(e.due().length, 0, '还没到时间');
  e.__tick(5000);
  assert.strictEqual(e.due().length, 1, '到点后重新到期');
  e.drain();
  assert.strictEqual(j.status, 'done');
});

test('5xx 走指数退避，次数递增', () => {
  const e = make([{ ok: false, error: 'boom' }]);
  const j = e.enqueue({ type: 'PUSH_STOCK' });
  e.drain();
  const first = j.nextAt - e.__now();
  assert.ok(first >= 800 && first <= 1200, '第 1 次约 1s，实际 ' + first);
  e.__tick(first); e.drain();
  const second = j.nextAt - e.__now();
  assert.ok(second >= 1600 && second <= 2400, '第 2 次约 2s，实际 ' + second);
  assert.strictEqual(j.attempts, 2);
});

test('重试到上限进死信', () => {
  const e = make([{ ok: false, error: 'always down' }], { maxAttempts: 2 });
  const j = e.enqueue({ type: 'PUSH_TRACKING' });
  e.drain();
  e.__tick(10000); e.drain();
  assert.strictEqual(j.status, 'dead');
  assert.strictEqual(e.stats().dead, 1);
  assert.ok(j.lastError.includes('down'));
});

test('不可重试错误立即死信，不再重试', () => {
  const e = make([{ ok: false, error: 'invalid payload', retryable: false }]);
  const j = e.enqueue({ type: 'PUSH_STOCK' });
  e.drain();
  assert.strictEqual(j.status, 'dead');
  assert.strictEqual(j.attempts, 1, '只尝试一次');
});

test('传输层抛异常当作可重试失败', () => {
  const e = new Engine({
    transport: () => { throw new Error('socket hang up'); },
    maxAttempts: 1,
    now: () => 1000
  });
  const j = e.enqueue({ type: 'PUSH_TRACKING' });
  e.drain();
  assert.strictEqual(j.status, 'dead');
  assert.ok(j.lastError.includes('socket hang up'));
});

console.log('\n[人工作业]');

test('人工重试死信任务', () => {
  const e = make([{ ok: false, error: 'x' }], { maxAttempts: 1 });
  const j = e.enqueue({ type: 'PUSH_TRACKING' });
  e.drain();
  assert.strictEqual(j.status, 'dead');
  e.retry(j.id);
  assert.strictEqual(j.status, 'pending');
  assert.strictEqual(j.attempts, 0);
});

test('一键重试所有死信', () => {
  const e = make([{ ok: false, error: 'x' }], { maxAttempts: 1 });
  e.enqueue({ type: 'A' }); e.enqueue({ type: 'B' });
  e.drain();
  assert.strictEqual(e.stats().dead, 2);
  assert.strictEqual(e.retryAllDead(), 2);
  assert.strictEqual(e.stats().dead, 0);
});

console.log('\n[观测与持久化]');

test('统计按状态与类型分组', () => {
  const e = make([{ ok: true }, { ok: false, error: 'x', retryable: false }]);
  e.enqueue({ type: 'PUSH_TRACKING' });
  e.enqueue({ type: 'PUSH_STOCK' });
  e.drain();
  const s = e.stats();
  assert.strictEqual(s.total, 2);
  assert.strictEqual(s.done, 1);
  assert.strictEqual(s.dead, 1);
  const byType = e.byType();
  assert.strictEqual(byType.PUSH_TRACKING.done, 1);
  assert.strictEqual(byType.PUSH_STOCK.dead, 1);
});

test('日志记录关键节点', () => {
  const e = make([{ ok: false, error: 'boom' }, { ok: true }]);
  e.enqueue({ type: 'PUSH_TRACKING', ref: 'SO9' });
  e.drain();
  e.__tick(10000); e.drain();
  const kinds = e.logs.map(l => l.kind);
  assert.ok(kinds.includes('enqueue'));
  assert.ok(kinds.includes('retry'));
  assert.ok(kinds.includes('success'));
});

test('序列化后恢复待发送与死信', () => {
  const e = make([{ ok: false, error: 'x', retryable: false }, { ok: true }]);
  e.enqueue({ type: 'PUSH_TRACKING', ref: 'SO1' });
  e.enqueue({ type: 'PULL_ORDERS' });
  e.drain();
  const json = e.dump();
  const e2 = new Engine({ transport: () => ({ ok: true }), now: () => 1000 });
  assert.strictEqual(e2.load(json), true);
  assert.strictEqual(e2.jobs.length, 2);
  assert.strictEqual(e2.jobs.filter(j => j.status === 'dead').length, 1);
});

test('损坏数据不会崩', () => {
  const e = new Engine({});
  assert.strictEqual(e.load('not json'), false);
  assert.strictEqual(e.load('{"version":99}'), false);
});

const total = passed + failures.length;
console.log('\n' + '-'.repeat(48));
console.log(`通过 ${passed}/${total}`);
if (failures.length) {
  console.log('失败：');
  failures.forEach(f => console.log(' - ' + f.name));
  process.exit(1);
}
console.log('ALL GREEN');
