/**
 * 鲸云 ERP · 领域数据层
 * ---------------------------------------------------------------
 * 目标：把"页面里的数字"变成"有约束的业务数据"。
 *  - 库存只有一个写入口：_move()，每次变动都落一条台账（before/after 连续可核）
 *  - 订单状态走状态机，非法流转直接抛错
 *  - 出库/调拨/盘点生成单据，单据与台账互相可追溯
 *  - 发货是"预检 → 原子执行"，库存不足则整体拒绝，不留半成品
 *  - 可序列化，前端存 localStorage，后端接同一套操作即可替换
 */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) module.exports = factory();
  else root.ERPStore = factory();
})(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  var VERSION = 1;

  /* 订单状态机：只允许这些流转 */
  var ORDER_FLOW = {
    '待审核': ['待发货', '已取消'],
    '待发货': ['已发货', '已取消'],
    '已发货': ['已完成', '售后中'],
    '已完成': ['售后中'],
    '售后中': ['已完成', '已关闭'],
    '已关闭': [],
    '已取消': []
  };

  function fail(code, message, detail) {
    var e = new Error(message);
    e.code = code;
    e.detail = detail || null;
    return e;
  }

  function emptyState() {
    return {
      version: VERSION,
      seq: { doc: 1000, move: 1 },
      orders: [],
      stock: [],
      movements: [],
      docs: [],
      blacklist: ['李墨', '测试账号']
    };
  }

  function Store() { this.state = emptyState(); }

  Store.VERSION = VERSION;
  Store.emptyState = emptyState;
  Store.ORDER_FLOW = ORDER_FLOW;

  /* ---------------- 序列化 ---------------- */

  Store.prototype.load = function (json) {
    if (!json) return false;
    var s;
    try { s = JSON.parse(json); } catch (e) { return false; }
    if (!s || s.version !== VERSION || !Array.isArray(s.orders) || !Array.isArray(s.stock)) return false;
    this.state = s;
    return true;
  };

  Store.prototype.dump = function () { return JSON.stringify(this.state); };

  Store.prototype.reset = function () { this.state = emptyState(); };

  /* ---------------- 查询 ---------------- */

  Store.prototype.stockRow = function (sku, wh) {
    var rows = this.state.stock;
    for (var i = 0; i < rows.length; i++) {
      if (rows[i].sku === sku && rows[i].wh === wh) return rows[i];
    }
    return null;
  };

  Store.prototype.onHand = function (sku, wh) {
    var r = this.stockRow(sku, wh);
    return r ? r.qty : 0;
  };

  /** 在库数量（账面）。锁定数量单独记录，不参与可出库判断（演示阶段的简化） */
  Store.prototype.available = function (sku, wh) {
    var r = this.stockRow(sku, wh);
    return r ? r.qty : 0;
  };

  Store.prototype.order = function (id) {
    var list = this.state.orders;
    for (var i = 0; i < list.length; i++) if (list[i].id === id) return list[i];
    return null;
  };

  Store.prototype.movementsFor = function (sku, wh) {
    return this.state.movements.filter(function (m) {
      return m.sku === sku && (!wh || m.wh === wh);
    }).slice().reverse();
  };

  Store.prototype.doc = function (id) {
    var list = this.state.docs;
    for (var i = 0; i < list.length; i++) if (list[i].id === id) return list[i];
    return null;
  };

  Store.prototype.nextId = function (prefix) {
    var s = this.state.seq;
    s.doc = (s.doc || 1000) + 1;
    return prefix + s.doc;
  };

  /* ---------------- 写入 ---------------- */

  Store.prototype.addOrder = function (o) {
    if (this.order(o.id)) throw fail('DUP_ORDER', '订单已存在：' + o.id);
    this.state.orders.push(o);
    return o;
  };

  Store.prototype.setStock = function (sku, wh, qty, locked) {
    var row = this.stockRow(sku, wh);
    if (!row) {
      row = { sku: sku, wh: wh, qty: 0, locked: 0 };
      this.state.stock.push(row);
    }
    row.qty = qty;
    row.locked = locked || 0;
    return row;
  };

  /** 期初建账：设置库存并写一条 OPEN 台账，保证台账能从头核对 */
  Store.prototype.openStock = function (sku, wh, qty, opts) {
    var row = this.stockRow(sku, wh);
    if (!row) {
      row = { sku: sku, wh: wh, qty: 0, locked: 0 };
      this.state.stock.push(row);
    }
    row.qty = 0;
    row.locked = (opts && opts.locked) || 0;
    if (opts && opts.name) row.name = opts.name;
    if (qty > 0) {
      this._move({
        sku: sku, wh: wh, qty: qty, type: 'OPEN', docType: 'OPEN',
        ref: (opts && opts.ref) || '期初建账', at: (opts && opts.at) || new Date().toISOString(),
        by: (opts && opts.by) || 'system'
      });
    }
    return row;
  };

  /** 库存变动的唯一入口：写库存 + 写台账 */
  Store.prototype._move = function (args) {
    var st = this.state;
    var row = this.stockRow(args.sku, args.wh);
    if (!row) throw fail('NO_STOCK_ROW', '库存记录不存在：' + args.sku + ' @ ' + args.wh, { sku: args.sku, wh: args.wh });

    var before = row.qty;
    var after = before + args.qty;
    if (after < 0) {
      throw fail('STOCK_SHORT', '库存不足：' + args.sku + ' @ ' + args.wh, {
        sku: args.sku, wh: args.wh, onHand: before, locked: row.locked,
        available: before - row.locked, need: -args.qty
      });
    }

    row.qty = after;
    var mv = {
      id: 'MV' + (st.seq.move++),
      sku: args.sku,
      wh: args.wh,
      type: args.type,
      qty: args.qty,
      before: before,
      after: after,
      docId: args.docId || '',
      docType: args.docType || '',
      ref: args.ref || '',
      at: args.at || new Date().toISOString(),
      by: args.by || 'system'
    };
    st.movements.push(mv);
    return mv;
  };

  Store.prototype.transition = function (order, to, meta) {
    var from = order.status;
    var allowed = ORDER_FLOW[from] || [];
    if (allowed.indexOf(to) === -1) {
      throw fail('BAD_TRANSITION', '订单 ' + order.id + ' 不能从「' + from + '」变为「' + to + '」', { from: from, to: to });
    }
    order.status = to;
    order.history = order.history || [];
    order.history.push({
      from: from,
      to: to,
      at: (meta && meta.at) || new Date().toISOString(),
      by: (meta && meta.by) || 'system',
      note: (meta && meta.note) || ''
    });
    return order;
  };

  /* ---------------- 发货 ---------------- */

  Store.prototype._requirements = function (orders) {
    var map = {};
    orders.forEach(function (o) {
      (o.items || []).forEach(function (it) {
        var k = it.sku + '|' + o.wh;
        if (!map[k]) map[k] = { sku: it.sku, wh: o.wh, qty: 0 };
        map[k].qty += it.qty;
      });
    });
    return Object.keys(map).map(function (k) { return map[k]; });
  };

  /** 发货前预检：状态 + 库存，不产生任何写入 */
  Store.prototype.preflightShip = function (ids) {
    var self = this;
    var problems = [];
    var orders = [];

    ids.forEach(function (id) {
      var o = self.order(id);
      if (!o) { problems.push({ code: 'NOT_FOUND', message: '订单 ' + id + ' 不存在' }); return; }
      if (o.status !== '待发货') {
        problems.push({ code: 'STATE', message: '订单 ' + id + ' 当前为「' + o.status + '」，只有待发货订单能发货' });
        return;
      }
      orders.push(o);
    });

    // 状态问题不阻断库存检查，一次性把所有问题报全
    this._requirements(orders).forEach(function (r) {
      var avail = self.available(r.sku, r.wh);
      if (avail < r.qty) {
        problems.push({
          code: 'SHORT', sku: r.sku, wh: r.wh, need: r.qty, available: avail,
          message: '库存不足：' + r.sku + ' 在 ' + r.wh + ' 可用 ' + avail + '，出库需要 ' + r.qty
        });
      }
    });

    return { ok: problems.length === 0, problems: problems, orders: orders };
  };

  /** 发货：预检通过后原子执行，生成出库单 + 台账 */
  Store.prototype.ship = function (ids, opts) {
    opts = opts || {};
    var pre = this.preflightShip(ids);
    if (!pre.ok) throw fail('SHIP_BLOCKED', pre.problems[0].message, pre.problems);

    var self = this;
    var at = opts.at || new Date().toISOString();
    var by = opts.by || 'admin';
    var docId = this.nextId('CK');
    var lines = [];

    pre.orders.forEach(function (o) {
      o.items.forEach(function (it) {
        var mv = self._move({
          sku: it.sku, wh: o.wh, qty: -it.qty, type: 'SALE_OUT',
          docId: docId, docType: 'OUT', ref: o.id, at: at, by: by
        });
        lines.push({ sku: it.sku, wh: o.wh, qty: -it.qty, ref: o.id, balanceAfter: mv.after });
        // 出库即释放该 SKU 的预占
        var row = self.stockRow(it.sku, o.wh);
        if (row && row.locked > 0) row.locked = Math.max(0, row.locked - it.qty);
      });
      o.express = (opts.carrier || '顺丰速运') + ' ' + (opts.labelNo || ('SF' + (780000 + self.state.seq.doc)));
      self.transition(o, '已发货', { at: at, by: by, note: '出库单 ' + docId });
    });

    var doc = {
      id: docId, type: 'OUT', status: '已出库', refs: ids.slice(),
      lines: lines, at: at, by: by, carrier: opts.carrier || '顺丰速运'
    };
    this.state.docs.push(doc);
    return { doc: doc, orders: pre.orders };
  };

  /* ---------------- 调拨 ---------------- */

  Store.prototype.transfer = function (args) {
    var qty = Number(args.qty);
    if (!qty || qty <= 0) throw fail('BAD_QTY', '调拨数量必须大于 0');
    if (args.fromWh === args.toWh) throw fail('SAME_WH', '调出仓与调入仓不能相同');
    if (this.available(args.sku, args.fromWh) < qty) {
      throw fail('STOCK_SHORT', '调出仓可用库存不足', {
        sku: args.sku, wh: args.fromWh, available: this.available(args.sku, args.fromWh), need: qty
      });
    }

    var at = args.at || new Date().toISOString();
    var by = args.by || 'admin';
    var docId = this.nextId('DB');
    var out = this._move({
      sku: args.sku, wh: args.fromWh, qty: -qty, type: 'TRANSFER_OUT',
      docId: docId, docType: 'TRANSFER', ref: args.toWh, at: at, by: by
    });
    if (!this.stockRow(args.sku, args.toWh)) this.setStock(args.sku, args.toWh, 0, 0);
    var inn = this._move({
      sku: args.sku, wh: args.toWh, qty: qty, type: 'TRANSFER_IN',
      docId: docId, docType: 'TRANSFER', ref: args.fromWh, at: at, by: by
    });

    var doc = {
      id: docId, type: 'TRANSFER', status: '已完成', sku: args.sku,
      fromWh: args.fromWh, toWh: args.toWh, qty: qty, at: at, by: by,
      lines: [
        { sku: args.sku, wh: args.fromWh, qty: -qty, balanceAfter: out.after },
        { sku: args.sku, wh: args.toWh, qty: qty, balanceAfter: inn.after }
      ]
    };
    this.state.docs.push(doc);
    return doc;
  };

  /* ---------------- 盘点 ---------------- */

  Store.prototype.check = function (args) {
    var row = this.stockRow(args.sku, args.wh);
    if (!row) throw fail('NO_STOCK_ROW', '库存记录不存在');
    var real = Number(args.real);
    if (isNaN(real) || real < 0) throw fail('BAD_QTY', '实盘数量不能为负');

    var at = args.at || new Date().toISOString();
    var by = args.by || 'admin';
    var docId = this.nextId('PD');
    var diff = real - row.qty;
    var mv = null;

    if (diff !== 0) {
      mv = this._move({
        sku: args.sku, wh: args.wh, qty: diff, type: 'ADJ',
        docId: docId, docType: 'CHECK', ref: '盘点', at: at, by: by
      });
    }

    var doc = {
      id: docId, type: 'CHECK', status: diff === 0 ? '账实相符' : '已调整',
      sku: args.sku, wh: args.wh, book: row.qty - diff, real: real, diff: diff,
      at: at, by: by,
      lines: [{ sku: args.sku, wh: args.wh, qty: diff, balanceAfter: row.qty }]
    };
    this.state.docs.push(doc);
    return { doc: doc, diff: diff, movement: mv };
  };

  /* ---------------- 售后回库 ---------------- */

  Store.prototype.receiveReturn = function (args) {
    var qty = Number(args.qty);
    if (!qty || qty <= 0) throw fail('BAD_QTY', '退货数量必须大于 0');
    var at = args.at || new Date().toISOString();
    var docId = this.nextId('TH');
    if (!this.stockRow(args.sku, args.wh)) this.setStock(args.sku, args.wh, 0, 0);
    var mv = this._move({
      sku: args.sku, wh: args.wh, qty: qty, type: 'RETURN_IN',
      docId: docId, docType: 'RETURN', ref: args.aftersaleId || '', at: at, by: args.by || 'admin'
    });
    var doc = {
      id: docId, type: 'RETURN', status: '已入库', sku: args.sku, wh: args.wh,
      qty: qty, ref: args.aftersaleId || '', at: at, by: args.by || 'admin',
      lines: [{ sku: args.sku, wh: args.wh, qty: qty, balanceAfter: mv.after }]
    };
    this.state.docs.push(doc);
    return doc;
  };

  /* ---------------- 审单规则 ---------------- */

  var DEFAULT_RULES = [
    {
      code: 'BLACKLIST', text: '买家黑名单',
      check: function (o, st) {
        var list = (st && st.blacklist) || [];
        return list.indexOf(o.buyer) > -1 ? '买家「' + o.buyer + '」在黑名单中，需人工核实' : null;
      }
    },
    {
      code: 'ADDRESS', text: '收货地址不完整',
      check: function (o) {
        var a = o.addr || '';
        if (!a) return '缺少收货地址';
        if (a.indexOf('省') === -1 && a.indexOf('市') === -1) return '地址缺少省 / 市信息：' + a;
        return null;
      }
    },
    {
      code: 'AMOUNT', text: '大额订单需复核',
      check: function (o, st, opts) {
        var limit = (opts && opts.amountLimit) || 5000;
        return o.amount > limit ? '金额 ' + o.amount + ' 超过 ' + limit + '，需人工复核' : null;
      }
    },
    {
      code: 'DUPLICATE', text: '疑似重复下单',
      check: function (o, st) {
        var dup = st.orders.filter(function (x) {
          return x.id !== o.id && x.buyer === o.buyer && x.addr === o.addr;
        });
        return dup.length ? '同一买家同地址已有 ' + dup.length + ' 笔订单（' + dup[0].id + '）' : null;
      }
    }
  ];

  Store.DEFAULT_RULES = DEFAULT_RULES;

  /** 审单：返回通过与否 + 命中的规则，不修改任何状态 */
  Store.prototype.review = function (id, opts) {
    var o = this.order(id);
    if (!o) return { ok: false, hits: [{ code: 'NOT_FOUND', title: '订单不存在', message: '订单 ' + id + ' 不存在' }] };
    var hits = [];
    var st = this.state;
    var rules = this.rules || DEFAULT_RULES;
    rules.forEach(function (rule) {
      var msg = rule.check(o, st, opts || {});
      if (msg) hits.push({ code: rule.code, title: rule.text, message: msg });
    });
    return { ok: hits.length === 0, hits: hits };
  };

  Store.prototype.reviewAll = function (ids, opts) {
    var self = this;
    var pass = [], blocked = [];
    ids.forEach(function (id) {
      var r = self.review(id, opts);
      if (r.ok) pass.push(id);
      else blocked.push({ id: id, hits: r.hits });
    });
    return { pass: pass, blocked: blocked };
  };

  /* ---------------- 一致性自检（给测试和运维用） ---------------- */

  Store.prototype.audit = function () {
    var st = this.state;
    var problems = [];

    // 1. 每个 SKU+仓 的台账结存必须等于库存
    var byKey = {};
    st.movements.forEach(function (m) {
      var k = m.sku + '|' + m.wh;
      if (!byKey[k]) byKey[k] = { last: 0, rows: [] };
      byKey[k].rows.push(m);
    });

    Object.keys(byKey).forEach(function (k) {
      var rows = byKey[k].rows;
      var prev = 0;
      rows.forEach(function (m, i) {
        if (m.before !== prev) {
          problems.push({ code: 'LEDGER_GAP', message: k + ' 第 ' + (i + 1) + ' 条台账 before=' + m.before + '，上一条 after=' + prev });
        }
        if (m.after !== m.before + m.qty) {
          problems.push({ code: 'LEDGER_MATH', message: k + ' 台账 ' + m.id + ' 数量对不上' });
        }
        prev = m.after;
      });
    });

    st.stock.forEach(function (row) {
      var k = row.sku + '|' + row.wh;
      var rows = byKey[k] ? byKey[k].rows : [];
      var last = rows.length ? rows[rows.length - 1].after : 0;
      if (last !== row.qty) {
        problems.push({ code: 'STOCK_MISMATCH', message: k + ' 库存 ' + row.qty + '，台账结存 ' + last });
      }
      if (row.qty < 0) problems.push({ code: 'NEGATIVE', message: k + ' 库存为负' });
      if (row.locked < 0) problems.push({ code: 'NEGATIVE_LOCK', message: k + ' 锁定为负' });
    });

    return { ok: problems.length === 0, problems: problems };
  };

  return Store;
});
