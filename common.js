// ====== 1. 当前页导航高亮 ======
(function() {
  var path = window.location.pathname;
  var page = path.substring(path.lastIndexOf('/') + 1) || 'index.html';
  var links = document.querySelectorAll('.nav-links a');
  for (var i = 0; i < links.length; i++) {
    if (links[i].getAttribute('href') === page) {
      links[i].style.color = 'var(--accent)';
      links[i].style.fontWeight = '500';
    }
  }
})();

// ====== 2. 手机汉堡菜单 ======
(function() {
  var navInner = document.querySelector('nav .nav-inner');
  if (!navInner) return;
  var links = navInner.querySelector('.nav-links');
  if (!links) return;

  var btn = document.createElement('button');
  btn.className = 'hamburger-btn';
  btn.innerHTML = '\u2630';
  btn.setAttribute('aria-label', '\u83dc\u5355');
  navInner.appendChild(btn);

  btn.addEventListener('click', function() {
    var open = links.classList.toggle('nav-open');
    btn.innerHTML = open ? '\u2715' : '\u2630';
  });

  var items = links.querySelectorAll('a');
  for (var i = 0; i < items.length; i++) {
    items[i].addEventListener('click', function() {
      links.classList.remove('nav-open');
      btn.innerHTML = '\u2630';
    });
  }
})();

// ====== 3. 访客小人（从首页带来的） ======
(function() {
  var guestData = null;
  try { guestData = JSON.parse(localStorage.getItem('mascot_guest') || '{}'); } catch(e) {}
  if (!guestData || !guestData.active) return;
  var path = window.location.pathname;
  var page = path.substring(path.lastIndexOf('/') + 1) || 'index.html';
  if (page !== guestData.page && !path.endsWith(guestData.page)) return;

  // 清除标记，防止刷新后反复出现
  localStorage.removeItem('mascot_guest');

  // 各页面专属对话
  var pageDialogs = {
    'bilibili.html': [
      '这期视频的数据亮点是……你看到那个排序按钮了吗？', '试试拖动排序，按播放量、点赞率、硬币比……各有发现。',
      '雷达对比图——同时选两期视频，六维指标一目了然。', '观众93.6%是男性，说明硬核游戏考据的受众很明确。',
      '每期视频下面都有我的复盘笔记——不只是数据，还有创作心得。'
    ],
    'worldbuilding.html': [
      '欢迎来到艾瑞斯大陆！三侧体系是这个世界的基础。', '物理侧有7个职阶——剑术师、骑士、刺客……你适合哪个？',
      '五大城市各有特色，低语岭是最神秘的一个。', '顶上那个搜索框我做的！作者做的。试试搜"暗界"。',
      '机密档案里记载了暗界生物的等级分类……点到为止。'
    ],
    'novel.html': [
      '渡鸦镇的故事从一场葬礼开始。安德森夫人——记住这个名字。', '瑞雯不怕冷。真的，不是比喻。她感觉不到温度。',
      '底部有个性格测试——我上次测出来是瑞雯。', '人物关系图可以悬停和点击，试试看。',
      '索菲娜第一天上学就打架了。但她不是坏人。'
    ],
    'game-design.html': [
      '这里有5个可交互的原型工具！能力者雷达评估是第一个。', '伤害计算器——选物理侧还是魔法侧，公式不一样的。',
      '公会任务决策有5步，每一步选错都会失败。和真实设计一样。', '告示板彩蛋是纯CSS画的——你看那个木板纹理。',
      '掉落模拟器按暗界生物的稀有度表做了完整概率系统。'
    ],
    'game-analysis.html': [
      '7款游戏的失败分析，从策划视角每条都值得读。', '《幻》那篇——理想主义遇到了没有结局的代码。',
      '每篇末尾有4条行业教训，可以直接用到项目里。', '《寂静岭P.T.》不只是恐怖游戏，它是科乐美转型的牺牲品。',
      '看完了可以对比文案拆解页——那边分析的是我的视频脚本。'
    ],
    'script-analysis.html': [
      '7期视频文案的完整元分析——不是写了什么，是为什么这样写。', '缺点复盘有7张棕红卡片，每张都是一次真实翻车。',
      '数据验证了"高播放≠高转化"，做内容的人必看。', '从Noclip到新新闻主义，我的叙事风格有清晰的来源。',
      '最后5条方法论是可复用的——如果你也想做深度游戏内容。'
    ],
    'about.html': [
      '关于页面——这里有人机协作的完整决策记录。', '四次创意跃迁卡，每次都是作品集迭代的转折点。',
      '整个网站AI成本不到5块钱！MVP思维的胜利。', '邓恺恒，湖南工商大学，工商管理——跨专业做游戏。',
      '联系方式在页面顶部——如果有游戏公司的HR在看的话……'
    ]
  };
  var dialogs = pageDialogs[page] || ['这个页面挺有意思的，到处逛逛？'];

  // 注入小人
  var mascot = document.createElement('div');
  mascot.id = 'guest-mascot';
  mascot.style.cssText = 'position:fixed;bottom:80px;right:24px;z-index:9999;cursor:grab;user-select:none;';
  mascot.innerHTML = '<div id="guest-bubble" style="position:absolute;bottom:110%;left:50%;transform:translateX(-50%);background:#fdfaf4;border:3px solid #4a3828;padding:10px 16px;max-width:380px;min-width:100px;text-align:center;font-size:13px;color:#3a2a18;line-height:1.5;word-break:keep-all;box-shadow:4px 4px 0 0 #2a1a08;font-family:Georgia,serif;cursor:pointer;display:none;"></div><img id="guest-img" src="pixel-avatar-clean-small.webp" alt="小人" style="width:80px;height:auto;display:block;" draggable="false">';
  document.body.appendChild(mascot);

  var bubble = document.getElementById('guest-bubble');
  var img = document.getElementById('guest-img');
  var recent = [];
  var isDrag = false, wasDrag = false;
  var startX, startY, startLeft, startTop, offX, offY;
  var lastMsg = '';

  function pickMsg() {
    var pool = dialogs.filter(function(m) { return m !== lastMsg && recent.indexOf(m) === -1; });
    if (pool.length === 0) { pool = dialogs; recent.length = 0; }
    var m = pool[Math.floor(Math.random() * pool.length)];
    recent.push(m); if (recent.length > 6) recent.shift();
    lastMsg = m;
    return m;
  }

  function say(msg) {
    bubble.textContent = msg;
    // 自适应宽度：让气泡贴合文字
    var L = msg.length;
    bubble.style.width = 'auto';
    bubble.style.maxWidth = L <= 10 ? '220px' : L <= 18 ? '320px' : L <= 30 ? '420px' : '520px';
    bubble.style.minWidth = '80px';
    bubble.style.left = '50%';
    bubble.style.transform = 'translateX(-50%)';
    bubble.style.display = 'block';
    bubble.classList.remove('pop');
    void bubble.offsetWidth;
    bubble.classList.add('pop');

    // 防止气泡超出屏幕边缘
    var br = bubble.getBoundingClientRect();
    var shift = 0;
    if (br.left < 8) shift = 8 - br.left;
    if (br.right > window.innerWidth - 8) shift = (window.innerWidth - 8) - br.right;
    if (shift !== 0) {
      bubble.style.left = '50%';
      bubble.style.transform = 'translateX(calc(-50% + ' + shift + 'px))';
    }
  }

  // 点击/触摸小人：对话
  var lastTalkTime = 0;
  function doTalk() {
    var now = Date.now();
    if (now - lastTalkTime < 400) return; // 防双击
    lastTalkTime = now;
    if (wasDrag || isDrag) return;
    img.style.transform = 'scale(1.12)';
    setTimeout(function() { img.style.transform = ''; }, 150);
    say(pickMsg());
    wasDrag = false;
  }
  img.addEventListener('click', function(e) { e.stopPropagation(); doTalk(); });
  img.addEventListener('touchend', function(e) { e.stopPropagation(); doTalk(); });

  // 双击：回家
  img.addEventListener('dblclick', function(e) {
    e.preventDefault(); e.stopPropagation();
    say('那我先回去了！首页等你~');
    setTimeout(function() {
      mascot.style.transition = 'opacity 0.4s';
      mascot.style.opacity = '0';
      setTimeout(function() { mascot.remove(); }, 400);
    }, 600);
  });

  // 拖拽
  img.addEventListener('mousedown', function(e) {
    e.preventDefault(); e.stopPropagation();
    wasDrag = false; isDrag = false;
    var r = mascot.getBoundingClientRect();
    startX = e.clientX; startY = e.clientY;
    startLeft = r.left; startTop = r.top;
    offX = e.clientX - r.left; offY = e.clientY - r.top;
    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseup', onUp);
  });
  img.addEventListener('touchstart', function(e) {
    if (e.touches.length !== 1) return;
    e.stopPropagation();
    wasDrag = false; isDrag = false;
    var r = mascot.getBoundingClientRect();
    startX = e.touches[0].clientX; startY = e.touches[0].clientY;
    startLeft = r.left; startTop = r.top;
    offX = e.touches[0].clientX - r.left; offY = e.touches[0].clientY - r.top;
    document.addEventListener('touchmove', onTouch, { passive: false });
    document.addEventListener('touchend', onUp);
  }, { passive: true });

  function onMove(e) { moveDrag(e.clientX, e.clientY); }
  function onTouch(e) { e.preventDefault(); if (e.touches.length === 1) moveDrag(e.touches[0].clientX, e.touches[0].clientY); }
  function moveDrag(x, y) {
    if (!isDrag && Math.abs(x - startX) + Math.abs(y - startY) < 5) return;
    if (!isDrag) { isDrag = true; wasDrag = true; bubble.style.display = 'none'; }
    var tx = x - offX, ty = y - offY;
    tx = Math.max(-40, Math.min(window.innerWidth - 40, tx));
    ty = Math.max(-40, Math.min(window.innerHeight - 40, ty));
    mascot.style.left = tx + 'px';
    mascot.style.top  = ty + 'px';
  }
  function onUp() {
    document.removeEventListener('mousemove', onMove);
    document.removeEventListener('mouseup', onUp);
    document.removeEventListener('touchmove', onTouch);
    document.removeEventListener('touchend', onUp);
    if (!isDrag) return;
    isDrag = false;
    wasDrag = false;
    bubble.style.display = '';
    if (Math.random() < 0.35) say(pickMsg());
  }

  // 来一句开场白
  setTimeout(function() { say('嘿，我跟你进来了！随便逛逛，点我聊天~'); }, 600);
})();

// ====== 4. 表格响应式——自动包裹滚动容器 + 滚动提示 ======
(function() {
  var tables = document.querySelectorAll('.info-table');
  for (var i = 0; i < tables.length; i++) {
    var t = tables[i];
    if (t.parentNode.classList.contains('table-wrap')) continue;
    var wrap = document.createElement('div');
    wrap.className = 'table-wrap';
    t.parentNode.insertBefore(wrap, t);
    wrap.appendChild(t);

    // 添加滚动提示
    var hint = document.createElement('div');
    hint.className = 'table-scroll-hint';
    hint.innerHTML = '\u2194 \u5DE6\u53F3\u6ED1\u52A8\u67E5\u770B\u66F4\u591A';
    hint.style.cssText = 'text-align:center;font-size:10px;color:var(--accent);margin-top:6px;letter-spacing:1px;display:none;';
    wrap.parentNode.insertBefore(hint, wrap.nextSibling);

    // 检测是否有溢出内容
    function checkOverflow() {
      hint.style.display = (wrap.scrollWidth > wrap.clientWidth + 2) ? 'block' : 'none';
      // 右侧渐变遮罩
      if (wrap.scrollWidth > wrap.clientWidth + 2) {
        wrap.classList.add('has-overflow');
      } else {
        wrap.classList.remove('has-overflow');
      }
    }
    checkOverflow();
    wrap.addEventListener('scroll', checkOverflow);
    window.addEventListener('resize', checkOverflow);
  }
})();

// ====== 5. 设计标注——样式升级 + 点击查看 ======
(function() {
  // 强制升级所有设计标注徽章
  var allSpans = document.getElementsByTagName('span');
  for (var i = 0; i < allSpans.length; i++) {
    var b = allSpans[i];
    var t = b.getAttribute('title') || '';
    if (t.indexOf('设计意图') === -1 && t.indexOf('设计说明') === -1) continue;
    b.dataset.note = t;
    b.removeAttribute('title');
    b.style.cssText = 'font-size:13px;color:#fff;background:#a98446;padding:3px 12px;border-radius:10px;vertical-align:middle;letter-spacing:0.3px;cursor:pointer;font-weight:500;display:inline-block;margin:0 2px;';
    b.textContent = '\u24D8 设计标注';
  }

  // 全局点击：展示 / 关闭设计说明弹窗
  document.addEventListener('click', function(e) {
    var badge = e.target.closest('[data-note]');
    var existing = document.querySelector('.design-note-tip');

    if (!badge) { if (existing) existing.remove(); return; }
    e.stopPropagation();
    if (existing && existing._badge === badge) { existing.remove(); return; }
    if (existing) existing.remove();

    var tip = document.createElement('div');
    tip.className = 'design-note-tip';
    tip._badge = badge;
    tip.textContent = badge.dataset.note;
    tip.style.cssText = 'position:absolute;z-index:99999;background:#fffef5;border:2px solid #a98446;border-radius:6px;padding:12px 16px;font-size:13px;color:#333;line-height:1.8;max-width:300px;box-shadow:0 8px 30px rgba(0,0,0,0.18);pointer-events:auto;';
    document.body.appendChild(tip);

    var br = badge.getBoundingClientRect();
    tip.style.left = Math.max(8, Math.min(window.innerWidth - 308, br.left)) + 'px';
    tip.style.top = (br.bottom + 8) + 'px';

    tip.addEventListener('click', function(ev) { ev.stopPropagation(); tip.remove(); });
  });
})();

// ====== 6. 侧边栏目录导航 ======
(function() {
  var headings = document.querySelectorAll('.content-section h2, .content-section h3');
  if (headings.length < 3) return; // 标题太少不值得建目录

  // 用 h2 为主项，h3 为子项构建树
  var tree = [];
  var currentH2 = null;
  for (var i = 0; i < headings.length; i++) {
    var h = headings[i];
    if (!h.id) { h.id = 'toc-' + i; }
    if (h.tagName === 'H2') {
      currentH2 = { el: h, id: h.id, text: h.textContent.trim(), children: [] };
      tree.push(currentH2);
    } else if (h.tagName === 'H3' && currentH2) {
      currentH2.children.push({ el: h, id: h.id, text: h.textContent.trim() });
    }
  }
  if (tree.length < 2) return;

  // 创建侧边栏抽屉（左滑出）
  var sidebar = document.createElement('nav');
  sidebar.id = 'page-toc';
  sidebar.style.cssText = 'position:fixed;left:0;top:70px;width:260px;max-height:calc(100vh - 80px);overflow-y:auto;z-index:95;font-size:12px;line-height:1.7;background:var(--bg-card);border-right:1px solid var(--border);border-bottom:1px solid var(--border);border-radius:0 8px 8px 0;padding:20px;box-shadow:4px 4px 24px rgba(0,0,0,0.1);transform:translateX(-100%);transition:transform 0.3s cubic-bezier(0.4,0,0.2,1);';
  sidebar.setAttribute('aria-label', '\u9875\u5185\u5BFC\u822A');

  var title = document.createElement('div');
  title.textContent = '\u76EE\u5F55';
  title.style.cssText = 'font-size:11px;font-weight:600;color:var(--text-dim);letter-spacing:2px;margin-bottom:12px;text-transform:uppercase;';
  sidebar.appendChild(title);

  var list = document.createElement('ul');
  list.style.cssText = 'list-style:none;padding:0;margin:0;';

  // 存储所有链接用于高亮
  var allLinks = [];

  for (var ti = 0; ti < tree.length; ti++) {
    var item = tree[ti];
    var li = document.createElement('li');
    li.style.cssText = 'margin-bottom:2px;';

    var a = document.createElement('a');
    a.href = '#' + item.id;
    a.textContent = item.text;
    a.style.cssText = 'display:block;padding:4px 8px;color:var(--text-dim);text-decoration:none;border-radius:4px;transition:all 0.15s;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;';
    a.addEventListener('mouseenter', function() { if (!this.classList.contains('active')) this.style.background = 'var(--bg-alt)'; });
    a.addEventListener('mouseleave', function() { if (!this.classList.contains('active')) this.style.background = ''; });
    a.addEventListener('click', function(e) {
      e.preventDefault();
      var target = document.getElementById(this.getAttribute('href').slice(1));
      if (target) {
        var top = target.getBoundingClientRect().top + window.scrollY - 80;
        window.scrollTo({ top: top, behavior: 'smooth' });
      }
    });
    li.appendChild(a);
    allLinks.push({ link: a, el: item.el });
    list.appendChild(li);

    // h3 子项
    for (var ci = 0; ci < item.children.length; ci++) {
      var child = item.children[ci];
      var subLi = document.createElement('li');
      var subA = document.createElement('a');
      subA.href = '#' + child.id;
      subA.textContent = child.text;
      subA.style.cssText = 'display:block;padding:3px 8px 3px 20px;color:var(--text-dim);text-decoration:none;border-radius:4px;font-size:11px;transition:all 0.15s;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;';
      subA.addEventListener('mouseenter', function() { if (!this.classList.contains('active')) this.style.background = 'var(--bg-alt)'; });
      subA.addEventListener('mouseleave', function() { if (!this.classList.contains('active')) this.style.background = ''; });
      subA.addEventListener('click', function(e) {
        e.preventDefault();
        var target = document.getElementById(this.getAttribute('href').slice(1));
        if (target) {
          var top = target.getBoundingClientRect().top + window.scrollY - 80;
          window.scrollTo({ top: top, behavior: 'smooth' });
        }
      });
      subLi.appendChild(subA);
      allLinks.push({ link: subA, el: child.el });
      list.appendChild(subLi);
    }
  }
  sidebar.appendChild(list);

  // 左侧拉出标签
  var tab = document.createElement('div');
  tab.id = 'toc-tab';
  tab.innerHTML = '\u2630';
  tab.title = '\u76EE\u5F55';
  tab.style.cssText = 'position:fixed;left:0;top:50%;transform:translateY(-50%);z-index:96;width:28px;height:60px;background:var(--bg-card);border:1px solid var(--border);border-left:none;border-radius:0 6px 6px 0;cursor:pointer;display:flex;align-items:center;justify-content:center;font-size:16px;color:var(--text-dim);box-shadow:2px 2px 8px rgba(0,0,0,0.06);transition:left 0.3s cubic-bezier(0.4,0,0.2,1);';
  tab.addEventListener('click', function() { toggleSidebar(); });

  // 遮罩
  var overlay = document.createElement('div');
  overlay.id = 'toc-overlay';
  overlay.style.cssText = 'position:fixed;inset:0;z-index:94;background:rgba(0,0,0,0.3);display:none;';
  overlay.addEventListener('click', function() { toggleSidebar(); });

  var isOpen = false;
  function toggleSidebar() {
    isOpen = !isOpen;
    sidebar.style.transform = isOpen ? 'translateX(0)' : 'translateX(-100%)';
    tab.style.left = isOpen ? '260px' : '0';
    overlay.style.display = isOpen ? 'block' : 'none';
    document.body.style.overflow = isOpen ? 'hidden' : '';
  }

  // ESC 关闭
  document.addEventListener('keydown', function(e) { if (e.key === 'Escape' && isOpen) toggleSidebar(); });

  document.body.appendChild(sidebar);
  document.body.appendChild(tab);
  document.body.appendChild(overlay);

  // IntersectionObserver 高亮当前章节
  var observerOptions = { rootMargin: '-80px 0px -60% 0px' };
  var observer = new IntersectionObserver(function(entries) {
    for (var ei = 0; ei < entries.length; ei++) {
      if (entries[ei].isIntersecting) {
        var id = entries[ei].target.id;
        for (var ai = 0; ai < allLinks.length; ai++) {
          if (allLinks[ai].el.id === id) {
            allLinks[ai].link.classList.add('active');
            allLinks[ai].link.style.background = 'var(--accent)';
            allLinks[ai].link.style.color = '#fff';
            // 滚动链接到可视区
            var linkTop = allLinks[ai].link.offsetTop;
            var sidebarTop = sidebar.scrollTop;
            if (linkTop < sidebarTop || linkTop > sidebarTop + sidebar.clientHeight - 30) {
              allLinks[ai].link.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
            }
          } else {
            allLinks[ai].link.classList.remove('active');
            allLinks[ai].link.style.background = '';
            allLinks[ai].link.style.color = '';
          }
        }
        break;
      }
    }
  }, observerOptions);

  for (var oi = 0; oi < allLinks.length; oi++) {
    observer.observe(allLinks[oi].el);
  }

})();

// ====== 7. 回到顶部 ======
(function() {
  var btn = document.createElement('button');
  btn.className = 'back-to-top';
  btn.innerHTML = '\u2191';
  btn.setAttribute('aria-label', '\u56de\u5230\u9876\u90e8');
  document.body.appendChild(btn);

  var ticking = false;
  window.addEventListener('scroll', function() {
    if (!ticking) {
      requestAnimationFrame(function() {
        btn.classList.toggle('show', window.scrollY > 300);
        ticking = false;
      });
      ticking = true;
    }
  });

  btn.addEventListener('click', function() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
})();
