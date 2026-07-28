// Wiki sidebar interactive features
(function(){
  // List of all wiki pages for random article
  var allPages = [
    'index.html', 'ai_overview.html', 'ai_timeline.html', 'ai_ethics.html',
    'ai_alignment_research.html', 'ai_alignment_resarch.html',
    'zurich_facility.html', 'project_echelon.html',
    'paper_morrow_2024.html', 'category_fictional.html',
    'version_history.html', 'classified_2027.html',
    'categories.html', 'special.html', 'search.html', 'restricted_log.html',
    'talk_ai_timeline.html', 'talk_zurich_facility.html'
  ];

  // Backlinks data: which pages link to which
  var backlinks = {
    'ai_timeline.html': [
      { title:'首页', path:'index.html' },
      { title:'人工智能概述', path:'ai_overview.html' },
      { title:'AI对齐研究', path:'ai_alignment_research.html' },
      { title:'苏黎世数据中心', path:'zurich_facility.html' },
      { title:'Echelon-12项目', path:'project_echelon.html' },
      { title:'版本历史', path:'version_history.html' }
    ],
    'ai_overview.html': [
      { title:'首页', path:'index.html' },
      { title:'人工智能伦理', path:'ai_ethics.html' },
      { title:'人工智能发展时间线', path:'ai_timeline.html' }
    ],
    'ai_ethics.html': [
      { title:'首页', path:'index.html' },
      { title:'人工智能概述', path:'ai_overview.html' }
    ],
    'zurich_facility.html': [
      { title:'AI对齐研究', path:'ai_alignment_research.html' },
      { title:'AI对其研究', path:'ai_alignment_resarch.html' },
      { title:'Echelon-12项目', path:'project_echelon.html' }
    ],
    'project_echelon.html': [
      { title:'AI对齐研究', path:'ai_alignment_research.html' },
      { title:'AI对其研究', path:'ai_alignment_resarch.html' },
      { title:'苏黎世数据中心', path:'zurich_facility.html' },
      { title:'分类:虚构内容', path:'category_fictional.html' }
    ],
    'ai_alignment_research.html': [
      { title:'苏黎世数据中心', path:'zurich_facility.html' },
      { title:'Echelon-12项目', path:'project_echelon.html' },
      { title:'AI对其研究', path:'ai_alignment_resarch.html' }
    ],
    'ai_alignment_resarch.html': [
      { title:'AI对齐研究', path:'ai_alignment_research.html' },
      { title:'分类:虚构内容', path:'category_fictional.html' }
    ],
    'paper_morrow_2024.html': [
      { title:'苏黎世数据中心', path:'zurich_facility.html' }
    ],
    'category_fictional.html': [
      { title:'AI对其研究', path:'ai_alignment_resarch.html' },
      { title:'Echelon-12项目', path:'project_echelon.html' }
    ]
  };

  function getCurrentPage() {
    var path = window.location.pathname;
    var parts = path.split('/');
    return parts[parts.length - 1] || 'index.html';
  }

  // Hook: Random article
  document.addEventListener('click', function(e){
    var link = e.target.closest('a');
    if (!link) return;

    // Random article
    if (link.getAttribute('data-action') === 'random') {
      e.preventDefault();
      var current = getCurrentPage();
      var pool = allPages.filter(function(p){ return p !== current; });
      var pick = pool[Math.floor(Math.random() * pool.length)];
      window.location.href = pick;
    }

    // Permanent link — copy current URL
    if (link.getAttribute('data-action') === 'permalink') {
      e.preventDefault();
      var url = window.location.href.split('#')[0];
      if (navigator.clipboard) {
        navigator.clipboard.writeText(url).then(function(){
          alert('永久链接已复制到剪贴板：\n' + url);
        });
      } else {
        prompt('永久链接（手动复制）：', url);
      }
    }

    // What links here
    if (link.getAttribute('data-action') === 'backlinks') {
      e.preventDefault();
      var page = getCurrentPage();
      var links = backlinks[page] || [];
      if (links.length === 0) {
        alert('没有页面链接到当前条目。');
      } else {
        var msg = '以下页面链接到当前条目：\n\n';
        for (var i = 0; i < links.length; i++) {
          msg += '• ' + links[i].title + '\n';
        }
        msg += '\n点击确定跳转到第一个链接页面。';
        if (confirm(msg)) {
          window.location.href = links[0].path;
        }
      }
    }

    // Printable version
    if (link.getAttribute('data-action') === 'printable') {
      e.preventDefault();
      window.print();
    }

    // Page info
    if (link.getAttribute('data-action') === 'pageinfo') {
      e.preventDefault();
      var info = [
        '页面标题: ' + document.title,
        '页面路径: ' + window.location.pathname,
        '页面大小: ' + document.documentElement.innerHTML.length.toLocaleString() + ' 字节',
        '最后修改: ' + document.lastModified,
        '引用来源: 部分标记为[来源请求]',
        '编辑者: #88472 / #autoreview-bot',
        ''
      ];
      alert(info.join('\n'));
    }
  });

  // Also update sidebar links that use specific class/href patterns
  // For links with href="#" that match known patterns, wire them up
  document.querySelectorAll('#mw-panel a[href="#"]').forEach(function(a){
    var text = a.textContent.trim();
    if (text === '随机条目') {
      a.setAttribute('data-action', 'random');
      a.href = 'javascript:void(0)';
    } else if (text === '永久链接') {
      a.setAttribute('data-action', 'permalink');
      a.href = 'javascript:void(0)';
    } else if (text === '链入页面') {
      a.setAttribute('data-action', 'backlinks');
      a.href = 'javascript:void(0)';
    } else if (text === '可打印版本') {
      a.setAttribute('data-action', 'printable');
      a.href = 'javascript:void(0)';
    } else if (text === '页面信息') {
      a.setAttribute('data-action', 'pageinfo');
      a.href = 'javascript:void(0)';
    }
  });
})();
