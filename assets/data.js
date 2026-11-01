/**
 * s1 ERP · 静态数据与模块配置
 * ---------------------------------------------------------------
 * 全部演示数据（订单 / 商品 / 库存 / 采购 / 物流 / 店铺 / 分销 / 财务）
 * 与各模块的列表配置（列定义、筛选项、指标卡）。
 * 以全局变量暴露，页面直接引用；真实项目可替换成本地 mock 或后端接口。
 */
  /* ---------- 数据 ---------- */
  var PLATFORMS = {
    '淘宝天猫': '#ff6a00',
    '京东': '#e1251b',
    '抖音小店': '#1f2329',
    '拼多多': '#e8512f',
    '快手小店': '#ff7a00',
    '有赞': '#f5b800'
  };
  function platDot(name) {
    return '<span class="plat"><i style="background:' + (PLATFORMS[name] || '#98a2b3') + '"></i>' + esc(name) + '</span>';
  }

  var STATUS_TAG = {
    '待审核': 'orange',
    '待发货': 'blue',
    '已发货': 'purple',
    '已完成': 'green',
    '售后中': 'red',
    '已取消': 'gray'
  };
  function statusTag(s) {
    return '<span class="tag ' + (STATUS_TAG[s] || 'gray') + '"><i></i>' + esc(s) + '</span>';
  }

  var KPI = [
    { label: '今日订单', value: 1286, unit: '单', delta: 12.4, dir: 'up', sub: '较昨日', ico: 'doc', color: '#3568f0', spark: [980, 1020, 1140, 1090, 1240, 1320, 1286] },
    { label: '今日销售额', value: 28.64, unit: '万', delta: 8.2, dir: 'up', sub: '较昨日', ico: 'wallet', color: '#12b76a', spark: [21.3, 18.9, 24.6, 22.1, 28.7, 31.2, 28.6] },
    { label: '待发货订单', value: 87, unit: '单', delta: 5.4, dir: 'down', sub: '超时 3 单', ico: 'truck', color: '#f79009', spark: [112, 104, 96, 101, 94, 92, 87] },
    { label: '库存预警 SKU', value: 12, unit: '个', delta: 3, dir: 'up', sub: '其中 4 个已断货', ico: 'alert', color: '#f04438', spark: [7, 8, 8, 9, 11, 10, 12] }
  ];

  var DONUT = [
    { name: '淘宝天猫', v: 34, c: '#ff6a00' },
    { name: '京东', v: 26, c: '#e1251b' },
    { name: '抖音小店', v: 22, c: '#1f2329' },
    { name: '拼多多', v: 12, c: '#e8512f' },
    { name: '其他平台', v: 6, c: '#98a2b3' }
  ];

  var TODOS = [
    { label: '待审核订单', sub: '超 2 小时未处理 3 单', n: 23, route: 'orders', ico: 'clock', color: '#f79009', bg: '#fff5e6' },
    { label: '待发货订单', sub: '今日需发出 64 单', n: 64, route: 'orders', ico: 'truck', color: '#3568f0', bg: '#eef3ff' },
    { label: '售后待处理', sub: '退款申请 5 单', n: 8, route: 'aftersale', ico: 'refresh', color: '#f04438', bg: '#feecea' },
    { label: '库存预警', sub: '4 个 SKU 已断货', n: 12, route: 'inventory', ico: 'alert', color: '#7a5af8', bg: '#f1eeff' }
  ];

  var RAW_ORDERS = [
    ['SO202610310001', '淘宝天猫', '旗舰店', '林小满', '待发货', '今天 14:32', [['2026春季纯棉圆领T恤', '白色 / S', 2, 129]], '尽快发货，客户催单'],
  ['SO202610300118', '淘宝天猫', '旗舰店', '黄一诺', '已发货', '昨天 21:10', [['2026春季纯棉圆领T恤', '白色 / S', 1, 129]], ''],
  ];

  var ORDERS = RAW_ORDERS.map(function (r, idx) {
    var items = r[6].map(function (it) {
      return { name: it[0], spec: it[1], qty: it[2], price: it[3] };
    });
    var amount = items.reduce(function (s, it) { return s + it.qty * it.price; }, 0);
    return {
      id: r[0], plat: r[1], shop: r[2], buyer: r[3], status: r[4], time: r[5],
      items: items, qty: items.reduce(function (s, it) { return s + it.qty; }, 0),
      amount: Math.round(amount * 100) / 100, remark: r[7],
      addr: ['浙江省杭州市余杭区文一西路 969 号 ' + (3 + idx) + ' 幢 ' + (1201 + idx) + ' 室',
        '广东省深圳市南山区科技园南路 ' + (18 + idx) + ' 号 A 座 ' + (806 + idx),
        '上海市浦东新区张江路 ' + (66 + idx) + ' 号 ' + (1503 + idx) + ' 室',
        '北京市朝阳区望京东路 ' + (8 + idx) + ' 号 ' + (2201 + idx) + ' 室'][idx % 4],
      phone: '138****' + (1000 + idx * 7).toString().slice(-4),
      express: r[4] === '已发货' || r[4] === '已完成' ? ['顺丰速运', '中通快递', '圆通速递', '京东物流'][idx % 4] + ' SF' + (780000 + idx * 137) : '—'
    };
  });

  /* 演示用的两笔问题单：地址不全 / 黑名单买家 */
  ORDERS.forEach(function (o) {
    if (o.id === 'SO202610310010') o.addr = '阳光小区 3 号楼 2 单元 501';
  });

  /* ---------- 售后 ---------- */
  var AFTERSALES = [
    { id: 'AS202610310031', order: 'SO202610300118', plat: '淘宝天猫', shop: '旗舰店', buyer: '黄一诺', type: '退货退款', amount: 129, reason: '尺码不合适', status: '待审核', time: '今天 12:32', deadline: '剩 1 天 4 小时' },
  ];
  indexSearch(AFTERSALES, ['id', 'order', 'plat', 'shop', 'buyer', 'reason']);

  /* ---------- 商品 ---------- */
  var PRODUCTS = [
    { code: 'P10086', name: '2026春季纯棉圆领T恤', cat: '服饰 / 上装', brand: '云织', specs: ['白色 / S', '白色 / M', '黑色 / L'], priceMin: 129, priceMax: 159, stock: 1268, sales: 386, map: '3/3', status: '在售', color: '#3568f0' },
  ];
  indexSearch(PRODUCTS, ['code', 'name', 'cat', 'brand']);

  function productSkus(p) {
    var n = Math.max(1, p.specs.length - 1);
    return p.specs.map(function (sp, i) {
      var price = Math.round((p.priceMin + (p.priceMax - p.priceMin) * (i / n)) * 100) / 100;
      return {
        spec: sp,
        code: p.code + '-' + (i + 1 < 10 ? '0' : '') + (i + 1),
        price: price,
        cost: Math.round(price * 0.42),
        stock: Math.max(0, Math.round(p.stock / (i + 1.5))),
        barcode: '69' + (10000000000 + i * 137)
      };
    });
  }

  /* ---------- 库存 ---------- */
  var INVENTORY = [
    { sku: 'P10086-01', name: '2026春季纯棉圆领T恤 白色 / S', wh: '杭州主仓', avail: 420, lock: 36, transit: 200, safety: 150, status: '正常', time: '10 分钟前' },
  ];
  indexSearch(INVENTORY, ['sku', 'name', 'wh']);
  INVENTORY.forEach(function (r) { r.id = r.sku + '@' + r.wh; });

  /* ---------- 采购 ---------- */
  var PURCHASES = [
    { id: 'PO20261031016', supplier: '杭州美棉纺织', kinds: 1, qty: 600, amount: 39600, status: '待审核', time: '今天 10:20', eta: '预计 11-06' },
  ];
  indexSearch(PURCHASES, ['id', 'supplier']);

  /* ---------- 供应商 ---------- */
  var SUPPLIERS = [
    { name: '杭州美棉纺织', code: 'SUP-0012', contact: '沈国栋', phone: '137****2210', cat: '棉纺面料 / 成衣', goods: 46, pay: '月结 30 天', ontime: 98, score: 4.8, status: '合作中' },
  ];
  indexSearch(SUPPLIERS, ['name', 'code', 'contact', 'cat']);

  /* ---------- 物流 ---------- */
  var LOGISTICS = [
    { waybill: 'SF780137', order: 'SO202610300118', express: '中通快递', receiver: '黄一诺', city: '深圳 · 南山区', track: '【深圳南山营业点】快件已揽收', status: '运输中', time: '昨天 21:40', abnormal: false },
  ];
  indexSearch(LOGISTICS, ['waybill', 'order', 'express', 'receiver', 'city', 'track']);
  LOGISTICS.forEach(function (r) { r.id = r.waybill; });

  /* 物流轨迹：每个节点 = 时间 + 状态 + 具体动作 + 发生地 */

  /* ---------- 店铺 ---------- */
  var SHOPS = [
    { plat: '淘宝天猫', name: '鲸云旗舰店', sid: 'tb_88231001', auth: '已授权', sync: '2 分钟前', today: 486, goods: 386, expire: '2027-03-12' },
  ];
  indexSearch(SHOPS, ['plat', 'name', 'sid']);

  /* ---------- 分销 ---------- */
  var DISTRIBUTORS = [
    { name: '杭州云仓商贸', code: 'DB-0031', level: '钻石', goods: 128, orders: 86, gmv: 42860, pending: 8200, status: '合作中' },
  ];
  indexSearch(DISTRIBUTORS, ['name', 'code', 'level']);

  /* ---------- 财务对账 ---------- */
  var FINANCE = [];
  var FIN_PERIOD = '2026-10';
  /* 平台账单默认 = 系统应收 + 该店铺的已知差异（演示数据），也可手工录入覆盖 */
  var FIN_DELTA = { '京东自营店': 12.8, '拼多多店': -3.5 };
  var FIN_OVERRIDE = {};
  try {
    var savedFin = JSON.parse(localStorage.getItem('jy_erp_fin_v1') || '{}');
    if (savedFin && typeof savedFin === 'object') FIN_OVERRIDE = savedFin;
  } catch (e) { FIN_OVERRIDE = {}; }
  function saveFinOverride() {
    try { localStorage.setItem('jy_erp_fin_v1', JSON.stringify(FIN_OVERRIDE)); } catch (e) { /* ignore */ }
  }

  function refundsByShop() {
    var map = {};
    AFTERSALES.forEach(function (r) {
      if (r.status !== '已完成' && r.status !== '退款中') return;
      var o = null;
      for (var i = 0; i < ORDERS.length; i++) if (ORDERS[i].id === r.order) { o = ORDERS[i]; break; }
      if (!o) return;
      map[o.shop] = (map[o.shop] || 0) + r.amount;
    });
    return map;
  }

  /* ---------- 模块配置 ---------- */
  var AS_COLOR = { '待审核': 'orange', '待买家退货': 'blue', '待收货': 'blue', '退款中': 'purple', '已完成': 'green', '已关闭': 'gray' };
  var PD_COLOR = { '在售': 'green', '下架': 'gray', '待上架': 'orange' };
  var INV_COLOR = { '正常': 'green', '预警': 'orange', '断货': 'red' };
  var PO_COLOR = { '待审核': 'orange', '待供应商确认': 'orange', '待到货': 'blue', '部分到货': 'purple', '已入库': 'green', '已取消': 'gray' };
  var LG_COLOR = { '运输中': 'blue', '派送中': 'purple', '已签收': 'green', '异常': 'red', '退回': 'gray' };
  var SHOP_COLOR = { '已授权': 'green', '即将到期': 'orange', '已失效': 'red' };
  var LV_COLOR = { '钻石': 'purple', '金牌': 'orange', '银牌': 'blue', '普通': 'gray' };
  var FIN_COLOR = { '已对平': 'green', '有差异': 'red', '待对账': 'orange' };

  var MODULES = {};

  function openASCount() {
    return AFTERSALES.filter(function (r) {
      return r.status === '待审核' || r.status === '待买家退货' || r.status === '待收货' || r.status === '退款中';
    }).length;
  }

  MODULES.aftersale = {
    key: 'aftersale', title: '售后管理', ico: 'refresh',
    desc: '退货、换货、仅退款、补发统一处理，自动抓取平台售后单并按时限预警',
    actions: [
      { label: '售后规则', ico: 'gear', act: 'as-rules' },
      { label: '导出', ico: 'download', act: 'export' }
    ],
    select: { label: '批量同意', action: 'batch-agree', icon: 'check' },
    stats: [
      { label: '待我处理', value: function () { return String(openASCount()); }, unit: '单', ico: 'clock', color: '#f04438' },
      { label: '待买家退货', value: function () { return String(AFTERSALES.filter(function (r) { return r.status === '待买家退货'; }).length); }, unit: '单', ico: 'truck', color: '#3568f0' },
      { label: '本月退款金额', value: '1.29', unit: '万', ico: 'wallet', color: '#7a5af8' },
      { label: '售后率', value: '2.3', unit: '%', ico: 'chart', color: '#12b76a' }
    ],
    filters: [
      { key: 'kw', type: 'search', ph: '售后单号 / 订单号 / 买家' },
      { key: 'type', label: '类型', options: ['全部', '仅退款', '退货退款', '换货', '补发'] },
      { key: 'status', label: '状态', options: ['全部', '待审核', '待买家退货', '待收货', '退款中', '已完成', '已关闭'] }
    ],
    columns: [
      { title: '售后单 / 原订单', cell: function (r) { return c2('<span class="mono">' + r.id + '</span>', '原订单 ' + r.order, 'cell-main mono'); } },
      { title: '平台 / 店铺', cell: function (r) { return platDot(r.plat) + '<div class="cell-sub">' + r.shop + '</div>'; } },
      { title: '买家', cell: function (r) { return c2(r.buyer, '退款 ' + money(r.amount)); } },
      { title: '类型', cell: function (r) { return tag(r.type, 'gray'); } },
      { title: '售后原因', cell: function (r) { return '<span style="color:var(--text-2)">' + r.reason + '</span>'; } },
      { title: '状态', cell: function (r) { return tag(r.status, AS_COLOR[r.status] || 'gray'); } },
      { title: '处理时限', cell: function (r) { return '<span style="color:' + (r.deadline.indexOf('剩 0') === 0 || r.deadline === '剩 6 小时' ? '#d92d20' : '#7c8a9e') + '">' + r.deadline + '</span>'; } },
      { title: '操作', cls: 't-right', cell: function (r) { return '<button class="link" style="font-size:12.5px" data-action="mrow" data-m="aftersale" data-id="' + r.id + '">处理</button>'; } }
    ],
    rows: AFTERSALES,
    drawer: true
  };

  MODULES.products = {
    key: 'products', title: '商品管理', ico: 'box',
    desc: 'SPU / SKU 双层模型，多规格、多平台商品映射与批量上下架',
    actions: [
      { label: '导入商品', ico: 'download', act: 'prod-import' },
      { label: '新建商品', ico: 'plus', act: 'prod-new', primary: true }
    ],
    select: { label: '批量操作', action: 'batch-product', icon: 'box' },
    stats: [
      { label: '在售商品', value: function () { return num(PRODUCTS.filter(function (p) { return p.status === '在售'; }).length); }, unit: '个', ico: 'box', color: '#3568f0' },
      { label: '待上架', value: function () { return String(PRODUCTS.filter(function (p) { return p.status === '待上架'; }).length); }, unit: '个', ico: 'clock', color: '#f79009' },
      { label: '库存预警', value: function () { return String(productsLowStock()); }, unit: '个', ico: 'alert', color: '#f04438' },
      { label: '平台映射异常', value: function () { return String(PRODUCTS.filter(function (p) { return p.map !== '3/3'; }).length); }, unit: '个', ico: 'refresh', color: '#7a5af8' }
    ],
    filters: [
      { key: 'kw', type: 'search', ph: '商品名称 / 编码 / 品牌' },
      { key: 'cat', label: '类目', options: ['全部', '服饰 / 上装', '服饰 / 针织', '鞋靴 / 运动鞋', '家居 / 水具', '家居 / 香氛', '配饰 / 丝巾', '配饰 / 防晒', '箱包 / 双肩包'] },
      { key: 'status', label: '状态', options: ['全部', '在售', '待上架', '下架'] }
    ],
    columns: [
      { title: '商品', cell: function (r) {
        return '<div class="prod">' + thumb(r.name.slice(0, 1), r.color) +
          '<div class="prod-txt"><div class="cell-main">' + r.name + '</div>' +
          '<div class="cell-sub">' + r.code + ' · ' + r.brand + '</div></div></div>';
      } },
      { title: '类目', cell: function (r) { return '<span style="color:var(--text-2)">' + r.cat + '</span>'; } },
      { title: '规格', cell: function (r) { var n = stockOfProduct(r.code).rows.length || r.specs.length; return '<span class="num">' + n + '</span> 个 SKU'; } },
      { title: '价格区间', cls: 't-right', cell: function (r) { return r.priceMin === r.priceMax ? money(r.priceMin) : money(r.priceMin) + ' ~ ' + money(r.priceMax); } },
      { title: '总库存', cls: 't-right', cell: function (r) {
        var t = stockOfProduct(r.code).total;
        return '<span class="num" style="font-weight:600;color:' + (t === 0 ? '#d92d20' : 'inherit') + '">' + num(t) + '</span>';
      } },
      { title: '30 天销量', cls: 't-right', cell: function (r) { return '<span class="num">' + num(salesOfProduct(r.name)) + '</span>'; } },
      { title: '平台映射', cell: function (r) {
        var c = r.map === '3/3' ? 'green' : (r.map === '0/3' ? 'red' : 'orange');
        return tag(r.map, c);
      } },
      { title: '状态', cell: function (r) { return tag(r.status, PD_COLOR[r.status] || 'gray'); } },
      { title: '操作', cls: 't-right', cell: function (r) { return '<button class="link" style="font-size:12.5px" data-action="mrow" data-m="products" data-id="' + r.code + '">编辑</button>'; } }
    ],
    rows: PRODUCTS,
    drawer: true
  };

  MODULES.inventory = {
    key: 'inventory', title: '库存管理', ico: 'layers',
    desc: '多仓库存实时同步，可用 / 锁定 / 在途分账管理，每一次变动都有流水可查',
    actions: [
      { label: '库存流水', ico: 'doc', act: 'inv-flow' },
      { label: '盘点', ico: 'check', act: 'inv-check', perm: 'stock.adjust' },
      { label: '新建调拨', ico: 'truck', act: 'inv-transfer', perm: 'stock.adjust', primary: true }
    ],
    stats: [
      { label: '库存总量', value: function () { return num(scopedInventory().reduce(function (s, r) { return s + r.avail; }, 0)); }, unit: '件', ico: 'layers', color: '#3568f0' },
      { label: '锁定库存', value: function () { return num(scopedInventory().reduce(function (s, r) { return s + r.lock; }, 0)); }, unit: '件', ico: 'lock', color: '#7a5af8' },
      { label: '在途库存', value: function () { return num(scopedInventory().reduce(function (s, r) { return s + inTransitOf(r.sku); }, 0)); }, unit: '件', ico: 'truck', color: '#f79009' },
      { label: '预警 / 断货 SKU', value: function () { return String(scopedInventory().filter(function (r) { return r.status !== '正常'; }).length); }, unit: '个', ico: 'alert', color: '#f04438' }
    ],
    filters: [
      { key: 'kw', type: 'search', ph: 'SKU / 商品名称' },
      { key: 'wh', label: '仓库', options: ['全部', '杭州主仓', '广州仓', '义乌仓'] },
      { key: 'status', label: '库存状态', options: ['全部', '正常', '预警', '断货'] }
    ],
    columns: [
      { title: 'SKU / 商品', cell: function (r) { return c2('<span class="mono">' + r.sku + '</span>', r.name, 'cell-main mono'); } },
      { title: '仓库', cell: function (r) { return tag(r.wh, 'gray'); } },
      { title: '在库数量', cls: 't-right', cell: function (r) { return '<b class="num" style="color:' + (r.avail === 0 ? '#d92d20' : 'inherit') + '">' + num(r.avail) + '</b>'; } },
      { title: '锁定', cls: 't-right', cell: function (r) { return '<span class="num" style="color:var(--muted)">' + num(r.lock) + '</span>'; } },
      { title: '在途', cls: 't-right', cell: function (r) { return '<span class="num" style="color:var(--muted)">' + num(inTransitOf(r.sku)) + '</span>'; } },
      { title: '安全库存', cls: 't-right', cell: function (r) { return '<span class="num" style="color:var(--muted)">' + num(r.safety) + '</span>'; } },
      { title: '状态', cell: function (r) { return tag(r.status, INV_COLOR[r.status] || 'gray'); } },
      { title: '更新时间', cell: function (r) { return '<span class="cell-sub" style="margin:0">' + r.time + '</span>'; } }
    ],
    rows: INVENTORY,
    drawer: true
  };

  MODULES.purchase = {
    key: 'purchase', title: '采购管理', ico: 'cart',
    desc: '按公式智能补货、按单采购，多级审核后一键推送供应商',
    actions: [
      { label: '智能补货', ico: 'spark', act: 'po-smart' },
      { label: '导出', ico: 'download', act: 'export' },
      { label: '新建采购单', ico: 'plus', act: 'po-new', primary: true }
    ],
    stats: [
      { label: '待审核', value: '3', unit: '单', ico: 'clock', color: '#f79009' },
      { label: '待到货', value: '6', unit: '单', ico: 'truck', color: '#3568f0' },
      { label: '本月采购额', value: '18.64', unit: '万', ico: 'wallet', color: '#7a5af8' },
      { label: '平均到货', value: '3.2', unit: '天', ico: 'chart', color: '#12b76a' }
    ],
    filters: [
      { key: 'kw', type: 'search', ph: '采购单号 / 供应商' },
      { key: 'status', label: '状态', options: ['全部', '待审核', '待供应商确认', '待到货', '部分到货', '已入库', '已取消'] }
    ],
    columns: [
      { title: '采购单号', cell: function (r) { return c2('<span class="mono">' + r.id + '</span>', r.time, 'cell-main mono'); } },
      { title: '供应商', cell: function (r) { return '<span style="color:var(--text-2)">' + r.supplier + '</span>'; } },
      { title: '商品 / 数量', cell: function (r) { return '<span class="num">' + r.kinds + '</span> 种 · <span class="num">' + num(r.qty) + '</span> 件'; } },
      { title: '采购金额', cls: 't-right', cell: function (r) { return '<b class="num">' + money(r.amount) + '</b>'; } },
      { title: '状态', cell: function (r) { return tag(r.status, PO_COLOR[r.status] || 'gray'); } },
      { title: '预计到货', cell: function (r) { return '<span class="cell-sub" style="margin:0">' + r.eta + '</span>'; } },
      { title: '操作', cls: 't-right', cell: function (r) {
        if (r.status === '待审核') {
          return '<button class="link" style="font-size:12.5px" data-action="po-audit" data-id="' + r.id + '">审核</button>';
        }
        if (r.status === '待供应商确认' || r.status === '待到货' || r.status === '部分到货') {
          return '<button class="link" style="font-size:12.5px" data-action="po-receive" data-id="' + r.id + '">收货</button>';
        }
        return '<button class="link" style="font-size:12.5px" data-action="po-view" data-id="' + r.id + '">查看</button>';
      } }
    ],
    rows: PURCHASES
  };

  MODULES.suppliers = {
    key: 'suppliers', title: '供应商', ico: 'truck',
    desc: '供应商档案、账期结算与履约评分，采购决策有据可依',
    actions: [
      { label: '新增供应商', ico: 'plus', act: 'sup-new', primary: true }
    ],
    stats: [
      { label: '合作供应商', value: '48', unit: '家', ico: 'truck', color: '#3568f0' },
      { label: '观察中', value: '5', unit: '家', ico: 'alert', color: '#f79009' },
      { label: '平均准时率', value: '93.4', unit: '%', ico: 'chart', color: '#12b76a' },
      { label: '待结算金额', value: '26.8', unit: '万', ico: 'wallet', color: '#7a5af8' }
    ],
    filters: [
      { key: 'kw', type: 'search', ph: '供应商名称 / 编码 / 联系人' },
      { key: 'status', label: '状态', options: ['全部', '合作中', '观察中', '暂停合作'] },
      { key: 'pay', label: '结算方式', options: ['全部', '月结 30 天', '月结 45 天', '预付 30%', '预付 50%', '现结'] }
    ],
    columns: [
      { title: '供应商', cell: function (r) { return c2('<b>' + r.name + '</b>', r.code, 'cell-main'); } },
      { title: '联系人', cell: function (r) { return c2(r.contact, r.phone); } },
      { title: '主营类目', cell: function (r) { return '<span style="color:var(--text-2)">' + r.cat + '</span>'; } },
      { title: '合作商品', cls: 't-right', cell: function (r) { return '<span class="num">' + r.goods + '</span> 个'; } },
      { title: '结算方式', cell: function (r) { return tag(r.pay, 'gray'); } },
      { title: '准时率', cls: 't-right', cell: function (r) {
        return '<div class="bar"><i style="width:' + r.ontime + '%;background:' + (r.ontime >= 90 ? '#12b76a' : '#f79009') + '"></i></div>' +
          '<span class="cell-sub" style="margin:0">' + r.ontime + '%</span>';
      } },
      { title: '评分', cls: 't-right', cell: function (r) { return '<b class="num">' + r.score.toFixed(1) + '</b>'; } },
      { title: '状态', cell: function (r) {
        return tag(r.status, r.status === '合作中' ? 'green' : (r.status === '观察中' ? 'orange' : 'gray'));
      } }
    ],
    rows: SUPPLIERS
  };

  MODULES.logistics = {
    key: 'logistics', title: '物流管理', ico: 'truck',
    desc: '运单实时轨迹跟踪与异常预警，签收状态自动回传订单',
    actions: [
      { label: '物流预警设置', ico: 'gear', act: 'logi-rules' },
      { label: '导出', ico: 'download', act: 'export' },
      { label: '打印面单', ico: 'print', act: 'waybill-print', primary: true }
    ],
    stats: [
      { label: '在途运单', value: function () { return String(LOGISTICS.filter(function (r) { return r.status === '运输中' || r.status === '派送中'; }).length); }, unit: '单', ico: 'truck', color: '#3568f0' },
      { label: '已签收', value: function () { return String(LOGISTICS.filter(function (r) { return r.status === '已签收'; }).length); }, unit: '单', ico: 'check', color: '#12b76a' },
      { label: '异常运单', value: function () { return String(LOGISTICS.filter(function (r) { return r.status === '异常' || r.status === '退回'; }).length); }, unit: '单', ico: 'alert', color: '#f04438' },
      { label: '平均时效', value: '2.4', unit: '天', ico: 'clock', color: '#7a5af8' }
    ],
    filters: [
      { key: 'kw', type: 'search', ph: '运单号 / 订单号 / 收件人' },
      { key: 'express', label: '快递公司', options: ['全部', '顺丰速运', '中通快递', '圆通速递', '京东物流'] },
      { key: 'status', label: '状态', options: ['全部', '运输中', '派送中', '已签收', '异常', '退回'] }
    ],
    columns: [
      { title: '运单号 / 快递', cell: function (r) { return c2('<span class="mono">' + r.waybill + '</span>', r.express, 'cell-main mono'); } },
      { title: '订单号', cell: function (r) { return '<span class="mono" style="color:var(--text-2)">' + r.order + '</span>'; } },
      { title: '收件人', cell: function (r) { return c2(r.receiver, r.city); } },
      { title: '最新轨迹', cell: function (r) {
        return '<div style="max-width:280px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;color:' + (r.abnormal ? '#b42318' : 'var(--text-2)') + '" title="' + r.track + '">' + r.track + '</div>';
      } },
      { title: '状态', cell: function (r) { return tag(r.status, LG_COLOR[r.status] || 'gray'); } },
      { title: '更新时间', cell: function (r) { return '<span class="cell-sub" style="margin:0">' + r.time + '</span>'; } },
      { title: '操作', cls: 't-right', cell: function (r) { return '<button class="link" style="font-size:12.5px" data-action="waybill-detail" data-id="' + r.waybill + '">轨迹</button>'; } }
    ],
    rows: LOGISTICS,
    drawer: true
  };

  MODULES.shops = {
    key: 'shops', title: '店铺管理', ico: 'shop',
    desc: '全平台店铺授权与订单抓取状态，支持 200+ 平台、不限店铺数量',
    actions: [
      { label: '全部同步', ico: 'refresh', act: 'sync' },
      { label: '授权新店铺', ico: 'plus', act: 'shop-auth', primary: true }
    ],
    stats: [
      { label: '已授权店铺', value: '6', unit: '个', ico: 'shop', color: '#3568f0' },
      { label: '今日抓单', value: function () { return String(todayOrdersOfShop('')); }, unit: '单', ico: 'doc', color: '#12b76a' },
      { label: '即将到期', value: '1', unit: '个', ico: 'clock', color: '#f79009' },
      { label: '同步失败', value: '0', unit: '次', ico: 'alert', color: '#7a5af8' }
    ],
    filters: [
      { key: 'kw', type: 'search', ph: '店铺名 / 店铺 ID' },
      { key: 'plat', label: '平台', options: ['全部', '淘宝天猫', '京东', '抖音小店', '拼多多', '快手小店', '有赞'] },
      { key: 'auth', label: '授权状态', options: ['全部', '已授权', '即将到期', '已失效'] }
    ],
    columns: [
      { title: '平台 / 店铺', cell: function (r) { return platDot(r.plat) + '<div class="cell-main" style="margin-top:4px">' + r.name + '</div>'; } },
      { title: '店铺 ID', cell: function (r) { return '<span class="mono" style="color:var(--text-2)">' + r.sid + '</span>'; } },
      { title: '授权状态', cell: function (r) { return tag(r.auth, SHOP_COLOR[r.auth] || 'gray'); } },
      { title: '授权到期', cell: function (r) { return '<span style="color:' + (r.auth === '即将到期' ? '#b54708' : 'var(--text-2)') + '">' + r.expire + '</span>'; } },
      { title: '最后同步', cell: function (r) { return '<span class="cell-sub" style="margin:0">' + r.sync + '</span>'; } },
      { title: '今日订单', cls: 't-right', cell: function (r) { return '<b class="num">' + num(todayOrdersOfShop(r)) + '</b>'; } },
      { title: '在售商品', cls: 't-right', cell: function (r) { return '<span class="num">' + num(r.goods) + '</span>'; } },
      { title: '操作', cls: 't-right', cell: function (r) {
        return r.auth === '即将到期'
          ? '<button class="link" style="font-size:12.5px" data-action="info" data-msg="重新授权：' + r.name + '（演示）">重新授权</button>'
          : '<button class="link" style="font-size:12.5px" data-action="sync">同步</button>';
      } }
    ],
    rows: SHOPS
  };

  MODULES.distribution = {
    key: 'distribution', title: '分销管理', ico: 'users',
    desc: '分销商等级与一件代发，自动分账、结算与运费管理',
    actions: [
      { label: '邀请分销商', ico: 'plus', act: 'dist-invite', primary: true }
    ],
    select: { label: '批量结算', action: 'batch-settle', icon: 'wallet' },
    stats: [
      { label: '分销商', value: '24', unit: '家', ico: 'users', color: '#3568f0' },
      { label: '本月分销订单', value: '386', unit: '单', ico: 'doc', color: '#12b76a' },
      { label: '本月分销 GMV', value: '13.4', unit: '万', ico: 'wallet', color: '#7a5af8' },
      { label: '待结算', value: '2.47', unit: '万', ico: 'clock', color: '#f79009' }
    ],
    filters: [
      { key: 'kw', type: 'search', ph: '分销商名称 / 编码' },
      { key: 'level', label: '等级', options: ['全部', '钻石', '金牌', '银牌', '普通'] },
      { key: 'status', label: '状态', options: ['全部', '合作中', '待激活', '已暂停'] }
    ],
    columns: [
      { title: '分销商', cell: function (r) { return c2('<b>' + r.name + '</b>', r.code, 'cell-main'); } },
      { title: '等级', cell: function (r) { return tag(r.level, LV_COLOR[r.level] || 'gray'); } },
      { title: '合作商品', cls: 't-right', cell: function (r) { return '<span class="num">' + r.goods + '</span> 个'; } },
      { title: '本月订单', cls: 't-right', cell: function (r) { return '<span class="num">' + r.orders + '</span>'; } },
      { title: '本月销售额', cls: 't-right', cell: function (r) { return '<b class="num">' + money(r.gmv) + '</b>'; } },
      { title: '待结算', cls: 't-right', cell: function (r) { return '<span class="num" style="color:' + (r.pending ? '#b54708' : 'var(--muted)') + '">' + money(r.pending) + '</span>'; } },
      { title: '状态', cell: function (r) {
        return tag(r.status, r.status === '合作中' ? 'green' : (r.status === '待激活' ? 'orange' : 'gray'));
      } }
    ],
    rows: DISTRIBUTORS
  };

  MODULES.finance = {
    key: 'finance', title: '对账中心', ico: 'wallet',
    desc: '平台账单与系统订单自动比对，差异项逐笔定位，结算与利润一目了然',
    actions: [
      { label: '录入账单', ico: 'download', act: 'fin-import', perm: 'finance.entry' },
      { label: '利润报表', ico: 'chart', act: 'fin-report' },
      { label: '开始对账', ico: 'refresh', act: 'fin-reconcile', primary: true }
    ],
    stats: [
      { label: '系统应收', value: function () { return (FINANCE.reduce(function (s, r) { return s + r.system; }, 0) / 10000).toFixed(2); }, unit: '万', ico: 'wallet', color: '#3568f0' },
      { label: '平台账单', value: function () { return (FINANCE.reduce(function (s, r) { return s + r.platform; }, 0) / 10000).toFixed(2); }, unit: '万', ico: 'doc', color: '#12b76a' },
      { label: '差异金额', value: function () { return FINANCE.reduce(function (s, r) { return s + Math.abs(r.diff); }, 0).toFixed(2); }, unit: '元', ico: 'alert', color: '#f79009' },
      { label: '差异店铺', value: function () { return String(FINANCE.filter(function (r) { return r.status !== '已对平'; }).length); }, unit: '个', ico: 'clock', color: '#f04438' }
    ],
    filters: [
      { key: 'kw', type: 'search', ph: '店铺 / 账期' },
      { key: 'status', label: '对账状态', options: ['全部', '已对平', '有差异'] }
    ],
    columns: [
      { title: '店铺', cell: function (r) { return platDot(r.plat) + '<div class="cell-sub">' + r.shop + '</div>'; } },
      { title: '账期', cell: function (r) { return '<span style="color:var(--text-2)">' + r.period + '</span>'; } },
      { title: '出库单', cls: 't-right', cell: function (r) { return '<span class="num">' + r.outCount + '</span> 单'; } },
      { title: '系统应收', cls: 't-right', cell: function (r) { return '<b class="num">' + money(r.system) + '</b>'; } },
      { title: '平台账单', cls: 't-right', cell: function (r) { return '<span class="num">' + money(r.platform) + '</span>'; } },
      { title: '差异', cls: 't-right', cell: function (r) {
        return Math.abs(r.diff) < 0.005
          ? '<span style="color:var(--muted)">—</span>'
          : '<b class="num" style="color:' + (r.diff > 0 ? '#06894e' : '#d92d20') + '">' + (r.diff > 0 ? '+' : '') + money(r.diff) + '</b>';
      } },
      { title: '状态', cell: function (r) { return tag(r.status, FIN_COLOR[r.status] || 'gray'); } },
      { title: '操作', cls: 't-right', cell: function (r) { return '<button class="link" style="font-size:12.5px" data-action="fin-detail" data-id="' + esc(r.shop) + '">明细</button>'; } }
    ],
    rows: FINANCE
  };
