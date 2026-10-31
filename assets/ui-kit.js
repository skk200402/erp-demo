/**
 * s1 ERP · UI 内核
 * ---------------------------------------------------------------
 * 图标、格式化、Toast、弹窗、抽屉、打印用的小工具。
 * 以全局函数形式暴露，页面文件可以直接调用（无需构建步骤）。
 */
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


  function showDrawer(html) {
    var root = $('#drawer-root');
    root.innerHTML = html;
    var dw = $('.drawer', root), ov = $('.overlay', root);
    void root.offsetWidth; /* 强制重排，确保过渡从关闭态开始 */
    if (ov) ov.classList.add('on');
    if (dw) dw.classList.add('on');
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

  function fmtTs(iso) {
    if (!iso) return '—';
    var d = new Date(iso);
    if (isNaN(d.getTime())) return String(iso).slice(0, 16).replace('T', ' ');
    return pad2(d.getMonth() + 1) + '-' + pad2(d.getDate()) + ' ' + pad2(d.getHours()) + ':' + pad2(d.getMinutes());
  }

  function binOf(sku, wh) {
    var n = 0;
    for (var i = 0; i < sku.length; i++) n = (n * 31 + sku.charCodeAt(i)) % 997;
    var zone = ['A', 'B', 'C'][n % 3];
    return wh.slice(0, 2) + '-' + zone + pad2((n % 20) + 1) + '-' + pad2((n % 6) + 1);
  }

/* 单元格 / 标签 / 缩略图 / 检索索引 */
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
