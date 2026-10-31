/* ============================================================
   鲸云 ERP · 演示逻辑（无构建、无依赖）
   账号：admin / 123456
   ============================================================ */
(function () {
  'use strict';

  /* ---------- 常量 ---------- */
  var CREDS = { username: 'admin', password: '123456' };
  var SESSION_KEY = 'jy_erp_session_v1';
  var UI_KEY = 'jy_erp_ui_v1';

  var PRIMARY = '#3568f0';
  var PURPLE = '#7a5af8';

  /* ---------- 图标 ---------- */
  var I = {
    grid: '<rect x="3" y="3" width="7.5" height="7.5" rx="2"/><rect x="13.5" y="3" width="7.5" height="7.5" rx="2"/><rect x="3" y="13.5" width="7.5" height="7.5" rx="2"/><rect x="13.5" y="13.5" width="7.5" height="7.5" rx="2"/>',
    doc: '<path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"/><path d="M14 3v5h5"/><path d="M9 13h6M9 17h4"/>',
    refresh: '<path d="M3 12a9 9 0 0 1 15.3-6.4L21 8"/><path d="M21 3v5h-5"/><path d="M21 12a9 9 0 0 1-15.3 6.4L3 16"/><path d="M3 21v-5h5"/>',
    box: '<path d="M21 8.5 12 3 3 8.5v7L12 21l9-5.5z"/><path d="M3 8.5 12 14l9-5.5M12 14v7"/>',
    layers: '<path d="M12 3 3 8l9 5 9-5z"/><path d="M3 13l9 5 9-5"/>',
    cart: '<circle cx="9" cy="20" r="1.5"/><circle cx="18" cy="20" r="1.5"/><path d="M2 3h2.5l2.3 11.2a2 2 0 0 0 2 1.6h8.4a2 2 0 0 0 2-1.6L21 7H6"/>',
    truck: '<path d="M3 6h11v9H3z"/><path d="M14 9h4l3 3v3h-7z"/><circle cx="7" cy="18" r="1.7"/><circle cx="17.5" cy="18" r="1.7"/>',
    wallet: '<path d="M3 7.5A2.5 2.5 0 0 1 5.5 5H19a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5.5A2.5 2.5 0 0 1 3 16.5z"/><path d="M3 9h18"/><circle cx="17" cy="14" r="1.3"/>',
    gear: '<circle cx="12" cy="12" r="3.2"/><path d="M19.4 14.6a1.6 1.6 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.6 1.6 0 0 0-1.8-.3 1.6 1.6 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.6 1.6 0 0 0-1-1.5 1.6 1.6 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.6 1.6 0 0 0 .3-1.8 1.6 1.6 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.6 1.6 0 0 0 1.5-1 1.6 1.6 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.6 1.6 0 0 0 1.8.3H9a1.6 1.6 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.6 1.6 0 0 0 1 1.5 1.6 1.6 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.6 1.6 0 0 0-.3 1.8V9a1.6 1.6 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.6 1.6 0 0 0-1.5 1z"/>',
    search: '<circle cx="11" cy="11" r="7"/><path d="M20 20l-3.2-3.2"/>',
    bell: '<path d="M18.5 16.2H5.5c1.5-1.3 2.1-2.7 2.1-6.2a4.4 4.4 0 0 1 8.8 0c0 3.5.6 4.9 2.1 6.2z"/><path d="M10.1 19.2a2 2 0 0 0 3.8 0"/>',
    chevD: '<path d="M6 9l6 6 6-6"/>',
    chevR: '<path d="M9 6l6 6-6 6"/>',
    logout: '<path d="M15 17l5-5-5-5"/><path d="M20 12H9"/><path d="M12 21H6a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h6"/>',
    panel: '<rect x="3" y="4" width="18" height="16" rx="2.4"/><path d="M9.5 4v16"/>',
    plus: '<path d="M12 5v14M5 12h14"/>',
    download: '<path d="M12 3v12"/><path d="M7 10.5l5 5 5-5"/><path d="M4 20h16"/>',
    alert: '<path d="M12 3.6 21.5 20H2.5z"/><path d="M12 9.4v4.4M12 16.9h.01"/>',
    check: '<path d="M20 6.5 9.2 17.3 4 12.1"/>',
    clock: '<circle cx="12" cy="12" r="8.5"/><path d="M12 7.6V12l3.2 2"/>',
    arrowUp: '<path d="M12 19V5.5M6.5 11 12 5.5 17.5 11"/>',
    arrowDown: '<path d="M12 5v13.5M6.5 13 12 18.5 17.5 13"/>',
    user: '<circle cx="12" cy="8" r="3.6"/><path d="M4.5 20a7.5 7.5 0 0 1 15 0"/>',
    lock: '<rect x="4.5" y="10.5" width="15" height="10.2" rx="2.3"/><path d="M8 10.5V7.8a4 4 0 0 1 8 0v2.7"/>',
    eye: '<path d="M2.2 12s3.6-6.6 9.8-6.6S21.8 12 21.8 12s-3.6 6.6-9.8 6.6S2.2 12 2.2 12z"/><circle cx="12" cy="12" r="2.8"/>',
    eyeOff: '<path d="M3 3l18 18"/><path d="M10.5 6.2A10 10 0 0 1 12 6c6.2 0 9.8 6 9.8 6a17.6 17.6 0 0 1-3 3.6"/><path d="M6.4 7.9A17 17 0 0 0 2.2 12S5.8 18 12 18c1.3 0 2.5-.2 3.6-.6"/><path d="M9.9 9.9a3 3 0 0 0 4.2 4.2"/>',
    close: '<path d="M6 6l12 12M18 6L6 18"/>',
    more: '<circle cx="5" cy="12" r="1.4"/><circle cx="12" cy="12" r="1.4"/><circle cx="19" cy="12" r="1.4"/>',
    print: '<path d="M7 8V3h10v5"/><rect x="4" y="8" width="16" height="8" rx="1.6"/><rect x="7" y="16" width="10" height="5" rx="1"/>',
    spark: '<path d="M12 3v3.4M12 17.6V21M4.6 12H8M16 12h3.4"/><circle cx="12" cy="12" r="3.6"/>',
    filter: '<path d="M3 5h18l-7 8.2V20l-4 1.5v-8.3z"/>',
    shop: '<path d="M4 9.5 5.5 4h13L20 9.5"/><path d="M4 9.5a2.6 2.6 0 0 0 5.2 0 2.6 2.6 0 0 0 5.2 0 2.6 2.6 0 0 0 5.2 0"/><path d="M5.5 12.4V20h13v-7.6"/>',
    chart: '<path d="M4 20V4"/><path d="M4 20h16"/><path d="M8 16v-4M13 16V8M18 16v-6"/>',
    users: '<circle cx="9" cy="8" r="3.2"/><path d="M2.6 20a6.4 6.4 0 0 1 12.8 0"/><path d="M16 5.4a3.2 3.2 0 0 1 0 5.8"/><path d="M18.4 20a6.4 6.4 0 0 0-2.2-4.7"/>',
    building: '<rect x="4" y="3.4" width="16" height="17.2" rx="2"/><path d="M8.6 7.6h2M13.4 7.6h2M8.6 11.6h2M13.4 11.6h2"/><path d="M9.6 20.6v-4.4h4.8v4.4"/>'
  };

  function icon(name, size, cls) {
    size = size || 18;
    return '<svg class="' + (cls || '') + '" viewBox="0 0 24 24" width="' + size + '" height="' + size +
      '" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
      (I[name] || '') + '</svg>';
  }

  /* ---------- 工具 ---------- */
  function $(sel, root) { return (root || document).querySelector(sel); }
  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  function money(n, dec) {
    var d = dec == null ? 2 : dec;
    return '¥' + Number(n).toLocaleString('zh-CN', { minimumFractionDigits: d, maximumFractionDigits: d });
  }
  function num(n) { return Number(n).toLocaleString('zh-CN'); }
  function pad2(n) { return n < 10 ? '0' + n : '' + n; }
  function mmdd(d) { return pad2(d.getMonth() + 1) + '-' + pad2(d.getDate()); }

  function toast(msg, type) {
    var root = $('#toast-root');
    if (!root) return;
    var el = document.createElement('div');
    el.className = 'toast ' + (type === 'err' ? 'err' : 'ok');
    el.innerHTML = '<span class="ti">' + icon(type === 'err' ? 'alert' : 'check', 17) + '</span><span>' + esc(msg) + '</span>';
    root.appendChild(el);
    setTimeout(function () {
      el.classList.add('out');
      setTimeout(function () { el.remove(); }, 220);
    }, 2600);
  }

  /* ---------- 状态 ---------- */
  var session = null;
  var ui = { route: 'dashboard', collapsed: false, range: 7, page: 1, kw: '', status: '全部', plat: '全部', userOpen: false, notifOpen: false, sel: {} };

  try { session = JSON.parse(localStorage.getItem(SESSION_KEY) || 'null'); } catch (e) { session = null; }
  try {
    var savedUi = JSON.parse(localStorage.getItem(UI_KEY) || 'null');
    if (savedUi && typeof savedUi.collapsed === 'boolean') ui.collapsed = savedUi.collapsed;
  } catch (e) { /* ignore */ }

  function saveUi() {
    try { localStorage.setItem(UI_KEY, JSON.stringify({ collapsed: ui.collapsed })); } catch (e) { /* ignore */ }
  }

  /* ---------- 个人资料 ---------- */
  var PROFILE_KEY = 'jy_erp_profile_v1';
  var PROFILE = {
    name: '管理员',
    account: 'admin',
    role: '超级管理员',
    dept: '总经办',
    phone: '13812341028',
    email: 'admin@jingyun.com',
    joined: '2024-03-12',
    twofa: true,
    alert: true
  };
  try {
    var savedProfile = JSON.parse(localStorage.getItem(PROFILE_KEY) || 'null');
    if (savedProfile && savedProfile.account) {
      for (var pk in savedProfile) PROFILE[pk] = savedProfile[pk];
    }
  } catch (e) { /* ignore */ }

  function saveProfile() {
    try { localStorage.setItem(PROFILE_KEY, JSON.stringify(PROFILE)); } catch (e) { /* ignore */ }
  }
  function maskPhone(p) {
    var s = String(p || '');
    if (s.length !== 11) return s || '—';
    return s.slice(0, 3) + '****' + s.slice(7);
  }

  var LOGIN_LOGS = [
    { t: '今天 09:12', dev: 'Windows · Chrome 141', ip: '10.8.2.10', loc: '杭州', cur: true },
    { t: '昨天 20:31', dev: 'macOS · Safari 18', ip: '10.8.2.10', loc: '杭州', cur: false },
    { t: '10-30 09:05', dev: 'iOS · 飞书 App', ip: '117.136.12.8', loc: '杭州', cur: false },
    { t: '10-28 18:44', dev: 'Windows · Edge 141', ip: '10.8.3.22', loc: '上海', cur: false },
    { t: '10-26 08:58', dev: 'Windows · Chrome 141', ip: '10.8.2.10', loc: '杭州', cur: false }
  ];

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
    ['SO202610310001', '淘宝天猫', '旗舰店', '林小满', '待发货', '今天 14:32', [['2026春季纯棉圆领T恤', '白色 / L', 2, 129], ['基础款帆布托特包', '米白 / 均码', 1, 89]], '尽快发货，客户催单'],
    ['SO202610310002', '京东', '京东自营店', '周予安', '待审核', '今天 14:05', [['轻量跑步鞋 Aerolite', '灰 / 42', 1, 469]], ''],
    ['SO202610310003', '抖音小店', '抖音旗舰店', '陈嘉树', '待发货', '今天 13:48', [['真丝方巾 · 云纹', '藏青 / 65cm', 2, 199]], '需要礼盒包装'],
    ['SO202610300118', '拼多多', '拼多多店', '黄一诺', '已发货', '昨天 21:10', [['加厚保温杯 500ml', '哑黑 / 500ml', 1, 79]], ''],
    ['SO202610310004', '淘宝天猫', '旗舰店', '苏亦然', '售后中', '今天 12:26', [['羊绒混纺针织开衫', '燕麦 / M', 1, 599]], '尺码不合适，申请退货'],
    ['SO202610300117', '京东', '京东自营店', '许知野', '已完成', '昨天 19:33', [['家用香薰蜡烛礼盒', '3 支装', 1, 259]], ''],
    ['SO202610310005', '快手小店', '快手店', '谭清和', '待发货', '今天 11:52', [['防晒冰袖（2 双装）', '黑色 / 均码', 3, 39.9]], ''],
    ['SO202610310006', '抖音小店', '抖音旗舰店', '顾星野', '待审核', '今天 11:20', [['复古机能双肩包', '军绿 / 20L', 1, 329], ['户外速干帽', '卡其 / 均码', 1, 99]], '客户要求改地址'],
    ['SO202610300116', '淘宝天猫', '旗舰店', '陆听白', '已取消', '昨天 18:02', [['羊毛围巾 · 格纹', '驼色 / 180cm', 1, 239]], '买家主动取消'],
    ['SO202610310007', '拼多多', '拼多多店', '温以宁', '待发货', '今天 10:44', [['厨房硅胶铲套装', '6 件套', 2, 69]], ''],
    ['SO202610300115', '京东', '京东自营店', '江晚棠', '已完成', '昨天 16:40', [['护眼台灯 Pro', '白色', 1, 399]], ''],
    ['SO202610310008', '淘宝天猫', '旗舰店', '沈泽川', '已发货', '今天 09:38', [['亚麻宽松衬衫', '浅蓝 / XL', 1, 219], ['纯棉直筒长裤', '米白 / 32', 1, 259]], ''],
    ['SO202610300114', '有赞', '小程序商城', '叶南乔', '待发货', '昨天 15:21', [['手冲咖啡礼盒', '中深烘 / 250g', 2, 168]], ''],
    ['SO202610310009', '抖音小店', '抖音旗舰店', '白露微', '售后中', '今天 08:56', [['轻薄羽绒马甲', '黑色 / S', 1, 429]], '商品有瑕疵，申请换货']
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

  /* ---------- 图表 ---------- */
  function trendData(range) {
    var labels = [], sales = [], orders = [], i, d;
    if (range === 7) {
      var now = new Date();
      for (i = 6; i >= 0; i--) { d = new Date(now.getTime() - i * 864e5); labels.push(mmdd(d)); }
      sales = [21.3, 18.9, 24.6, 22.1, 28.7, 31.2, 28.6];
      orders = [760, 1020, 880, 1180, 960, 1420, 1286];
    } else {
      var now2 = new Date();
      for (i = 29; i >= 0; i--) { d = new Date(now2.getTime() - i * 864e5); labels.push(mmdd(d)); }
      for (i = 0; i < 30; i++) {
        sales.push(Math.round((21 + 5 * Math.sin(i / 3.1) + 2.4 * Math.sin(i / 1.7 + 1.2) - (i % 7 === 0 ? 2.5 : 0)) * 10) / 10);
        orders.push(Math.round(950 + 260 * Math.sin(i / 3.4 + 0.6) + 120 * Math.sin(i / 1.3) + (i % 6 === 0 ? 180 : 0)));
      }
    }
    return { labels: labels, sales: sales, orders: orders };
  }

  var chartState = null;

  function niceUnit(v, cands) {
    for (var i = 0; i < cands.length; i++) if (cands[i] >= v) return cands[i];
    return cands[cands.length - 1];
  }

  function buildChartSVG(data) {
    var W = 780, H = 252, P = { l: 44, r: 44, t: 14, b: 28 };
    var n = data.sales.length;
    var maxS = Math.max.apply(null, data.sales);
    var maxO = Math.max.apply(null, data.orders);
    var topS = niceUnit((maxS / 4) * 1.03, [1, 2, 2.5, 4, 5, 8, 10, 12, 15, 20, 25, 30, 40]) * 4;
    var topO = niceUnit((maxO / 4) * 1.03, [50, 100, 150, 200, 250, 300, 400, 500, 600, 800, 1000]) * 4;
    var iw = W - P.l - P.r, ih = H - P.t - P.b;
    var xAt = function (i) { return n === 1 ? P.l + iw / 2 : P.l + (i * iw) / (n - 1); };
    var yS = function (v) { return P.t + ih - (v / topS) * ih; };
    var yO = function (v) { return P.t + ih - (v / topO) * ih; };

    var grid = '', axisL = '', axisR = '', axisX = '';
    for (var g = 0; g <= 4; g++) {
      var y = P.t + (ih * g) / 4;
      grid += '<line x1="' + P.l + '" y1="' + y + '" x2="' + (W - P.r) + '" y2="' + y + '" stroke="#eef2f9" stroke-width="1"/>';
      axisL += '<text x="' + (P.l - 10) + '" y="' + (y + 3.5) + '" text-anchor="end" font-size="10.5" fill="#a3aec0">' +
        (Math.round(topS - (topS * g) / 4) === 0 ? '0' : Math.round(topS - (topS * g) / 4) + '万') + '</text>';
      axisR += '<text x="' + (W - P.r + 10) + '" y="' + (y + 3.5) + '" text-anchor="start" font-size="10.5" fill="#a3aec0">' +
        num(Math.round(topO - (topO * g) / 4)) + '</text>';
    }
    var step = n > 10 ? 5 : 1;
    for (var j = 0; j < n; j++) {
      if (j % step !== 0 && j !== n - 1) continue;
      axisX += '<text x="' + xAt(j) + '" y="' + (H - 8) + '" text-anchor="middle" font-size="10.5" fill="#a3aec0">' + data.labels[j] + '</text>';
    }

    var lineS = '', areaS = '', lineO = '', dotsO = '';
    for (var k = 0; k < n; k++) {
      lineS += (k === 0 ? 'M' : 'L') + xAt(k) + ' ' + yS(data.sales[k]) + ' ';
      lineO += (k === 0 ? 'M' : 'L') + xAt(k) + ' ' + yO(data.orders[k]) + ' ';
    }
    areaS = lineS + 'L' + xAt(n - 1) + ' ' + (P.t + ih) + ' L' + xAt(0) + ' ' + (P.t + ih) + ' Z';
    if (n <= 12) {
      for (var m = 0; m < n; m++) {
        dotsO += '<circle cx="' + xAt(m) + '" cy="' + yO(data.orders[m]) + '" r="3.1" fill="#fff" stroke="' + PURPLE + '" stroke-width="2"/>';
      }
    }

    chartState = { W: W, H: H, P: P, n: n, xAt: xAt, yS: yS, yO: yO, data: data, iw: iw };

    return '<svg viewBox="0 0 ' + W + ' ' + H + '" width="100%" style="overflow:visible;height:auto" role="img" aria-label="订单与销售额趋势图">' +
      '<defs><linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">' +
      '<stop offset="0%" stop-color="' + PRIMARY + '" stop-opacity="0.24"/>' +
      '<stop offset="100%" stop-color="' + PRIMARY + '" stop-opacity="0"/></linearGradient></defs>' +
      grid + axisL + axisR + axisX +
      '<path d="' + areaS + '" fill="url(#areaGrad)"/>' +
      '<path d="' + lineS + '" fill="none" stroke="' + PRIMARY + '" stroke-width="2.4" stroke-linejoin="round" stroke-linecap="round"/>' +
      '<path d="' + lineO + '" fill="none" stroke="' + PURPLE + '" stroke-width="2" stroke-dasharray="0" stroke-linejoin="round" stroke-linecap="round" opacity="0.9"/>' +
      dotsO +
      '</svg>';
  }

  function chartCardHTML() {
    var data = trendData(ui.range);
    return '<section class="card">' +
      '<div class="card-head">' +
        '<div><h3>订单与销售额趋势<span class="hint">全部店铺 · 含退款前口径</span></h3></div>' +
        '<div style="display:flex;align-items:center;gap:14px">' +
          '<div class="chart-legend"><span><i style="background:' + PRIMARY + '"></i>销售额</span><span><i style="background:' + PURPLE + '"></i>订单量</span></div>' +
          '<div class="seg">' +
            '<button data-action="range" data-range="7" class="' + (ui.range === 7 ? 'on' : '') + '">近 7 天</button>' +
            '<button data-action="range" data-range="30" class="' + (ui.range === 30 ? 'on' : '') + '">近 30 天</button>' +
          '</div>' +
        '</div>' +
      '</div>' +
      '<div class="card-body">' +
        '<div class="chart-box"><div class="chart-tip" id="chart-tip"></div>' +
          '<div id="chart-plot">' + buildChartSVG(data) + '</div>' +
        '</div>' +
      '</div>' +
    '</section>';
  }

  function donutSVG() {
    var R = 52, C = 2 * Math.PI * R, acc = 0;
    var segs = DONUT.map(function (d) {
      var len = (d.v / 100) * C;
      var el = '<circle cx="70" cy="70" r="' + R + '" fill="none" stroke="' + d.c + '" stroke-width="15" ' +
        'stroke-dasharray="' + Math.max(len - 2.5, 0.5) + ' ' + (C - Math.max(len - 2.5, 0.5)) + '" ' +
        'stroke-dashoffset="' + (-acc) + '" stroke-linecap="butt"/>';
      acc += len;
      return el;
    }).join('');
    return '<div class="donut"><svg viewBox="0 0 140 140" width="140" height="140" style="transform:rotate(-90deg)">' +
      '<circle cx="70" cy="70" r="' + R + '" fill="none" stroke="#f1f4fa" stroke-width="15"/>' + segs + '</svg>' +
      '<div class="donut-center"><b>6</b><span>平台店铺</span></div></div>';
  }

  function sparkline(values, color) {
    var w = 86, h = 32, min = Math.min.apply(null, values), max = Math.max.apply(null, values);
    var span = max - min || 1;
    var pts = values.map(function (v, i) {
      var x = (i / (values.length - 1)) * (w - 4) + 2;
      var y = h - 3 - ((v - min) / span) * (h - 8);
      return x.toFixed(1) + ',' + y.toFixed(1);
    }).join(' ');
    return '<svg width="' + w + '" height="' + h + '" viewBox="0 0 ' + w + ' ' + h + '" fill="none">' +
      '<polyline points="' + pts + '" stroke="' + color + '" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" opacity="0.85"/></svg>';
  }

  /* ---------- 菜单 ---------- */
  var MENU = [
    { group: '概览', items: [{ key: 'dashboard', label: '工作台', ico: 'grid' }] },
    { group: '交易', items: [
      { key: 'orders', label: '订单管理', ico: 'doc', badge: '87' },
      { key: 'aftersale', label: '售后管理', ico: 'refresh', badge: '8' }
    ] },
    { group: '商品', items: [
      { key: 'products', label: '商品管理', ico: 'box' },
      { key: 'inventory', label: '库存管理', ico: 'layers' }
    ] },
    { group: '供应链', items: [
      { key: 'purchase', label: '采购管理', ico: 'cart' },
      { key: 'suppliers', label: '供应商', ico: 'building' },
      { key: 'logistics', label: '物流管理', ico: 'truck' }
    ] },
    { group: '渠道', items: [
      { key: 'shops', label: '店铺管理', ico: 'shop' },
      { key: 'distribution', label: '分销管理', ico: 'users' }
    ] },
    { group: '财务', items: [{ key: 'finance', label: '对账中心', ico: 'wallet' }] },
    { group: '系统', items: [{ key: 'settings', label: '系统设置', ico: 'gear' }] }
  ];

  var PLACEHOLDER = {
    aftersale: {
      title: '售后管理', ico: 'refresh',
      desc: '统一处理退货、换货、仅退款与工单，按平台规则自动计算退款金额与责任归属。',
      plans: ['退货退款', '换货补发', '仅退款', '工单流转', '售后原因分析']
    },
    products: {
      title: '商品管理', ico: 'box',
      desc: 'SPU / SKU 双层模型，支持多规格、多平台商品映射与批量上下架。',
      plans: ['商品列表', '多规格 SKU', '平台映射', '批量导入', '类目与品牌']
    },
    inventory: {
      title: '库存管理', ico: 'layers',
      desc: '多仓库存实时同步，可用 / 锁定 / 在途分账管理，每一次变动都有流水可查。',
      plans: ['库存总览', '多仓调拨', '库存流水', '安全库存预警', '盘点单']
    },
    purchase: {
      title: '采购管理', ico: 'cart',
      desc: '从采购申请到入库质检的完整链路，支持供应商比价与到货跟踪。',
      plans: ['采购单', '收货入库', '采购退货', '供应商比价', '到货跟踪']
    },
    suppliers: {
      title: '供应商', ico: 'truck',
      desc: '供应商档案、结算方式与履约评分，帮采购决策有据可依。',
      plans: ['供应商档案', '合作商品', '账期结算', '履约评分']
    },
    finance: {
      title: '对账中心', ico: 'wallet',
      desc: '平台账单与系统订单自动比对，差异项一键定位，月度对账从两天缩短到十分钟。',
      plans: ['平台账单导入', '自动比对', '差异处理', '店铺结算', '利润报表']
    },
    settings: {
      title: '系统设置', ico: 'gear',
      desc: '组织架构、角色权限、平台授权与操作日志，权限可细化到菜单、按钮与数据范围。',
      plans: ['成员与角色', '权限配置', '平台授权', '操作日志', '字典管理']
    }
  };

  /* ---------- 登录页 ---------- */
  function loginHTML() {
    return '' +
      '<div class="login">' +
        '<aside class="login-brand">' +
          '<div class="brand-top">' +
            '<div class="logo-mark">' + icon('layers', 22) + '</div>' +
            '<div class="logo-name">鲸云 ERP<small>JINGYUN COMMERCE</small></div>' +
            '<span class="brand-pill">DEMO</span>' +
          '</div>' +
          '<div class="brand-mid">' +
            '<h1>让订单、库存与财务<br>跑在<em>同一套系统</em>里</h1>' +
            '<p>多平台订单自动归集、多仓库存实时同步、财务对账一键完成。<br>一套后台，管好所有店铺。</p>' +
            '<ul class="brand-points">' +
              '<li><span class="pt-ico">' + icon('check', 13) + '</span>6 大平台订单每 3 分钟自动抓取，不漏单</li>' +
              '<li><span class="pt-ico">' + icon('check', 13) + '</span>库存预占 + 流水台账，超卖率降到 0.02%</li>' +
              '<li><span class="pt-ico">' + icon('check', 13) + '</span>账单自动比对，差异项逐笔定位</li>' +
            '</ul>' +
          '</div>' +
          '<div class="brand-foot">' +
            '<div class="brand-stat"><b>12</b><span>接入平台</span></div>' +
            '<div class="brand-stat"><b>32,000+</b><span>在售 SKU</span></div>' +
            '<div class="brand-stat"><b>99.98%</b><span>服务可用性</span></div>' +
          '</div>' +
        '</aside>' +

        '<main class="login-panel">' +
          '<div class="login-card">' +
            '<div class="mobile-brand">' +
              '<div class="logo-mark">' + icon('layers', 20) + '</div>' +
              '<div class="logo-name">鲸云 ERP<small>JINGYUN COMMERCE</small></div>' +
            '</div>' +
            '<h2>欢迎回来</h2>' +
            '<p class="sub">登录鲸云 ERP 管理后台</p>' +
            '<form class="login-form" id="login-form" novalidate>' +
              '<div class="field" id="f-user">' +
                '<label for="username">账号</label>' +
                '<div class="input-wrap">' +
                  '<span class="ico">' + icon('user', 17) + '</span>' +
                  '<input class="input" id="username" name="username" type="text" placeholder="请输入登录账号" autocomplete="username" spellcheck="false">' +
                '</div>' +
                '<div class="field-err">请输入账号</div>' +
              '</div>' +
              '<div class="field" id="f-pass">' +
                '<label for="password">密码</label>' +
                '<div class="input-wrap">' +
                  '<span class="ico">' + icon('lock', 17) + '</span>' +
                  '<input class="input has-toggle" id="password" name="password" type="password" placeholder="请输入密码" autocomplete="current-password">' +
                  '<button type="button" class="eye" data-action="toggle-pass" title="显示密码" aria-label="显示密码">' + icon('eye', 17) + '</button>' +
                '</div>' +
                '<div class="field-err">请输入密码</div>' +
              '</div>' +
              '<div class="login-row">' +
                '<label class="check"><input type="checkbox" id="remember">记住账号</label>' +
                '<a class="link" href="#/" data-action="forgot">忘记密码？</a>' +
              '</div>' +
              '<div class="form-error" id="form-error">' + icon('alert', 16) + '<span>账号或密码不正确，请重试</span></div>' +
              '<button class="btn btn-primary btn-block" type="submit" id="login-btn">登 录</button>' +
            '</form>' +

            '<div class="demo-box">' +
              '<div class="dh"><span class="dt">测试账号</span><button class="btn-fill" type="button" data-action="fill-demo">一键填入</button></div>' +
              '<div class="demo-cred">' +
                '<span class="chip">账号 <b>' + CREDS.username + '</b></span>' +
                '<span class="chip">密码 <b>' + CREDS.password + '</b></span>' +
              '</div>' +
            '</div>' +

            '<div class="login-foot">演示环境，所有数据均为模拟 · 填写账号后按 <kbd>Enter</kbd> 可直接登录</div>' +
          '</div>' +
        '</main>' +
      '</div>';
  }

  /* ---------- 框架 ---------- */
  function navHTML() {
    return MENU.map(function (g) {
      return '<div class="nav-group"><div class="nav-group-t">' + g.group + '</div>' +
        g.items.map(function (it) {
          return '<a class="nav-item' + (ui.route === it.key ? ' active' : '') + '" href="#/' + it.key +
            '" data-action="nav" data-route="' + it.key + '" title="' + it.label + '">' +
            '<span class="ni-ico">' + icon(it.ico, 18) + '</span>' +
            '<span class="nav-label">' + it.label + '</span>' +
            (it.badge ? '<span class="nav-badge">' + it.badge + '</span>' : '') +
            '</a>';
        }).join('') +
        '</div>';
    }).join('');
  }

  var ROUTE_TITLE = {
    dashboard: ['概览', '工作台'],
    orders: ['交易', '订单管理'],
    aftersale: ['交易', '售后管理'],
    products: ['商品', '商品管理'],
    inventory: ['商品', '库存管理'],
    purchase: ['供应链', '采购管理'],
    suppliers: ['供应链', '供应商'],
    logistics: ['供应链', '物流管理'],
    shops: ['渠道', '店铺管理'],
    distribution: ['渠道', '分销管理'],
    finance: ['财务', '对账中心'],
    settings: ['系统', '系统设置'],
    profile: ['账号', '个人中心']
  };

  function shellHTML() {
    var crumb = ROUTE_TITLE[ui.route] || ['概览', '工作台'];
    return '<div class="shell' + (ui.collapsed ? ' collapsed' : '') + '">' +
      '<aside class="sidebar">' +
        '<div class="sb-logo">' +
          '<div class="logo-mark">' + icon('layers', 18) + '</div>' +
          '<div class="logo-name">鲸云 ERP<small>JINGYUN</small></div>' +
        '</div>' +
        '<nav class="nav">' + navHTML() + '</nav>' +
        '<div class="sb-foot"><div class="store-pill"><i class="dot"></i><span><b>6</b> 个店铺在线</span></div></div>' +
      '</aside>' +

      '<div class="main">' +
        '<header class="topbar">' +
          '<button class="icon-btn" data-action="toggle-collapse" title="收起 / 展开菜单">' + icon('panel', 18) + '</button>' +
          '<div class="crumbs"><span>' + crumb[0] + '</span><span class="sep">/</span><span class="cur">' + crumb[1] + '</span></div>' +
          '<div class="top-search"><span class="ico">' + icon('search', 16) + '</span>' +
            '<input type="search" id="global-search" placeholder="搜索订单号 / 商品 / 买家" aria-label="全局搜索"></div>' +
          '<div class="shop-status"><i class="dot"></i>店铺同步正常</div>' +
          '<div class="top-sep"></div>' +
          notifMenuHTML() +
          '<div class="top-sep"></div>' +
          '<div class="user' + (ui.userOpen ? ' open' : '') + '" id="user-wrap">' +
            '<button class="user-btn" data-action="toggle-user">' +
              '<span class="avatar">' + esc((PROFILE.name || '管').slice(0, 1)) + '</span>' +
              '<span class="user-meta"><b>' + esc(PROFILE.name || '管理员') + '</b><span>' + esc(PROFILE.role) + '</span></span>' +
              '<span class="chev">' + icon('chevD', 15) + '</span>' +
            '</button>' +
            '<div class="menu">' +
              '<div class="menu-head"><b>' + esc(PROFILE.account) + '</b><span>上次登录：今天 09:12</span></div>' +
              '<button class="menu-item" data-action="nav" data-route="profile">' + icon('user', 15) + '个人中心</button>' +
              '<button class="menu-item" data-action="nav" data-route="settings">' + icon('gear', 15) + '系统设置</button>' +
              '<div class="menu-line"></div>' +
              '<button class="menu-item danger" data-action="logout">' + icon('logout', 15) + '退出登录</button>' +
            '</div>' +
          '</div>' +
        '</header>' +
        '<div class="content" id="main-content"></div>' +
      '</div>' +
    '</div>';
  }

  /* ---------- 工作台 ---------- */
  function greeting() {
    var h = new Date().getHours();
    if (h < 6) return '夜深了';
    if (h < 11) return '早上好';
    if (h < 14) return '中午好';
    if (h < 18) return '下午好';
    return '晚上好';
  }

  function todayText() {
    var d = new Date();
    var wk = ['日', '一', '二', '三', '四', '五', '六'][d.getDay()];
    return d.getFullYear() + ' 年 ' + (d.getMonth() + 1) + ' 月 ' + d.getDate() + ' 日 · 星期' + wk;
  }

  function kpiHTML() {
    return KPI.map(function (k) {
      var dirCls = k.dir === 'up' ? 'up' : 'down';
      var arrow = k.dir === 'up' ? icon('arrowUp', 11) : icon('arrowDown', 11);
      var val = typeof k.value === 'number' ? num(k.value) : k.value;
      return '<div class="kpi">' +
        '<div class="kpi-top"><span class="kpi-label">' + k.label + '</span>' +
          '<span class="kpi-ico" style="background:' + k.color + '15;color:' + k.color + '">' + icon(k.ico, 15) + '</span></div>' +
        '<div class="kpi-val">' + val + '<small>' + k.unit + '</small></div>' +
        '<div class="kpi-bot">' +
          '<div><span class="delta ' + dirCls + '">' + arrow + Math.abs(k.delta) + '%</span>' +
            '<span class="kpi-sub" style="margin-left:6px">' + k.sub + '</span></div>' +
          '<div style="opacity:.9">' + sparkline(k.spark, k.color) + '</div>' +
        '</div>' +
      '</div>';
    }).join('');
  }

  function dashboardHTML() {
    var now = new Date();
    var recent = ORDERS.slice(0, 5);

    var todoHTML = TODOS.map(function (t) {
      return '<button class="todo-item" data-action="nav" data-route="' + t.route + '">' +
        '<span class="todo-ico" style="background:' + t.bg + ';color:' + t.color + '">' + icon(t.ico, 16) + '</span>' +
        '<span class="todo-txt"><b>' + t.label + '</b><span>' + t.sub + '</span></span>' +
        '<span class="todo-n">' + t.n + '</span>' +
        '<span class="chev">' + icon('chevR', 15) + '</span>' +
        '</button>';
    }).join('');

    var platHTML = DONUT.map(function (d) {
      return '<div class="plat-row"><i style="background:' + d.c + '"></i>' +
        '<span class="nm">' + d.name + '</span>' +
        '<span class="vl">' + d.v + '%</span>' +
        '<span class="pc">' + Math.round(d.v * 12.86) + ' 单</span></div>';
    }).join('');

    var recentHTML = recent.map(function (o) {
      return '<tr data-action="open-order" data-id="' + o.id + '" style="cursor:pointer">' +
        '<td class="mono">' + o.id + '</td>' +
        '<td>' + platDot(o.plat) + '<div class="cell-sub">' + o.shop + '</div></td>' +
        '<td>' + o.buyer + '</td>' +
        '<td class="num t-right">' + money(o.amount) + '</td>' +
        '<td>' + statusTag(o.status) + '</td>' +
        '<td class="cell-sub" style="margin:0">' + o.time + '</td>' +
        '</tr>';
    }).join('');

    return '<div class="page-head">' +
        '<div><h1>' + greeting() + '，' + (session ? esc(session.name) : '管理员') + '</h1>' +
          '<p class="desc">' + todayText() + ' · 今日已有 ' + num(KPI[0].value) + ' 笔订单，待发货 ' + num(KPI[2].value) + ' 笔</p></div>' +
        '<div class="head-actions">' +
          '<button class="btn btn-ghost" data-action="sync">' + icon('refresh', 15) + '同步订单</button>' +
          '<button class="btn btn-ghost" data-action="nav" data-route="finance">' + icon('chart', 15) + '今日报表</button>' +
        '</div>' +
      '</div>' +

      '<div class="kpi-grid">' + kpiHTML() + '</div>' +

      '<div class="grid-2">' +
        chartCardHTML() +
        '<section class="card">' +
          '<div class="card-head"><h3>平台订单占比<span class="hint">今日</span></h3>' +
            '<button class="icon-btn" data-action="more" style="width:28px;height:28px">' + icon('more', 16) + '</button></div>' +
          '<div class="card-body" style="padding-top:6px">' +
            '<div class="donut-wrap">' + donutSVG() + '<div class="plat-list">' + platHTML + '</div></div>' +
          '</div>' +
          '<div class="mini-stats">' +
            '<div class="ms"><span>客单价</span><b>¥223</b></div>' +
            '<div class="ms"><span>支付转化</span><b>3.24%</b></div>' +
            '<div class="ms"><span>退款率</span><b>1.8%</b></div>' +
          '</div>' +
        '</section>' +
      '</div>' +

      '<div class="grid-2 rev">' +
        '<section class="card">' +
          '<div class="card-head"><h3>待办事项</h3><span class="hint">共 107 项</span></div>' +
          '<div class="card-body" style="padding:8px 10px 10px"><div class="todo">' + todoHTML + '</div></div>' +
          '<div class="card-foot" style="display:flex;justify-content:space-between;align-items:center">' +
            '<span style="font-size:12px;color:var(--muted)">处理完可减少 20 分钟/天</span>' +
            '<button class="link" style="font-size:12.5px" data-action="nav" data-route="orders">全部待办' + icon('chevR', 13) + '</button>' +
          '</div>' +
        '</section>' +
        '<section class="card">' +
          '<div class="card-head" style="padding-bottom:14px"><h3>最新订单<span class="hint">实时同步</span></h3>' +
            '<button class="btn btn-ghost" style="height:30px;font-size:12.5px" data-action="nav" data-route="orders">查看全部' + icon('chevR', 14) + '</button></div>' +
          '<div class="tb-wrap"><table class="tb">' +
            '<thead><tr><th>订单号</th><th>平台 / 店铺</th><th>买家</th><th class="t-right">金额</th><th>状态</th><th>下单时间</th></tr></thead>' +
            '<tbody>' + recentHTML + '</tbody>' +
          '</table></div>' +
        '</section>' +
      '</div>';
  }

  /* ---------- 订单页 ---------- */
  function filteredOrders() {
    var kw = ui.kw.trim().toLowerCase();
    return ORDERS.filter(function (o) {
      if (ui.status !== '全部' && o.status !== ui.status) return false;
      if (ui.plat !== '全部' && o.plat !== ui.plat) return false;
      if (kw) {
        var hay = (o.id + ' ' + o.buyer + ' ' + o.shop + ' ' + o.plat).toLowerCase();
        if (hay.indexOf(kw) === -1) return false;
      }
      return true;
    });
  }

  var PAGE_SIZE = 8;

  function selCount() {
    var n = 0;
    for (var k in ui.sel) if (ui.sel[k]) n++;
    return n;
  }
  function pickedOrders() {
    return Object.keys(ui.sel).filter(function (k) { return ui.sel[k]; });
  }

  function ordersListHTML() {
    var rows = filteredOrders();
    var pages = Math.max(1, Math.ceil(rows.length / PAGE_SIZE));
    if (ui.page > pages) ui.page = pages;
    var start = (ui.page - 1) * PAGE_SIZE;
    var slice = rows.slice(start, start + PAGE_SIZE);
    var allChecked = slice.length > 0 && slice.every(function (o) { return ui.sel[o.id]; });

    var body = slice.length ? slice.map(function (o) {
      var first = o.items[0];
      return '<tr data-action="open-order" data-id="' + o.id + '" style="cursor:pointer">' +
        '<td class="cb-col"><input type="checkbox" class="cb" data-cb="' + o.id + '" data-m="orders"' + (ui.sel[o.id] ? ' checked' : '') + ' aria-label="选择订单"></td>' +
        '<td><div class="mono cell-main">' + o.id + '</div><div class="cell-sub">' + o.items.length + ' 种商品 · ' + o.qty + ' 件</div></td>' +
        '<td>' + platDot(o.plat) + '<div class="cell-sub">' + o.shop + '</div></td>' +
        '<td><div class="cell-main">' + o.buyer + '</div><div class="cell-sub">' + o.phone + '</div></td>' +
        '<td><div class="cell-main" style="font-weight:500;max-width:230px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">' + first.name + '</div>' +
          '<div class="cell-sub">' + first.spec + (o.items.length > 1 ? ' 等' : '') + '</div></td>' +
        '<td class="num t-right" style="font-weight:600">' + money(o.amount) + '</td>' +
        '<td>' + statusTag(o.status) + '</td>' +
        '<td class="cell-sub" style="margin:0;white-space:nowrap">' + o.time + '</td>' +
        '<td class="t-right"><button class="link" style="font-size:12.5px" data-action="open-order" data-id="' + o.id + '">查看</button></td>' +
        '</tr>';
    }).join('') : '<tr><td colspan="9"><div class="empty" style="padding:40px"><div class="empty-ico">' + icon('search', 24) + '</div>' +
        '<h3>没有匹配的订单</h3><p>试试调整筛选条件，或清空关键词重新搜索。</p></div></td></tr>';

    var pageBtns = '';
    for (var p = 1; p <= pages; p++) {
      pageBtns += '<button class="pbtn' + (p === ui.page ? ' on' : '') + '" data-action="page" data-page="' + p + '">' + p + '</button>';
    }

    var picked = pickedOrders();

    var selBar = picked.length
      ? '<div class="sel-bar"><span>已选 <b>' + picked.length + '</b> 笔订单</span>' +
        '<button class="btn btn-ghost xs" data-action="clear-sel">取消选择</button>' +
        '<div class="spacer"></div>' +
        '<button class="btn btn-ghost xs" data-action="export-sel">' + icon('download', 14) + '导出所选</button>' +
        '<button class="btn btn-primary xs" data-action="batch-ship">' + icon('truck', 14) + '批量发货</button></div>'
      : '';

    return selBar + '<div class="tb-wrap"><table class="tb">' +
        '<thead><tr>' +
          '<th class="cb-col"><input type="checkbox" class="cb" data-cb-all="1" data-m="orders"' + (allChecked ? ' checked' : '') + ' aria-label="全选本页"></th>' +
          '<th>订单号</th><th>平台 / 店铺</th><th>买家</th><th>商品</th><th class="t-right">金额</th><th>状态</th><th>下单时间</th><th class="t-right">操作</th>' +
        '</tr></thead>' +
        '<tbody>' + body + '</tbody></table></div>' +
      '<div class="pager">' +
        '<span>共 <b style="color:var(--text-2)">' + rows.length + '</b> 条订单 · 每页 ' + PAGE_SIZE + ' 条' +
          (picked.length ? ' · 已选 ' + picked.length + ' 笔' : '') + '</span>' +
        '<div class="pager-btns">' +
          '<button class="pbtn" data-action="page" data-page="' + (ui.page - 1) + '"' + (ui.page === 1 ? ' disabled' : '') + '>上一页</button>' +
          pageBtns +
          '<button class="pbtn" data-action="page" data-page="' + (ui.page + 1) + '"' + (ui.page === pages ? ' disabled' : '') + '>下一页</button>' +
        '</div>' +
      '</div>';
  }

  function ordersHTML() {
    var statusOpts = ['全部', '待审核', '待发货', '已发货', '已完成', '售后中', '已取消'].map(function (s) {
      return '<option' + (ui.status === s ? ' selected' : '') + '>' + s + '</option>';
    }).join('');
    var platOpts = ['全部'].concat(Object.keys(PLATFORMS)).map(function (s) {
      return '<option' + (ui.plat === s ? ' selected' : '') + '>' + s + '</option>';
    }).join('');

    return '<div class="page-head">' +
        '<div><h1>订单管理</h1><p class="desc">汇总 6 个平台的订单，统一审核、发货与售后处理</p></div>' +
        '<div class="head-actions">' +
          '<button class="btn btn-ghost" data-action="export">' + icon('download', 15) + '导出</button>' +
          '<button class="btn btn-ghost" data-action="sync">' + icon('refresh', 15) + '同步订单</button>' +
        '</div>' +
      '</div>' +
      '<section class="card">' +
        '<div class="filters">' +
          '<div class="fld"><label>关键词</label><input class="inp search" id="order-kw" placeholder="订单号 / 买家 / 店铺" value="' + esc(ui.kw) + '"></div>' +
          '<div class="fld"><label>平台</label><select class="sel" id="order-plat">' + platOpts + '</select></div>' +
          '<div class="fld"><label>状态</label><select class="sel" id="order-status">' + statusOpts + '</select></div>' +
          '<div class="fld"><label>下单时间</label><input class="inp" type="date" value="2026-10-31" style="width:150px"></div>' +
          '<div class="spacer"></div>' +
          '<button class="btn btn-ghost" style="height:34px" data-action="reset-filter">' + icon('filter', 14) + '重置</button>' +
        '</div>' +
        '<div id="orders-list">' + ordersListHTML() + '</div>' +
      '</section>';
  }

  function placeholderHTML(route) {
    var p = PLACEHOLDER[route] || PLACEHOLDER.products;
    var crumb = ROUTE_TITLE[route] || [];
    return '<div class="page-head">' +
        '<div><h1>' + p.title + '</h1><p class="desc">' + crumb[0] + ' · 演示版仅做布局占位</p></div>' +
      '</div>' +
      '<section class="card"><div class="empty">' +
        '<div class="empty-ico">' + icon(p.ico, 26) + '</div>' +
        '<h3>' + p.title + '模块规划中</h3>' +
        '<p>' + p.desc + '</p>' +
        '<div class="plan">' + p.plans.map(function (x) { return '<span class="plan-item">' + x + '</span>'; }).join('') + '</div>' +
        '<button class="btn btn-ghost" style="margin-top:22px" data-action="not-ready">' + icon('spark', 15) + '本期优先实现？点这里反馈</button>' +
      '</div></section>';
  }

  /* ============================================================
     业务模块数据 + 通用列表引擎
     ============================================================ */

  function c2(main, sub, cls) {
    return '<div class="' + (cls || 'cell-main') + '">' + main + '</div>' + (sub ? '<div class="cell-sub">' + sub + '</div>' : '');
  }
  function tag(text, color) { return '<span class="tag ' + color + '"><i></i>' + text + '</span>'; }
  function thumb(ch, color) {
    return '<span class="thumb" style="background:' + color + '1a;color:' + color + '">' + ch + '</span>';
  }
  function indexSearch(list, fields) {
    list.forEach(function (r) {
      r.search = fields.map(function (f) { return r[f] == null ? '' : r[f]; }).join(' ');
    });
  }

  /* ---------- 售后 ---------- */
  var AFTERSALES = [
    { id: 'AS202610310031', order: 'SO202610310004', plat: '淘宝天猫', shop: '旗舰店', buyer: '苏亦然', type: '退货退款', amount: 599, reason: '尺码不合适', status: '待审核', time: '今天 12:32', deadline: '剩 1 天 4 小时' },
    { id: 'AS202610310030', order: 'SO202610310009', plat: '抖音小店', shop: '抖音旗舰店', buyer: '白露微', type: '换货', amount: 429, reason: '商品有瑕疵', status: '待买家退货', time: '今天 09:12', deadline: '剩 2 天 6 小时' },
    { id: 'AS202610300028', order: 'SO202610300116', plat: '淘宝天猫', shop: '旗舰店', buyer: '陆听白', type: '仅退款', amount: 239, reason: '未按约定时间发货', status: '退款中', time: '昨天 19:40', deadline: '剩 6 小时' },
    { id: 'AS202610300027', order: 'SO202610300118', plat: '拼多多', shop: '拼多多店', buyer: '黄一诺', type: '补发', amount: 79, reason: '少件 / 漏发', status: '待收货', time: '昨天 16:20', deadline: '剩 3 天' },
    { id: 'AS202610300026', order: 'SO202610300115', plat: '京东', shop: '京东自营店', buyer: '江晚棠', type: '退货退款', amount: 399, reason: '七天无理由', status: '已完成', time: '昨天 11:05', deadline: '—' },
    { id: 'AS202610300025', order: 'SO202610300114', plat: '有赞', shop: '小程序商城', buyer: '叶南乔', type: '仅退款', amount: 336, reason: '拍错 / 多拍', status: '已完成', time: '昨天 10:18', deadline: '—' },
    { id: 'AS202610290024', order: 'SO202610290098', plat: '京东', shop: '京东自营店', buyer: '周予安', type: '退货退款', amount: 469, reason: '商品与描述不符', status: '待收货', time: '10-29 15:22', deadline: '剩 2 天' },
    { id: 'AS202610290023', order: 'SO202610290092', plat: '抖音小店', shop: '抖音旗舰店', buyer: '陈嘉树', type: '仅退款', amount: 199, reason: '不想要了', status: '已关闭', time: '10-29 09:40', deadline: '—' },
    { id: 'AS202610280022', order: 'SO202610280071', plat: '淘宝天猫', shop: '旗舰店', buyer: '林小满', type: '换货', amount: 129, reason: '尺码不合适', status: '已完成', time: '10-28 20:15', deadline: '—' }
  ];
  indexSearch(AFTERSALES, ['id', 'order', 'plat', 'shop', 'buyer', 'reason']);

  /* ---------- 商品 ---------- */
  var PRODUCTS = [
    { code: 'P10086', name: '2026春季纯棉圆领T恤', cat: '服饰 / 上装', brand: '云织', specs: ['白色 / S', '白色 / M', '黑色 / L'], priceMin: 129, priceMax: 159, stock: 1268, sales: 386, map: '3/3', status: '在售', color: '#3568f0' },
    { code: 'P10087', name: '轻量跑步鞋 Aerolite', cat: '鞋靴 / 运动鞋', brand: 'Aerolite', specs: ['灰 / 41', '灰 / 42', '蓝 / 43'], priceMin: 469, priceMax: 529, stock: 486, sales: 212, map: '3/3', status: '在售', color: '#12b76a' },
    { code: 'P10088', name: '真丝方巾 · 云纹', cat: '配饰 / 丝巾', brand: '云织', specs: ['藏青 / 65cm', '米白 / 65cm'], priceMin: 199, priceMax: 259, stock: 320, sales: 158, map: '2/3', status: '在售', color: '#7a5af8' },
    { code: 'P10089', name: '加厚保温杯 500ml', cat: '家居 / 水具', brand: '栖町', specs: ['哑黑 / 500ml', '奶白 / 500ml'], priceMin: 79, priceMax: 99, stock: 0, sales: 640, map: '3/3', status: '在售', color: '#0d9488' },
    { code: 'P10090', name: '羊绒混纺针织开衫', cat: '服饰 / 针织', brand: '云织', specs: ['燕麦 / S', '燕麦 / M', '灰 / L'], priceMin: 599, priceMax: 699, stock: 92, sales: 74, map: '3/3', status: '在售', color: '#b45309' },
    { code: 'P10091', name: '家用香薰蜡烛礼盒', cat: '家居 / 香氛', brand: '栖町', specs: ['3 支装', '5 支装'], priceMin: 259, priceMax: 399, stock: 512, sales: 96, map: '3/3', status: '在售', color: '#be185d' },
    { code: 'P10092', name: '防晒冰袖（2 双装）', cat: '配饰 / 防晒', brand: 'Aerolite', specs: ['黑色 / 均码', '灰色 / 均码'], priceMin: 39.9, priceMax: 49.9, stock: 2340, sales: 1820, map: '2/3', status: '在售', color: '#0891b2' },
    { code: 'P10093', name: '复古机能双肩包', cat: '箱包 / 双肩包', brand: 'OAKLAB', specs: ['军绿 / 20L', '黑色 / 20L'], priceMin: 329, priceMax: 379, stock: 168, sales: 120, map: '3/3', status: '在售', color: '#4d7c0f' },
    { code: 'P10094', name: '羊绒围巾 · 格纹', cat: '配饰 / 围巾', brand: '云织', specs: ['驼色 / 180cm', '黑灰 / 180cm'], priceMin: 239, priceMax: 299, stock: 0, sales: 0, map: '1/3', status: '下架', color: '#78350f' },
    { code: 'P10095', name: '护眼台灯 Pro', cat: '家居 / 灯具', brand: '栖町', specs: ['白色'], priceMin: 399, priceMax: 399, stock: 76, sales: 88, map: '3/3', status: '待上架', color: '#4338ca' }
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
    { sku: 'P10086-03', name: '2026春季纯棉圆领T恤 黑色 / L', wh: '杭州主仓', avail: 96, lock: 12, transit: 0, safety: 120, status: '预警', time: '10 分钟前' },
    { sku: 'P10087-02', name: '轻量跑步鞋 Aerolite 灰 / 42', wh: '广州仓', avail: 268, lock: 24, transit: 120, safety: 100, status: '正常', time: '12 分钟前' },
    { sku: 'P10088-01', name: '真丝方巾 · 云纹 藏青 / 65cm', wh: '杭州主仓', avail: 0, lock: 6, transit: 80, safety: 60, status: '断货', time: '12 分钟前' },
    { sku: 'P10089-01', name: '加厚保温杯 500ml 哑黑 / 500ml', wh: '义乌仓', avail: 0, lock: 0, transit: 0, safety: 200, status: '断货', time: '25 分钟前' },
    { sku: 'P10090-02', name: '羊绒混纺针织开衫 燕麦 / M', wh: '杭州主仓', avail: 48, lock: 9, transit: 30, safety: 80, status: '预警', time: '25 分钟前' },
    { sku: 'P10091-01', name: '家用香薰蜡烛礼盒 3 支装', wh: '广州仓', avail: 286, lock: 18, transit: 0, safety: 100, status: '正常', time: '1 小时前' },
    { sku: 'P10092-01', name: '防晒冰袖 黑色 / 均码', wh: '义乌仓', avail: 1240, lock: 86, transit: 400, safety: 300, status: '正常', time: '1 小时前' },
    { sku: 'P10093-01', name: '复古机能双肩包 军绿 / 20L', wh: '广州仓', avail: 102, lock: 14, transit: 0, safety: 60, status: '正常', time: '2 小时前' },
    { sku: 'P10095-01', name: '护眼台灯 Pro 白色', wh: '杭州主仓', avail: 76, lock: 4, transit: 0, safety: 40, status: '正常', time: '2 小时前' }
  ];
  indexSearch(INVENTORY, ['sku', 'name', 'wh']);
  INVENTORY.forEach(function (r) { r.id = r.sku + '@' + r.wh; });

  /* ---------- 采购 ---------- */
  var PURCHASES = [
    { id: 'PO20261031016', supplier: '广州箱包制造有限公司', kinds: 3, qty: 600, amount: 39600, status: '待审核', time: '今天 10:20', eta: '预计 11-06' },
    { id: 'PO20261031017', supplier: '杭州美棉纺织', kinds: 5, qty: 1200, amount: 52300, status: '待审核', time: '今天 09:05', eta: '预计 11-08' },
    { id: 'PO20261030015', supplier: '深圳家居用品厂', kinds: 6, qty: 800, amount: 68200, status: '待到货', time: '昨天 17:32', eta: '预计 11-03' },
    { id: 'PO20261030014', supplier: '苏州丝绸工坊', kinds: 4, qty: 320, amount: 42800, status: '待供应商确认', time: '昨天 14:10', eta: '预计 11-04' },
    { id: 'PO20261029013', supplier: '宁波运动科技有限公司', kinds: 2, qty: 900, amount: 126000, status: '部分到货', time: '10-29 16:48', eta: '预计 11-02' },
    { id: 'PO20261028012', supplier: '杭州美棉纺织', kinds: 3, qty: 1500, amount: 86400, status: '已入库', time: '10-28 11:22', eta: '已入库 10-30' },
    { id: 'PO20261026009', supplier: '义乌小商品批发市场', kinds: 8, qty: 2400, amount: 18900, status: '已取消', time: '10-26 15:06', eta: '—' },
    { id: 'PO20261025008', supplier: '宁波运动科技有限公司', kinds: 1, qty: 1000, amount: 96000, status: '已入库', time: '10-25 09:40', eta: '已入库 10-28' }
  ];
  indexSearch(PURCHASES, ['id', 'supplier']);

  /* ---------- 供应商 ---------- */
  var SUPPLIERS = [
    { name: '杭州美棉纺织', code: 'SUP-0012', contact: '沈国栋', phone: '137****2210', cat: '棉纺面料 / 成衣', goods: 46, pay: '月结 30 天', ontime: 98, score: 4.8, status: '合作中' },
    { name: '宁波运动科技有限公司', code: 'SUP-0026', contact: '应雪梅', phone: '138****7702', cat: '运动鞋服', goods: 28, pay: '月结 45 天', ontime: 95, score: 4.6, status: '合作中' },
    { name: '苏州丝绸工坊', code: 'SUP-0038', contact: '濮院生', phone: '139****5518', cat: '真丝 / 羊毛制品', goods: 17, pay: '预付 30%', ontime: 92, score: 4.5, status: '合作中' },
    { name: '深圳家居用品厂', code: 'SUP-0044', contact: '何嘉怡', phone: '136****3309', cat: '家居 / 香氛 / 灯具', goods: 63, pay: '月结 30 天', ontime: 88, score: 4.1, status: '合作中' },
    { name: '广州箱包制造有限公司', code: 'SUP-0051', contact: '梁志勇', phone: '135****8876', cat: '箱包 / 皮具', goods: 22, pay: '月结 30 天', ontime: 96, score: 4.7, status: '合作中' },
    { name: '义乌小商品批发市场', code: 'SUP-0067', contact: '陈美玲', phone: '133****1123', cat: '日用百货', goods: 104, pay: '现结', ontime: 74, score: 3.4, status: '观察中' },
    { name: 'OAKLAB 设计工作室', code: 'SUP-0073', contact: '林亦然', phone: '132****6644', cat: '原创包袋设计', goods: 8, pay: '预付 50%', ontime: 90, score: 4.3, status: '暂停合作' }
  ];
  indexSearch(SUPPLIERS, ['name', 'code', 'contact', 'cat']);

  /* ---------- 物流 ---------- */
  var LOGISTICS = [
    { waybill: 'SF7800137', order: 'SO202610300118', express: '顺丰速运', receiver: '黄一诺', city: '深圳 · 南山区', track: '【深圳南山营业点】快件已签收', status: '已签收', time: '今天 11:26', abnormal: false },
    { waybill: 'ZT4451208', order: 'SO202610300117', express: '中通快递', receiver: '许知野', city: '北京 · 朝阳区', track: '【北京朝阳转运中心】已到达，准备派送', status: '派送中', time: '今天 13:02', abnormal: false },
    { waybill: 'YT9902341', order: 'SO202610300116', express: '圆通速递', receiver: '陆听白', city: '杭州 · 余杭区', track: '【杭州余杭】收件人拒收，快件退回中', status: '异常', time: '今天 12:44', abnormal: true },
    { waybill: 'JD0088221', order: 'SO202610310008', express: '京东物流', receiver: '沈泽川', city: '上海 · 浦东新区', track: '【上海浦东分拣中心】已发出，下一站 张江营业部', status: '运输中', time: '今天 14:10', abnormal: false },
    { waybill: 'SF7800152', order: 'SO202610290045', express: '顺丰速运', receiver: '周予安', city: '广州 · 天河区', track: '【广州天河】快件已签收，签收人：本人', status: '已签收', time: '昨天 18:20', abnormal: false },
    { waybill: 'ZT4451333', order: 'SO202610290046', express: '中通快递', receiver: '温以宁', city: '成都 · 武侯区', track: '【成都武侯】快递员派送中，预计今天送达', status: '派送中', time: '今天 09:36', abnormal: false },
    { waybill: 'YT9902410', order: 'SO202610280033', express: '圆通速递', receiver: '顾星野', city: '武汉 · 洪山区', track: '【武汉转运中心】快件超时未更新，已触发预警', status: '异常', time: '昨天 22:15', abnormal: true },
    { waybill: 'JD0088340', order: 'SO202610280034', express: '京东物流', receiver: '谭清和', city: '西安 · 雁塔区', track: '【西安雁塔】已签收，签收人：门卫代收', status: '已签收', time: '昨天 15:48', abnormal: false },
    { waybill: 'SF7800164', order: 'SO202610270021', express: '顺丰速运', receiver: '叶南乔', city: '南京 · 鼓楼区', track: '【南京鼓楼】快件退回中，原因：地址不详', status: '退回', time: '10-30 11:02', abnormal: true }
  ];
  indexSearch(LOGISTICS, ['waybill', 'order', 'express', 'receiver', 'city', 'track']);
  LOGISTICS.forEach(function (r) { r.id = r.waybill; });

  /* 物流轨迹：每个节点 = 时间 + 状态 + 具体动作 + 发生地 */
  var TRACK_FLOW = {
    '已签收': ['已签收', '派送中', '到达派送点', '运输中', '已揽收'],
    '派送中': ['派送中', '到达派送点', '运输中', '已揽收'],
    '运输中': ['运输中', '已揽收'],
    '异常': ['异常', '运输中', '已揽收'],
    '退回': ['退回中', '异常', '运输中', '已揽收']
  };

  function trackEvents(row) {
    var flow = TRACK_FLOW[row.status] || ['已揽收'];
    var city = String(row.city).split(' · ')[0];
    var district = String(row.city).split(' · ')[1] || '';
    var base = new Date('2026-10-31T14:00:00+08:00').getTime();
    var texts = {
      '已揽收': row.express + ' 已揽收，揽收员 王师傅',
      '运输中': '快件已从【' + city + '转运中心】发出，下一站 ' + (district || '目的地') + '营业点',
      '到达派送点': '快件已到达【' + city + (district ? district : '') + '营业点】',
      '派送中': '快递员 李师傅（138****2211）正在派送',
      '已签收': row.track,
      '异常': row.track,
      '退回中': row.track
    };
    return flow.map(function (st, i) {
      var d = new Date(base - i * 7 * 3600 * 1000);
      return {
        status: st,
        text: texts[st] || st,
        at: pad2(d.getMonth() + 1) + '-' + pad2(d.getDate()) + ' ' + pad2(d.getHours()) + ':' + pad2(d.getMinutes()),
        city: city + (district ? ' · ' + district : '')
      };
    });
  }

  function waybillDrawer(id) {
    var r = LOGISTICS.filter(function (x) { return x.waybill === id; })[0];
    if (!r) return;
    var events = trackEvents(r);
    var rows = events.map(function (e, i) {
      var isBad = e.status === '异常' || e.status === '退回中';
      return '<div class="tl-item' + (i === 0 ? ' done' : '') + '">' +
        '<b style="' + (isBad ? 'color:#b42318' : '') + '">' + e.status + '</b>' +
        '<div style="color:var(--text-2);font-size:12.5px;margin-top:2px">' + esc(e.text) + '</div>' +
        '<span>' + e.at + ' · ' + esc(e.city) + '</span></div>';
    }).join('');

    var ord = ORDERS.filter(function (o) { return o.id === r.order; })[0];

    showDrawer('<div class="overlay" data-action="close-drawer"></div>' +
      '<aside class="drawer" role="dialog" aria-modal="true" aria-label="物流轨迹">' +
        '<div class="dw-head"><div><h3><span class="mono" style="font-size:14px">' + r.waybill + '</span>' + tag(r.status, LG_COLOR[r.status]) + '</h3>' +
          '<div class="sub">' + r.express + ' · 关联订单 ' + r.order + '</div></div>' +
          '<button class="icon-btn" data-action="close-drawer" aria-label="关闭">' + icon('close', 18) + '</button></div>' +
        '<div class="dw-body">' +
          '<div class="sec"><div class="sec-t">运单信息</div>' +
            '<dl class="kv">' +
              '<dt>快递公司</dt><dd>' + r.express + '</dd>' +
              '<dt>运单号</dt><dd class="mono">' + r.waybill + '</dd>' +
              '<dt>收件人</dt><dd>' + r.receiver + ' · ' + esc(r.city) + '</dd>' +
              '<dt>关联订单</dt><dd class="mono">' + r.order + '</dd>' +
              '<dt>最近更新</dt><dd>' + r.time + '</dd>' +
            '</dl>' +
          '</div>' +
          '<div class="sec"><div class="sec-t">物流轨迹（' + events.length + ' 个节点）</div>' +
            '<div class="timeline">' + rows + '</div>' +
            '<div class="hint" style="margin-top:10px;font-size:11.5px;color:var(--muted)">轨迹由快递公司接口回传，异常件会自动进入预警列表</div>' +
          '</div>' +
        '</div>' +
        '<div class="dw-foot">' +
          '<button class="btn btn-ghost" data-action="copy-waybill" data-no="' + r.waybill + '">复制运单号</button>' +
          (ord ? '<button class="btn btn-primary" data-action="waybill-order" data-id="' + r.order + '">查看订单</button>'
               : '<button class="btn btn-ghost" data-action="close-drawer">关闭</button>') +
        '</div>' +
      '</aside>');
  }

  /* ---------- 店铺 ---------- */
  var SHOPS = [
    { plat: '淘宝天猫', name: '鲸云旗舰店', sid: 'tb_88231001', auth: '已授权', sync: '2 分钟前', today: 486, goods: 386, expire: '2027-03-12' },
    { plat: '京东', name: '京东自营店', sid: 'jd_55120933', auth: '已授权', sync: '3 分钟前', today: 312, goods: 254, expire: '2027-01-08' },
    { plat: '抖音小店', name: '抖音旗舰店', sid: 'dy_77810244', auth: '已授权', sync: '1 分钟前', today: 268, goods: 312, expire: '2026-12-20' },
    { plat: '拼多多', name: '拼多多店', sid: 'pdd_33900122', auth: '即将到期', sync: '5 分钟前', today: 154, goods: 198, expire: '2026-11-15' },
    { plat: '快手小店', name: '快手店', sid: 'ks_11208843', auth: '已授权', sync: '8 分钟前', today: 42, goods: 96, expire: '2027-02-02' },
    { plat: '有赞', name: '小程序商城', sid: 'yz_66021178', auth: '已授权', sync: '12 分钟前', today: 24, goods: 120, expire: '2027-05-19' }
  ];
  indexSearch(SHOPS, ['plat', 'name', 'sid']);

  /* ---------- 分销 ---------- */
  var DISTRIBUTORS = [
    { name: '杭州云仓商贸', code: 'DB-0031', level: '钻石', goods: 128, orders: 86, gmv: 42860, pending: 8200, status: '合作中' },
    { name: '广州星链供应链', code: 'DB-0044', level: '金牌', goods: 96, orders: 64, gmv: 31920, pending: 6400, status: '合作中' },
    { name: '成都西岭优选', code: 'DB-0058', level: '金牌', goods: 72, orders: 48, gmv: 22640, pending: 4200, status: '合作中' },
    { name: '南京拾光百货', code: 'DB-0062', level: '银牌', goods: 54, orders: 32, gmv: 15880, pending: 2600, status: '合作中' },
    { name: '武汉江畔生活', code: 'DB-0071', level: '银牌', goods: 40, orders: 24, gmv: 11420, pending: 1800, status: '合作中' },
    { name: '西安长安集市', code: 'DB-0086', level: '普通', goods: 26, orders: 12, gmv: 5680, pending: 960, status: '合作中' },
    { name: '厦门海隅贸易', code: 'DB-0092', level: '普通', goods: 18, orders: 6, gmv: 2380, pending: 420, status: '待激活' },
    { name: '青岛屿见优选', code: 'DB-0104', level: '普通', goods: 12, orders: 0, gmv: 0, pending: 0, status: '已暂停' }
  ];
  indexSearch(DISTRIBUTORS, ['name', 'code', 'level']);

  /* ---------- 财务对账 ---------- */
  var FINANCE = [
    { plat: '淘宝天猫', shop: '鲸云旗舰店', period: '2026-10 上半月', platform: 186420.5, system: 186420.5, diff: 0, status: '已对平' },
    { plat: '京东', shop: '京东自营店', period: '2026-10 上半月', platform: 142860, system: 141973.4, diff: 886.6, status: '有差异' },
    { plat: '抖音小店', shop: '抖音旗舰店', period: '2026-10 上半月', platform: 98420, system: 98420, diff: 0, status: '已对平' },
    { plat: '拼多多', shop: '拼多多店', period: '2026-10 上半月', platform: 54280, system: 53810.2, diff: 469.8, status: '有差异' },
    { plat: '快手小店', shop: '快手店', period: '2026-10 上半月', platform: 16240, system: 16240, diff: 0, status: '已对平' },
    { plat: '有赞', shop: '小程序商城', period: '2026-10 上半月', platform: 8900, system: 8900, diff: 0, status: '待对账' }
  ];
  indexSearch(FINANCE, ['plat', 'shop', 'period']);

  /* ============================================================
     数据层：库存台账 + 订单状态机（assets/store.js）
     ============================================================ */
  var STATE_KEY = 'jy_erp_state_v1';
  var SEED_AT = '2026-10-01T00:00:00.000Z';
  var store = null;
  var storeLoaded = false;
  var synthSeq = 0;
  var SEED_SNAPSHOT = null;

  var MOVE_LABEL = {
    OPEN: '期初建账',
    SALE_OUT: '销售出库',
    TRANSFER_OUT: '调拨出库',
    TRANSFER_IN: '调拨入库',
    ADJ: '盘盈亏调整',
    RETURN_IN: '售后退回入库'
  };

  function saveStore() {
    if (!store) return;
    try { localStorage.setItem(STATE_KEY, store.dump()); } catch (e) { /* ignore */ }
  }

  function resolveSkuFor(item) {
    if (item.sku) return item.sku;
    var p = null, i, j;
    for (i = 0; i < PRODUCTS.length; i++) if (PRODUCTS[i].name === item.name) { p = PRODUCTS[i]; break; }
    var row = null;
    if (p) {
      for (j = 0; j < INVENTORY.length; j++) {
        if (INVENTORY[j].sku.indexOf(p.code) === 0) { row = INVENTORY[j]; break; }
      }
    }
    if (!row) {
      var code = 'X' + pad2(++synthSeq);
      row = {
        sku: code, name: item.name + ' ' + item.spec, wh: '杭州主仓',
        avail: 200, lock: 0, transit: 0, safety: 60, status: '正常', time: '期初'
      };
      row.id = row.sku + '@' + row.wh;
      INVENTORY.push(row);
    }
    item.sku = row.sku;
    return row.sku;
  }

  function ensureStock(sku, wh, name) {
    if (!store || store.stockRow(sku, wh)) return;
    store.openStock(sku, wh, 200, { at: SEED_AT, ref: '期初建账', name: name });
    var exists = false;
    for (var i = 0; i < INVENTORY.length; i++) {
      if (INVENTORY[i].sku === sku && INVENTORY[i].wh === wh) { exists = true; break; }
    }
    if (!exists) {
      var known = null;
      for (var j = 0; j < INVENTORY.length; j++) if (INVENTORY[j].sku === sku) { known = INVENTORY[j]; break; }
      var row = {
        sku: sku, name: name || (known ? known.name : sku), wh: wh,
        avail: 200, lock: 0, transit: 0, safety: known ? known.safety : 60, status: '正常', time: '期初'
      };
      row.id = sku + '@' + wh;
      INVENTORY.push(row);
    }
  }

  function seedStore() {
    store = new ERPStore();
    INVENTORY.forEach(function (r) {
      store.openStock(r.sku, r.wh, r.avail, { locked: r.lock, at: SEED_AT, ref: '期初建账', name: r.name });
    });
    ORDERS.forEach(function (o) {
      o.wh = o.wh || '杭州主仓';
      o.items.forEach(function (it) {
        resolveSkuFor(it);
        ensureStock(it.sku, o.wh, it.name);
      });
      store.addOrder({
        id: o.id, wh: o.wh, status: o.status, qty: o.qty, amount: o.amount,
        buyer: o.buyer, plat: o.plat, shop: o.shop, time: o.time,
        express: o.express,
        items: o.items.map(function (it) {
          return { sku: it.sku, qty: it.qty, price: it.price, name: it.name, spec: it.spec };
        })
      });
    });
  }

  function initStore() {
    if (!SEED_SNAPSHOT) {
      try {
        SEED_SNAPSHOT = JSON.stringify({
          orders: ORDERS,
          inv: INVENTORY,
          kpi: KPI.map(function (k) { return k.value; })
        });
      } catch (e) { SEED_SNAPSHOT = null; }
    }
    try {
      store = new ERPStore();
      var saved = null;
      try { saved = localStorage.getItem(STATE_KEY); } catch (e) { saved = null; }
      if (saved && store.load(saved)) {
        storeLoaded = true;
        // 恢复上次会话里新增的订单与库存行
        store.state.orders.forEach(function (so) {
          var hit = false;
          for (var i = 0; i < ORDERS.length; i++) if (ORDERS[i].id === so.id) { hit = true; break; }
          if (!hit) {
            ORDERS.push({
              id: so.id, plat: so.plat, shop: so.shop, buyer: so.buyer, status: so.status,
              time: so.time, wh: so.wh, express: so.express, qty: so.qty, amount: so.amount,
              items: (so.items || []).map(function (it) {
                return { name: it.name, spec: it.spec, qty: it.qty, price: it.price, sku: it.sku };
              }),
              remark: '', addr: '—', phone: '—'
            });
          }
        });
      } else {
        seedStore();
        saveStore();
      }
      syncFromStore();
    } catch (e) {
      store = null;
      try { console.error('[store] init failed', e); } catch (e2) { /* ignore */ }
    }
  }

  function syncFromStore() {
    if (!store) return;
    store.state.orders.forEach(function (so) {
      for (var i = 0; i < ORDERS.length; i++) {
        if (ORDERS[i].id === so.id) {
          var o = ORDERS[i];
          var prev = o.status;
          o.status = so.status;
          o.express = so.express;
          o.wh = so.wh;
          if (prev !== so.status) o.time = o.time;
          if (so.items) {
            for (var k = 0; k < so.items.length && k < o.items.length; k++) o.items[k].sku = so.items[k].sku;
          }
          break;
        }
      }
    });

    store.state.stock.forEach(function (sr) {
      var found = null;
      for (var j = 0; j < INVENTORY.length; j++) {
        if (INVENTORY[j].sku === sr.sku && INVENTORY[j].wh === sr.wh) { found = INVENTORY[j]; break; }
      }
      if (!found) {
        var row = {
          sku: sr.sku, name: sr.name || sr.sku, wh: sr.wh,
          avail: sr.qty, lock: sr.locked, transit: 0, safety: 60, status: '正常', time: '刚刚'
        };
        row.id = sr.sku + '@' + sr.wh;
        INVENTORY.push(row);
      } else {
        found.avail = sr.qty;
        found.lock = sr.locked;
        found.status = invStatus(found);
      }
    });
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
      { label: '在售商品', value: '1,286', unit: '个', ico: 'box', color: '#3568f0' },
      { label: '待上架', value: '12', unit: '个', ico: 'clock', color: '#f79009' },
      { label: '库存预警', value: '46', unit: '个', ico: 'alert', color: '#f04438' },
      { label: '平台映射异常', value: '3', unit: '个', ico: 'refresh', color: '#7a5af8' }
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
      { title: '规格', cell: function (r) { return '<span class="num">' + r.specs.length + '</span> 个 SKU'; } },
      { title: '价格区间', cls: 't-right', cell: function (r) { return r.priceMin === r.priceMax ? money(r.priceMin) : money(r.priceMin) + ' ~ ' + money(r.priceMax); } },
      { title: '总库存', cls: 't-right', cell: function (r) {
        return '<span class="num" style="font-weight:600;color:' + (r.stock === 0 ? '#d92d20' : 'inherit') + '">' + num(r.stock) + '</span>';
      } },
      { title: '30 天销量', cls: 't-right', cell: function (r) { return '<span class="num">' + num(r.sales) + '</span>'; } },
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
      { label: '盘点', ico: 'check', act: 'inv-check' },
      { label: '新建调拨', ico: 'truck', act: 'inv-transfer', primary: true }
    ],
    stats: [
      { label: '库存总量', value: function () { return num(INVENTORY.reduce(function (s, r) { return s + r.avail; }, 0)); }, unit: '件', ico: 'layers', color: '#3568f0' },
      { label: '锁定库存', value: function () { return num(INVENTORY.reduce(function (s, r) { return s + r.lock; }, 0)); }, unit: '件', ico: 'lock', color: '#7a5af8' },
      { label: '在途库存', value: function () { return num(INVENTORY.reduce(function (s, r) { return s + r.transit; }, 0)); }, unit: '件', ico: 'truck', color: '#f79009' },
      { label: '预警 / 断货 SKU', value: function () { return String(INVENTORY.filter(function (r) { return r.status !== '正常'; }).length); }, unit: '个', ico: 'alert', color: '#f04438' }
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
      { title: '在途', cls: 't-right', cell: function (r) { return '<span class="num" style="color:var(--muted)">' + num(r.transit) + '</span>'; } },
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
        return r.status === '待审核'
          ? '<button class="link" style="font-size:12.5px" data-action="po-audit" data-id="' + r.id + '">审核</button>'
          : '<button class="link" style="font-size:12.5px" data-action="po-view" data-id="' + r.id + '">查看</button>';
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
      { label: '今日抓单', value: '1,286', unit: '单', ico: 'doc', color: '#12b76a' },
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
      { title: '今日订单', cls: 't-right', cell: function (r) { return '<b class="num">' + num(r.today) + '</b>'; } },
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
      { label: '录入账单', ico: 'download', act: 'fin-import' },
      { label: '利润报表', ico: 'chart', act: 'fin-report' },
      { label: '开始对账', ico: 'refresh', act: 'fin-reconcile', primary: true }
    ],
    stats: [
      { label: '平台应结', value: '50.7', unit: '万', ico: 'wallet', color: '#3568f0' },
      { label: '已结算', value: '21.5', unit: '万', ico: 'check', color: '#12b76a' },
      { label: '待结算', value: '17.2', unit: '万', ico: 'clock', color: '#f79009' },
      { label: '差异单', value: '2', unit: '笔', ico: 'alert', color: '#f04438' }
    ],
    filters: [
      { key: 'kw', type: 'search', ph: '店铺 / 账期' },
      { key: 'status', label: '对账状态', options: ['全部', '已对平', '有差异', '待对账'] }
    ],
    columns: [
      { title: '店铺', cell: function (r) { return platDot(r.plat) + '<div class="cell-sub">' + r.shop + '</div>'; } },
      { title: '账期', cell: function (r) { return '<span style="color:var(--text-2)">' + r.period + '</span>'; } },
      { title: '平台结算额', cls: 't-right', cell: function (r) { return '<span class="num">' + money(r.platform) + '</span>'; } },
      { title: '系统订单额', cls: 't-right', cell: function (r) { return '<span class="num">' + money(r.system) + '</span>'; } },
      { title: '差异', cls: 't-right', cell: function (r) {
        return r.diff === 0
          ? '<span style="color:var(--muted)">—</span>'
          : '<b class="num" style="color:' + (r.diff > 0 ? '#06894e' : '#d92d20') + '">' + (r.diff > 0 ? '+' : '') + money(r.diff) + '</b>';
      } },
      { title: '状态', cell: function (r) { return tag(r.status, FIN_COLOR[r.status] || 'gray'); } },
      { title: '操作', cls: 't-right', cell: function (r) { return '<button class="link" style="font-size:12.5px" data-action="fin-detail" data-id="' + esc(r.shop) + '">明细</button>'; } }
    ],
    rows: FINANCE
  };

  /* ---------- 通用列表引擎 ---------- */
  var FILTERS = {};

  function fstate(key, filters) {
    if (!FILTERS[key]) {
      var st = { kw: '', page: 1, sel: {} };
      filters.forEach(function (f) { if (f.key !== 'kw') st[f.key] = f.options[0]; });
      FILTERS[key] = st;
    }
    return FILTERS[key];
  }

  function filterRows(rows, st, filters) {
    var kw = (st.kw || '').trim().toLowerCase();
    return rows.filter(function (r) {
      for (var i = 0; i < filters.length; i++) {
        var f = filters[i];
        if (f.key === 'kw') continue;
        if (st[f.key] && st[f.key] !== '全部' && r[f.key] !== st[f.key]) return false;
      }
      if (kw && (r.search || '').toLowerCase().indexOf(kw) === -1) return false;
      return true;
    });
  }

  function modPageHTML(cfg) {
    var st = fstate(cfg.key, cfg.filters);
    var statsHTML = (cfg.stats || []).map(function (s) {
      var val = typeof s.value === 'function' ? s.value() : s.value;
      return '<div class="stat"><span class="stat-ico" style="background:' + s.color + '16;color:' + s.color + '">' + icon(s.ico, 17) + '</span>' +
        '<div class="stat-txt"><span>' + s.label + '</span><b>' + val + (s.unit ? '<small>' + s.unit + '</small>' : '') + '</b></div></div>';
    }).join('');

    var actionsHTML = (cfg.actions || []).map(function (a) {
      return '<button class="btn ' + (a.primary ? 'btn-primary' : 'btn-ghost') + '" data-action="' + a.act + '"' +
        (a.msg ? ' data-msg="' + esc(a.msg) + '"' : '') + '>' + icon(a.ico, 15) + a.label + '</button>';
    }).join('');

    var filtersHTML = cfg.filters.map(function (f) {
      if (f.type === 'search') {
        return '<div class="fld"><label>' + (f.label || '关键词') + '</label>' +
          '<input class="inp search" data-f="kw" data-m="' + cfg.key + '" placeholder="' + f.ph + '" value="' + esc(st.kw) + '"></div>';
      }
      return '<div class="fld"><label>' + f.label + '</label><select class="sel" data-f="' + f.key + '" data-m="' + cfg.key + '">' +
        f.options.map(function (o) { return '<option' + (st[f.key] === o ? ' selected' : '') + '>' + o + '</option>'; }).join('') +
        '</select></div>';
    }).join('');

    return '<div class="page-head">' +
        '<div><h1>' + cfg.title + '</h1><p class="desc">' + cfg.desc + '</p></div>' +
        '<div class="head-actions">' + actionsHTML + '</div>' +
      '</div>' +
      '<div class="stat-strip">' + statsHTML + '</div>' +
      '<section class="card">' +
        '<div class="filters">' + filtersHTML + '<div class="spacer"></div>' +
          '<button class="btn btn-ghost" style="height:34px" data-action="mreset" data-m="' + cfg.key + '">' + icon('filter', 14) + '重置</button>' +
        '</div>' +
        '<div id="list-' + cfg.key + '">' + modListHTML(cfg) + '</div>' +
      '</section>';
  }

  function modListHTML(cfg) {
    var st = fstate(cfg.key, cfg.filters);
    var rows = filterRows(cfg.rows, st, cfg.filters);
    var size = cfg.pageSize || 8;
    var pages = Math.max(1, Math.ceil(rows.length / size));
    if (st.page > pages) st.page = pages;
    var start = (st.page - 1) * size;
    var slice = rows.slice(start, start + size);
    var hasSel = !!cfg.select;
    var cols = cfg.columns.length + (hasSel ? 1 : 0);
    var picked = hasSel ? pickedKeys(st) : [];
    var allChecked = hasSel && slice.length > 0 && slice.every(function (r) { return st.sel[rowKey(r)]; });

    var body = slice.length ? slice.map(function (r) {
      var cells = cfg.columns.map(function (c) {
        return '<td class="' + (c.cls || '') + '">' + c.cell(r) + '</td>';
      }).join('');
      var key = rowKey(r);
      var cbCell = hasSel
        ? '<td class="cb-col"><input type="checkbox" class="cb" data-cb="' + esc(key) + '" data-m="' + cfg.key + '"' +
          (st.sel[key] ? ' checked' : '') + ' aria-label="选择"></td>'
        : '';
      return cfg.drawer
        ? '<tr data-action="mrow" data-m="' + cfg.key + '" data-id="' + esc(key) + '" style="cursor:pointer">' + cbCell + cells + '</tr>'
        : '<tr>' + cbCell + cells + '</tr>';
    }).join('') : '<tr><td colspan="' + cols + '"><div class="empty" style="padding:36px">' +
        '<div class="empty-ico">' + icon('search', 24) + '</div><h3>没有匹配的记录</h3>' +
        '<p>调整筛选条件后再试，或清空关键词重新搜索。</p></div></td></tr>';

    var pageBtns = '';
    for (var p = 1; p <= pages; p++) {
      pageBtns += '<button class="pbtn' + (p === st.page ? ' on' : '') + '" data-action="mpage" data-m="' + cfg.key + '" data-page="' + p + '">' + p + '</button>';
    }

    var selBar = '';
    if (hasSel && picked.length) {
      selBar = '<div class="sel-bar"><span>已选 <b>' + picked.length + '</b> 项</span>' +
        '<button class="btn btn-ghost xs" data-action="msel-clear" data-m="' + cfg.key + '">取消选择</button>' +
        '<div class="spacer"></div>' +
        '<button class="btn btn-primary xs" data-action="' + cfg.select.action + '" data-m="' + cfg.key + '">' +
        icon(cfg.select.icon || 'check', 14) + cfg.select.label + '</button></div>';
    }

    var headBox = hasSel
      ? '<th class="cb-col"><input type="checkbox" class="cb" data-cb-all="1" data-m="' + cfg.key + '"' +
        (allChecked ? ' checked' : '') + ' aria-label="全选本页"></th>'
      : '';

    return selBar + '<div class="tb-wrap"><table class="tb"><thead><tr>' + headBox +
        cfg.columns.map(function (c) { return '<th class="' + (c.cls || '') + '">' + c.title + '</th>'; }).join('') +
      '</tr></thead><tbody>' + body + '</tbody></table></div>' +
      '<div class="pager"><span>共 <b style="color:var(--text-2)">' + rows.length + '</b> 条记录 · 每页 ' + size + ' 条</span>' +
      '<div class="pager-btns">' +
        '<button class="pbtn" data-action="mpage" data-m="' + cfg.key + '" data-page="' + (st.page - 1) + '"' + (st.page === 1 ? ' disabled' : '') + '>上一页</button>' +
        pageBtns +
        '<button class="pbtn" data-action="mpage" data-m="' + cfg.key + '" data-page="' + (st.page + 1) + '"' + (st.page === pages ? ' disabled' : '') + '>下一页</button>' +
      '</div></div>';
  }

  function refreshList(key) {
    var box = document.getElementById('list-' + key);
    if (box && MODULES[key]) box.innerHTML = modListHTML(MODULES[key]);
  }

  /* ============================================================
     弹窗 / 导出 / 批量选择
     ============================================================ */
  var modalState = null;

  function modalRoot() { return document.getElementById('modal-root'); }

  function openModal(cfg) {
    var root = modalRoot();
    if (!root) return;
    var body = typeof cfg.body === 'function' ? cfg.body() : (cfg.body || '');
    var foot = cfg.foot || '';
    root.innerHTML =
      '<div class="modal-mask">' +
        '<div class="modal' + (cfg.wide ? ' wide' : '') + '" role="dialog" aria-modal="true">' +
          '<div class="modal-head"><div><h3>' + cfg.title + '</h3>' +
            (cfg.desc ? '<p>' + cfg.desc + '</p>' : '') + '</div>' +
            '<button class="icon-btn" data-action="close-modal" aria-label="关闭">' + icon('close', 18) + '</button>' +
          '</div>' +
          '<div class="modal-body">' + body + '</div>' +
          '<div class="modal-foot">' + foot + '</div>' +
        '</div>' +
      '</div>';
    var mask = root.firstChild;
    void mask.offsetWidth;
    mask.classList.add('on');
    modalState = cfg;
    if (cfg.onMount) cfg.onMount(root);
  }

  function closeModal() {
    var root = modalRoot();
    if (!root) return;
    var mask = root.querySelector('.modal-mask');
    if (mask) mask.classList.remove('on');
    modalState = null;
    setTimeout(function () {
      if (root && !root.querySelector('.modal-mask.on')) root.innerHTML = '';
    }, 220);
  }

  function modalValues() {
    var root = modalRoot();
    var out = {};
    if (!root) return out;
    var els = root.querySelectorAll('[data-mf]');
    for (var i = 0; i < els.length; i++) {
      var el = els[i];
      out[el.getAttribute('data-mf')] = el.type === 'checkbox' ? el.checked : el.value;
    }
    return out;
  }

  function openFormModal(cfg) {
    var grid = cfg.fields.map(function (f) {
      var full = f.span === 2 || f.type === 'textarea';
      var val = f.value == null ? '' : f.value;
      var ctrl;
      if (f.type === 'select') {
        ctrl = '<select data-mf="' + f.key + '">' + f.options.map(function (o) {
          var v = typeof o === 'string' ? o : o.v;
          var t = typeof o === 'string' ? o : o.t;
          return '<option value="' + esc(v) + '"' + (String(v) === String(val) ? ' selected' : '') + '>' + esc(t) + '</option>';
        }).join('') + '</select>';
      } else if (f.type === 'textarea') {
        ctrl = '<textarea data-mf="' + f.key + '" placeholder="' + esc(f.ph || '') + '">' + esc(val) + '</textarea>';
      } else {
        ctrl = '<input data-mf="' + f.key + '" type="' + (f.type || 'text') + '" value="' + esc(val) +
          '" placeholder="' + esc(f.ph || '') + '">';
      }
      return '<div class="mfield' + (full ? ' full' : '') + '"><label>' + f.label + (f.required ? '<em>*</em>' : '') +
        '</label>' + ctrl + (f.hint ? '<div class="hint">' + f.hint + '</div>' : '') + '</div>';
    }).join('');

    openModal({
      title: cfg.title,
      desc: cfg.desc,
      wide: cfg.wide,
      body: '<div class="form-grid">' + grid + '</div>',
      foot: '<button class="btn btn-ghost" data-action="close-modal">取消</button>' +
        '<button class="btn btn-primary" data-action="modal-submit">' + (cfg.submitText || '确定') + '</button>'
    });
    modalState.onSubmit = cfg.onSubmit;
    modalState.fields = cfg.fields;
  }

  function openConfirmModal(cfg) {
    var listHTML = '';
    if (cfg.list && cfg.list.length) {
      listHTML = '<div class="confirm-list">' + cfg.list.map(function (t) {
        return '<div class="confirm-row">' + t + '</div>';
      }).join('') + '</div>';
    }
    openModal({
      title: cfg.title,
      desc: cfg.desc,
      wide: cfg.wide,
      body: (cfg.body || '') + listHTML + (cfg.sum || ''),
      foot: '<button class="btn btn-ghost" data-action="close-modal">取消</button>' +
        '<button class="btn ' + (cfg.danger ? 'btn-danger-ghost' : 'btn-primary') + '" data-action="modal-submit">' +
        (cfg.submitText || '确认') + '</button>'
    });
    modalState.onSubmit = cfg.onConfirm;
  }

  function exportCSV(name, rows, cols) {
    if (!rows.length) { toast('当前筛选结果为空，没有可导出的数据', 'err'); return; }
    var head = cols.map(function (c) { return '"' + c.t + '"'; }).join(',');
    var body = rows.map(function (r) {
      return cols.map(function (c) {
        var v = c.get(r);
        return '"' + String(v == null ? '' : v).replace(/"/g, '""') + '"';
      }).join(',');
    }).join('\r\n');
    var blob = new Blob(['\ufeff' + head + '\r\n' + body], { type: 'text/csv;charset=utf-8;' });
    var a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = name;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(function () { URL.revokeObjectURL(a.href); }, 1500);
    toast('已导出 ' + rows.length + ' 条记录：' + name);
  }

  function rowKey(r) { return r.id || r.code || r.sku || ''; }
  function pickedKeys(st) {
    return Object.keys(st.sel).filter(function (k) { return st.sel[k]; });
  }
  function money0(n) { return Number(n).toLocaleString('zh-CN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }); }

  /* ---------- 抽屉 ---------- */
  function drawerHTML(o) {
    var rows = o.items.map(function (it) {
      return '<tr><td><div class="cell-main" style="font-weight:500">' + esc(it.name) + '</div>' +
        '<div class="cell-sub">' + esc(it.spec) + '</div></td>' +
        '<td class="t-right num">×' + it.qty + '</td>' +
        '<td class="t-right num">' + money(it.price) + '</td>' +
        '<td class="t-right num" style="font-weight:600">' + money(it.price * it.qty) + '</td></tr>';
    }).join('');

    var ship = o.amount >= 99 ? '免运费' : money(8);
    var steps = [
      { t: '买家下单', s: o.time, done: true },
      { t: '平台支付成功', s: o.time, done: o.status !== '待审核' && o.status !== '已取消' },
      { t: '仓库拣货', s: o.status === '待发货' ? '待处理' : o.time, done: o.status === '已发货' || o.status === '已完成' },
      { t: '已发货', s: o.express !== '—' ? o.express : '待发货', done: o.status === '已发货' || o.status === '已完成' }
    ];

    return '<div class="overlay" data-action="close-drawer"></div>' +
      '<aside class="drawer" role="dialog" aria-modal="true" aria-label="订单详情">' +
        '<div class="dw-head">' +
          '<div><h3><span class="mono" style="font-size:14px">' + esc(o.id) + '</span>' + statusTag(o.status) + '</h3>' +
            '<div class="sub">' + o.plat + ' · ' + o.shop + ' · ' + o.time + '</div></div>' +
          '<button class="icon-btn" data-action="close-drawer" aria-label="关闭">' + icon('close', 18) + '</button>' +
        '</div>' +
        '<div class="dw-body">' +
          '<div class="sec"><div class="sec-t">订单信息</div>' +
            '<dl class="kv">' +
              '<dt>买家</dt><dd>' + esc(o.buyer) + ' · ' + o.phone + '</dd>' +
              '<dt>收货地址</dt><dd>' + esc(o.addr) + '</dd>' +
              '<dt>物流单号</dt><dd>' + esc(o.express) + '</dd>' +
              '<dt>买家备注</dt><dd>' + (o.remark ? esc(o.remark) : '<span style="color:#a3aec0">无</span>') + '</dd>' +
            '</dl>' +
          '</div>' +
          '<div class="sec"><div class="sec-t">商品明细</div>' +
            '<table class="tb" style="border:1px solid var(--line);border-radius:9px;overflow:hidden">' +
              '<thead><tr><th>商品</th><th class="t-right">数量</th><th class="t-right">单价</th><th class="t-right">小计</th></tr></thead>' +
              '<tbody>' + rows + '</tbody></table>' +
          '</div>' +
          '<div class="sec"><div class="sec-t">金额</div>' +
            '<div class="sum">' +
              '<div class="sum-row"><span>商品金额</span><span>' + money(o.amount) + '</span></div>' +
              '<div class="sum-row"><span>运费</span><span>' + ship + '</span></div>' +
              '<div class="sum-row"><span>优惠</span><span style="color:#06894e">¥0.00</span></div>' +
              '<div class="sum-row total"><span>实付金额</span><b>' + money(o.amount + (ship === '免运费' ? 0 : 8)) + '</b></div>' +
            '</div>' +
          '</div>' +
          '<div class="sec"><div class="sec-t">订单进度</div>' +
            '<div class="timeline">' + steps.map(function (s) {
              return '<div class="tl-item' + (s.done ? ' done' : '') + '"><b>' + s.t + '</b><span>' + s.s + '</span></div>';
            }).join('') + '</div>' +
          '</div>' +
        '</div>' +
        '<div class="dw-foot">' +
          '<button class="btn btn-ghost" data-action="waybill-print">' + icon('print', 15) + '打印面单</button>' +
          '<button class="btn btn-ghost" data-action="order-audit" data-id="' + o.id + '">审核</button>' +
          '<button class="btn btn-primary" data-action="order-ship" data-id="' + o.id + '">发货</button>' +
        '</div>' +
      '</aside>';
  }

  function showDrawer(html) {
    var root = $('#drawer-root');
    root.innerHTML = html;
    var dw = $('.drawer', root), ov = $('.overlay', root);
    void root.offsetWidth; /* 强制重排，确保过渡从关闭态开始 */
    if (ov) ov.classList.add('on');
    if (dw) dw.classList.add('on');
  }

  function openDrawer(id) {
    var o = ORDERS.filter(function (x) { return x.id === id; })[0];
    if (!o) return;
    showDrawer(drawerHTML(o));
  }

  /* ---------- 售后详情 ---------- */
  var AS_STEPS = ['买家提交申请', '商家审核', '买家寄回商品', '仓库收货质检', '退款完成'];
  var AS_DONE = { '待审核': 1, '待买家退货': 2, '待收货': 3, '退款中': 4, '已完成': 5, '已关闭': 1 };

  function aftersaleDrawerHTML(r) {
    var ord = ORDERS.filter(function (o) { return o.id === r.order; })[0];
    var items = ord ? ord.items : [{ name: '相关商品（原订单已归档）', spec: '—', qty: 1, price: r.amount }];
    var done = AS_DONE[r.status] || 1;

    var itemRows = items.map(function (it) {
      return '<tr><td><div class="cell-main" style="font-weight:500">' + esc(it.name) + '</div>' +
        '<div class="cell-sub">' + esc(it.spec) + '</div></td>' +
        '<td class="t-right num">×' + it.qty + '</td>' +
        '<td class="t-right num">' + money(it.price) + '</td></tr>';
    }).join('');

    var steps = AS_STEPS.map(function (t, i) {
      var isDone = i < done;
      var sub = isDone ? (i === 0 ? r.time : '已处理') : (i === done ? '待处理' : '—');
      if (r.status === '已关闭' && i > 0) sub = '售后已关闭';
      return '<div class="tl-item' + (isDone ? ' done' : '') + '"><b>' + t + '</b><span>' + sub + '</span></div>';
    }).join('');

    var chat = [
      { who: r.buyer, me: false, txt: r.reason + '，希望尽快处理，谢谢。', time: r.time },
      { who: '客服 · 小鲸', me: true, txt: '您好，已收到您的申请。请保持商品吊牌完整，我们会尽快为您处理。', time: r.time },
      { who: r.buyer, me: false, txt: '好的，已经把商品打包好了，今天寄回。', time: '今天 13:05' }
    ].map(function (m) {
      return '<div class="chat-item"><span class="chat-av" style="' + (m.me ? 'background:#eef3ff;color:#3568f0' : 'background:#f2f4f7;color:#5d6b82') + '">' +
        (m.me ? '鲸' : m.who.slice(0, 1)) + '</span>' +
        '<div class="chat-bubble"><b>' + m.who + '</b>' + m.txt + '<span>' + m.time + '</span></div></div>';
    }).join('');

    return '<div class="overlay" data-action="close-drawer"></div>' +
      '<aside class="drawer" role="dialog" aria-modal="true" aria-label="售后详情">' +
        '<div class="dw-head">' +
          '<div><h3><span class="mono" style="font-size:14px">' + r.id + '</span>' + tag(r.status, AS_COLOR[r.status] || 'gray') + '</h3>' +
            '<div class="sub">' + r.plat + ' · ' + r.shop + ' · ' + r.time + '</div></div>' +
          '<button class="icon-btn" data-action="close-drawer" aria-label="关闭">' + icon('close', 18) + '</button>' +
        '</div>' +
        '<div class="dw-body">' +
          '<div class="sec"><div class="sec-t">售后信息</div>' +
            '<dl class="kv">' +
              '<dt>售后类型</dt><dd>' + r.type + '</dd>' +
              '<dt>关联订单</dt><dd><span class="mono">' + r.order + '</span></dd>' +
              '<dt>买家</dt><dd>' + esc(r.buyer) + ' · ' + (ord ? ord.phone : '—') + '</dd>' +
              '<dt>售后原因</dt><dd>' + r.reason + '</dd>' +
              '<dt>处理时限</dt><dd>' + r.deadline + '</dd>' +
            '</dl>' +
          '</div>' +
          '<div class="sec"><div class="sec-t">涉及商品</div>' +
            '<table class="tb" style="border:1px solid var(--line);border-radius:9px;overflow:hidden">' +
              '<thead><tr><th>商品</th><th class="t-right">数量</th><th class="t-right">单价</th></tr></thead>' +
              '<tbody>' + itemRows + '</tbody></table>' +
          '</div>' +
          '<div class="sec"><div class="sec-t">退款 / 补发金额</div>' +
            '<div class="sum">' +
              '<div class="sum-row"><span>申请金额</span><span>' + money(r.amount) + '</span></div>' +
              '<div class="sum-row"><span>运费承担</span><span>' + (r.type === '仅退款' ? '卖家承担' : '买家承担') + '</span></div>' +
              '<div class="sum-row"><span>平台服务费退回</span><span>' + money(r.amount * 0.006) + '</span></div>' +
              '<div class="sum-row total"><span>' + (r.type === '换货' ? '换货差价' : '应退金额') + '</span><b>' + money(r.amount) + '</b></div>' +
            '</div>' +
          '</div>' +
          '<div class="sec"><div class="sec-t">处理进度</div><div class="timeline">' + steps + '</div></div>' +
          '<div class="sec"><div class="sec-t">协商记录</div><div class="chat">' + chat + '</div></div>' +
        '</div>' +
        '<div class="dw-foot">' +
          '<button class="btn btn-danger-ghost" data-action="as-reject" data-id="' + r.id + '">拒绝申请</button>' +
          '<button class="btn btn-ghost" data-action="info" data-msg="已向买家发送协商消息">联系买家</button>' +
          '<button class="btn btn-primary" data-action="as-agree" data-id="' + r.id + '">' +
            (r.type === '换货' ? '同意换货' : '同意退款') + '</button>' +
        '</div>' +
      '</aside>';
  }

  function openAftersale(id) {
    var r = AFTERSALES.filter(function (x) { return x.id === id; })[0];
    if (!r) return;
    showDrawer(aftersaleDrawerHTML(r));
  }

  /* ---------- 商品详情 ---------- */
  function productDrawerHTML(p) {
    var skus = productSkus(p);
    var skuRows = skus.map(function (s) {
      return '<tr><td><div class="cell-main" style="font-weight:500">' + s.spec + '</div>' +
        '<div class="cell-sub mono">' + s.code + '</div></td>' +
        '<td class="t-right num">' + money(s.price) + '</td>' +
        '<td class="t-right num" style="color:var(--muted)">' + money(s.cost) + '</td>' +
        '<td class="t-right num' + (s.stock === 0 ? '" style="color:#d92d20' : '') + '">' + num(s.stock) + '</td></tr>';
    }).join('');

    var mapped = Number(p.map.split('/')[0]);
    var plats = [
      { name: '淘宝天猫', shop: '鲸云旗舰店', id: 'TB8823' + p.code.slice(1) },
      { name: '京东', shop: '京东自营店', id: 'JD5520' + p.code.slice(1) },
      { name: '抖音小店', shop: '抖音旗舰店', id: 'DY7781' + p.code.slice(1) }
    ];
    var mapRows = plats.map(function (m, i) {
      var on = i < mapped;
      return '<tr><td>' + platDot(m.name) + '</td><td style="color:var(--text-2)">' + m.shop + '</td>' +
        '<td class="mono">' + m.id + '</td>' +
        '<td class="t-right">' + (on ? tag('已映射', 'green') : tag('未映射', 'gray')) + '</td></tr>';
    }).join('');

    return '<div class="overlay" data-action="close-drawer"></div>' +
      '<aside class="drawer" role="dialog" aria-modal="true" aria-label="商品详情">' +
        '<div class="dw-head">' +
          '<div><h3 style="font-size:15px">' + esc(p.name) + tag(p.status, PD_COLOR[p.status] || 'gray') + '</h3>' +
            '<div class="sub">' + p.code + ' · ' + p.cat + '</div></div>' +
          '<button class="icon-btn" data-action="close-drawer" aria-label="关闭">' + icon('close', 18) + '</button>' +
        '</div>' +
        '<div class="dw-body">' +
          '<div class="sec"><div class="sec-t">商品信息</div>' +
            '<dl class="kv">' +
              '<dt>商品编码</dt><dd class="mono">' + p.code + '</dd>' +
              '<dt>类目</dt><dd>' + p.cat + '</dd>' +
              '<dt>品牌</dt><dd>' + p.brand + '</dd>' +
              '<dt>价格区间</dt><dd>' + money(p.priceMin) + ' ~ ' + money(p.priceMax) + '</dd>' +
              '<dt>总库存</dt><dd>' + num(p.stock) + ' 件</dd>' +
              '<dt>30 天销量</dt><dd>' + num(p.sales) + ' 件</dd>' +
            '</dl>' +
          '</div>' +
          '<div class="sec"><div class="sec-t">SKU 明细（' + skus.length + '）</div>' +
            '<table class="tb" style="border:1px solid var(--line);border-radius:9px;overflow:hidden">' +
              '<thead><tr><th>规格 / 编码</th><th class="t-right">售价</th><th class="t-right">成本</th><th class="t-right">库存</th></tr></thead>' +
              '<tbody>' + skuRows + '</tbody></table>' +
          '</div>' +
          '<div class="sec"><div class="sec-t">平台映射（' + p.map + '）</div>' +
            '<table class="tb" style="border:1px solid var(--line);border-radius:9px;overflow:hidden">' +
              '<thead><tr><th>平台</th><th>店铺</th><th>平台商品 ID</th><th class="t-right">状态</th></tr></thead>' +
              '<tbody>' + mapRows + '</tbody></table>' +
          '</div>' +
        '</div>' +
        '<div class="dw-foot">' +
          '<button class="btn btn-ghost" data-action="prod-map" data-code="' + p.code + '">同步平台</button>' +
          '<button class="btn btn-ghost" data-action="prod-off" data-code="' + p.code + '">' +
            (p.status === '下架' ? '重新上架' : '下架') + '</button>' +
          '<button class="btn btn-primary" data-action="prod-edit" data-code="' + p.code + '">编辑商品</button>' +
        '</div>' +
      '</aside>';
  }

  function openProduct(code) {
    var p = PRODUCTS.filter(function (x) { return x.code === code; })[0];
    if (!p) return;
    showDrawer(productDrawerHTML(p));
  }

  function closeDrawer() {
    var root = $('#drawer-root');
    var dw = $('.drawer', root);
    if (!dw) return;
    dw.classList.remove('on');
    var ov = $('.overlay', root);
    if (ov) ov.classList.remove('on');
    setTimeout(function () { root.innerHTML = ''; }, 280);
  }

  /* ============================================================
     业务动作：每个按钮都要真的做事
     ============================================================ */
  var FIELD_LABEL = {
    id: '单号', order: '原订单', plat: '平台', shop: '店铺', buyer: '买家', type: '类型',
    amount: '金额', reason: '原因', status: '状态', time: '时间', deadline: '处理时限',
    code: '编码', name: '名称', cat: '类目', brand: '品牌', stock: '库存', sales: '销量',
    map: '平台映射', sku: 'SKU', wh: '仓库', avail: '可用', lock: '锁定', transit: '在途',
    safety: '安全库存', supplier: '供应商', kinds: '商品数', qty: '数量', eta: '预计到货',
    contact: '联系人', phone: '电话', goods: '合作商品', pay: '结算方式', ontime: '准时率',
    score: '评分', waybill: '运单号', express: '快递公司', receiver: '收件人', city: '城市',
    track: '最新轨迹', sid: '店铺 ID', auth: '授权状态', sync: '最后同步', today: '今日订单',
    expire: '授权到期', period: '账期', level: '等级', orders: '订单数', gmv: '销售额',
    pending: '待结算', platform: '平台结算额', system: '系统订单额', diff: '差异', abnormal: '异常'
  };

  var CATS = ['服饰 / 上装', '服饰 / 针织', '鞋靴 / 运动鞋', '家居 / 水具', '家居 / 香氛',
    '家居 / 灯具', '配饰 / 丝巾', '配饰 / 防晒', '箱包 / 双肩包'];
  var WAREHOUSES = ['杭州主仓', '广州仓', '义乌仓'];

  function stamp() {
    var d = new Date();
    return '' + d.getFullYear() + pad2(d.getMonth() + 1) + pad2(d.getDate());
  }
  function dateStr(d) {
    return d.getFullYear() + '-' + pad2(d.getMonth() + 1) + '-' + pad2(d.getDate());
  }
  function openOrderCount() {
    return ORDERS.filter(function (o) { return o.status === '待发货'; }).length;
  }

  function exportRows(name, rows) {
    var keys = [];
    rows.slice(0, 30).forEach(function (r) {
      Object.keys(r).forEach(function (k) {
        if (k !== 'search' && keys.indexOf(k) === -1) keys.push(k);
      });
    });
    var cols = keys.map(function (k) {
      return {
        t: FIELD_LABEL[k] || k,
        get: function (r) { return Array.isArray(r[k]) || typeof r[k] === 'object' ? '' : r[k]; }
      };
    });
    exportCSV(name, rows, cols);
  }

  function exportCurrent() {
    if (ui.route === 'orders') {
      exportRows('订单列表_' + stamp() + '.csv', filteredOrders());
      return;
    }
    if (ui.route === 'settings') {
      exportCSV('操作日志_' + stamp() + '.csv', LOGS, [
        { t: '时间', get: function (r) { return r.t; } },
        { t: '操作人', get: function (r) { return r.who; } },
        { t: '模块', get: function (r) { return r.mod; } },
        { t: '操作内容', get: function (r) { return r.act; } },
        { t: 'IP', get: function (r) { return r.ip; } }
      ]);
      return;
    }
    var cfg = MODULES[ui.route];
    if (!cfg) { toast('当前页面没有可导出的数据', 'err'); return; }
    var st = fstate(cfg.key, cfg.filters);
    exportRows(cfg.title + '_' + stamp() + '.csv', filterRows(cfg.rows, st, cfg.filters));
  }

  /* ---------- 同步 ---------- */
  var SYNC_BUYERS = ['季临川', '方与之', '余星晚', '赵砚青', '钱照野'];

  function addSyncOrder(i) {
    var p = PRODUCTS[i % PRODUCTS.length];
    var plat = ['淘宝天猫', '京东', '抖音小店'][i % 3];
    var shop = { '淘宝天猫': '旗舰店', '京东': '京东自营店', '抖音小店': '抖音旗舰店' }[plat];
    var seq = ORDERS.length + 1;
    var item = { name: p.name, spec: p.specs[0], qty: 1, price: p.priceMin };
    var order = {
      id: 'SO' + stamp() + (100 + seq),
      plat: plat, shop: shop,
      buyer: SYNC_BUYERS[i % SYNC_BUYERS.length],
      status: '待审核',
      time: '刚刚',
      wh: '杭州主仓',
      items: [item],
      qty: 1,
      amount: p.priceMin,
      remark: '',
      addr: '浙江省杭州市余杭区文一西路 969 号 ' + (3 + i) + ' 幢 1201 室',
      phone: '138****' + (2000 + seq * 3).toString().slice(-4),
      express: '—'
    };
    ORDERS.unshift(order);

    if (store) {
      try {
        resolveSkuFor(item);
        ensureStock(item.sku, order.wh, item.name);
        store.addOrder({
          id: order.id, wh: order.wh, status: order.status, qty: order.qty, amount: order.amount,
          buyer: order.buyer, plat: order.plat, shop: order.shop, time: order.time, express: order.express,
          items: [{ sku: item.sku, qty: item.qty, price: item.price, name: item.name, spec: item.spec }]
        });
      } catch (e) { /* 同步失败不影响页面 */ }
    }
  }

  function doSync(btn) {
    var old = '';
    if (btn && btn.tagName === 'BUTTON') {
      old = btn.innerHTML;
      btn.disabled = true;
      btn.innerHTML = '<span class="spinner" style="border-color:rgba(0,0,0,.14);border-top-color:#6b7a90"></span>同步中…';
    }
    setTimeout(function () {
      if (btn && btn.tagName === 'BUTTON') { btn.disabled = false; btn.innerHTML = old; }
      if (ui.route === 'shops') {
        SHOPS.forEach(function (s) { s.sync = '刚刚'; });
        renderMain();
        toast('已同步 ' + SHOPS.length + ' 个店铺，授权状态正常');
        return;
      }
      var n = 2;
      for (var i = 0; i < n; i++) addSyncOrder(i);
      KPI[0].value = Number(KPI[0].value) + n;
      KPI[2].value = Number(KPI[2].value) + n;
      renderMain();
      toast('同步完成：6 个店铺新增 ' + n + ' 笔订单');
    }, 850);
  }

  /* ---------- 售后 ---------- */
  function asRulesModal() {
    var rules = [
      { t: '7 天无理由自动同意', d: '买家申请后系统自动通过，无需人工审核', on: true },
      { t: '超时未处理自动退款', d: '超过平台时限（24 小时）未处理，自动同意退款', on: true },
      { t: '小额仅退款免审', d: '金额 ≤ ¥50 的仅退款申请自动通过', on: false },
      { t: '换货必须人工审核', d: '换货申请一律进入人工队列', on: true }
    ];
    openModal({
      title: '售后规则',
      desc: '规则按平台维度生效，修改后立即应用于新进入的售后单',
      body: rules.map(function (r, i) {
        return '<div class="rule-row"><div class="rule-txt"><b>' + r.t + '</b><span>' + r.d + '</span></div>' +
          '<div class="switch' + (r.on ? ' on' : '') + '" data-action="toggle-switch" data-i="' + i + '" role="switch" aria-checked="' + r.on + '"></div></div>';
      }).join(''),
      foot: '<button class="btn btn-ghost" data-action="close-modal">取消</button>' +
        '<button class="btn btn-primary" data-action="as-rules-save">保存规则</button>'
    });
  }

  function agreeSelectedAS(ids) {
    AFTERSALES.forEach(function (r) {
      if (ids.indexOf(r.id) > -1) r.status = '退款中';
    });
  }

  function batchAgreeAS() {
    var st = FILTERS.aftersale;
    var ids = pickedKeys(st);
    if (!ids.length) return;
    var rows = AFTERSALES.filter(function (r) { return ids.indexOf(r.id) > -1; });
    var total = rows.reduce(function (s, r) { return s + r.amount; }, 0);
    openConfirmModal({
      title: '批量同意售后申请',
      desc: '将 ' + ids.length + ' 笔售后单标记为「同意」，进入退款中状态。此操作会同步到对应平台。',
      list: rows.map(function (r) {
        return '<span class="mono">' + r.id + '</span><span>' + r.type + ' · ' + r.reason + '</span><b>' + money(r.amount) + '</b>';
      }),
      sum: '<div class="confirm-sum"><span>退款合计</span><b>' + money(total) + '</b></div>',
      submitText: '确认同意 ' + ids.length + ' 笔',
      onConfirm: function () {
        agreeSelectedAS(ids);
        st.sel = {};
        renderMain();
        toast('已同意 ' + ids.length + ' 笔售后，退款合计 ' + money(total));
      }
    });
  }

  /* ---------- 商品 ---------- */
  function nextProductCode() {
    var max = 10000;
    PRODUCTS.forEach(function (p) {
      var n = Number(String(p.code).replace(/[^0-9]/g, ''));
      if (n > max) max = n;
    });
    return 'P' + (max + 1);
  }

  function productForm(p) {
    var isEdit = !!p;
    openFormModal({
      title: isEdit ? '编辑商品' : '新建商品',
      desc: isEdit ? '保存后会同步更新已映射平台的商品信息' : '创建 SPU 后自动生成规格，随后可在商品详情里维护平台映射',
      wide: true,
      submitText: isEdit ? '保存修改' : '创建商品',
      fields: [
        { key: 'name', label: '商品名称', required: true, span: 2, value: p ? p.name : '', ph: '例如：2026 春季纯棉圆领 T 恤' },
        { key: 'cat', label: '类目', type: 'select', options: CATS, value: p ? p.cat : CATS[0] },
        { key: 'brand', label: '品牌', value: p ? p.brand : '', ph: '例如：云织' },
        { key: 'priceMin', label: '售价（元）', type: 'number', required: true, value: p ? p.priceMin : '' },
        { key: 'stock', label: '库存', type: 'number', value: p ? p.stock : 0 },
        {
          key: 'specs', label: '规格（一行一个）', type: 'textarea', span: 2,
          value: p ? p.specs.join('\n') : '白色 / M\n黑色 / L',
          hint: '每个规格会生成一个 SKU；价格按售价区间均匀分布'
        }
      ],
      onSubmit: function (v) {
        var name = String(v.name).trim();
        if (!name) { toast('请填写商品名称', 'err'); return false; }
        if (!v.priceMin || Number(v.priceMin) <= 0) { toast('请填写有效售价', 'err'); return false; }
        var specs = String(v.specs).split('\n').map(function (s) { return s.trim(); }).filter(Boolean);
        if (!specs.length) specs = ['默认规格'];

        if (isEdit) {
          p.name = name;
          p.cat = v.cat;
          p.brand = String(v.brand).trim();
          p.priceMin = Number(v.priceMin);
          p.priceMax = Math.max(p.priceMax, p.priceMin);
          p.stock = Number(v.stock) || 0;
          p.specs = specs;
          renderMain();
          toast('商品已保存：' + name);
        } else {
          var code = nextProductCode();
          PRODUCTS.unshift({
            code: code, name: name, cat: v.cat, brand: String(v.brand).trim() || '未填写',
            specs: specs, priceMin: Number(v.priceMin),
            priceMax: Math.round(Number(v.priceMin) * 1.25),
            stock: Number(v.stock) || 0, sales: 0, map: '0/3', status: '待上架',
            color: '#3568f0'
          });
          renderMain();
          toast('商品已创建（' + code + '），当前为待上架');
        }
      }
    });
  }

  function importModal() {
    var parsed = null;
    openModal({
      title: '批量导入商品',
      desc: 'CSV 首行为表头，列顺序：商品名称, 类目, 品牌, 售价, 库存, 规格（多个规格用 | 分隔）',
      wide: true,
      body:
        '<div style="display:flex;align-items:center;gap:10px;flex-wrap:wrap">' +
          '<button class="btn btn-ghost xs" data-action="import-template">' + icon('download', 14) + '下载模板</button>' +
          '<input type="file" id="import-file" accept=".csv,text/csv" style="flex:1;min-width:220px;font-size:12.5px;border:1px solid #dfe5ef;border-radius:8px;padding:6px 8px;background:#fcfdff">' +
        '</div>' +
        '<div id="import-preview" style="margin-top:14px"></div>',
      foot: '<button class="btn btn-ghost" data-action="close-modal">取消</button>' +
        '<button class="btn btn-primary" id="import-confirm" data-action="import-confirm" disabled>确认导入</button>',
      onMount: function (root) {
        var file = root.querySelector('#import-file');
        if (!file) return;
        file.addEventListener('change', function () {
          var f = file.files && file.files[0];
          if (!f) return;
          var reader = new FileReader();
          reader.onload = function () {
            var text = String(reader.result || '');
            var lines = text.split(/\r?\n/).filter(function (l) { return l.trim(); });
            var rows = [];
            for (var i = 1; i < lines.length; i++) {
              var cells = lines[i].split(',');
              if (cells.length < 2) continue;
              rows.push({
                name: (cells[0] || '').trim(),
                cat: (cells[1] || '').trim() || CATS[0],
                brand: (cells[2] || '').trim() || '未填写',
                price: Number(cells[3]) || 0,
                stock: Number(cells[4]) || 0,
                specs: (cells[5] || '').split('|').map(function (s) { return s.trim(); }).filter(Boolean)
              });
            }
            parsed = rows.filter(function (r) { return r.name && r.price > 0; });
            var box = root.querySelector('#import-preview');
            if (!parsed.length) {
              box.innerHTML = '<div class="form-error show">' + icon('alert', 15) + '<span>没有解析到有效行，请检查表头与列顺序</span></div>';
              return;
            }
            box.innerHTML = '<div class="sec-t">解析结果（' + parsed.length + ' 行有效 / 共 ' + (lines.length - 1) + ' 行）</div>' +
              '<div class="confirm-list">' + parsed.slice(0, 6).map(function (r) {
                return '<div class="confirm-row"><span>' + esc(r.name) + '</span><span>' + esc(r.cat) + '</span><b>' + money(r.price) + ' × ' + r.stock + '</b></div>';
              }).join('') + (parsed.length > 6 ? '<div class="confirm-row"><span>… 其余 ' + (parsed.length - 6) + ' 行</span></div>' : '') + '</div>';
            var btn = root.querySelector('#import-confirm');
            if (btn) btn.disabled = false;
            window.__importRows = parsed;
          };
          reader.readAsText(f, 'utf-8');
        });
      }
    });
  }

  function nextCodes(n) {
    var max = 10000;
    PRODUCTS.forEach(function (p) {
      var v = Number(String(p.code).replace(/[^0-9]/g, ''));
      if (v > max) max = v;
    });
    var arr = [];
    for (var i = 1; i <= n; i++) arr.push('P' + (max + i));
    return arr;
  }

  function bulkProduct() {
    var st = FILTERS.products;
    var ids = pickedKeys(st);
    if (!ids.length) return;
    openFormModal({
      title: '批量操作（' + ids.length + ' 个商品）',
      desc: '选中的商品会一起变更状态，删除操作不可恢复',
      submitText: '执行',
      fields: [{ key: 'op', label: '操作类型', type: 'select', options: ['上架', '下架', '删除'], value: '上架', span: 2 }],
      onSubmit: function (v) {
        if (v.op === '删除') {
          for (var i = PRODUCTS.length - 1; i >= 0; i--) {
            if (ids.indexOf(PRODUCTS[i].code) > -1) PRODUCTS.splice(i, 1);
          }
        } else {
          PRODUCTS.forEach(function (p) {
            if (ids.indexOf(p.code) > -1) p.status = v.op === '上架' ? '在售' : '下架';
          });
        }
        st.sel = {};
        renderMain();
        toast('已' + v.op + ' ' + ids.length + ' 个商品');
      }
    });
  }

  /* ---------- 库存 ---------- */
  function invStatus(row) {
    if (row.avail <= 0) return '断货';
    if (row.avail < row.safety) return '预警';
    return '正常';
  }

  function fmtTs(iso) {
    if (!iso) return '—';
    var d = new Date(iso);
    if (isNaN(d.getTime())) return String(iso).slice(0, 16).replace('T', ' ');
    return pad2(d.getMonth() + 1) + '-' + pad2(d.getDate()) + ' ' + pad2(d.getHours()) + ':' + pad2(d.getMinutes());
  }

  function invFlowDrawer(key) {
    var row = INVENTORY.filter(function (r) { return r.id === key; })[0] ||
      INVENTORY.filter(function (r) { return r.sku === key; })[0];
    if (!row) return;

    var moves = (store && store.movementsFor(row.sku, row.wh)) || [];
    var rows = moves.length ? moves.map(function (m) {
      return '<tr><td class="cell-sub" style="margin:0;white-space:nowrap">' + fmtTs(m.at) + '</td>' +
        '<td class="mono" style="font-size:11.5px;color:var(--text-2)">' + (m.docId || '—') + '<div class="cell-sub">' + (MOVE_LABEL[m.type] || m.type) + '</div></td>' +
        '<td class="t-right num" style="color:' + (m.qty > 0 ? '#06894e' : '#b42318') + ';font-weight:600">' +
          (m.qty > 0 ? '+' : '') + m.qty + '</td>' +
        '<td class="t-right num">' + m.after + '</td></tr>';
    }).join('') : '<tr><td colspan="4"><div class="empty" style="padding:26px"><h3 style="font-size:13px">还没有库存变动</h3>' +
      '<p style="font-size:12px">发货、调拨、盘点后这里会出现台账</p></div></td></tr>';

    var audit = store ? store.audit() : { ok: true, problems: [] };

    showDrawer('<div class="overlay" data-action="close-drawer"></div>' +
      '<aside class="drawer" role="dialog" aria-modal="true" aria-label="库存流水">' +
        '<div class="dw-head"><div><h3><span class="mono" style="font-size:14px">' + row.sku + '</span>' + tag(row.status, INV_COLOR[row.status]) + '</h3>' +
          '<div class="sub">' + row.name + ' · ' + row.wh + '</div></div>' +
          '<button class="icon-btn" data-action="close-drawer" aria-label="关闭">' + icon('close', 18) + '</button></div>' +
        '<div class="dw-body">' +
          '<div class="sec"><div class="sec-t">库存分布</div>' +
            '<div class="sum">' +
              '<div class="sum-row"><span>在库数量</span><b>' + num(row.avail) + '</b></div>' +
              '<div class="sum-row"><span>锁定库存</span><span>' + num(row.lock) + '</span></div>' +
              '<div class="sum-row"><span>在途库存</span><span>' + num(row.transit) + '</span></div>' +
              '<div class="sum-row total"><span>账面合计</span><b>' + num(row.avail) + '</b></div>' +
            '</div>' +
            '<div class="hint" style="margin-top:8px;font-size:11.5px;color:' + (audit.ok ? 'var(--muted)' : '#b42318') + '">' +
              (audit.ok ? '台账校验通过：' + moves.length + ' 条流水与库存一致' : '台账校验异常：' + audit.problems[0].message) +
            '</div>' +
          '</div>' +
          '<div class="sec"><div class="sec-t">库存台账（' + moves.length + '）</div>' +
            '<table class="tb" style="border:1px solid var(--line);border-radius:9px;overflow:hidden">' +
              '<thead><tr><th>时间 / 单据</th><th>类型</th><th class="t-right">变动</th><th class="t-right">结存</th></tr></thead>' +
              '<tbody>' + rows + '</tbody></table>' +
          '</div>' +
        '</div>' +
        '<div class="dw-foot"><button class="btn btn-ghost" data-action="close-drawer">关闭</button>' +
          '<button class="btn btn-primary" data-action="inv-check">发起盘点</button></div>' +
      '</aside>');
  }

  function invCheckModal() {
    var opts = INVENTORY.map(function (r, i) {
      return { v: String(i), t: r.sku + ' · ' + r.wh + '（账面 ' + r.avail + '）' };
    });
    openFormModal({
      title: '库存盘点',
      desc: '录入实盘数量后，系统自动计算盈亏并生成盘点记录',
      submitText: '提交盘点',
      fields: [
        { key: 'idx', label: '盘点 SKU', type: 'select', options: opts, span: 2 },
        { key: 'real', label: '实盘数量', type: 'number', required: true, value: 0, span: 2 }
      ],
      onSubmit: function (v) {
        var row = INVENTORY[Number(v.idx)];
        if (!row) return false;
        if (!store) { toast('数据层未就绪', 'err'); return false; }
        try {
          var res = store.check({ sku: row.sku, wh: row.wh, real: Number(v.real), by: PROFILE.name });
          saveStore();
          syncFromStore();
          renderMain();
          toast('盘点完成，盘点单 ' + res.doc.id +
            (res.diff === 0 ? '，账实相符' : '，差异 ' + (res.diff > 0 ? '+' : '') + res.diff));
        } catch (e) {
          toast(e.message, 'err');
          return false;
        }
      }
    });
  }

  function invTransferModal() {
    var opts = INVENTORY.map(function (r) {
      return { v: r.sku + '|' + r.wh, t: r.sku + ' · ' + r.wh + '（可用 ' + r.avail + '）' };
    });
    openFormModal({
      title: '新建调拨单',
      desc: '从调出仓扣减可用库存，在调入仓增加可用库存',
      submitText: '提交调拨',
      fields: [
        { key: 'from', label: '调出（SKU · 仓库）', type: 'select', options: opts, span: 2 },
        { key: 'to', label: '调入仓库', type: 'select', options: WAREHOUSES, value: '广州仓' },
        { key: 'qty', label: '调拨数量', type: 'number', required: true, value: 10 }
      ],
      onSubmit: function (v) {
        var parts = String(v.from).split('|');
        var sku = parts[0], fromWh = parts[1];
        var qty = Number(v.qty);
        if (!store) { toast('数据层未就绪', 'err'); return false; }
        try {
          var doc = store.transfer({ sku: sku, fromWh: fromWh, toWh: v.to, qty: qty, by: PROFILE.name });
          saveStore();
          syncFromStore();
          renderMain();
          toast('调拨完成，调拨单 ' + doc.id);
        } catch (e) {
          toast(e.message, 'err');
          return false;
        }
      }
    });
  }

  /* ---------- 采购 ---------- */
  function poNewModal() {
    var supOpts = SUPPLIERS.map(function (s) { return s.name; });
    var goodsOpts = PRODUCTS.map(function (p) { return { v: p.code, t: p.name }; });
    openFormModal({
      title: '新建采购单',
      desc: '提交后进入审核队列，审核通过可一键推送供应商',
      submitText: '提交审核',
      fields: [
        { key: 'supplier', label: '供应商', type: 'select', options: supOpts, span: 2 },
        { key: 'goods', label: '采购商品', type: 'select', options: goodsOpts, span: 2 },
        { key: 'qty', label: '采购数量', type: 'number', required: true, value: 100 },
        { key: 'price', label: '采购单价（元）', type: 'number', required: true, value: 50 }
      ],
      onSubmit: function (v) {
        var qty = Number(v.qty), price = Number(v.price);
        if (!qty || qty <= 0 || !price || price <= 0) { toast('数量与单价必须大于 0', 'err'); return false; }
        var g = PRODUCTS.filter(function (p) { return p.code === v.goods; })[0];
        PURCHASES.unshift({
          id: 'PO' + stamp() + (100 + PURCHASES.length),
          supplier: v.supplier, kinds: 1, qty: qty,
          amount: Math.round(qty * price * 100) / 100,
          status: '待审核', time: '刚刚',
          eta: '预计 ' + dateStr(new Date(Date.now() + 6 * 864e5))
        });
        renderMain();
        toast('采购单已创建：' + (g ? g.name : v.goods) + ' × ' + qty);
      }
    });
  }

  function poSmartModal() {
    var sug = PRODUCTS.filter(function (p) { return p.stock < 120; }).slice(0, 3);
    if (!sug.length) { toast('当前没有需要补货的商品'); return; }
    var rows = sug.map(function (p) {
      var need = Math.max(100, 500 - p.stock);
      return { p: p, need: need };
    });
    openModal({
      title: '智能补货建议',
      desc: '按近 30 天销量 × 1.5 备货系数 - 现有库存 - 在途库存 计算得出',
      wide: true,
      body: rows.map(function (x) {
        return '<div class="rule-row"><div class="rule-txt"><b>' + x.p.name + '</b>' +
          '<span>' + x.p.code + ' · 当前库存 ' + x.p.stock + ' · 近 30 天销量 ' + x.p.sales + '</span></div>' +
          '<div style="text-align:right"><b class="num" style="font-size:15px">' + x.need + '</b>' +
          '<div class="cell-sub" style="margin:0">建议采购量</div></div></div>';
      }).join(''),
      foot: '<button class="btn btn-ghost" data-action="close-modal">关闭</button>' +
        '<button class="btn btn-primary" data-action="po-smart-run">一键生成采购单</button>'
    });
    modalState.onSubmit = function () { };
    window.__poSug = rows;
  }

  function poAudit(id) {
    var po = PURCHASES.filter(function (r) { return r.id === id; })[0];
    if (!po) return;
    openConfirmModal({
      title: '审核采购单',
      desc: '审核通过后将推送给供应商「' + po.supplier + '」，预计到货 ' + po.eta.replace('预计 ', '') + '。',
      list: ['<span class="mono">' + po.id + '</span><span>' + po.kinds + ' 种 · ' + po.qty + ' 件</span><b>' + money(po.amount) + '</b>'],
      submitText: '审核通过并推送',
      onConfirm: function () {
        po.status = '待供应商确认';
        renderMain();
        toast('已审核并推送给供应商：' + po.supplier);
      }
    });
  }

  function poView(id) {
    var po = PURCHASES.filter(function (r) { return r.id === id; })[0];
    if (!po) return;
    openModal({
      title: '采购单 ' + po.id,
      desc: '状态：' + po.status + ' · 下单时间 ' + po.time,
      body: '<dl class="kv">' +
        '<dt>供应商</dt><dd>' + po.supplier + '</dd>' +
        '<dt>商品 / 数量</dt><dd>' + po.kinds + ' 种 · ' + po.qty + ' 件</dd>' +
        '<dt>采购金额</dt><dd><b>' + money(po.amount) + '</b></dd>' +
        '<dt>预计到货</dt><dd>' + po.eta + '</dd>' +
        '</dl>',
      foot: '<button class="btn btn-ghost" data-action="close-modal">关闭</button>'
    });
  }

  /* ---------- 供应商 ---------- */
  function supNewModal() {
    openFormModal({
      title: '新增供应商',
      desc: '建档后可被采购单引用，账期与结算方式会影响财务审批',
      submitText: '保存供应商',
      fields: [
        { key: 'name', label: '供应商名称', required: true, span: 2 },
        { key: 'contact', label: '联系人', value: '' },
        { key: 'phone', label: '联系电话', value: '' },
        { key: 'cat', label: '主营类目', span: 2, value: '' },
        { key: 'pay', label: '结算方式', type: 'select', options: ['月结 30 天', '月结 45 天', '预付 30%', '预付 50%', '现结'] }
      ],
      onSubmit: function (v) {
        var name = String(v.name).trim();
        if (!name) { toast('请填写供应商名称', 'err'); return false; }
        SUPPLIERS.unshift({
          name: name, code: 'SUP-' + (100 + SUPPLIERS.length),
          contact: String(v.contact).trim() || '—', phone: String(v.phone).trim() || '—',
          cat: String(v.cat).trim() || '未填写', goods: 0, pay: v.pay,
          ontime: 100, score: 4.0, status: '合作中'
        });
        renderMain();
        toast('供应商已创建：' + name);
      }
    });
  }

  /* ---------- 物流 ---------- */
  function logiRulesModal() {
    var rules = [
      { t: '48 小时无轨迹更新', d: '触发「物流停滞」预警，进入异常列表', on: true },
      { t: '虚假签收检测', d: '买家投诉未收到但显示已签收时自动标记', on: true },
      { t: '超区 / 地址不详退回', d: '退回件自动通知客服跟进', on: true },
      { t: '派送超时（>3 天）', d: '提醒买家并补偿运费券', on: false }
    ];
    openModal({
      title: '物流预警设置',
      desc: '预警会出现在物流管理列表，并通过站内通知提醒负责人',
      body: rules.map(function (r, i) {
        return '<div class="rule-row"><div class="rule-txt"><b>' + r.t + '</b><span>' + r.d + '</span></div>' +
          '<div class="switch' + (r.on ? ' on' : '') + '" data-action="toggle-switch" data-i="' + i + '" role="switch" aria-checked="' + r.on + '"></div></div>';
      }).join(''),
      foot: '<button class="btn btn-ghost" data-action="close-modal">取消</button>' +
        '<button class="btn btn-primary" data-action="logi-save">保存设置</button>'
    });
  }

  function waybillModal() {
    var o = ORDERS.filter(function (x) { return x.status === '待发货'; })[0] || ORDERS[0];
    var no = 'SF' + (7800200 + ORDERS.indexOf(o));
    openModal({
      title: '电子面单预览',
      desc: '打印内容来自订单「' + o.id + '」，正式环境会通过菜鸟 / 快递100 接口获取面单号',
      wide: false,
      body: '<div class="waybill">' +
          '<div class="waybill-top"><b>顺丰速运</b><span class="waybill-code">' + no + '</span></div>' +
          '<div class="waybill-to"><b>' + esc(o.buyer) + '</b> ' + o.phone + '<br>' + esc(o.addr) + '</div>' +
          '<div class="barcode"></div>' +
          '<div class="waybill-code" style="margin-top:6px;text-align:center">' + no + '</div>' +
          '<div style="margin-top:10px;padding-top:8px;border-top:1px dashed #c9d3e2;font-size:12px;color:#5d6b82">' +
            '订单号 ' + o.id + ' · 共 ' + o.qty + ' 件 · ' + o.plat + ' · ' + esc(o.shop) +
          '</div>' +
        '</div>',
      foot: '<button class="btn btn-ghost" data-action="close-modal">关闭</button>' +
        '<button class="btn btn-primary" data-action="do-print">' + icon('print', 15) + '打印面单</button>'
    });
  }

  function doPrint() {
    document.body.classList.add('printing');
    setTimeout(function () {
      window.print();
      setTimeout(function () { document.body.classList.remove('printing'); }, 200);
    }, 60);
  }

  /* ---------- 店铺 / 分销 ---------- */
  function shopAuthModal() {
    var plats = ['淘宝天猫', '京东', '抖音小店', '拼多多', '快手小店', '有赞'];
    openFormModal({
      title: '授权新店铺',
      desc: '选择平台后完成 OAuth 授权，系统会自动抓取近 7 天订单（演示环境跳过跳转）',
      submitText: '授权并绑定',
      fields: [
        { key: 'plat', label: '平台', type: 'select', options: plats, span: 2 },
        { key: 'name', label: '店铺名称', required: true, value: '', span: 2, ph: '例如：鲸云母婴旗舰店' },
        { key: 'sid', label: '店铺 ID（可选）', value: '', ph: '不填则自动生成' }
      ],
      onSubmit: function (v) {
        var name = String(v.name).trim();
        if (!name) { toast('请填写店铺名称', 'err'); return false; }
        SHOPS.push({
          plat: v.plat, name: name,
          sid: String(v.sid).trim() || (v.plat.slice(0, 2) + '_' + Math.floor(Math.random() * 900000 + 100000)),
          auth: '已授权', sync: '刚刚', today: 0, goods: 0,
          expire: dateStr(new Date(Date.now() + 365 * 864e5))
        });
        renderMain();
        toast('店铺已授权：' + name + '，正在同步商品与订单');
      }
    });
  }

  function distInviteModal() {
    var link = 'https://erp.jingyun.demo/invite?code=DB' + Math.floor(Math.random() * 9000 + 1000);
    openModal({
      title: '邀请分销商',
      desc: '分销商通过链接注册后可申请一件代发，运费按等级规则结算',
      body: '<div class="mfield"><label>专属邀请链接</label>' +
        '<div style="display:flex;gap:8px"><input data-mf="link" value="' + link + '" readonly style="flex:1">' +
        '<button class="btn btn-ghost xs" data-action="copy-link" data-link="' + link + '">复制</button></div>' +
        '<div class="hint">链接 7 天内有效，注册后默认「普通」等级</div></div>',
      foot: '<button class="btn btn-ghost" data-action="close-modal">关闭</button>'
    });
  }

  function copyLink(link) {
    var done = function () { toast('邀请链接已复制'); };
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(link).then(done).catch(function () {
        toast('复制失败，请手动选中链接复制', 'err');
      });
    } else {
      toast('当前浏览器不支持自动复制，请手动选中', 'err');
    }
  }

  function batchSettle() {
    var st = FILTERS.distribution;
    var ids = pickedKeys(st);
    if (!ids.length) return;
    var rows = DISTRIBUTORS.filter(function (r) { return ids.indexOf(r.code) > -1; });
    var total = rows.reduce(function (s, r) { return s + r.pending; }, 0);
    if (!total) { toast('选中的分销商没有待结算金额', 'err'); return; }
    openConfirmModal({
      title: '批量结算',
      desc: '结算后将打款至分销商账户，可在资金流水里查询。',
      list: rows.map(function (r) {
        return '<span>' + r.name + '</span><span>' + r.level + '</span><b>' + money(r.pending) + '</b>';
      }),
      sum: '<div class="confirm-sum"><span>结算合计</span><b>' + money(total) + '</b></div>',
      submitText: '确认结算 ' + money(total),
      onConfirm: function () {
        rows.forEach(function (r) { r.pending = 0; });
        st.sel = {};
        renderMain();
        toast('结算完成，共打款 ' + money(total));
      }
    });
  }

  /* ---------- 财务 ---------- */
  function finImportModal() {
    var shops = FINANCE.map(function (r) { return r.shop; });
    openFormModal({
      title: '录入平台账单',
      desc: '按店铺录入平台结算金额，系统会与订单金额自动比对并标出差异',
      submitText: '保存并比对',
      fields: [
        { key: 'shop', label: '店铺', type: 'select', options: shops, span: 2 },
        { key: 'period', label: '账期', value: '2026-10 下半月' },
        { key: 'platform', label: '平台结算额（元）', type: 'number', required: true, value: '' }
      ],
      onSubmit: function (v) {
        var row = FINANCE.filter(function (r) { return r.shop === v.shop; })[0];
        if (!row) return false;
        var amount = Number(v.platform);
        if (!amount || amount <= 0) { toast('请填写有效的结算金额', 'err'); return false; }
        row.period = String(v.period).trim() || row.period;
        row.platform = amount;
        row.diff = Math.round((amount - row.system) * 100) / 100;
        row.status = row.diff === 0 ? '已对平' : '有差异';
        renderMain();
        toast(row.diff === 0 ? '账单已录入，与系统金额一致' : '账单已录入，差异 ' + money(row.diff));
      }
    });
  }

  function finReportModal() {
    var rows = FINANCE.slice(0, 6).map(function (r) {
      var cost = Math.round(r.system * 0.62 * 100) / 100;
      var gross = Math.round((r.system - cost) * 100) / 100;
      return { r: r, cost: cost, gross: gross, rate: (gross / r.system) * 100 };
    });
    var totalGmv = rows.reduce(function (s, x) { return s + x.r.system; }, 0);
    var totalGross = rows.reduce(function (s, x) { return s + x.gross; }, 0);
    openModal({
      title: '利润报表（按店铺）',
      desc: '数据口径：系统订单金额 - 商品成本（按 62% 估算），佣金与运费未计入',
      wide: true,
      body: '<div class="tb-wrap"><table class="tb"><thead><tr>' +
          '<th>店铺</th><th class="t-right">销售额</th><th class="t-right">成本</th><th class="t-right">毛利</th><th class="t-right">毛利率</th>' +
        '</tr></thead><tbody>' +
          rows.map(function (x) {
            return '<tr><td>' + platDot(x.r.plat) + '<div class="cell-sub">' + x.r.shop + '</div></td>' +
              '<td class="t-right num">' + money(x.r.system) + '</td>' +
              '<td class="t-right num" style="color:var(--muted)">' + money(x.cost) + '</td>' +
              '<td class="t-right num"><b>' + money(x.gross) + '</b></td>' +
              '<td class="t-right num" style="color:' + (x.rate >= 30 ? '#06894e' : '#b54708') + '">' + x.rate.toFixed(1) + '%</td></tr>';
          }).join('') +
        '</tbody></table></div>' +
        '<div class="confirm-sum"><span>合计销售额 ' + money(totalGmv) + '</span><b style="color:#06894e">毛利 ' + money(totalGross) + '</b></div>',
      foot: '<button class="btn btn-ghost" data-action="close-modal">关闭</button>' +
        '<button class="btn btn-primary" data-action="fin-report-export">导出报表</button>'
    });
    modalState.onSubmit = null;
    window.__finRows = rows;
  }

  function finReconcile(btn) {
    var old = btn.innerHTML;
    btn.disabled = true;
    btn.innerHTML = '<span class="spinner"></span>对账中…';
    setTimeout(function () {
      btn.disabled = false;
      btn.innerHTML = old;
      var fixed = 0;
      FINANCE.forEach(function (r) {
        if (r.status === '待对账') { r.status = '已对平'; r.diff = 0; fixed++; }
      });
      renderMain();
      toast('对账完成：' + FINANCE.length + ' 个店铺，' + fixed + ' 个待对账已自动对平');
    }, 1000);
  }

  function finDetail(shop) {
    var row = FINANCE.filter(function (r) { return r.shop === shop; })[0];
    if (!row) return;
    var diff = row.diff;
    var items = diff === 0
      ? []
      : [
        { id: 'SO202610120046', p: row.system + 120, s: row.system + 120, d: 0, t: '运费差异已确认' },
        { id: 'SO202610180112', p: Math.abs(diff) + 60, s: 60, d: Math.abs(diff), t: '平台补贴未入账' },
        { id: 'SO202610210087', p: 0, s: 0, d: 0, t: '已对平' }
      ];
    openModal({
      title: row.shop + ' · 对账明细',
      desc: '账期 ' + row.period + ' · ' + (diff === 0 ? '平台金额与系统金额一致' : '共发现 1 笔差异，需人工确认'),
      wide: true,
      body: diff === 0
        ? '<div class="empty" style="padding:30px"><div class="empty-ico">' + icon('check', 22) + '</div><h3>本期无差异</h3>' +
          '<p>平台结算额 ' + money(row.platform) + ' 与系统订单额完全一致。</p></div>'
        : '<div class="tb-wrap"><table class="tb"><thead><tr><th>订单号</th><th class="t-right">平台金额</th>' +
          '<th class="t-right">系统金额</th><th class="t-right">差异</th><th>说明</th></tr></thead><tbody>' +
          items.map(function (x) {
            return '<tr><td class="mono">' + x.id + '</td><td class="t-right num">' + money(x.p) + '</td>' +
              '<td class="t-right num">' + money(x.s) + '</td>' +
              '<td class="t-right num" style="color:' + (x.d ? '#d92d20' : 'var(--muted)') + '">' + (x.d ? money(x.d) : '—') + '</td>' +
              '<td style="color:var(--text-2)">' + x.t + '</td></tr>';
          }).join('') + '</tbody></table></div>',
      foot: '<button class="btn btn-ghost" data-action="close-modal">关闭</button>' +
        (diff === 0 ? '' : '<button class="btn btn-primary" data-action="fin-diff-confirm" data-shop="' + esc(shop) + '">确认差异并调账</button>')
    });
  }

  /* ---------- 系统设置 ---------- */
  var MEMBERS = [
    { name: '管理员', role: '超级管理员', dept: '总经办', last: '今天 09:12', status: '正常' },
    { name: '林晓', role: '运营主管', dept: '电商运营', last: '今天 08:40', status: '正常' },
    { name: '周鸣', role: '客服专员', dept: '客户服务', last: '今天 08:02', status: '正常' },
    { name: '陈屿', role: '仓储管理员', dept: '仓储物流', last: '昨天 18:30', status: '正常' },
    { name: '苏禾', role: '财务专员', dept: '财务部', last: '昨天 17:05', status: '已停用' }
  ];
  var LOGS = [
    { t: '今天 14:32', who: '林晓', mod: '订单', act: '批量发货 12 笔', ip: '10.8.2.31' },
    { t: '今天 13:58', who: '管理员', mod: '商品', act: '新建商品 P10095', ip: '10.8.2.10' },
    { t: '今天 12:20', who: '周鸣', mod: '售后', act: '同意退款 AS202610300028', ip: '10.8.2.44' },
    { t: '今天 11:05', who: '陈屿', mod: '库存', act: '调拨 杭州主仓 → 广州仓 60 件', ip: '10.8.3.12' },
    { t: '今天 10:41', who: '苏禾', mod: '财务', act: '录入账单 京东 10 月上半月', ip: '10.8.2.77' },
    { t: '昨天 17:30', who: '管理员', mod: '系统', act: '修改角色权限：客服专员', ip: '10.8.2.10' },
    { t: '昨天 15:12', who: '林晓', mod: '商品', act: '下架商品 P10094', ip: '10.8.2.31' }
  ];

  function settingsHTML() {
    var memberRows = MEMBERS.map(function (m) {
      return '<tr><td><div class="prod"><span class="thumb" style="background:#eef3ff;color:#3568f0">' + m.name.slice(0, 1) + '</span>' +
        '<div class="prod-txt"><div class="cell-main">' + m.name + '</div><div class="cell-sub">' + m.dept + '</div></div></div></td>' +
        '<td>' + tag(m.role, m.role === '超级管理员' ? 'purple' : 'gray') + '</td>' +
        '<td class="cell-sub" style="margin:0">' + m.last + '</td>' +
        '<td>' + tag(m.status, m.status === '正常' ? 'green' : 'gray') + '</td></tr>';
    }).join('');

    var logRows = LOGS.map(function (l) {
      return '<tr><td class="cell-sub" style="margin:0;white-space:nowrap">' + l.t + '</td>' +
        '<td>' + l.who + '</td><td><span class="log-kind">' + l.mod + '</span></td>' +
        '<td style="color:var(--text-2)">' + l.act + '</td>' +
        '<td class="mono" style="color:var(--muted)">' + l.ip + '</td></tr>';
    }).join('');

    return '<div class="page-head">' +
        '<div><h1>系统设置</h1><p class="desc">成员、角色权限与操作日志，权限可细化到菜单 / 按钮 / 数据范围</p></div>' +
        '<div class="head-actions">' +
          '<button class="btn btn-ghost" data-action="reset-demo">' + icon('refresh', 15) + '重置演示数据</button>' +
          '<button class="btn btn-ghost" data-action="export">' + icon('download', 15) + '导出日志</button>' +
          '<button class="btn btn-primary" data-action="member-new">' + icon('plus', 15) + '新增成员</button>' +
        '</div>' +
      '</div>' +
      '<div class="grid-2 rev">' +
        '<section class="card"><div class="card-head" style="padding-bottom:12px"><h3>成员与角色<span class="hint">5 人</span></h3></div>' +
          '<div class="tb-wrap"><table class="tb"><thead><tr><th>成员</th><th>角色</th><th>最近登录</th><th>状态</th></tr></thead>' +
          '<tbody>' + memberRows + '</tbody></table></div></section>' +
        '<section class="card"><div class="card-head" style="padding-bottom:12px"><h3>角色权限<span class="hint">3 个角色</span></h3></div>' +
          '<div class="card-body" style="padding-top:4px">' +
            '<div class="rule-row"><div class="rule-txt"><b>超级管理员</b><span>全部菜单 · 全部数据 · 成本价可见</span></div>' + tag('全部权限', 'purple') + '</div>' +
            '<div class="rule-row"><div class="rule-txt"><b>运营主管</b><span>订单 / 商品 / 库存 / 分销 · 本部门数据 · 成本价隐藏</span></div>' + tag('32 项', 'blue') + '</div>' +
            '<div class="rule-row"><div class="rule-txt"><b>客服专员</b><span>订单查看 · 售后处理 · 仅本店铺数据</span></div>' + tag('9 项', 'gray') + '</div>' +
          '</div></section>' +
      '</div>' +
      '<section class="card"><div class="card-head" style="padding-bottom:12px"><h3>操作日志<span class="hint">最近 7 条</span></h3></div>' +
        '<div class="tb-wrap"><table class="tb mini-tb"><thead><tr><th>时间</th><th>操作人</th><th>模块</th><th>操作内容</th><th>IP</th></tr></thead>' +
        '<tbody>' + logRows + '</tbody></table></div></section>';
  }

  function memberNewModal() {
    openFormModal({
      title: '新增成员',
      desc: '成员会收到邀请邮件，首次登录需修改密码',
      submitText: '发送邀请',
      fields: [
        { key: 'name', label: '姓名', required: true },
        { key: 'dept', label: '部门', type: 'select', options: ['电商运营', '客户服务', '仓储物流', '财务部', '总经办'] },
        { key: 'role', label: '角色', type: 'select', options: ['运营主管', '客服专员', '仓储管理员', '财务专员'] },
        { key: 'email', label: '邮箱', required: true, ph: 'name@company.com' }
      ],
      onSubmit: function (v) {
        if (!String(v.name).trim() || !String(v.email).trim()) { toast('请填写姓名与邮箱', 'err'); return false; }
        MEMBERS.unshift({
          name: String(v.name).trim(), role: v.role, dept: v.dept,
          last: '未登录', status: '正常'
        });
        renderMain();
        toast('邀请已发送至 ' + v.email);
      }
    });
  }

  var NOTIFS = [
    { id: 'n1', kind: '订单', ico: 'truck', color: '#3568f0', title: '3 笔订单超过 24 小时未发货', sub: 'SO202610300116 等', t: '10 分钟前', route: 'orders', read: false },
    { id: 'n2', kind: '售后', ico: 'refresh', color: '#f04438', title: 'AS202610300028 退款即将超时', sub: '剩余 6 小时', t: '25 分钟前', route: 'aftersale', read: false },
    { id: 'n3', kind: '库存', ico: 'alert', color: '#f79009', title: '4 个 SKU 已断货', sub: '加厚保温杯 500ml 等', t: '1 小时前', route: 'inventory', read: false },
    { id: 'n4', kind: '物流', ico: 'truck', color: '#7a5af8', title: 'YT9902410 物流停滞超过 48 小时', sub: '武汉转运中心', t: '2 小时前', route: 'logistics', read: false },
    { id: 'n5', kind: '财务', ico: 'wallet', color: '#12b76a', title: '京东账单存在 ¥886.60 差异', sub: '10 月上半月', t: '昨天 18:20', route: 'finance', read: false }
  ];

  function unreadCount() {
    return NOTIFS.filter(function (n) { return !n.read; }).length;
  }

  function notifMenuHTML() {
    return '<div class="notif' + (ui.notifOpen ? ' open' : '') + '" id="notif-wrap">' +
      '<button class="icon-btn bell" data-action="toggle-notif" title="通知">' + icon('bell', 18) +
        (unreadCount() ? '<span class="badge">' + unreadCount() + '</span>' : '') + '</button>' +
      '<div class="menu notif-menu">' +
        '<div class="notif-head"><b>通知</b><button class="link" style="font-size:12px" data-action="notif-read-all">全部已读</button></div>' +
        '<div class="notif-list">' +
          NOTIFS.map(function (n) {
            return '<button class="notif-item' + (n.read ? ' read' : '') + '" data-action="notif-open" data-id="' + n.id + '">' +
              '<span class="notif-ico" style="background:' + n.color + '16;color:' + n.color + '">' + icon(n.ico, 15) + '</span>' +
              '<span class="notif-txt"><b>' + n.title + '</b><span>' + n.kind + ' · ' + n.sub + '</span></span>' +
              '<span class="notif-time">' + n.t + '</span>' +
              (n.read ? '' : '<i class="notif-dot"></i>') +
              '</button>';
          }).join('') +
        '</div>' +
        '<div class="notif-foot"><span>共 ' + NOTIFS.length + ' 条，' + unreadCount() + ' 条未读</span></div>' +
      '</div>' +
    '</div>';
  }

  /* ---------- 全局搜索 ---------- */
  function globalSearchModal(kw) {
    var q = String(kw || '').trim().toLowerCase();
    if (!q) { toast('请输入要搜索的关键词', 'err'); return; }
    var groups = [
      {
        name: '订单', route: 'orders',
        items: ORDERS.filter(function (o) {
          return (o.id + ' ' + o.buyer + ' ' + o.shop).toLowerCase().indexOf(q) > -1;
        }).slice(0, 4).map(function (o) {
          return { main: o.id, sub: o.buyer + ' · ' + o.plat + ' · ' + money(o.amount), id: o.id, drawer: 'order' };
        })
      },
      {
        name: '商品', route: 'products',
        items: PRODUCTS.filter(function (p) {
          return (p.name + ' ' + p.code + ' ' + p.brand).toLowerCase().indexOf(q) > -1;
        }).slice(0, 4).map(function (p) {
          return { main: p.name, sub: p.code + ' · ' + p.cat + ' · 库存 ' + p.stock, id: p.code, drawer: 'product' };
        })
      },
      {
        name: '售后', route: 'aftersale',
        items: AFTERSALES.filter(function (r) {
          return (r.id + ' ' + r.order + ' ' + r.buyer).toLowerCase().indexOf(q) > -1;
        }).slice(0, 3).map(function (r) {
          return { main: r.id, sub: r.buyer + ' · ' + r.type + ' · ' + money(r.amount), id: r.id, drawer: 'as' };
        })
      },
      {
        name: '店铺', route: 'shops',
        items: SHOPS.filter(function (s) {
          return (s.name + ' ' + s.sid + ' ' + s.plat).toLowerCase().indexOf(q) > -1;
        }).slice(0, 3).map(function (s) {
          return { main: s.name, sub: s.plat + ' · ' + s.sid, id: s.sid, drawer: '' };
        })
      }
    ].filter(function (g) { return g.items.length; });

    var total = groups.reduce(function (s, g) { return s + g.items.length; }, 0);

    openModal({
      title: '搜索「' + esc(kw) + '」',
      desc: total ? '在订单、商品、售后、店铺中找到 ' + total + ' 条结果' : '没有找到匹配内容，试试订单号或商品名',
      body: total
        ? groups.map(function (g) {
          return '<div class="sec-t" style="margin-top:14px">' + g.name + '（' + g.items.length + '）</div>' +
            '<div class="search-list">' + g.items.map(function (it) {
              return '<button class="search-item" data-action="search-open" data-route="' + g.route + '" data-drawer="' + it.drawer + '" data-id="' + esc(it.id) + '">' +
                '<span class="search-main">' + esc(it.main) + '</span>' +
                '<span class="search-sub">' + esc(it.sub) + '</span>' +
                '<span class="chev">' + icon('chevR', 14) + '</span></button>';
            }).join('') + '</div>';
        }).join('')
        : '<div class="empty" style="padding:30px"><div class="empty-ico">' + icon('search', 22) + '</div><h3>没有结果</h3>' +
          '<p>可以搜索订单号、买家名、商品名或商品编码</p></div>',
      foot: '<button class="btn btn-ghost" data-action="close-modal">关闭</button>'
    });
    modalState.onSubmit = null;
  }

  /* ---------- 个人中心 ---------- */
  function profileHTML() {
    var logRows = LOGIN_LOGS.map(function (l, i) {
      return '<tr><td class="cell-sub" style="margin:0;white-space:nowrap">' + l.t + '</td>' +
        '<td>' + l.dev + (l.cur ? ' <span class="tag green" style="margin-left:6px"><i></i>本机</span>' : '') + '</td>' +
        '<td class="mono" style="color:var(--text-2)">' + l.ip + '</td>' +
        '<td>' + l.loc + '</td>' +
        '<td class="t-right">' + (l.cur
          ? '<span style="color:var(--muted)">当前登录</span>'
          : '<button class="link" style="font-size:12.5px" data-action="logout-device" data-i="' + i + '">退出该设备</button>') +
        '</td></tr>';
    }).join('');

    return '<div class="page-head">' +
        '<div><h1>个人中心</h1><p class="desc">账号资料、安全设置与登录记录</p></div>' +
        '<div class="head-actions">' +
          '<button class="btn btn-primary" data-action="profile-edit">' + icon('user', 15) + '编辑资料</button>' +
        '</div>' +
      '</div>' +
      '<div class="grid-2">' +
        '<section class="card"><div class="card-head"><h3>基本信息</h3></div>' +
          '<div class="card-body">' +
            '<div class="pf-head">' +
              '<span class="pf-avatar">' + esc(PROFILE.name.slice(0, 1)) + '</span>' +
              '<div style="min-width:0"><div class="pf-name">' + esc(PROFILE.name) + tag(PROFILE.role, 'purple') + '</div>' +
                '<div class="cell-sub">' + esc(PROFILE.account) + ' · ' + esc(PROFILE.dept) + '</div></div>' +
            '</div>' +
            '<dl class="kv">' +
              '<dt>登录账号</dt><dd class="mono">' + esc(PROFILE.account) + '</dd>' +
              '<dt>手机号</dt><dd>' + maskPhone(PROFILE.phone) + '</dd>' +
              '<dt>邮箱</dt><dd>' + esc(PROFILE.email) + '</dd>' +
              '<dt>部门</dt><dd>' + esc(PROFILE.dept) + '</dd>' +
              '<dt>角色</dt><dd>' + esc(PROFILE.role) + ' · 全部权限</dd>' +
              '<dt>加入时间</dt><dd>' + esc(PROFILE.joined) + '</dd>' +
            '</dl>' +
          '</div>' +
        '</section>' +
        '<section class="card"><div class="card-head"><h3>安全设置</h3></div>' +
          '<div class="card-body" style="padding-top:4px">' +
            '<div class="rule-row"><div class="rule-txt"><b>登录密码</b><span>建议每 90 天更换一次，长度不少于 6 位</span></div>' +
              '<button class="btn btn-ghost xs" data-action="pwd-change">修改</button></div>' +
            '<div class="rule-row"><div class="rule-txt"><b>手机号</b><span>' + maskPhone(PROFILE.phone) + ' · 用于登录验证与找回密码</span></div>' +
              '<button class="btn btn-ghost xs" data-action="profile-edit">更换</button></div>' +
            '<div class="rule-row"><div class="rule-txt"><b>二次验证</b><span>登录时需要短信验证码，可显著降低账号被盗风险</span></div>' +
              '<div class="switch' + (PROFILE.twofa ? ' on' : '') + '" data-action="toggle-2fa" role="switch" aria-checked="' + PROFILE.twofa + '"></div></div>' +
            '<div class="rule-row"><div class="rule-txt"><b>异地登录提醒</b><span>检测到新地点登录时，通过站内信与邮件提醒</span></div>' +
              '<div class="switch' + (PROFILE.alert ? ' on' : '') + '" data-action="toggle-alert" role="switch" aria-checked="' + PROFILE.alert + '"></div></div>' +
          '</div>' +
        '</section>' +
      '</div>' +
      '<section class="card"><div class="card-head" style="padding-bottom:12px"><h3>最近登录记录<span class="hint">保留 30 天</span></h3>' +
        '<button class="btn btn-ghost" style="height:30px;font-size:12.5px" data-action="logout-others">退出其他设备</button></div>' +
        '<div class="tb-wrap"><table class="tb"><thead><tr>' +
          '<th>登录时间</th><th>设备 / 浏览器</th><th>IP</th><th>地点</th><th class="t-right">操作</th>' +
        '</tr></thead><tbody>' + logRows + '</tbody></table></div></section>';
  }

  function profileEditModal() {
    openFormModal({
      title: '编辑资料',
      desc: '姓名会显示在操作日志与订单处理记录中',
      submitText: '保存',
      fields: [
        { key: 'name', label: '姓名', required: true, value: PROFILE.name },
        { key: 'dept', label: '部门', type: 'select', options: ['总经办', '电商运营', '客户服务', '仓储物流', '财务部'], value: PROFILE.dept },
        { key: 'phone', label: '手机号', required: true, value: PROFILE.phone, span: 2, ph: '11 位手机号' },
        { key: 'email', label: '邮箱', required: true, value: PROFILE.email, span: 2 }
      ],
      onSubmit: function (v) {
        var phone = String(v.phone).trim();
        var email = String(v.email).trim();
        if (!/^1\d{10}$/.test(phone)) { toast('请填写正确的 11 位手机号', 'err'); return false; }
        if (email.indexOf('@') === -1) { toast('请填写正确的邮箱地址', 'err'); return false; }
        PROFILE.name = String(v.name).trim();
        PROFILE.dept = v.dept;
        PROFILE.phone = phone;
        PROFILE.email = email;
        saveProfile();
        session.name = PROFILE.name;
        try { localStorage.setItem(SESSION_KEY, JSON.stringify(session)); } catch (e) { /* ignore */ }
        closeModal();
        render();
        toast('资料已保存');
      }
    });
  }

  function pwdModal() {
    openFormModal({
      title: '修改登录密码',
      desc: '修改后当前登录仍然有效，其他设备需重新登录',
      submitText: '确认修改',
      fields: [
        { key: 'old', label: '当前密码', type: 'password', required: true, span: 2 },
        { key: 'pwd1', label: '新密码', type: 'password', required: true, span: 2, hint: '长度不少于 6 位' },
        { key: 'pwd2', label: '确认新密码', type: 'password', required: true, span: 2 }
      ],
      onSubmit: function (v) {
        if (v.old !== CREDS.password) { toast('当前密码不正确', 'err'); return false; }
        if (String(v.pwd1).length < 6) { toast('新密码至少 6 位', 'err'); return false; }
        if (v.pwd1 !== v.pwd2) { toast('两次输入的新密码不一致', 'err'); return false; }
        CREDS.password = String(v.pwd1);
        closeModal();
        toast('密码已更新，下次登录请使用新密码');
      }
    });
  }

  /* ---------- 订单批量发货 ---------- */
  function exportSelected() {
    var ids = pickedOrders();
    if (!ids.length) { toast('请先勾选订单', 'err'); return; }
    exportRows('选中订单_' + stamp() + '.csv', ORDERS.filter(function (o) { return ids.indexOf(o.id) > -1; }));
  }

  function batchShip() {
    var ids = pickedOrders();
    if (!ids.length) { toast('请先在列表左侧勾选订单', 'err'); return; }

    // 原子预检：状态 + 库存，任何一条不满足就整批拒绝
    if (store) {
      var pre = store.preflightShip(ids);
      if (!pre.ok) {
        openModal({
          title: '无法发货（' + pre.problems.length + ' 个问题）',
          desc: '发货是原子操作：只要有一条不满足条件，整批都不会出库，也不会产生台账。',
          wide: true,
          body: '<div class="confirm-list">' + pre.problems.map(function (p) {
            return '<div class="confirm-row"><span>' + esc(p.message) + '</span></div>';
          }).join('') + '</div>' +
            '<div class="hint" style="margin-top:10px;font-size:12px;color:var(--muted)">库存不足的 SKU 可以先在库存页调拨，或到采购页补货。</div>',
          foot: '<button class="btn btn-ghost" data-action="close-modal">关闭</button>' +
            '<button class="btn btn-ghost" data-action="nav" data-route="inventory">去库存页</button>' +
            '<button class="btn btn-primary" data-action="nav" data-route="purchase">去补货</button>'
        });
        return;
      }
    }

    var rows = ORDERS.filter(function (o) { return ids.indexOf(o.id) > -1; });
    var total = rows.reduce(function (s, o) { return s + o.amount; }, 0);
    var whSet = {};
    rows.forEach(function (o) { whSet[o.wh || '杭州主仓'] = 1; });
    var whLabel = Object.keys(whSet).join('、');

    openModal({
      title: '批量发货（' + rows.length + ' 笔）',
      desc: '确认后生成一张出库单并扣减库存，物流单号实时回传对应平台店铺',
      body: '<div class="form-grid">' +
          '<div class="mfield full"><label>发货仓库</label><input value="' + esc(whLabel) + '" readonly>' +
            '<div class="hint">按订单所属仓库出库，库存从该仓扣减</div></div>' +
          '<div class="mfield full"><label>快递公司</label><select data-mf="carrier">' +
            ['顺丰速运', '中通快递', '圆通速递', '京东物流'].map(function (c) { return '<option>' + c + '</option>'; }).join('') +
          '</select></div>' +
          '<div class="mfield full"><label class="check" style="height:36px"><input type="checkbox" data-mf="print" checked> 发货后自动打印电子面单</label></div>' +
        '</div>' +
        '<div class="confirm-list">' + rows.map(function (o) {
          return '<div class="confirm-row"><span class="mono">' + o.id + '</span><span>' + o.buyer + '</span><b>' + money(o.amount) + '</b></div>';
        }).join('') + '</div>' +
        '<div class="confirm-sum"><span>合计 ' + rows.length + ' 笔</span><b>' + money(total) + '</b></div>',
      foot: '<button class="btn btn-ghost" data-action="close-modal">取消</button>' +
        '<button class="btn btn-primary" data-action="ship-confirm">确认发货</button>'
    });
  }

  function shipConfirm() {
    var v = modalValues();
    var ids = pickedOrders();
    if (!store) { toast('数据层未就绪，无法发货', 'err'); return false; }
    try {
      var res = store.ship(ids, { carrier: v.carrier, by: PROFILE.name });
      saveStore();
      syncFromStore();
      KPI[2].value = Math.max(0, Number(KPI[2].value) - ids.length);
      ui.sel = {};
      closeModal();
      renderMain();
      toast('已发货 ' + ids.length + ' 笔，出库单 ' + res.doc.id);
    } catch (e) {
      toast(e.message, 'err');
      return false;
    }
  }

  /* ---------- 动作分发表 ---------- */
  var ACTIONS = {
    'close-modal': function () { closeModal(); },
    'toggle-switch': function (el) {
      el.classList.toggle('on');
      el.setAttribute('aria-checked', el.classList.contains('on') ? 'true' : 'false');
    },
    'msel-clear': function (el) {
      var st = FILTERS[el.getAttribute('data-m')];
      if (st) { st.sel = {}; refreshList(el.getAttribute('data-m')); }
    },
    'export': function () { exportCurrent(); },
    'export-sel': function () { exportSelected(); },
    'sync': function (el) { doSync(el); },
    'batch-ship': function () { batchShip(); },
    'ship-confirm': function () { shipConfirm(); },
    'batch-agree': function () { batchAgreeAS(); },
    'batch-product': function () { bulkProduct(); },
    'batch-settle': function () { batchSettle(); },
    'as-rules': function () { asRulesModal(); },
    'as-rules-save': function () {
      var on = document.querySelectorAll('.modal .switch.on').length;
      closeModal();
      toast('售后规则已保存，启用 ' + on + ' 条自动规则');
    },
    'as-agree': function (el) {
      var id = el.getAttribute('data-id');
      var r = AFTERSALES.filter(function (x) { return x.id === id; })[0];
      if (!r) return;
      r.status = '退款中';
      closeDrawer();
      renderMain();
      toast('已同意售后 ' + id + '，退款 ' + money(r.amount) + ' 将在 1-3 个工作日到账');
    },
    'as-reject': function (el) {
      var id = el.getAttribute('data-id');
      var r = AFTERSALES.filter(function (x) { return x.id === id; })[0];
      if (!r) return;
      r.status = '已关闭';
      closeDrawer();
      renderMain();
      toast('已拒绝售后 ' + id + '，买家会收到平台通知');
    },
    'prod-new': function () { productForm(null); },
    'prod-import': function () { importModal(); },
    'import-template': function () {
      exportCSV('商品导入模板.csv',
        [{ a: '2026春季纯棉圆领T恤', b: '服饰 / 上装', c: '云织', d: '129', e: '500', f: '白色 / M|黑色 / L' }],
        [{ t: '商品名称', get: function (r) { return r.a; } },
         { t: '类目', get: function (r) { return r.b; } },
         { t: '品牌', get: function (r) { return r.c; } },
         { t: '售价', get: function (r) { return r.d; } },
         { t: '库存', get: function (r) { return r.e; } },
         { t: '规格', get: function (r) { return r.f; } }]);
    },
    'import-confirm': function () {
      var rows = window.__importRows;
      if (!rows || !rows.length) { toast('请先选择 CSV 文件', 'err'); return; }
      var codes = nextCodes(rows.length);
      rows.forEach(function (r, i) {
        PRODUCTS.unshift({
          code: codes[i], name: r.name, cat: r.cat, brand: r.brand,
          specs: r.specs.length ? r.specs : ['默认规格'],
          priceMin: r.price, priceMax: Math.round(r.price * 1.2 * 100) / 100,
          stock: r.stock, sales: 0, map: '0/3', status: '待上架', color: '#3568f0'
        });
      });
      closeModal();
      renderMain();
      toast('成功导入 ' + rows.length + ' 个商品，均为待上架');
    },
    'po-new': function () { poNewModal(); },
    'po-smart': function () { poSmartModal(); },
    'po-smart-run': function () {
      var rows = window.__poSug || [];
      if (!rows.length) { closeModal(); return; }
      var qty = rows.reduce(function (s, x) { return s + x.need; }, 0);
      PURCHASES.unshift({
        id: 'PO' + stamp() + (100 + PURCHASES.length),
        supplier: SUPPLIERS[0].name, kinds: rows.length, qty: qty,
        amount: Math.round(qty * 42 * 100) / 100, status: '待审核', time: '刚刚',
        eta: '预计 ' + dateStr(new Date(Date.now() + 7 * 864e5))
      });
      closeModal();
      renderMain();
      toast('已按补货建议生成采购单：' + rows.length + ' 种 / ' + qty + ' 件');
    },
    'po-audit': function (el) { poAudit(el.getAttribute('data-id')); },
    'po-view': function (el) { poView(el.getAttribute('data-id')); },
    'sup-new': function () { supNewModal(); },
    'inv-flow': function () { invFlowDrawer(INVENTORY[0].sku); },
    'inv-check': function () { closeDrawer(); invCheckModal(); },
    'inv-transfer': function () { invTransferModal(); },
    'logi-rules': function () { logiRulesModal(); },
    'logi-save': function () {
      var on = document.querySelectorAll('.modal .switch.on').length;
      closeModal();
      toast('物流预警设置已保存，启用 ' + on + ' 条规则');
    },
    'waybill-print': function () { waybillModal(); },
    'waybill-detail': function (el) { waybillDrawer(el.getAttribute('data-id')); },
    'copy-waybill': function (el) {
      var no = el.getAttribute('data-no');
      var done = function () { toast('运单号已复制：' + no); };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(no).then(done).catch(function () { toast('复制失败，请手动选中', 'err'); });
      } else {
        toast('当前浏览器不支持自动复制', 'err');
      }
    },
    'waybill-order': function (el) {
      var id = el.getAttribute('data-id');
      var ord = ORDERS.filter(function (o) { return o.id === id; })[0];
      closeDrawer();
      if (ord) { go('orders'); setTimeout(function () { openDrawer(id); }, 150); }
      else { go('orders'); toast('该订单不在当前列表前 8 条中，已跳转订单页'); }
    },
    'do-print': function () { doPrint(); },
    'shop-auth': function () { shopAuthModal(); },
    'dist-invite': function () { distInviteModal(); },
    'copy-link': function (el) { copyLink(el.getAttribute('data-link')); },
    'fin-import': function () { finImportModal(); },
    'fin-report': function () { finReportModal(); },
    'fin-report-export': function () {
      var rows = window.__finRows || [];
      exportCSV('利润报表_' + stamp() + '.csv', rows.map(function (x) {
        return { shop: x.r.shop, gmv: x.r.system, cost: x.cost, gross: x.gross, rate: x.rate.toFixed(1) + '%' };
      }), [
        { t: '店铺', get: function (r) { return r.shop; } },
        { t: '销售额', get: function (r) { return r.gmv; } },
        { t: '成本', get: function (r) { return r.cost; } },
        { t: '毛利', get: function (r) { return r.gross; } },
        { t: '毛利率', get: function (r) { return r.rate; } }
      ]);
    },
    'fin-reconcile': function (el) { finReconcile(el); },
    'fin-detail': function (el) { finDetail(el.getAttribute('data-id')); },
    'fin-diff-confirm': function (el) {
      var shop = el.getAttribute('data-shop');
      var row = FINANCE.filter(function (r) { return r.shop === shop; })[0];
      if (row) { row.system = row.platform; row.diff = 0; row.status = '已对平'; }
      closeModal();
      renderMain();
      toast('差异已确认并调账：' + shop);
    },
    'prod-edit': function (el) {
      var p = PRODUCTS.filter(function (x) { return x.code === el.getAttribute('data-code'); })[0];
      if (!p) return;
      closeDrawer();
      productForm(p);
    },
    'prod-map': function (el) {
      var p = PRODUCTS.filter(function (x) { return x.code === el.getAttribute('data-code'); })[0];
      if (!p) return;
      p.map = '3/3';
      if (p.status === '待上架') p.status = '在售';
      closeDrawer();
      renderMain();
      toast('已同步到 3 个平台店铺：' + p.name);
    },
    'prod-off': function (el) {
      var p = PRODUCTS.filter(function (x) { return x.code === el.getAttribute('data-code'); })[0];
      if (!p) return;
      p.status = p.status === '下架' ? '在售' : '下架';
      closeDrawer();
      renderMain();
      toast('商品已' + p.status + '：' + p.name);
    },
    'order-audit': function (el) {
      var o = ORDERS.filter(function (x) { return x.id === el.getAttribute('data-id'); })[0];
      if (!o) return;
      try {
        if (store) {
          var so = store.order(o.id);
          store.transition(so, '待发货', { by: PROFILE.name, note: '人工审核' });
          saveStore();
          syncFromStore();
        } else {
          o.status = '待发货';
        }
        closeDrawer();
        renderMain();
        toast('订单已审核通过，进入待发货队列');
      } catch (e) {
        toast(e.message, 'err');
      }
    },
    'order-ship': function (el) {
      var o = ORDERS.filter(function (x) { return x.id === el.getAttribute('data-id'); })[0];
      if (!o) return;
      if (!store) { toast('数据层未就绪', 'err'); return; }
      try {
        var res = store.ship([o.id], { carrier: '顺丰速运', by: PROFILE.name });
        saveStore();
        syncFromStore();
        KPI[2].value = Math.max(0, Number(KPI[2].value) - 1);
        closeDrawer();
        renderMain();
        toast('已发货，出库单 ' + res.doc.id + '，单号 ' + o.express.split(' ')[1]);
      } catch (e) {
        toast(e.message, 'err');
      }
    },
    'member-new': function () { memberNewModal(); },
    'reset-demo': function () {
      openConfirmModal({
        title: '重置演示数据',
        desc: '会清空浏览器里保存的订单状态、库存台账与单据，恢复到初始演示数据。此操作不可撤销。',
        submitText: '确认重置',
        danger: true,
        list: ['订单状态与物流单号', '库存数量与全部台账', '出库 / 调拨 / 盘点单据'],
        onConfirm: function () {
          try { localStorage.removeItem(STATE_KEY); } catch (e) { /* ignore */ }
          if (SEED_SNAPSHOT) {
            try {
              var snap = JSON.parse(SEED_SNAPSHOT);
              ORDERS.length = 0;
              snap.orders.forEach(function (o) { ORDERS.push(o); });
              INVENTORY.length = 0;
              snap.inv.forEach(function (r) { INVENTORY.push(r); });
              snap.kpi.forEach(function (v, i) { if (KPI[i]) KPI[i].value = v; });
            } catch (e) { /* ignore */ }
          }
          store = null;
          storeLoaded = false;
          synthSeq = 0;
          initStore();
          ui.sel = {};
          render();
          toast('演示数据已重置');
        }
      });
    },
    'profile-edit': function () { profileEditModal(); },
    'pwd-change': function () { pwdModal(); },
    'toggle-notif': function () {
      ui.notifOpen = !ui.notifOpen;
      var nw = $('#notif-wrap');
      if (nw) nw.classList.toggle('open', ui.notifOpen);
      var uw = $('#user-wrap');
      if (uw) uw.classList.remove('open');
      ui.userOpen = false;
    },
    'notif-open': function (el) {
      var n = NOTIFS.filter(function (x) { return x.id === el.getAttribute('data-id'); })[0];
      if (!n) return;
      n.read = true;
      ui.notifOpen = false;
      render();
      go(n.route);
    },
    'notif-read-all': function () {
      NOTIFS.forEach(function (n) { n.read = true; });
      ui.notifOpen = false;
      render();
      toast('已全部标记为已读');
    },
    'search-open': function (el) {
      var route = el.getAttribute('data-route');
      var drawer = el.getAttribute('data-drawer');
      var id = el.getAttribute('data-id');
      closeModal();
      go(route);
      setTimeout(function () {
        if (drawer === 'order') openDrawer(id);
        else if (drawer === 'product') openProduct(id);
        else if (drawer === 'as') openAftersale(id);
      }, 130);
    },
    'toggle-2fa': function () {
      PROFILE.twofa = !PROFILE.twofa;
      saveProfile();
      renderMain();
      toast('二次验证已' + (PROFILE.twofa ? '开启' : '关闭'));
    },
    'toggle-alert': function () {
      PROFILE.alert = !PROFILE.alert;
      saveProfile();
      renderMain();
      toast('异地登录提醒已' + (PROFILE.alert ? '开启' : '关闭'));
    },
    'logout-device': function (el) {
      var i = Number(el.getAttribute('data-i'));
      var log = LOGIN_LOGS[i];
      if (!log) return;
      LOGIN_LOGS.splice(i, 1);
      renderMain();
      toast('已退出该设备：' + log.dev);
    },
    'logout-others': function () {
      var n = LOGIN_LOGS.filter(function (l) { return !l.cur; }).length;
      if (!n) { toast('没有其他在线设备'); return; }
      LOGIN_LOGS = LOGIN_LOGS.filter(function (l) { return l.cur; });
      renderMain();
      toast('已退出 ' + n + ' 台其他设备');
    }
  };

  /* ---------- 渲染 ---------- */
  function render() {
    $('#app').innerHTML = session ? shellHTML() : loginHTML();
    if (session) renderMain();
  }

  function renderMain() {
    var el = $('#main-content');
    if (!el) return;
    if (ui.route === 'dashboard') el.innerHTML = dashboardHTML();
    else if (ui.route === 'orders') el.innerHTML = ordersHTML();
    else if (ui.route === 'settings') el.innerHTML = settingsHTML();
    else if (ui.route === 'profile') el.innerHTML = profileHTML();
    else if (MODULES[ui.route]) el.innerHTML = modPageHTML(MODULES[ui.route]);
    else el.innerHTML = placeholderHTML(ui.route);
    syncChrome();
  }

  function syncChrome() {
    var items = document.querySelectorAll('.nav-item');
    for (var i = 0; i < items.length; i++) {
      items[i].classList.toggle('active', items[i].getAttribute('data-route') === ui.route);
    }
    var crumb = ROUTE_TITLE[ui.route] || ['概览', '工作台'];
    var c = $('.crumbs');
    if (c) c.innerHTML = '<span>' + crumb[0] + '</span><span class="sep">/</span><span class="cur">' + crumb[1] + '</span>';
  }

  function go(route) {
    if (!ROUTE_TITLE[route]) route = 'dashboard';
    closeDrawer();
    ui.route = route;
    ui.page = 1;
    if (location.hash !== '#/' + route) location.hash = '#/' + route;
    renderMain();
    var c = $('#main-content');
    if (c) window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  /* ---------- 登录逻辑 ---------- */
  function setFieldError(id, on) {
    var f = $('#' + id);
    if (f) f.classList.toggle('invalid', !!on);
  }

  function doLogin() {
    var uEl = $('#username'), pEl = $('#password');
    if (!uEl || !pEl) return;
    var u = uEl.value.trim(), p = pEl.value;
    var ok = true;
    setFieldError('f-user', false);
    setFieldError('f-pass', false);
    if (!u) { setFieldError('f-user', true); ok = false; }
    if (!p) { setFieldError('f-pass', true); ok = false; }
    if (!ok) {
      var card = $('.login-card');
      card.classList.remove('shake');
      void card.offsetWidth;
      card.classList.add('shake');
      return;
    }

    var err = $('#form-error');
    if (err) err.classList.remove('show');
    var btn = $('#login-btn');
    btn.disabled = true;
    btn.innerHTML = '<span class="spinner"></span>登录中…';

    setTimeout(function () {
      if (u === CREDS.username && p === CREDS.password) {
        session = { username: u, name: '管理员', at: Date.now() };
        try {
          localStorage.setItem(SESSION_KEY, JSON.stringify(session));
          if ($('#remember').checked) localStorage.setItem('jy_erp_last_user', u);
          else localStorage.removeItem('jy_erp_last_user');
        } catch (e) { /* ignore */ }
        ui.route = 'dashboard';
        if (location.hash !== '#/dashboard') location.hash = '#/dashboard';
        render();
        toast('登录成功，欢迎回来');
      } else {
        btn.disabled = false;
        btn.textContent = '登 录';
        if (err) err.classList.add('show');
        pEl.value = '';
        pEl.focus();
        var card = $('.login-card');
        card.classList.remove('shake');
        void card.offsetWidth;
        card.classList.add('shake');
      }
    }, 650);
  }

  function logout() {
    session = null;
    try { localStorage.removeItem(SESSION_KEY); } catch (e) { /* ignore */ }
    location.hash = '#/';
    render();
    toast('已退出登录');
  }

  /* ---------- 事件 ---------- */
  document.addEventListener('submit', function (e) {
    if (e.target && e.target.id === 'login-form') {
      e.preventDefault();
      doLogin();
    }
  });

  document.addEventListener('input', function (e) {
    var t = e.target;
    if (!t) return;
    if (t.id === 'username' || t.id === 'password') {
      var f = t.closest('.field');
      if (f) f.classList.remove('invalid');
      var err = $('#form-error');
      if (err) err.classList.remove('show');
    }
    if (t.id === 'order-kw') {
      ui.kw = t.value;
      ui.page = 1;
      var list = $('#orders-list');
      if (list) list.innerHTML = ordersListHTML();
    }
    if (t.hasAttribute && t.hasAttribute('data-f')) {
      var mk = t.getAttribute('data-m');
      var st = FILTERS[mk];
      if (st) {
        st[t.getAttribute('data-f')] = t.value;
        st.page = 1;
        refreshList(mk);
      }
    }
  });

  document.addEventListener('change', function (e) {
    var t = e.target;
    if (!t) return;
    if (t.id === 'order-status') { ui.status = t.value; ui.page = 1; $('#orders-list').innerHTML = ordersListHTML(); }
    if (t.id === 'order-plat') { ui.plat = t.value; ui.page = 1; $('#orders-list').innerHTML = ordersListHTML(); }

    if (t.hasAttribute && t.hasAttribute('data-cb-all')) {
      var mall = t.getAttribute('data-m');
      if (mall === 'orders') {
        var rows = filteredOrders();
        var start = (ui.page - 1) * PAGE_SIZE;
        rows.slice(start, start + PAGE_SIZE).forEach(function (o) { ui.sel[o.id] = t.checked; });
        var list = $('#orders-list');
        if (list) list.innerHTML = ordersListHTML();
      } else if (MODULES[mall]) {
        var cfgm = MODULES[mall];
        var stm = fstate(mall, cfgm.filters);
        var size = cfgm.pageSize || 8;
        var rr = filterRows(cfgm.rows, stm, cfgm.filters);
        rr.slice((stm.page - 1) * size, (stm.page - 1) * size + size).forEach(function (r) {
          stm.sel[rowKey(r)] = t.checked;
        });
        refreshList(mall);
      }
      return;
    }

    if (t.hasAttribute && t.hasAttribute('data-cb')) {
      var mc = t.getAttribute('data-m');
      var key = t.getAttribute('data-cb');
      if (mc === 'orders') {
        ui.sel[key] = t.checked;
        var list2 = $('#orders-list');
        if (list2) list2.innerHTML = ordersListHTML();
      } else if (mc && FILTERS[mc]) {
        FILTERS[mc].sel[key] = t.checked;
        refreshList(mc);
      }
    }

    if (t.hasAttribute && t.hasAttribute('data-f')) {
      var mk2 = t.getAttribute('data-m');
      var st2 = FILTERS[mk2];
      if (st2) {
        st2[t.getAttribute('data-f')] = t.value;
        st2.page = 1;
        refreshList(mk2);
      }
    }
  });

  document.addEventListener('click', function (e) {
    if (e.target && e.target.classList && e.target.classList.contains('modal-mask')) { closeModal(); return; }
    if (e.target && e.target.closest && e.target.closest('input[type="checkbox"]')) return;

    var target = e.target.closest ? e.target.closest('[data-action]') : null;

    if (!target) {
      var wrap = $('#user-wrap');
      if (wrap && !e.target.closest('#user-wrap')) {
        wrap.classList.remove('open');
        ui.userOpen = false;
      }
      var nwrap = $('#notif-wrap');
      if (nwrap && !e.target.closest('#notif-wrap')) {
        nwrap.classList.remove('open');
        ui.notifOpen = false;
      }
      return;
    }

    var action = target.getAttribute('data-action');

    switch (action) {
      case 'toggle-pass': {
        var inp = $('#password');
        if (!inp) return;
        var show = inp.type === 'password';
        inp.type = show ? 'text' : 'password';
        target.innerHTML = icon(show ? 'eyeOff' : 'eye', 17);
        target.setAttribute('title', show ? '隐藏密码' : '显示密码');
        break;
      }
      case 'fill-demo': {
        var u = $('#username'), p = $('#password');
        u.value = CREDS.username;
        p.value = CREDS.password;
        setFieldError('f-user', false);
        setFieldError('f-pass', false);
        var err2 = $('#form-error');
        if (err2) err2.classList.remove('show');
        toast('已填入测试账号，点击登录即可');
        break;
      }
      case 'forgot':
        e.preventDefault();
        toast('演示环境：请联系管理员重置密码', 'err');
        break;
      case 'toggle-collapse': {
        ui.collapsed = !ui.collapsed;
        saveUi();
        var shell = $('.shell');
        if (shell) shell.classList.toggle('collapsed', ui.collapsed);
        break;
      }
      case 'nav': {
        e.preventDefault();
        var uw = $('#user-wrap');
        if (uw) uw.classList.remove('open');
        ui.userOpen = false;
        go(target.getAttribute('data-route'));
        break;
      }
      case 'toggle-user': {
        var w = $('#user-wrap');
        ui.userOpen = !w.classList.contains('open');
        w.classList.toggle('open', ui.userOpen);
        break;
      }
      case 'logout':
        logout();
        break;
      case 'notice':
        toast('6 条通知：3 笔订单超时未发货');
        break;
      case 'sync':
        doSync(target);
        break;
      case 'range': {
        ui.range = Number(target.getAttribute('data-range'));
        renderMain();
        break;
      }
      case 'page': {
        var p2 = Number(target.getAttribute('data-page'));
        var rows = filteredOrders();
        var pages = Math.max(1, Math.ceil(rows.length / PAGE_SIZE));
        if (p2 < 1 || p2 > pages) return;
        ui.page = p2;
        var l2 = $('#orders-list');
        if (l2) l2.innerHTML = ordersListHTML();
        break;
      }
      case 'reset-filter': {
        ui.kw = ''; ui.status = '全部'; ui.plat = '全部'; ui.page = 1;
        renderMain();
        toast('已重置筛选条件');
        break;
      }
      case 'export':
        exportCurrent();
        break;
      case 'clear-sel': {
        ui.sel = {};
        var l3 = $('#orders-list');
        if (l3) l3.innerHTML = ordersListHTML();
        break;
      }
      case 'new-product':
        productForm(null);
        break;
      case 'open-order':
        openDrawer(target.getAttribute('data-id'));
        break;
      case 'close-drawer':
        closeDrawer();
        break;
      case 'drawer-demo':
        toast('演示环境：' + target.getAttribute('data-label') + '操作未接入后端', 'err');
        break;
      case 'more':
        toast('更多操作菜单占位');
        break;
      case 'info':
        toast(target.getAttribute('data-msg') || '演示环境：该功能未接入后端');
        break;
      case 'mreset': {
        var mkr = target.getAttribute('data-m');
        var cfgr = MODULES[mkr];
        if (!cfgr) break;
        var str = fstate(mkr, cfgr.filters);
        str.kw = '';
        str.page = 1;
        str.sel = {};
        cfgr.filters.forEach(function (f) { if (f.key !== 'kw') str[f.key] = f.options[0]; });
        renderMain();
        break;
      }
      case 'mpage': {
        var mkm = target.getAttribute('data-m');
        var cfgm = MODULES[mkm];
        if (!cfgm) break;
        var stm = fstate(mkm, cfgm.filters);
        var target4 = Number(target.getAttribute('data-page'));
        var totalRow = filterRows(cfgm.rows, stm, cfgm.filters).length;
        var totalPage = Math.max(1, Math.ceil(totalRow / (cfgm.pageSize || 8)));
        if (target4 < 1 || target4 > totalPage) return;
        stm.page = target4;
        refreshList(mkm);
        break;
      }
      case 'mrow': {
        var mrow = target.getAttribute('data-m');
        var idrow = target.getAttribute('data-id');
        if (mrow === 'aftersale') openAftersale(idrow);
        else if (mrow === 'products') openProduct(idrow);
        else if (mrow === 'inventory') invFlowDrawer(idrow);
        else if (mrow === 'logistics') waybillDrawer(idrow);
        break;
      }
      case 'modal-submit': {
        if (!modalState || typeof modalState.onSubmit !== 'function') { closeModal(); break; }
        var vals = modalValues();
        if (modalState.fields) {
          for (var fi = 0; fi < modalState.fields.length; fi++) {
            var ff = modalState.fields[fi];
            if (ff.required && !String(vals[ff.key] == null ? '' : vals[ff.key]).trim()) {
              toast('请填写「' + ff.label + '」', 'err');
              return;
            }
          }
        }
        var ret = modalState.onSubmit(vals);
        if (ret === false) return;
        closeModal();
        break;
      }
      case 'not-ready':
        toast('已记录，感谢反馈！');
        break;
      default:
        if (ACTIONS[action]) ACTIONS[action](target, action);
        break;
    }
  });

  /* 图表 tooltip */
  document.addEventListener('mousemove', function (e) {
    if (!chartState) return;
    var plot = $('#chart-plot');
    if (!plot || !plot.contains(e.target)) { hideTip(); return; }
    var svg = plot.querySelector('svg');
    if (!svg) return;
    var rect = svg.getBoundingClientRect();
    if (!rect.width) return;
    var vbX = ((e.clientX - rect.left) / rect.width) * chartState.W;
    var st = chartState;
    var ratio = (vbX - st.P.l) / st.iw;
    var idx = Math.round(ratio * (st.n - 1));
    if (idx < 0) idx = 0;
    if (idx > st.n - 1) idx = st.n - 1;

    var tip = $('#chart-tip');
    if (!tip) return;
    tip.innerHTML = '<b>' + st.data.labels[idx] + '</b>' +
      '<div class="row" style="margin-top:4px"><i style="background:' + PRIMARY + '"></i>销售额 ' + money(st.data.sales[idx] * 10000, 0) + '</div>' +
      '<div class="row"><i style="background:' + PURPLE + '"></i>订单量 ' + num(st.data.orders[idx]) + ' 单</div>';
    var px = (st.xAt(idx) / st.W) * rect.width;
    var py = (st.yS(st.data.sales[idx]) / st.H) * rect.height;
    tip.style.left = px + 'px';
    tip.style.top = py + 'px';
    tip.classList.add('on');
  });

  function hideTip() {
    var tip = $('#chart-tip');
    if (tip) tip.classList.remove('on');
  }
  document.addEventListener('mouseleave', hideTip);

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Enter' && e.target && e.target.id === 'global-search') {
      globalSearchModal(e.target.value);
      return;
    }
    if (e.key === 'Escape') {
      var mr = modalRoot();
      if (mr && mr.querySelector('.modal-mask.on')) { closeModal(); return; }
      closeDrawer();
      var w = $('#user-wrap');
      if (w) w.classList.remove('open');
    }
  });

  window.addEventListener('hashchange', function () {
    if (!session) return;
    var r = (location.hash || '').replace(/^#\/?/, '') || 'dashboard';
    if (r === ui.route) return;
    if (!ROUTE_TITLE[r]) r = 'dashboard';
    ui.route = r;
    ui.page = 1;
    closeDrawer();
    renderMain();
  });

  /* ---------- 启动 ---------- */
  var initial = (location.hash || '').replace(/^#\/?/, '');
  if (ROUTE_TITLE[initial]) ui.route = initial;
  if (session && !ROUTE_TITLE[ui.route]) ui.route = 'dashboard';

  initStore();
  render();

  if (!session) {
    var remembered = null;
    try { remembered = localStorage.getItem('jy_erp_last_user'); } catch (e3) { /* ignore */ }
    var uEl2 = $('#username');
    if (remembered && uEl2) { uEl2.value = remembered; var rm = $('#remember'); if (rm) rm.checked = true; }
    var rEl = $('#remember');
    if (rEl && remembered) rEl.checked = true;
    if (uEl2) setTimeout(function () { uEl2.focus(); }, 200);
  }
})();
