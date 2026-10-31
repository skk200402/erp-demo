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
  s.addOrder({ id: 'O1', status: '待发货', wh: 'W1', qty: 3, items: [{ sku: 'A', qty: 2 }, { sku: 'B', qty: 1 }] });
  s.addOrder({ id: 'O2', status: '待审核', wh: 'W1', qty: 1, items: [{ sku: 'A', qty: 1 }] });
  s.addOrder({ id: 'O3', status: '待发货', wh: 'W1', qty: 500, items: [{ sku: 'B', qty: 500 }] });
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

const total = passed + failures.length;
console.log('\n' + '-'.repeat(48));
console.log(`通过 ${passed}/${total}`);
if (failures.length) {
  console.log('失败：');
  failures.forEach(f => console.log(' - ' + f.name));
  process.exit(1);
}
console.log('ALL GREEN');
