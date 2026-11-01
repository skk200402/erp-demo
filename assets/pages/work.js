/**
 * s1 ERP · 页面：平台对接 / 扫码作业（PDA）
 * ---------------------------------------------------------------
 * app.js 已去掉 IIFE，顶层状态（ORDERS / sync / store / role …）都是全局，
 * 页面文件只负责渲染，事件统一走 data-action 交给 app.js 的 ACTIONS。
 */
  function platformHTML() {
    var st = sync ? sync.stats() : { total: 0, pending: 0, done: 0, dead: 0, retrying: 0 };
    var jobs = sync ? sync.jobs.slice().reverse().slice(0, 20) : [];
    var logs = sync ? sync.logs.slice(0, 12) : [];

    var shopRows = SHOPS.map(function (s) {
      var okCount = 0, failCount = 0;
      (sync ? sync.jobs : []).forEach(function (j) {
        var ps = (j.payload && j.payload.shop) || '';
        if (ps && (s.name.indexOf(ps) > -1 || ps.indexOf(s.name) > -1)) {
          if (j.status === 'done') okCount++;
          if (j.status === 'dead') failCount++;
        }
      });
      return '<tr><td>' + platDot(s.plat) + '<div class="cell-sub">' + s.name + '</div></td>' +
        '<td>' + tag(s.auth, SHOP_COLOR[s.auth]) + '</td>' +
        '<td class="cell-sub" style="margin:0">' + s.sync + '</td>' +
        '<td class="t-right num">' + okCount + '</td>' +
        '<td class="t-right num" style="color:' + (failCount ? '#d92d20' : 'var(--muted)') + '">' + failCount + '</td></tr>';
    }).join('');

    var jobRows = jobs.length ? jobs.map(function (j) {
      var statusTag = j.status === 'done' ? tag('已送达', 'green')
        : j.status === 'dead' ? tag('死信', 'red')
          : (j.attempts > 0 ? tag('重试中', 'orange') : tag('待发送', 'gray'));
      return '<tr><td class="mono" style="font-size:11.5px">' + j.id + '</td>' +
        '<td>' + esc(JOB_LABEL[j.type] || j.type) + '<div class="cell-sub">' + esc(j.ref || '—') + '</div></td>' +
        '<td>' + statusTag + '</td>' +
        '<td class="t-right num">' + j.attempts + '</td>' +
        '<td class="cell-sub" style="margin:0">' + (j.status === 'pending' && j.nextAt ? fmtTs(new Date(j.nextAt).toISOString()) : '—') + '</td>' +
        '<td style="color:' + (j.lastError ? '#b42318' : 'var(--muted)') + ';max-width:210px;font-size:12px">' + esc(j.lastError || '—') + '</td>' +
        '<td class="t-right">' + (j.status === 'dead' ? '<button class="link" style="font-size:12.5px" data-action="sync-retry" data-id="' + j.id + '">重试</button>' : '') + '</td></tr>';
    }).join('') : '<tr><td colspan="7"><div class="empty" style="padding:26px"><h3 style="font-size:13px">队列为空</h3><p style="font-size:12px">发货、调拨、同步订单后，这里会出现推送到平台的任务</p></div></td></tr>';

    var logRows = logs.length ? logs.map(function (l) {
      var color = l.kind === 'dead' ? '#d92d20' : l.kind === 'retry' ? '#b54708' : l.kind === 'success' ? '#06894e' : 'var(--muted)';
      return '<div class="log-row"><span class="mono" style="font-size:11px;color:#94a3b8;min-width:92px">' + fmtTs(new Date(l.at).toISOString()) + '</span>' +
        '<b class="mono" style="font-size:11.5px">' + l.job + '</b>' +
        '<span style="flex:1;color:var(--text-2);font-size:12px">' + esc(l.msg) + '</span>' +
        '<span style="color:' + color + ';font-size:11.5px">' + esc(l.kind) + '</span></div>';
    }).join('') : '<div class="empty" style="padding:22px"><p style="font-size:12px">暂无日志</p></div>';

    return '<div class="page-head">' +
        '<div><h1>平台对接</h1><p class="desc">订单抓取与状态回传的任务队列，支持限流退避、幂等去重与死信重试</p></div>' +
        '<div class="head-actions">' +
          '<button class="btn btn-ghost" data-action="sync-mode" data-mode="flaky">模拟限流</button>' +
          '<button class="btn btn-ghost" data-action="sync-mode" data-mode="down">模拟断网</button>' +
          '<button class="btn btn-ghost" data-action="sync-mode" data-mode="normal">恢复正常</button>' +
          '<button class="btn btn-primary" data-action="sync-drain">' + icon('refresh', 15) + '立即同步</button>' +
        '</div>' +
      '</div>' +
      '<div class="conn-bar">' +
        '<span class="conn-tag">传输</span>' +
        '<button class="seg' + (CONN.mode === 'demo' ? ' on' : '') + '" data-action="conn-mode" data-mode="demo">演示</button>' +
        '<button class="seg' + (CONN.mode === 'http' ? ' on' : '') + '" data-action="conn-mode" data-mode="http">真实 HTTP</button>' +
        '<input id="conn-url" class="conn-in" value="' + esc(CONN.url || '') + '" placeholder="接口地址（POST）">' +
        '<input id="conn-token" class="conn-in" style="max-width:150px" value="' + esc(CONN.token || '') + '" placeholder="密钥（可选）">' +
        '<button class="btn btn-ghost" data-action="conn-save">保存</button>' +
        '<button class="btn btn-ghost" data-action="conn-test">测试连接</button>' +
      '</div>' +
      '<div class="conn-hint">' + (CONN.mode === 'http'
        ? '真实模式：点「立即同步」会向上述地址发送 POST 请求，按 HTTP 状态码决定重试'
        : '演示模式：本地模拟返回 200 / 429 / 502 / 超时，不发出网络请求') + '</div>' +
      '<div class="stat-strip">' +
        '<div class="stat"><span class="stat-ico" style="background:#eef3ff;color:#3568f0">' + icon('clock', 17) + '</span><div class="stat-txt"><span>待发送</span><b>' + st.pending + '<small>个</small></b></div></div>' +
        '<div class="stat"><span class="stat-ico" style="background:#fff5e6;color:#f79009">' + icon('refresh', 17) + '</span><div class="stat-txt"><span>重试中</span><b>' + st.retrying + '<small>个</small></b></div></div>' +
        '<div class="stat"><span class="stat-ico" style="background:#e8f9f0;color:#12b76a">' + icon('check', 17) + '</span><div class="stat-txt"><span>已送达</span><b>' + st.done + '<small>个</small></b></div></div>' +
        '<div class="stat"><span class="stat-ico" style="background:#feecea;color:#f04438">' + icon('alert', 17) + '</span><div class="stat-txt"><span>死信</span><b>' + st.dead + '<small>个</small></b></div></div>' +
      '</div>' +
      '<div class="grid-2">' +
        '<section class="card"><div class="card-head" style="padding-bottom:12px"><h3>任务队列<span class="hint">最近 20 条</span></h3>' +
          (st.dead ? '<button class="btn btn-ghost" style="height:28px;font-size:12px" data-action="sync-retry-all">重试全部死信</button>' : '') + '</div>' +
          '<div class="tb-wrap"><table class="tb"><thead><tr><th>任务</th><th>类型 / 关联</th><th>状态</th><th class="t-right">尝试</th><th>下次重试</th><th>错误</th><th class="t-right">操作</th></tr></thead>' +
          '<tbody>' + jobRows + '</tbody></table></div></section>' +
        '<section class="card"><div class="card-head" style="padding-bottom:12px"><h3>店铺连接</h3><span class="hint">' + (NET_MODE === 'normal' ? '网络正常' : NET_MODE === 'flaky' ? '限流注入中' : '断网模拟中') + '</span></div>' +
          '<div class="tb-wrap"><table class="tb"><thead><tr><th>店铺</th><th>授权</th><th>最后同步</th><th class="t-right">送达</th><th class="t-right">失败</th></tr></thead>' +
          '<tbody>' + shopRows + '</tbody></table></div>' +
          '<div class="card-body" style="padding-top:2px"><div class="sec-t">最近日志</div><div class="log-box">' + logRows + '</div></div></section>' +
      '</div>';
  }

  function pdaHTML() {
    var list = ORDERS.filter(function (o) { return o.status === '待发货'; }).slice(0, 8);
    var cards = list.length ? list.map(function (o) {
      return '<div class="pda-card" data-order="' + o.id + '">' +
        '<div class="pda-row"><b class="mono">' + o.id + '</b>' + statusTag(o.status) + '</div>' +
        '<div class="pda-row"><span>' + esc(o.buyer) + ' · ' + esc(o.shop) + '</span><b>' + money(o.amount) + '</b></div>' +
        '<div class="pda-sub">' + o.items.map(function (it) { return esc(it.name) + ' ×' + it.qty; }).join('，') + '</div>' +
        (can('order.ship')
          ? '<button class="pda-btn" data-action="pda-ship" data-id="' + o.id + '">确认发货</button>'
          : '<button class="pda-btn ghost" disabled>无发货权限</button>') +
        '</div>';
    }).join('') : '<div class="empty" style="padding:40px"><h3>没有待发货订单</h3><p>先在订单页审单</p></div>';

    return '<div class="pda">' +
        '<div class="pda-head"><div><b>扫码作业</b><span>' + role().label + ' · 杭州主仓</span></div>' +
          '<div style="display:flex;align-items:center;gap:12px">' +
            '<button class="pda-back" data-action="nav" data-route="orders">返回</button>' +
            '<span class="pda-dot"></span></div></div>' +
        '<div class="pda-scan"><input id="pda-input" placeholder="扫描 / 输入订单号" autocomplete="off">' +
          '<button data-action="pda-scan">查找</button></div>' +
        '<div class="pda-hint">待发货 ' + list.length + ' 笔 · 扫描订单号可定位</div>' +
        '<div class="pda-list">' + cards + '</div>' +
      '</div>';
  }
