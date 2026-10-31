/**
 * 领域层单元测试（Node 直接跑，不依赖浏览器）
 *   node test/store.test.js
 */
const assert = require('node:assert');
const Store = require('../assets/store.js');

let passed = 0;
const failures = [];

function test(name, fn) {
  try {
    fn();
    passed++;
    console.log('  ✓ ' + name);
  } catch (e) {
    failures.push({ name, e });
    console.log('  ✗ ' + name + '\n      ' + e.message);
  }
}

function seed() {
  const s = new Store();
  s.openStock('A', 'W1', 100, { at: '2026-10-01T00:00:00.000Z' });
  s.openStock('A', 'W2', 10, { at: '2026-10-01T00:00:00.000Z' });
  s.openStock('B', 'W1', 50, { at: '2026-10-01T00:00:00.000Z' });
  s.addOrder({ id: 'O1', status: '待发货', wh: 'W1', qty: 3, amount: 300, buyer: '张三', shop: '旗舰店', plat: '淘宝天猫', addr: '浙江省杭州市余杭区文一西路 1 号', items: [{ sku: 'A', qty: 2 }, { sku: 'B', qty: 1 }] });
  s.addOrder({ id: 'O2', status: '待审核', wh: 'W1', qty: 1, amount: 100, buyer: '李四', shop: '旗舰店', plat: '淘宝天猫', addr: '广东省深圳市南山区科技园 8 号', items: [{ sku: 'A', qty: 1 }] });
  s.addOrder({ id: 'O3', status: '待发货', wh: 'W1', qty: 500, amount: 900, buyer: '王五', shop: '旗舰店', plat: '淘宝天猫', addr: '上海市浦东新区张江路 66 号', items: [{ sku: 'B', qty: 500 }] });
  return s;
}

console.log('\n[发货]');

test('发货扣减库存并生成出库单', () => {
  const s = seed();
  const { doc } = s.ship(['O1'], { carrier: '顺丰速运' });
  assert.strictEqual(s.onHand('A', 'W1'), 98, 'A 库存应为 98');
  assert.strictEqual(s.onHand('B', 'W1'), 49, 'B 库存应为 49');
  assert.strictEqual(doc.type, 'OUT');
  assert.strictEqual(doc.lines.length, 2);
  assert.strictEqual(s.order('O1').status, '已发货');
  assert.ok(s.order('O1').express.includes('顺丰'));
});

test('台账 before/after 连续且与库存一致', () => {
  const s = seed();
  s.ship(['O1']);
  const mvA = s.movementsFor('A', 'W1'); // 倒序
  assert.strictEqual(mvA.length, 2, '期初 + 出库两条');
  assert.strictEqual(mvA[0].before, 100);
  assert.strictEqual(mvA[0].after, 98);
  assert.strictEqual(mvA[0].qty, -2);
  assert.strictEqual(s.audit().ok, true, 'audit 应通过：' + JSON.stringify(s.audit().problems));
});

test('库存不足时整体拒绝，不留半成品', () => {
  const s = seed();
  const beforeA = s.onHand('A', 'W1');
  const beforeB = s.onHand('B', 'W1');
  const mvBefore = s.state.movements.length;
  assert.throws(() => s.ship(['O3']), /库存不足/);
  assert.strictEqual(s.onHand('A', 'W1'), beforeA, 'A 不应被扣');
  assert.strictEqual(s.onHand('B', 'W1'), beforeB, 'B 不应被扣');
  assert.strictEqual(s.order('O3').status, '待发货', '状态不应变');
  assert.strictEqual(s.state.movements.length, mvBefore, '不应产生新台账');
  assert.strictEqual(s.state.docs.length, 0, '不应产生单据');
});

test('非待发货状态不能发货', () => {
  const s = seed();
  assert.throws(() => s.ship(['O2']), /只有待发货/);
  const pre = s.preflightShip(['O2']);
  assert.strictEqual(pre.ok, false);
  assert.strictEqual(pre.problems[0].code, 'STATE');
});

test('重复发货被拒绝且不产生重复台账', () => {
  const s = seed();
  s.ship(['O1']);
  const count = s.state.movements.length;
  assert.throws(() => s.ship(['O1']));
  assert.strictEqual(s.state.movements.length, count, '台账条数不变');
  assert.strictEqual(s.state.docs.length, 1, '单据不重复');
});

test('多单批量发货生成一张出库单', () => {
  const s = seed();
  s.addOrder({ id: 'O4', status: '待发货', wh: 'W1', qty: 1, items: [{ sku: 'A', qty: 1 }] });
  const { doc } = s.ship(['O1', 'O4']);
  assert.strictEqual(doc.refs.length, 2);
  assert.strictEqual(doc.lines.length, 3);
  assert.strictEqual(s.onHand('A', 'W1'), 97);
});

test('预检能一次列出所有问题，不中断', () => {
  const s = seed();
  const pre = s.preflightShip(['O1', 'O2', 'O3', 'NOPE']);
  assert.strictEqual(pre.ok, false);
  assert.strictEqual(pre.problems.length, 3, '状态错 1 + 缺货 1 + 不存在 1');
});

console.log('\n[调拨]');

test('调拨后两仓总量不变，两条台账同单据', () => {
  const s = seed();
  const doc = s.transfer({ sku: 'A', fromWh: 'W1', toWh: 'W2', qty: 30 });
  assert.strictEqual(s.onHand('A', 'W1'), 70);
  assert.strictEqual(s.onHand('A', 'W2'), 40);
  assert.strictEqual(s.onHand('A', 'W1') + s.onHand('A', 'W2'), 110);
  assert.strictEqual(doc.type, 'TRANSFER');
  const mv = s.state.movements.filter(m => m.docId === doc.id);
  assert.strictEqual(mv.length, 2);
  assert.strictEqual(mv[0].qty + mv[1].qty, 0);
  assert.strictEqual(s.audit().ok, true);
});

test('调拨不能超过可用库存，也不能同仓调拨', () => {
  const s = seed();
  assert.throws(() => s.transfer({ sku: 'A', fromWh: 'W1', toWh: 'W2', qty: 999 }), /不足/);
  assert.throws(() => s.transfer({ sku: 'A', fromWh: 'W1', toWh: 'W1', qty: 1 }), /相同/);
  assert.throws(() => s.transfer({ sku: 'A', fromWh: 'W1', toWh: 'W2', qty: 0 }), /大于 0/);
});

test('调入仓没有记录时自动建档', () => {
  const s = seed();
  s.transfer({ sku: 'A', fromWh: 'W1', toWh: 'W3', qty: 5 });
  assert.strictEqual(s.onHand('A', 'W3'), 5);
  assert.strictEqual(s.audit().ok, true);
});

console.log('\n[盘点]');

test('盘亏生成差异台账，账面与实物对齐', () => {
  const s = seed();
  const { doc, diff } = s.check({ sku: 'A', wh: 'W1', real: 90 });
  assert.strictEqual(diff, -10);
  assert.strictEqual(s.onHand('A', 'W1'), 90);
  assert.strictEqual(doc.type, 'CHECK');
  assert.strictEqual(s.movementsFor('A', 'W1')[0].qty, -10);
  assert.strictEqual(s.audit().ok, true);
});

test('盘盈同样入账，差异为 0 时不出台账', () => {
  const s = seed();
  s.check({ sku: 'A', wh: 'W1', real: 120 });
  assert.strictEqual(s.onHand('A', 'W1'), 120);
  const before = s.state.movements.length;
  const { diff } = s.check({ sku: 'A', wh: 'W1', real: 120 });
  assert.strictEqual(diff, 0);
  assert.strictEqual(s.state.movements.length, before, '无差异不产生台账');
});

console.log('\n[售后回库]');

test('退货入库增加库存并关联售后单', () => {
  const s = seed();
  const doc = s.receiveReturn({ sku: 'A', wh: 'W1', qty: 2, aftersaleId: 'AS001' });
  assert.strictEqual(s.onHand('A', 'W1'), 102);
  assert.strictEqual(doc.ref, 'AS001');
  assert.strictEqual(s.movementsFor('A', 'W1')[0].type, 'RETURN_IN');
  assert.strictEqual(s.audit().ok, true);
});

console.log('\n[持久化与自检]');

test('序列化后恢复，数据与台账一致', () => {
  const s = seed();
  s.ship(['O1']);
  s.transfer({ sku: 'A', fromWh: 'W1', toWh: 'W2', qty: 8 });
  s.check({ sku: 'B', wh: 'W1', real: 40 });
  const json = s.dump();

  const s2 = new Store();
  assert.strictEqual(s2.load(json), true);
  assert.strictEqual(s2.onHand('A', 'W1'), s.onHand('A', 'W1'));
  assert.strictEqual(s2.order('O1').status, '已发货');
  assert.strictEqual(s2.audit().ok, true);
  assert.strictEqual(s2.state.movements.length, s.state.movements.length);
});

test('损坏的数据不会让 store 崩掉', () => {
  const s = new Store();
  assert.strictEqual(s.load('not json'), false);
  assert.strictEqual(s.load('{"version":999}'), false);
  assert.strictEqual(s.audit().ok, true);
});

test('audit 能发现人为篡改', () => {
  const s = seed();
  s.ship(['O1']);
  s.state.stock[0].qty = 999;
  const res = s.audit();
  assert.strictEqual(res.ok, false);
  assert.ok(res.problems.some(p => p.code === 'STOCK_MISMATCH'));
});

console.log('\n[审单规则]');

test('正常订单通过审单', () => {
  const s = seed();
  const r = s.review('O1');
  assert.strictEqual(r.ok, true, JSON.stringify(r.hits));
});

test('黑名单买家被拦截', () => {
  const s = seed();
  s.addOrder({ id: 'O9', status: '待审核', wh: 'W1', qty: 1, amount: 100, buyer: '李墨', addr: '浙江省杭州市西湖区 1 号', items: [{ sku: 'A', qty: 1 }] });
  const r = s.review('O9');
  assert.strictEqual(r.ok, false);
  assert.ok(r.hits.some(h => h.code === 'BLACKLIST'));
});

test('地址缺少省市被拦截', () => {
  const s = seed();
  s.addOrder({ id: 'O8', status: '待审核', wh: 'W1', qty: 1, amount: 100, buyer: '赵六', addr: '阳光小区 3 号楼 501', items: [{ sku: 'A', qty: 1 }] });
  const r = s.review('O8');
  assert.strictEqual(r.ok, false);
  assert.ok(r.hits.some(h => h.code === 'ADDRESS'));
});

test('大额订单需要复核', () => {
  const s = seed();
  s.addOrder({ id: 'O7', status: '待审核', wh: 'W1', qty: 1, amount: 8800, buyer: '孙七', addr: '北京市朝阳区望京 8 号', items: [{ sku: 'A', qty: 1 }] });
  const r = s.review('O7');
  assert.strictEqual(r.ok, false);
  assert.ok(r.hits.some(h => h.code === 'AMOUNT'));
});

test('同买家同地址重复下单被拦截', () => {
  const s = seed();
  s.addOrder({ id: 'O6', status: '待审核', wh: 'W1', qty: 1, amount: 300, buyer: '张三', shop: '旗舰店', plat: '淘宝天猫', addr: '浙江省杭州市余杭区文一西路 1 号', items: [{ sku: 'A', qty: 1 }] });
  const r = s.review('O6');
  assert.strictEqual(r.ok, false);
  assert.ok(r.hits.some(h => h.code === 'DUPLICATE'));
});

test('reviewAll 把通过与拦截分开', () => {
  const s = seed();
  s.addOrder({ id: 'O5', status: '待审核', wh: 'W1', qty: 1, amount: 100, buyer: '李墨', addr: '浙江省杭州市 1 号', items: [{ sku: 'A', qty: 1 }] });
  const res = s.reviewAll(['O1', 'O5', 'O2']);
  assert.deepStrictEqual(res.pass, ['O1', 'O2']);
  assert.strictEqual(res.blocked.length, 1);
  assert.strictEqual(res.blocked[0].id, 'O5');
});

test('审单不修改订单状态', () => {
  const s = seed();
  s.review('O2');
  assert.strictEqual(s.order('O2').status, '待审核');
  assert.strictEqual(s.state.movements.length, 3, '只有期初台账');
});

console.log('\n[拣货作业]');

test('打单聚合 SKU，生成拣货单但不扣库存', () => {
  const s = seed();
  s.addOrder({ id: 'O4', status: '待发货', wh: 'W1', qty: 1, amount: 100, buyer: '钱八', addr: '江苏省南京市鼓楼区 1 号', items: [{ sku: 'A', qty: 1 }] });
  const doc = s.createPick(['O1', 'O4']);
  assert.strictEqual(doc.type, 'PICK');
  assert.strictEqual(doc.status, '待拣货');
  assert.strictEqual(doc.lines.length, 2, 'A 与 B 两行');
  const lineA = doc.lines.find(l => l.sku === 'A');
  assert.strictEqual(lineA.qty, 3, 'A 合并 2+1');
  assert.strictEqual(s.onHand('A', 'W1'), 100, '打单不扣库存');
  assert.strictEqual(s.state.movements.length, 3, '只有期初台账');
});

test('拣货进度：部分拣货 / 全部拣完转待复核', () => {
  const s = seed();
  const doc = s.createPick(['O1']);
  s.pickLine(doc.id, 'A', 'W1', 1);
  assert.strictEqual(s.doc(doc.id).status, '待拣货');
  s.pickLine(doc.id, 'A', 'W1');
  s.pickLine(doc.id, 'B', 'W1');
  assert.strictEqual(s.doc(doc.id).status, '待复核');
});

test('未拣完不能复核出库', () => {
  const s = seed();
  const doc = s.createPick(['O1']);
  assert.throws(() => s.confirmPick(doc.id), /未拣完/);
  assert.strictEqual(s.onHand('A', 'W1'), 100, '库存不变');
});

test('复核出库后扣库存、生成出库单并关联', () => {
  const s = seed();
  const doc = s.createPick(['O1']);
  doc.lines.forEach(l => s.pickLine(doc.id, l.sku, l.wh));
  s.verify(doc.id, 'O1');
  const res = s.confirmPick(doc.id, { carrier: '中通快递' });
  assert.strictEqual(res.out.type, 'OUT');
  assert.strictEqual(s.onHand('A', 'W1'), 98);
  assert.strictEqual(s.onHand('B', 'W1'), 49);
  assert.strictEqual(s.doc(doc.id).status, '已完成');
  assert.strictEqual(s.doc(doc.id).outDocId, res.out.id);
  assert.strictEqual(s.order('O1').status, '已发货');
  assert.strictEqual(s.audit().ok, true);
});

test('同一拣货单不能重复出库，同一订单不能重复打单', () => {
  const s = seed();
  const doc = s.createPick(['O1']);
  assert.throws(() => s.createPick(['O1']), /已在拣货单/);
  doc.lines.forEach(l => s.pickLine(doc.id, l.sku, l.wh));
  s.verify(doc.id, 'O1');
  s.confirmPick(doc.id);
  assert.throws(() => s.confirmPick(doc.id), /已出库/);
  assert.strictEqual(s.state.docs.filter(d => d.type === 'OUT').length, 1);
});

test('非待发货订单不能打单，库存不足也不能打单', () => {
  const s = seed();
  assert.throws(() => s.createPick(['O2']), /只有待发货/);
  assert.throws(() => s.createPick(['O3']), /库存不足/);
});

console.log('\n[波次与验货]');

test('createPicks 按 waveSize 拆分波次', () => {
  const s = seed();
  s.addOrder({ id: 'O4', status: '待发货', wh: 'W1', qty: 1, amount: 100, buyer: '钱八', addr: '江苏省南京市鼓楼区 1 号', items: [{ sku: 'A', qty: 1 }] });
  s.addOrder({ id: 'O5', status: '待发货', wh: 'W1', qty: 1, amount: 100, buyer: '孙九', addr: '江苏省苏州市姑苏区 2 号', items: [{ sku: 'B', qty: 1 }] });
  const waves = s.createPicks(['O1', 'O4', 'O5'], { waveSize: 2 });
  assert.strictEqual(waves.length, 2, '3 单按 2 单/波拆成 2 波');
  assert.strictEqual(waves[0].refs.length, 2);
  assert.strictEqual(waves[1].refs.length, 1);
  assert.notStrictEqual(waves[0].id, waves[1].id);
});

test('未拣完不能开始验货', () => {
  const s = seed();
  const doc = s.createPick(['O1']);
  assert.throws(() => s.verify(doc.id, 'O1'), /未拣完/);
});

test('不在本波次的订单不能验货', () => {
  const s = seed();
  const doc = s.createPick(['O1']);
  doc.lines.forEach(l => s.pickLine(doc.id, l.sku, l.wh));
  assert.throws(() => s.verify(doc.id, 'O2'), /不在本波次/);
});

test('重复验货会被拒绝', () => {
  const s = seed();
  const doc = s.createPick(['O1']);
  doc.lines.forEach(l => s.pickLine(doc.id, l.sku, l.wh));
  s.verify(doc.id, 'O1');
  assert.throws(() => s.verify(doc.id, 'O1'), /已经验过/);
});

test('全部验货后才能复核出库', () => {
  const s = seed();
  const doc = s.createPick(['O1']);
  doc.lines.forEach(l => s.pickLine(doc.id, l.sku, l.wh));
  assert.throws(() => s.confirmPick(doc.id), /未扫描验货/);
  s.verify(doc.id, 'O1');
  const res = s.confirmPick(doc.id);
  assert.strictEqual(res.out.type, 'OUT');
  assert.strictEqual(s.order('O1').status, '已发货');
  assert.strictEqual(s.audit().ok, true);
});

test('验货进度可查询', () => {
  const s = seed();
  s.addOrder({ id: 'O4', status: '待发货', wh: 'W1', qty: 1, amount: 100, buyer: '钱八', addr: '江苏省南京市鼓楼区 1 号', items: [{ sku: 'A', qty: 1 }] });
  const doc = s.createPick(['O1', 'O4']);
  doc.lines.forEach(l => s.pickLine(doc.id, l.sku, l.wh));
  s.verify(doc.id, 'O1');
  const p = s.verifyProgress(doc.id);
  assert.strictEqual(p.done, 1);
  assert.strictEqual(p.total, 2);
});

console.log('\n[对账口径]');

test('seedShipment 补录历史出库：生成出库单与台账，不改订单状态', () => {
  const s = seed();
  const doc = s.seedShipment('O1');
  assert.strictEqual(doc.type, 'OUT');
  assert.strictEqual(s.order('O1').status, '待发货', '不改状态');
  assert.strictEqual(s.onHand('A', 'W1'), 98);
  assert.strictEqual(s.movementsFor('A', 'W1')[0].type, 'SALE_OUT');
  assert.strictEqual(s.audit().ok, true);
});

test('结算只统计出库单，扣减退款', () => {
  const s = seed();
  s.seedShipment('O1'); // 300
  const rows = s.settlement({ '旗舰店': 50 });
  assert.strictEqual(rows.length, 1);
  assert.strictEqual(rows[0].shipped, 300);
  assert.strictEqual(rows[0].refund, 50);
  assert.strictEqual(rows[0].net, 250);
  assert.strictEqual(rows[0].outCount, 1);
});

test('未出库的订单不计入应收', () => {
  const s = seed();
  assert.strictEqual(s.settlement().length, 0, '没有出库单就没有应收');
  s.seedShipment('O1');
  assert.strictEqual(s.settlement().length, 1);
});

test('outsOf 返回该店铺的出库明细', () => {
  const s = seed();
  s.seedShipment('O1');
  s.seedShipment('O2');
  const rows = s.outsOf('旗舰店');
  assert.strictEqual(rows.length, 2);
  assert.ok(rows.every(r => r.doc && r.order));
});

console.log('\n[采购入库]');

test('采购收货入库增加库存并生成入库单', () => {
  const s = seed();
  const doc = s.receivePO({ poId: 'PO1', sku: 'A', wh: 'W1', qty: 50 });
  assert.strictEqual(doc.type, 'IN');
  assert.strictEqual(s.onHand('A', 'W1'), 150);
  assert.strictEqual(s.movementsFor('A', 'W1')[0].type, 'PURCHASE_IN');
  assert.strictEqual(s.audit().ok, true);
});

test('收货数量非法会被拒绝', () => {
  const s = seed();
  assert.throws(() => s.receivePO({ poId: 'PO1', sku: 'A', wh: 'W1', qty: 0 }), /大于 0/);
  assert.throws(() => s.receivePO({ poId: 'PO1', sku: 'A', wh: 'W1', qty: -5 }), /大于 0/);
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
