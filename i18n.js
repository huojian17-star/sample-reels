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

M['nav-doc-tool']={zh:'论文工具',en:'Doc Tool'};
M['doc-title']={zh:'论文排版工具 DocFormatTool · BEST-辣椒',en:'Paper Format Tool · BEST-辣椒'};
M['xdoc-back']={zh:'← 返回首页',en:'← Back'};
M['doc-hero-h1']={zh:'论文排版工具 DocFormatTool',en:'Paper Format Tool'};
M['doc-hero-p']={zh:'论文格式一键排版 · 自动识别学校模板 · 本地运行不上传',en:'One-click paper formatting · auto school-template parsing · runs locally'};
M['doc-intro-h2']={zh:'这是什么',en:'What is it'};
M['doc-intro-p']={zh:'把任意格式的论文（Word / Markdown / 文本）排成符合规范要求的 Word 文档：自动解析学校模板的格式规则（字体/字号/页边距/标题层级），一键排版，自动质检，并生成改动报告。',en:'Formats papers from any source (Word / Markdown / text) into a standards-compliant Word document: auto-parses school template rules (fonts, sizes, margins, heading levels), one-click formatting, auto quality check, and a change report.'};
M['doc-feat-h2']={zh:'功能',en:'Features'};
M['doc-f1']={zh:'任意学校模板自适应：上传学校模板自动识别格式',en:'Auto-adapts to any school template: upload and auto-detect'};
M['doc-f2']={zh:'改写式排版：图片/表格/公式原样保留，只规范格式',en:'Reformat-only: images/tables/formulas preserved, only styles normalized'};
M['doc-f3']={zh:'Markdown 增强：表格、代码块、LaTeX 公式转 Word 原生公式',en:'Markdown enhanced: tables, code blocks, LaTeX to native Word formulas'};
M['doc-f4']={zh:'自动质检 + 改动报告：排完自动检查，改了啥一目了然',en:'Auto quality check + change report'};
M['doc-f5']={zh:'完全本地运行：论文不离开你的电脑，断网也能用',en:'Fully local: your paper never leaves your computer'};
M['doc-fig-h2']={zh:'效果',en:'Screenshots'};
M['doc-fig1']={zh:'Markdown 排版前后对比',en:'Before / after (Markdown)'};
M['doc-fig2']={zh:'软件界面',en:'App UI'};
M['doc-fig3']={zh:'排版后的规范文档',en:'Formatted document'};
M['doc-fig4']={zh:'排版改动报告（覆盖率一目了然）',en:'Change report'};
M['doc-open-h2']={zh:'开源',en:'Open Source'};
M['doc-open-p']={zh:'排版引擎核心已开源：',en:'The formatting engine is open source:'};
M['doc-contact-h2']={zh:'获取与联系',en:'Get It'};
M['doc-contact-p']={zh:'软件内测中，想试用请私信 B站 @BEST-辣椒 或评论区留言，免费测试。',en:'Currently in beta — DM @BEST-辣椒 on Bilibili to try it for free.'};
M['doc-c1t']={zh:'模板自适应',en:'Template Auto-Adapt'};
M['doc-c2t']={zh:'内容零丢失',en:'Zero Content Loss'};
M['doc-c3t']={zh:'Markdown 增强',en:'Markdown Enhanced'};
M['doc-c4t']={zh:'自动质检报告',en:'Auto Quality Report'};
M['doc-c5t']={zh:'本地 · 隐私',en:'Local & Private'};
M['doc-c6t']={zh:'开源',en:'Open Source'};
M['doc-gallery-h2']={zh:'界面一览',en:'Screenshots'};