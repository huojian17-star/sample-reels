// Standalone i18n engine
(function() {
  var LANG = localStorage.getItem('site-lang') || 'zh';
  
  var M = {};
  M['nav-about']={zh:'关于',en:'About'}; M['nav-bilibili']={zh:'B站',en:'Bilibili'};
  M['nav-worldbuilding']={zh:'设定集',en:'World'}; M['nav-novel']={zh:'小说',en:'Novel'};
  M['nav-game-design']={zh:'游戏设计',en:'Game Design'}; M['nav-game-analysis']={zh:'游戏拆解',en:'Analysis'};
  M['nav-script-analysis']={zh:'文案拆解',en:'Scripts'}; M['nav-gaming']={zh:'游戏经历',en:'Gaming'};
  M['nav-brand']={zh:'BEST-辣椒',en:'BEST-Chili'}; M['lang-label']={zh:'EN',en:'中'};
  M['back-home']={zh:'← 返回首页',en:'← Back Home'}; M['footer-text']={zh:'BEST-辣椒 © 2026',en:'BEST-Chili © 2026'};
  M['t-title']={zh:'测试',en:'Test'}; M['t-h1']={zh:'i18n 引擎测试',en:'i18n Engine Test'};
  M['t-p1']={zh:'如果 EN 按钮出现在右上角，引擎已加载。',en:'If the EN button appears, the engine loaded.'};
  M['t-p2']={zh:'点 EN 切换英文。',en:'Click EN to switch to English.'};

  function t(key) {
    var entry = M[key];
    if (!entry) return key;
    return entry[LANG] || entry['zh'] || key;
  }

  function apply() {
    var els = document.querySelectorAll('[data-i18n]');
    for (var i = 0; i < els.length; i++) {
      var key = els[i].getAttribute('data-i18n');
      els[i].textContent = t(key);
    }
    var phs = document.querySelectorAll('[data-i18n-placeholder]');
    for (var j = 0; j < phs.length; j++) {
      phs[j].placeholder = t(phs[j].getAttribute('data-i18n-placeholder'));
    }
    var btn = document.getElementById('lang-toggle');
    if (btn) btn.textContent = t('lang-label');
    var titleEl = document.querySelector('title[data-i18n]');
    if (titleEl) document.title = t(titleEl.getAttribute('data-i18n'));
    localStorage.setItem('site-lang', LANG);
  }

  function toggle() {
    LANG = LANG === 'zh' ? 'en' : 'zh';
    apply();
  }

  document.addEventListener('DOMContentLoaded', function() {
    var btn = document.createElement('button');
    btn.id = 'lang-toggle';
    btn.textContent = t('lang-label');
    btn.style.cssText = 'position:fixed;top:12px;right:20px;z-index:9999;background:var(--bg-card,#fff);border:1px solid var(--border,#ccc);padding:4px 12px;border-radius:4px;font-size:12px;color:var(--text-dim,#666);cursor:pointer;font-family:inherit;letter-spacing:1px;box-shadow:0 2px 8px rgba(0,0,0,0.08);';
    btn.onmouseenter = function() { this.style.color = 'var(--accent,#a98446)'; this.style.borderColor = 'var(--accent,#a98446)'; };
    btn.onmouseleave = function() { this.style.color = 'var(--text-dim,#666)'; this.style.borderColor = 'var(--border,#ccc)'; };
    btn.onclick = toggle;
    document.body.appendChild(btn);
    if (LANG === 'en') apply();
  });
})();
