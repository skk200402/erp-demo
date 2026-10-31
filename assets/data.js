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
    ['SO202610310009', '抖音小店', '抖音旗舰店', '白露微', '售后中', '今天 08:56', [['轻薄羽绒马甲', '黑色 / S', 1, 429]], '商品有瑕疵，申请换货'],
    ['SO202610310010', '淘宝天猫', '旗舰店', '王砚舟', '待审核', '今天 15:02', [['轻量跑步鞋 Aerolite', '黑 / 42', 1, 469]], '地址只填到小区'],
    ['SO202610310011', '京东', '京东自营店', '李墨', '待审核', '今天 15:18', [['真丝方巾 · 云纹', '藏青 / 65cm', 1, 199]], '']
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
    { id: 'AS202610310031', order: 'SO202610310004', plat: '淘宝天猫', shop: '旗舰店', buyer: '苏亦然', type: '退货退款', amount: 599, reason: '尺码不合适', status: '待审核', time: '今天 12:32', deadline: '剩 1 天 4 小时' },
    { id: 'AS202610310030', order: 'SO202610310009', plat: '抖音小店', shop: '抖音旗舰店', buyer: '白露微', type: '换货', amount: 429, reason: '商品有瑕疵', status: '待买家退货', time: '今天 09:12', deadline: '剩 2 天 6 小时' },
    { id: 'AS202610300028', order: 'SO202610300116', plat: '淘宝天猫', shop: '旗舰店', buyer: '陆听白', type: '仅退款', amount: 239, reason: '未按约定时间发货', status: '退款中', time: '昨天 19:40', deadline: '剩 6 小时' },
    { id: 'AS202610300027', order: 'SO202610300118', plat: '拼多多', shop: '拼多多店', buyer: '黄一诺', type: '补发', amount: 79, reason: '少件 / 漏发', status: '待收货', time: '昨天 16:20', deadline: '剩 3 天' },
    { id: 'AS202610300026', order: 'SO202610300115', plat: '京东', shop: '京东自营店', buyer: '江晚棠', type: '退货退款', amount: 399, reason: '七天无理由', status: '已完成', time: '昨天 11:05', deadline: '—' },
    { id: 'AS202610300025', order: 'SO202610300114', plat: '有赞', shop: '小程序商城', buyer: '叶南乔', type: '仅退款', amount: 336, reason: '拍错 / 多拍', status: '已完成', time: '昨天 10:18', deadline: '—' },
    { id: 'AS202610290024', order: 'SO202610310008', plat: '淘宝天猫', shop: '旗舰店', buyer: '沈泽川', type: '退货退款', amount: 478, reason: '商品与描述不符', status: '待收货', time: '10-29 15:22', deadline: '剩 2 天' },
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
    { sku: 'P10088-01', name: '真丝方巾 · 云纹 藏青 / 65cm', wh: '杭州主仓', avail: 96, lock: 6, transit: 80, safety: 60, status: '正常', time: '12 分钟前' },
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
