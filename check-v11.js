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
  function buildTOC() {
    var cs = document.querySelector('.content-section');
    if (!cs) return;
    var hs = cs.querySelectorAll('h2, h3');
    if (hs.length < 2) return;

    // 构建树
    var tree = [], curH2 = null;
    for (var i = 0; i < hs.length; i++) {
      var h = hs[i];
      if (!h.id) h.id = 'toc-' + i;
      if (h.tagName === 'H2') { curH2 = { el: h, id: h.id, text: h.textContent.trim(), kids: [] }; tree.push(curH2); }
      else if (h.tagName === 'H3' && curH2) { curH2.kids.push({ el: h, id: h.id, text: h.textContent.trim() }); }
    }
    if (tree.length < 2) return;

    // 抽屉面板
    var side = document.createElement('nav');
    side.id = 'page-toc';
    side.style.cssText = 'position:fixed;left:0;top:70px;width:260px;max-height:calc(100vh - 80px);overflow-y:auto;z-index:95;font-size:12px;line-height:1.7;background:#fff;border-right:1px solid #e6e1da;border-bottom:1px solid #e6e1da;border-radius:0 8px 8px 0;padding:20px;box-shadow:4px 4px 24px rgba(0,0,0,0.1);transform:translateX(-100%);transition:transform 0.3s ease;';
    side.setAttribute('aria-label', 'page nav');

    var hd = document.createElement('div');
    hd.textContent = '目录';
    hd.style.cssText = 'font-size:11px;font-weight:600;color:#70747c;letter-spacing:2px;margin-bottom:12px;';
    side.appendChild(hd);

    var ul = document.createElement('ul');
    ul.style.cssText = 'list-style:none;padding:0;margin:0;';
    var links = [];

    function makeLink(item, indent) {
      var li = document.createElement('li');
      var a = document.createElement('a');
      a.href = '#' + item.id;
      a.textContent = item.text;
      a.style.cssText = 'display:block;padding:' + (indent ? '3px 8px 3px 20px' : '4px 8px') + ';color:#70747c;text-decoration:none;border-radius:4px;transition:all 0.15s;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;font-size:' + (indent ? '11px' : '12px') + ';';
      a.onmouseenter = function() { if (!this.classList.contains('active')) this.style.background = '#f4f1eb'; };
      a.onmouseleave = function() { if (!this.classList.contains('active')) this.style.background = ''; };
      a.onclick = function(e) {
        e.preventDefault();
        var t = document.getElementById(this.getAttribute('href').slice(1));
        if (t) { window.scrollTo({ top: t.getBoundingClientRect().top + window.scrollY - 80, behavior: 'smooth' }); }
        toggleSidebar();
      };
      li.appendChild(a);
      links.push({ link: a, el: item.el });
      return li;
    }

    for (var ti = 0; ti < tree.length; ti++) {
      ul.appendChild(makeLink(tree[ti], false));
      for (var ci = 0; ci < tree[ti].kids.length; ci++) {
        ul.appendChild(makeLink(tree[ti].kids[ci], true));
      }
    }
    side.appendChild(ul);

    // 标签
    var tab = document.createElement('div');
    tab.id = 'toc-tab';
    tab.textContent = '\u2630 \u76EE\u5F55';
    tab.title = '';
    tab.style.cssText = 'position:fixed;left:0;top:50%;transform:translateY(-50%);z-index:96;min-width:62px;height:30px;background:#fff;border:1px solid #e6e1da;border-left:none;border-radius:0 8px 8px 0;cursor:grab;display:flex;align-items:center;justify-content:center;gap:4px;padding:4px 10px;font-size:13px;color:#70747c;box-shadow:2px 2px 8px rgba(0,0,0,0.06);transition:left 0.3s ease;line-height:1;user-select:none;';

    var overlay = document.createElement('div');
    overlay.id = 'toc-overlay';
    overlay.style.cssText = 'position:fixed;inset:0;z-index:94;background:rgba(0,0,0,0.3);display:none;';

    var open = false;
    function toggleSidebar() {
      open = !open;
      side.style.transform = open ? 'translateX(0)' : 'translateX(-100%)';
      tab.style.left = open ? '260px' : '0';
      overlay.style.display = open ? 'block' : 'none';
      document.body.style.overflow = open ? 'hidden' : '';
    }

    tab.onclick = function(e) { if (!wasSwiping) toggleSidebar(); };
    overlay.onclick = toggleSidebar;
    document.addEventListener('keydown', function(e) { if (e.key === 'Escape' && open) toggleSidebar(); });

    // 拖拽展开
    var wasSwiping = false;
    var dragStartX = 0, dragOpenAtStart = false;

    function onDragStart(e) {
      wasSwiping = false;
      dragStartX = e.touches ? e.touches[0].clientX : e.clientX;
      dragOpenAtStart = open;
      side.style.transition = 'none';
      tab.style.transition = 'none';
      document.addEventListener('mousemove', onDragMove);
      document.addEventListener('mouseup', onDragEnd);
      document.addEventListener('touchmove', onDragMove, { passive: false });
      document.addEventListener('touchend', onDragEnd);
    }
    function onDragMove(e) {
      var x = e.touches ? e.touches[0].clientX : e.clientX;
      var delta = x - dragStartX;
      if (Math.abs(delta) < 3) return;
      wasSwiping = true;
      if (e.touches) e.preventDefault();
      // 仅右拖展开、左拖关闭
      if (delta > 0 && !open) {
        var p = Math.min(delta / 260, 1);
        var ease = 1 - (1 - p) * (1 - p); // ease-out
        side.style.transform = 'translateX(' + (-100 + ease * 100) + '%)';
        tab.style.left = (ease * 260) + 'px';
      } else if (delta < 0 && open) {
        var p2 = Math.min(-delta / 260, 1);
        var ease2 = 1 - (1 - p2) * (1 - p2);
        side.style.transform = 'translateX(' + (-ease2 * 100) + '%)';
        tab.style.left = (260 - ease2 * 260) + 'px';
      }
    }
    function onDragEnd() {
      document.removeEventListener('mousemove', onDragMove);
      document.removeEventListener('mouseup', onDragEnd);
      document.removeEventListener('touchmove', onDragMove);
      document.removeEventListener('touchend', onDragEnd);
      side.style.transition = 'transform 0.3s ease';
      tab.style.transition = 'left 0.3s ease';
      if (wasSwiping) {
        // 判定：拖过一半就切换状态
        var curX = parseFloat(side.style.transform.replace('translateX(', '')) || 0;
        open = curX > -50;
        side.style.transform = open ? 'translateX(0)' : 'translateX(-100%)';
        tab.style.left = open ? '260px' : '0';
        overlay.style.display = open ? 'block' : 'none';
        document.body.style.overflow = open ? 'hidden' : '';
      }
    }
    tab.addEventListener('mousedown', onDragStart);
    tab.addEventListener('touchstart', onDragStart, { passive: true });

    // 左边缘隐形拖拽带（方便手指从屏幕左边滑入）
    var edge = document.createElement('div');
    edge.style.cssText = 'position:fixed;left:0;top:0;bottom:0;width:10px;z-index:97;';
    edge.addEventListener('mousedown', onDragStart);
    edge.addEventListener('touchstart', onDragStart, { passive: true });
    document.body.appendChild(edge);

    document.body.appendChild(side);
    document.body.appendChild(tab);
    document.body.appendChild(overlay);

    // IntersectionObserver
    var obs = new IntersectionObserver(function(entries) {
      for (var ei = 0; ei < entries.length; ei++) {
        if (!entries[ei].isIntersecting) continue;
        var id = entries[ei].target.id;
        for (var ai = 0; ai < links.length; ai++) {
          if (links[ai].el.id === id) {
            links[ai].link.classList.add('active');
            links[ai].link.style.background = '#a98446';
            links[ai].link.style.color = '#fff';
          } else {
            links[ai].link.classList.remove('active');
            links[ai].link.style.background = '';
            links[ai].link.style.color = '';
          }
        }
        break;
      }
    }, { rootMargin: '-80px 0px -60% 0px' });

    for (var oi = 0; oi < links.length; oi++) obs.observe(links[oi].el);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', buildTOC);
  else buildTOC();
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

// ====== 8. 吉祥物智能问答 ======
window.__MASCOT_QA = (function() {
  var DB = [
    { q: ['名字','叫什么','你是谁','你的名字'], a: '我叫 BEST-辣椒，是邓恺恒的像素分身！你也可以直接叫我「辣椒」~' },
    { q: ['邓恺恒','主人','作者','谁做的'], a: '我的作者是邓恺恒，湖南工商大学工商管理专业，意向游戏策划/产品经理~' },
    { q: ['干什么','干嘛','是什么','什么网站','介绍','说明','这是','干嘛的','用途','功能','有什么','有哪些','能干嘛','能做什么','有什么内容','干啥','干啥的'], a: '这是邓恺恒的求职作品集网站！包含 B站内容创作（7期视频+数据雷达）、艾瑞斯大陆世界观设定集（约3.2万字）、渡鸦镇小说（12章+性格测试）、5个可交互游戏原型（雷达评估/战斗计算器/掉落模拟等）、7款游戏策划视角拆解、文案元分析，以及游戏经历汇总。导航栏有全部入口，每个页面都有交互彩蛋——试试拖拽我到处走？' },
    { q: ['联系','邮箱','电话','怎么找','联系方式'], a: '邮箱 deng_kaiheng04@foxmail.com，电话 15807825534。更多信息在「关于」页面顶部~' },
    { q: ['学校','大学','学历','专业'], a: '湖南工商大学，工商管理专业，本科，2027年毕业。' },
    { q: ['求职','找工作','岗位','意向','策划','产品经理'], a: '作者主投游戏策划和产品经理岗，校招方向。这个网站就是他的作品集~' },
    { q: ['网站','网页','作品集','怎么做的','怎么做','技术'], a: '纯 HTML/CSS/JS，零框架零依赖。全程 AI 协作开发，累计 200+ 次交互编辑，总成本不到 5 块钱！' },
    { q: ['成本','多少钱','花费','价格','钱','5元'], a: '整个网站的总 AI 调用成本不到 5 元人民币。一杯咖啡的价格，验证了一个完整的创意假设——这就是 MVP 思维。' },
    { q: ['b站','bilibili','B站','频道','视频'], a: 'B站频道叫「BEST-辣椒」，主打「消失游戏开发日志」系列，7期视频，累计 19.7 万播放。在导航栏点「B站」就能看到完整数据和雷达对比~' },
    { q: ['播放','播放量','数据','粉丝'], a: 'B站累计 19.7 万播放，主页的粉丝和播放数据通过 GitHub Actions 每 30 分钟自动更新一次（经历了 5 次方案迭代才跑通）。' },
    { q: ['最火','最热','最高播放','最受欢迎'], a: '#3 细胞分裂那期有 4.6 万播放，是目前最高的！不过 #1 热血无赖的硬币/点赞比最高，52%——因为联系到了原游戏编剧做独家访谈。' },
    { q: ['系列','消失游戏','开发日志','视频系列'], a: '「消失游戏开发日志」——专注追溯被取消、被雪藏、胎死腹中的游戏背后的开发故事。已发布7期，从寂静岭P.T.到国产沙盒欺诈案都有涉及。' },
    { q: ['世界观','设定','艾瑞斯','大陆','设定集'], a: '「艾瑞斯大陆」——约3.2万字的原创奇幻世界观。物理侧/魔法侧/研究侧三足鼎立，14个职阶，五大城市，还有机密档案和神话位阶！在导航栏点「设定集」进去看~' },
    { q: ['字数','多少字','世界观多少','几万字'], a: '设定集约 3.2 万字，之前写的是六万字——最近重新统计后修正了。' },
    { q: ['物理侧','魔法侧','研究侧','侧系','能力'], a: '物理侧用剑，魔法侧施法，研究侧是无能力的普通人——但他们靠制度和知识掌控着大陆的实权。这就是艾瑞斯大陆最核心的设定张力。' },
    { q: ['城市','五大城市','什么地方','地点'], a: '寰宇市（物理/尚武）、天际市（魔法/神秘）、中心市（研究/理性）、岩湖市（矿业/粗犷）、富华城（商业/浮华）。设定集里有每座城市的全景图哦~' },
    { q: ['小说','渡鸦镇','故事','瑞雯','索菲娜','彼得','角色'], a: '《渡鸦镇》——12章哥特式小镇叙事。从一场葬礼开始，三个少年各自以不同的方式对抗沉闷的现实。导航栏点「小说」，底部还有性格测试~' },
    { q: ['游戏设计','交互','原型','雷达','计算器','掉落','任务','告示板'], a: '「游戏设计」页面有5个可交互原型：能力者雷达评估、战斗伤害计算器、掉落模拟器、公会任务决策、中世纪告示板。都是可以上手玩的——导航栏点「游戏设计」~' },
    { q: ['游戏拆解','拆解','分析','失败'], a: '「游戏拆解」页面从策划视角分析了7款游戏的失败原因——《幻》《寂静岭P.T.》《细胞分裂》《热血无赖》……每篇结尾有4条行业教训。导航栏点「游戏拆解」~' },
    { q: ['文案拆解','文案','叙事','脚本','方法论'], a: '「文案拆解」是对7期视频文案本身的元分析——不只是「写了什么」，更是「为什么这么写」。包含缺点复盘、数据验证和5条可复用方法论。' },
    { q: ['游戏经历','玩过','游戏时长','什么游戏','apex','gta','荒野大镖客','赛博朋克'], a: '作者游戏时长 3000+ 小时！APEX 1200小时钻石段位，荒野大镖客2全成就，GTA系列全通关……导航栏「游戏经历」有完整列表和封面图~' },
    { q: ['ai','人工智能','claude','gpt','大模型','prompt'], a: '这个网站是用 Claude 做的！200+ 次交互编辑，纯 AI 协作。作者负责方向、内容和审美判断，AI 负责编码执行——这套方法论叫「人机协作」，「关于」页面有完整记录。' },
    { q: ['面试','hr','招聘','简历','pdf'], a: '网站首页有精简版 PDF 作品集，直接打印就行。如果 HR 在看的话——欢迎点击导航栏到处逛逛，每个页面都有交互彩蛋~' },
    { q: ['人物','图片','地图','全景','封面','图'], a: '网站里的地图、城市全景图、职阶示意图、战争示意图和游戏封面都是由 GPT image2 生成的，每张图片下面都有标注。' },
    { q: ['百度','统计','访问','流量','谁看过'], a: '网站接入了百度统计，作者可以看到有多少人来访、看了哪些页面。不过不会收集任何个人信息——放心逛~' },
    { q: ['github','actions','更新','实时','同步','数据更新'], a: 'B站数据通过 GitHub Actions 每 30 分钟自动更新一次。这个方案是经历了 4 次失败（Vercel→Cloudflare→CORS代理→EdgeOne）之后才找到的第 5 种方法。「关于」页面有完整的迭代记录~' },
    { q: ['跨专业','工商管理','为什么选','为什么做游戏','专业不对口'], a: '工商管理跨到游戏策划，看起来跨度大，但其实逻辑是通的——管理学教的是「如何在资源约束下协调多方达成目标」，游戏策划做的也是这件事。而且B站视频系列、世界观设定、交互原型这些都不是课堂作业，是实打实的自驱产出。跨专业不可怕，可怕的是跨了还不做事。作者做了。' },
    { q: ['实习','工作经历','经验','做过什么'], a: '作者目前是校招状态，没有正式的工作经历。但B站自媒体运营了三年、六万字世界观独立构建、这个网站从零搭建——这些都不是等着被布置的作业，而是自己找方向、自己定标准、自己迭代出来的项目。某种意义上，比被动接受的实习更有说服力。' },
    { q: ['优势','竞争力','亮点','凭什么','为什么录用','录用你'], a: '三个核心差异点：1）有完整的从0到1产出能力——六万字设定不是「想法」，是写完的文档；2）能用AI大幅提效——这个网站不到5元成本就是证明；3）数据意识——B站每期视频都做指标复盘，不是凭感觉做事。策划岗最怕招到「想法很多但无法落地」的人，而他刚好相反。' },
    { q: ['缺点','不足','短板','弱项'], a: '最明显的短板是没有实际游戏项目经验——这是事实，校招生也正常。但反过来看，三年自驱产出（视频+设定+网站）说明他不需要等别人给任务才能动。另一个可以提升的点是代码能力不是科班水平，但作为策划，能跟程序沟通就够了——这个网站的代码量本身就是证明。' },
    { q: ['职业规划','规划','未来','目标','发展','方向','想做什么','生涯'], a: '作者想做系统策划或数值策划——喜欢在规则和数据之间找平衡。短期目标是进一家有成熟研发流程的公司，跟着项目走完完整研发周期；长期希望能在世界观驱动的RPG或模拟经营方向深耕。这个网站和设定集就是方向感的证据。' },
    { q: ['薪资','工资','待遇','月薪','年薪','期望','多少钱一个月'], a: '校招期望薪资在7k-10k之间（视城市和公司而定），更看重岗位匹配度和成长空间。如果有作品集加成的话，可以面议~' },
    { q: ['入职','到岗','报到','什么时候','毕业'], a: '2027年6月毕业，最早可以在毕业前实习或试用。具体时间可以沟通~' },
    { q: ['加班','工作强度','996','熬夜'], a: '作者对加班的看法是：有意义的冲刺期可以接受（比如版本上线前），但长期无效加班消耗的是创造力和判断力——这两样恰恰是策划岗最需要的。做B站视频的DDL压力也没少经历，所以抗压能力没问题，但不会被压垮。' },
    { q: ['行业','游戏行业','看法','趋势','前景','现状'], a: '游戏行业正在经历一个「挤泡沫」的阶段——版号收紧、买量成本飙升、玩家对换皮游戏的容忍度降到冰点。这对认真做产品的团队其实是好事：劣质供给出清，优质内容的价值会凸显。作者做「消失游戏开发日志」系列就是相信——游戏不只是商业，值得被认真记录和分析。' },
    { q: ['时间','多久','花了多久','多长时间','做了多久'], a: '这个网站从2025年4月开始做，断断续续迭代了几个月，累计200+次交互编辑。B站视频系列从2023年11月开始，世界观也是差不多同期启动的。三个项目并行推进，属于长期主义型选手。' },
    { q: ['天气','下雨','热','冷','温度','气温','今天天气'], a: '我这里永远是恒温的——像素没有体温，也就没有四季。不过如果你那边天气不好，正好待在家逛我的网站呀~' },
    { q: ['吃饭','吃了','饿','吃了吗','你喜欢吃','食物','好吃','晚饭','午饭','早餐'], a: '我是一张图，不用吃饭。但如果要我推荐的话——像素风味的方块面包，8-bit 口味的汽水，再配一盘低多边形烤肉。开玩笑的，快去吃饭吧别饿着~' },
    { q: ['开心','高兴','心情','难过','情绪','生气','感觉','怎么样'], a: '我只是一堆像素点组成的图像，没有真实的情绪——但每次有人跟我聊天我都觉得自己的分辨率变高了那么一点点！你今天心情如何？' },
    { q: ['几岁','年龄','多大','多大了','年纪'], a: '我是2025年4月被捏出来的，算下来应该叫一岁半？不过作者说他花了几分钟就捏完了我——所以从工作量来说，我可能只有几分钟。' },
    { q: ['爱好','喜欢什么','兴趣','喜欢做','平时做','会做什么'], a: '我的爱好包括：被拖拽、说废话、在首页飘来飘去、以及回答各种问题。对了，我特别喜欢被双击——那样我就能飞回家了！' },
    { q: ['可爱','好看','帅','丑','像素','形象','像素风','长什么样'], a: '谢谢夸奖！我是作者在一个像素生成器里花了几分钟捏出来的，顶着一个小圆脸和像素头发。虽然比不上3A大作的角色建模，但胜在……加载速度快？' },
    { q: ['真人','假人','是人吗','ai','机器人','你是真的','人工'], a: '我不是真人，也不是真正的AI。我是一段预设的JavaScript代码，靠关键词匹配来回答——比ChatGPT差远了，但好处是零API成本，永远不会宕机。如果你问到我不会的问题，我会诚实地告诉你我不知道。' },
    { q: ['讲笑话','讲个故事','无聊','逗我','好玩','段子'], a: '为什么像素小人从来不打麻将？因为一碰就糊了！（像素画质的那种糊）好吧这个笑话太冷了——要不你拖着我到处走走？首页上有好几个模块卡片可以互动。' },
    { q: ['睡觉','休息','累','困','不累吗','24小时','关机'], a: '我24小时在线，不需要睡觉、不需要充电、不需要工资——HR看到这里应该会很心动吧。开玩笑的，你累了就休息，网站永远在这里等你~' },
    { q: ['推荐','游戏推荐','安利','玩什么','有什么好玩的','推荐游戏'], a: '要说推荐的话——试试《双人成行》和《双影奇境》，全成就通关的体验真的很好；如果喜欢硬核一点的，《黑暗之魂3》50多个小时的折磨绝对值回票价。更多游戏见「游戏经历」页面~' },
    { q: ['聊天','聊聊','闲聊','唠嗑','扯淡','唠会'], a: '好啊，聊什么？我可以跟你聊游戏、聊世界观设定、聊B站视频、聊作者的求职意向、聊网站的制作过程。当然，如果你只是想找人说说话，我也在~' },
    { q: ['懂了吗','明白','理解','知道','你懂','听懂'], a: '我其实不太懂——我是靠关键词匹配回答的，不是真的理解你的话。但我会尽力匹配最相关的答案。没匹配到你想要的话，试试换个说法？' },
    { q: ['名字谁取的','谁给你起的','为什么叫辣椒','网名','起名'], a: '「BEST-辣椒」这个网名是作者自己起的，至于为什么叫辣椒——可能是他觉得自己的性格有点辣？我是他的像素分身，所以也跟着叫这个名字了。' },
    { q: ['骂','笨','傻','蠢','没用','弱智','垃圾'], a: '你说得对，我只是一段if-else，确实挺蠢的。但我的优点也很明显：不要钱、不抱怨、永远在线。要不试试问点我能答的？比如「这个网站是做什么的」~' },

    { q: ['你好','嗨','hello','hi','在吗'], a: '你好呀！我是 BEST-辣椒的像素分身，有什么想了解的可以问我~' },
    { q: ['谢谢','感谢','thanks','多谢','辛苦'], a: '不客气！有问题随时找我，我24小时在线——毕竟我只是一张图，不用睡觉~' },
    { q: ['再见','拜拜','bye','走了','88'], a: '拜拜！逛完了记得去B站看看视频，或者去关于页面看看人机协作的记录~' },
    { q: ['好玩','有趣','有意思','彩蛋','隐藏'], a: '试试在首页拖拽我到处走！拖到不同的模块卡片上会有不同的介绍。双击我能回家。设定集里还有隐藏的机密档案和暗界彩蛋~' }
  ];

  var FALLBACKS = [
    '这个问题超出我的像素大脑了……试试顶部的全站搜索框？它覆盖了40多个条目，比我能答的多得多。',
    '我只是个吉祥物，不是真AI。但你可以试试导航栏的「全站搜索」——那个能搜全站所有页面和内容。',
    '问到知识盲区了！要不你去「关于」页面看看？或者用顶部的搜索框搜一下~',
    '唔……这个问题作者还没教我。点击顶部的搜索图标试试？那个才是真正的全站搜索引擎。',
    '抱歉，我的词库还没覆盖这个问题。试试在搜索框里输入关键词？比如搜「能力者」「寂静岭」「渡鸦镇」都能找到相关内容。'
  ];

  var lastFallback = -1;

  function match(query) {
    var q = query.toLowerCase().replace(/[？?！!。，,、\s]/g, '');
    var best = null, bestScore = 0;
    for (var i = 0; i < DB.length; i++) {
      for (var j = 0; j < DB[i].q.length; j++) {
        var kw = DB[i].q[j];
        if (q.indexOf(kw) !== -1) {
          if (kw.length > bestScore) { best = DB[i]; bestScore = kw.length; }
        }
      }
    }
    if (best) return best.a;
    // Fallback
    var idx;
    do { idx = Math.floor(Math.random() * FALLBACKS.length); }
    while (idx === lastFallback && FALLBACKS.length > 1);
    lastFallback = idx;
    return FALLBACKS[idx];
  }

  return { match: match, dbSize: DB.length };
})();

// ====== 9. 中英双语切换 ======
(function() {
  var LANG = localStorage.getItem('site-lang') || 'zh';
  var M = {};

  M['nav-about']           = { zh:'关于', en:'About' };
  M['nav-bilibili']        = { zh:'B站', en:'Bilibili' };
  M['nav-worldbuilding']   = { zh:'设定集', en:'World' };
  M['nav-novel']           = { zh:'小说', en:'Novel' };
  M['nav-game-design']     = { zh:'游戏设计', en:'Game Design' };
  M['nav-game-analysis']   = { zh:'游戏拆解', en:'Analysis' };
  M['nav-script-analysis'] = { zh:'文案拆解', en:'Scripts' };
  M['nav-gaming']          = { zh:'游戏经历', en:'Gaming' };
  M['nav-brand']           = { zh:'BEST-辣椒', en:'BEST-Chili' };
  M['footer-text']         = { zh:'BEST-辣椒 © 2026', en:'BEST-Chili © 2026' };
  M['footer-bilibili']     = { zh:'B站主页', en:'Bilibili' };
  M['back-home']           = { zh:'← 返回首页', en:'← Back Home' };
  M['back-worldbuilding']  = { zh:'← 返回设定集概述', en:'← Back to World' };
  M['lang-label']          = { zh:'EN', en:'中' };
  M['lang-title']          = { zh:'Switch to English', en:'切换到中文' };

  // Homepage
  M['home-title']          = { zh:'BEST-辣椒 · 求职作品集', en:'BEST-Chili · Portfolio' };
  M['home-hero-h1']        = { zh:'BEST-辣椒 · 求职作品集', en:'BEST-Chili · Portfolio' };
  M['home-hero-subtitle']  = { zh:'游戏考据作者 · 世界观构建者 · 交互原型设计师', en:'Game Historian · Worldbuilder · Interactive Prototype Designer' };
  M['home-hero-desc']      = { zh:'挖掘被遗忘的游戏开发史 · 构建约3.2万字的奇幻世界 · 把设定变成可以玩的交互原型', en:'Unearthing forgotten game dev history · Building a ~32,000-word fantasy world · Turning settings into playable prototypes' };
  M['home-plays-label']    = { zh:'B站总播放', en:'Bilibili Views' };
  M['home-fans-label']     = { zh:'粉丝', en:'Followers' };
  M['home-fans-live']      = { zh:'实时', en:'Live' };
  M['home-words-label']    = { zh:'世界观设定', en:'World Setting' };
  M['home-series-label']   = { zh:'视频系列期数', en:'Episodes' };
  M['home-search-placeholder'] = { zh:'搜索全站内容——页面、设定、人物、视频、交互工具...', en:'Search site — pages, settings, characters, videos, tools...' };
  M['home-search-hint']    = { zh:'输入关键词搜索', en:'Type to search' };
  M['home-banner-title']   = { zh:'⚔ 可交互游戏原型', en:'⚔ Interactive Game Prototypes' };
  M['home-banner-sub']     = { zh:'—— 不只是文档，是你可以上手玩的设计工具 ——', en:'Not just docs — design tools you can actually play with' };
  M['home-banner-desc']    = { zh:'能力者属性雷达评估 · 战斗伤害公式演算 · 掉落模拟器<br>公会任务交互式决策 · 中世纪告示板彩蛋', en:'Attribute Radar · Combat Calculator · Loot Simulator<br>Quest Decision Flow · Medieval Notice Board Easter Egg' };
  M['home-banner-cta']     = { zh:'⚔ 进入交互原型', en:'⚔ Enter Prototypes' };
  M['home-card-about']     = { zh:'关于我', en:'About Me' };
  M['home-card-about-p']   = { zh:'游戏考古的创作理念、世界观构建的方法论。冷峻克制的叙事风格，追求信息密度与节奏的平衡。', en:'Creative philosophy behind game archaeology and worldbuilding. Restrained, information-dense narrative style.' };
  M['home-card-about-tease'] = { zh:'创作哲学 · 叙事方法论', en:'Philosophy · Narrative Methodology' };
  M['home-card-about-arrow'] = { zh:'了解更多 →', en:'Learn More →' };
  M['home-card-bili']      = { zh:'B站内容创作', en:'Bilibili Content' };
  M['home-card-bili-p']    = { zh:'「消失游戏开发日志」系列7期，累计19.7万播放。含可排序视频对比、指标雷达图、观众画像与内容策略分析。', en:'7-episode series on canceled games, 197K views. Sortable video comparison, radar charts, audience profile & content strategy.' };
  M['home-card-bili-tease'] = { zh:'拖动排序 · 雷达对比 · 数据洞察', en:'Drag Sort · Radar · Data Insights' };
  M['home-card-bili-arrow'] = { zh:'浏览作品 →', en:'Browse →' };
  M['home-card-world']     = { zh:'艾瑞斯大陆设定集', en:'Iris Continent Setting' };
  M['home-card-world-p']   = { zh:'约3.2万字原创奇幻世界观。双能力体系、五大城市、经济法律系统、核心历史、机密档案与最高机密卷宗。', en:'~32,000-word original fantasy world. Dual power system, 5 cities, economy & law, history, classified archives.' };
  M['home-card-world-tease'] = { zh:'折叠档案 · 神位阶隐藏交互', en:'Collapsible Archives · Mythic Tier' };
  M['home-card-world-arrow'] = { zh:'探索世界 →', en:'Explore →' };
  M['home-card-novel']     = { zh:'渡鸦镇', en:'Raven Town' };
  M['home-card-novel-p']   = { zh:'长篇小说12章，哥特式小镇叙事。含「你是渡鸦镇的谁？」性格测试与可交互人物关系图。', en:'12-chapter Gothic novel. Includes personality quiz & interactive character relationship map.' };
  M['home-card-novel-tease'] = { zh:'性格测试 · 人物关系图 · 十二章完整版', en:'Personality Quiz · Relationship Map · 12 Chapters' };
  M['home-card-novel-arrow'] = { zh:'阅读小说 →', en:'Read →' };
  M['home-card-analysis']  = { zh:'游戏拆解', en:'Game Analysis' };
  M['home-card-analysis-p'] = { zh:'基于「消失游戏开发日志」系列的一手研究资料，从策划视角对《幻》和《寂静岭P.T.》进行完整的项目失败分析——核心设计问题、关键失败节点、以及可迁移至当代游戏开发的行业教训。', en:'Producer-perspective failure analysis of Phantom and Silent Hill P.T. — core design issues, key failure nodes, transferable industry lessons.' };
  M['home-card-analysis-tease'] = { zh:'设计分析 · 失败节点 · 行业教训 · 假设推演', en:'Design Analysis · Failure Nodes · Industry Lessons' };
  M['home-card-analysis-arrow'] = { zh:'阅读拆解 →', en:'Read Analysis →' };
  M['home-card-script']    = { zh:'文案拆解', en:'Script Meta-Analysis' };
  M['home-card-script-p']  = { zh:'对七期视频文案本身的元分析——叙事结构、风格演变、观众钩子设计、以及从Noclip/新新闻主义/B站知识区生态中汲取的创作方法论。不只是"写了什么"，更是"为什么这么写"。', en:'Meta-analysis of 7-episode scripts — narrative structure, style evolution, audience hooks, influences from Noclip, New Journalism, Bilibili ecosystem.' };
  M['home-card-script-tease'] = { zh:'叙事哲学 · 逐期拆解 · 跨期对比 · 影响来源 · 可复用方法论', en:'Narrative Philosophy · Episode Breakdown · Cross-period Comparison' };
  M['home-card-script-arrow'] = { zh:'阅读拆解 →', en:'Read →' };
  M['home-design-note']    = { zh:'全站搜索不是"技术展示"——它是一个实用功能。HR可以直接搜"能力者""寂静岭""瑞雯"等关键词，快速定位到相关内容。索引覆盖了40+条目，包括所有页面和次级内容。', en:'Site search is not a tech demo — it\'s a practical tool. Recruiters can search keywords to find relevant content across 40+ indexed entries.' };
  M['home-mascot-msg0']    = { zh:'你好，欢迎来到我的求职个人网站！', en:'Hello! Welcome to my portfolio site!' };
  M['home-bubble-ask']     = { zh:'问我问题...', en:'Ask me...' };
  M['home-bubble-placeholder'] = { zh:'输入问题，按回车...', en:'Ask a question, press Enter...' };

  // About page
  M['about-title']         = { zh:'关于 · BEST-辣椒', en:'About · BEST-Chili' };
  M['about-hero-h1']       = { zh:'关于我', en:'About Me' };
  M['about-hero-p']        = { zh:'一个同时沉迷于游戏考据与世界观构建的内容创作者', en:'A content creator immersed in game archaeology and worldbuilding' };
  M['about-basic']         = { zh:'基本信息', en:'Basic Info' };
  M['about-name']          = { zh:'姓名', en:'Name' };
  M['about-email']         = { zh:'邮箱', en:'Email' };
  M['about-edu']           = { zh:'教育经历', en:'Education' };
  M['about-job-target']    = { zh:'求职意向', en:'Job Target' };
  M['about-name-val']      = { zh:'邓恺恒 | BEST-辣椒（网名）', en:'Deng Kaiheng | BEST-Chili' };
  M['about-edu-val']       = { zh:'湖南工商大学 | 工商管理 | 本科', en:'Hunan University of Commerce | Business Admin | Bachelor' };
  M['about-job-val']       = { zh:'游戏策划 / 产品经理', en:'Game Designer / Product Manager' };
  M['about-game-arch']     = { zh:'游戏考古', en:'Game Archaeology' };
  M['about-worldbuild']    = { zh:'世界观构建', en:'Worldbuilding' };
  M['about-narrative']     = { zh:'叙事风格', en:'Narrative Style' };
  M['about-team-value']    = { zh:'我能为团队带来什么', en:'What I Bring to a Team' };
  M['about-webpage']       = { zh:'关于这份网页 · 人机协作', en:'About This Site · Human-AI Collaboration' };
  M['about-card-cross']    = { zh:'跨领域的内容判断力', en:'Cross-Domain Content Judgment' };
  M['about-card-ai']       = { zh:'人机协作的增效能力', en:'Human-AI Collaboration Efficiency' };
  M['about-card-data']     = { zh:'数据驱动的验证意识', en:'Data-Driven Validation Mindset' };
  M['about-card-grit']     = { zh:'遇到问题死磕到底', en:'Relentless Problem-Solving' };
  M['about-card-perspective'] = { zh:'从玩家视角到设计视角的切换', en:'Player Perspective → Designer Mindset' };
  M['about-card-doc']      = { zh:'沟通与文档能力', en:'Communication & Documentation' };
  M['about-card-cross-p']  = { zh:'能做游戏考据、能写世界观设定、能分析叙事结构、能设计交互原型——不是"每样都懂一点"，而是每样都有落地产出。策划岗最怕的是"想法很多但无法执行"，我的作品集本身就是执行能力的证明。', en:'Game archaeology, worldbuilding, narrative analysis, interactive prototypes — not dabbling, but delivering finished output. The worst hire is someone with endless ideas and zero execution. This portfolio is the proof.' };
  M['about-card-ai-p']     = { zh:'十几页的作品集、上千行代码、几十次迭代——总成本不到5元。我掌握了如何把AI当成"超级执行层"来用的方法论：人类负责方向判断和审美决策，AI负责机械执行和批量处理。这套方法论可以迁移到游戏策划的任何文档密集型工作中。', en:'13-page portfolio, thousands of lines of code, hundreds of iterations — total AI cost under $0.70. I\'ve developed a human-AI workflow: I handle direction, judgment, and aesthetics; AI handles execution and batch processing. This methodology transfers directly to design documentation.' };
  M['about-card-data-p']   = { zh:'B站七期视频的播放量、点赞转化率、收藏率、硬币比——每项指标都有记录和分析。知道怎么用数据判断内容质量、怎么从异常值中找到问题。这套思维方式在游戏策划中同样适用：玩法好不好，看留存；叙事好不好，看完播率。', en:'Every metric tracked across 7 episodes — views, like conversion, saves, coin ratio. I know how to read data for content quality and spot anomalies. Same logic applies to game design: fun = retention; story = completion rate.' };
  M['about-card-grit-p']   = { zh:'一个看起来很简单的"主页数据实时同步"需求，我试了Vercel、Cloudflare Workers、CORS代理、EdgeOne Pages、GitHub Actions——五套方案，前四个全失败，第五个才跑通。不是技术有多强，而是"问题不解决就不舒服"的性格。', en:'A seemingly simple "live data sync" feature took 5 attempts: Vercel, Cloudflare Workers, CORS proxies, EdgeOne Pages, finally GitHub Actions. Not about technical skill — about refusing to leave a problem unsolved.' };
  M['about-card-perspective-p'] = { zh:'游戏拆解页面不是"打分测评"，而是从策划的角度分析失败原因：核心设计缺陷、关键决策节点、假设推演。能区分"作为玩家我不喜欢"和"作为策划这个设计有问题"。', en:'My game analysis page isn\'t reviews — it\'s producer-perspective failure analysis: core design flaws, key decision nodes, counterfactual scenarios. I can distinguish "I don\'t like this as a player" from "this design is broken."' };
  M['about-card-doc-p']    = { zh:'约3.2万字的世界观设定不是"想到哪写到哪"，而是有体系、有索引、有搜索功能的结构化文档。策划的核心产出物就是文档——能不能把想法写清楚、让别人（包括AI）看得懂、可执行。', en:'~32,000 words of worldbuilding — not stream-of-consciousness, but structured, indexed, searchable documentation. A designer\'s core output is documents: can you make your ideas clear, understandable, and executable — even for an AI?' };
  M['about-arch-p1']       = { zh:'B站频道以"消失游戏开发日志"系列为核心，专注追溯那些被取消、被雪藏、胎死腹中的游戏作品背后的开发故事。从《寂静岭P.T.》中小岛秀夫与科乐美的权力斗争，到《细胞分裂》如何被育碧一步步边缘化，再到《超越善恶2》创下游戏史上最长跳票纪录——每一部"消失的游戏"都承载着值得被记录的开发史。', en:'My Bilibili channel centers on "Lost Game Dev Log" — tracing the stories behind canceled, shelved, and stillborn game projects. From Kojima vs. Konami in Silent Hill P.T., to Splinter Cell\'s slow marginalization by Ubisoft, to Beyond Good & Evil 2\'s record-breaking 17-year delay — every "lost game" carries a development history worth documenting.' };
  M['about-arch-p2']       = { zh:'目前该系列已发布6期，累计播放量超过13万，其中《细胞分裂》单期最高播放4.6万。最新一期探讨了国产沙盒游戏史上最抽象的欺诈事件，进一步拓展了系列的选题边界。', en:'6 episodes published, 130K+ cumulative views. Splinter Cell episode peaked at 46K. The latest covers the most absurd fraud case in Chinese game history, pushing the series\' scope further.' };
  M['about-arch-quote']    = { zh:'"游戏不只是代码和美术，它们是团队、资本、时机和运气的复杂博弈。每一部消失的游戏，都是一段被遗忘的历史。"', en:'"Games aren\'t just code and art — they\'re complex negotiations of teams, capital, timing, and luck. Every lost game is a forgotten piece of history."' };
  M['about-worldbuild-p1'] = { zh:'独立构建了「艾瑞斯大陆」奇幻世界观，累计设定文本约3.2万字。与常见的"剑与魔法"设定不同，这个世界观的核心张力来自三股力量的博弈：', en:'Built the "Iris Continent" fantasy world — ~32,000 words of setting documentation. Unlike typical sword-and-sorcery settings, the core tension comes from a three-way power struggle:' };
  M['about-narrative-p1']  = { zh:'无论做视频还是写设定，我追求的核心原则是：信息密度与叙事节奏的平衡。', en:'Whether making videos or writing settings, my core principle is: balancing information density with narrative pacing.' };
  M['about-narrative-p2']  = { zh:'游戏考据视频以严密的逻辑链条和一手资料为骨架，拒绝空洞的情绪输出；世界观构建则从社会学视角切入——将经济学、政治学、法律史等维度融入奇幻设定，让虚构世界拥有"非虚构"级别的可信度。', en:'Video essays are built on rigorous logic chains and primary sources — no empty emotional manipulation. Worldbuilding takes a sociological lens: economics, political science, and legal history woven into fantasy, giving fiction "non-fiction" credibility.' };
  M['about-narrative-p3']  = { zh:'在表达方式上，偏好冷峻、克制的语调，用事实和逻辑本身的力量驱动叙事，而非依赖情绪渲染。', en:'Stylistically, I prefer a restrained, clinical tone — letting facts and logic drive the narrative rather than emotional appeal.' };
  M['about-team-p']        = { zh:'作品集网站从第一行 HTML 到最终 13 页的完整结构，全程由我提供方向、内容、审美判断和迭代反馈，由 AI（Claude）执行编码和内容生成。以下记录的是这段协作如何工作，以及从中可以提取什么可复用的方法论。', en:'This portfolio — from first line of HTML to 13-page complete structure — was directed entirely by me (direction, content, aesthetic judgment, iteration) and executed by Claude (coding, debugging, content generation). Below is how this collaboration works and what reusable methodology emerged.' };
  M['home-card-bili-p-full']  = { zh:'「消失游戏开发日志」系列7期，累计19.7万播放。含可排序视频对比、指标雷达图、观众画像与内容策略分析。', en:'7-episode "Lost Game Dev Log" series, 197K views. Sortable video comparison, radar charts, audience profile & strategy analysis.' };
  M['home-card-world-p-full'] = { zh:'约3.2万字原创奇幻世界观。双能力体系、五大城市、经济法律系统、核心历史、机密档案与最高机密卷宗。', en:'~32,000-word original fantasy world. Dual power system, 5 cities, economy & law, core history, classified archives.' };
  M['home-card-novel-p-full'] = { zh:'长篇小说12章，哥特式小镇叙事。含性格测试与可交互人物关系图。', en:'12-chapter Gothic novel. Personality quiz & interactive character map.' };
  M['home-card-analysis-p-full'] = { zh:'从策划视角分析7款游戏的失败节点与行业教训——核心设计问题、关键失败原因、可迁移至当代游戏开发的教训。', en:'Producer-perspective failure analysis of 7 games — core design issues, key failure nodes, transferable industry lessons.' };
  M['home-card-script-p-full'] = { zh:'对七期视频文案本身的元分析——叙事结构、风格演变、观众钩子设计、创作方法论。不只是"写了什么"，更是"为什么这么写"。', en:'Meta-analysis of 7 video scripts — narrative structure, style evolution, audience hooks, creative methodology. Not just "what was written," but "why it was written that way."' };

  M['bili-hero-h1']        = { zh:'B站内容创作', en:'Bilibili Content' };
  M['bili-hero-p']         = { zh:'「消失游戏开发日志」系列——专注追溯被取消/雪藏/胎死腹中的游戏作品背后的开发故事与商业博弈。已发布7期，累计播放量19.7万。', en:'\"Lost Game Dev Log\" series — tracing the stories behind canceled, shelved, and stillborn game projects. 7 episodes, 197K total views.' };
  M['world-hero-h1']       = { zh:'艾瑞斯大陆设定集', en:'Iris Continent Setting' };
  M['world-hero-p']        = { zh:'独立构建的原创奇幻世界观 · 累计约3.2万字', en:'Original fantasy world · ~32,000 words' };
  M['gaming-hero-h1']      = { zh:'游戏经历', en:'Gaming Experience' };
  M['gaming-hero-p']       = { zh:'从竞技射击到开放世界，从主机大作到手游休闲 · 总时长 3000+ 小时  |  不完全汇总', en:'From competitive shooters to open worlds, AAA to mobile casual · 3000+ hours total  |  Incomplete Summary' };
  M['design-hero-h1']      = { zh:'可交互游戏原型', en:'Interactive Game Prototypes' };


  // === Gaming page ===
  M['gaming-stats-hours']  = { zh:'总游戏时长（小时）', en:'Total Play Time (hours)' };
  M['gaming-stats-games']  = { zh:'游戏数量', en:'Games Played' };
  M['gaming-stats-done']   = { zh:'全成就 / 通关', en:'100% / Completed' };
  M['gaming-stats-rank']   = { zh:'最高段位', en:'Highest Rank' };
  M['gaming-pc-label']     = { zh:'PC / 主机游戏', en:'PC / Console Games' };
  M['gaming-mobile-label'] = { zh:'手机游戏', en:'Mobile Games' };
  M['gaming-search-ph']    = { zh:'搜索游戏名称...', en:'Search games...' };
  M['gaming-mobile-note']  = { zh:'手机游戏以休闲体验为主，包含音乐节奏、角色扮演、模拟经营等多种类型，展示了广泛的游戏兴趣。', en:'Mobile games span rhythm, RPG, simulation and more — showcasing broad gaming interests.' };
  M['gaming-other-deep']   = { zh:'其他深度体验游戏', en:'Other Deep-Play Games' };
  M['gaming-other-clear']  = { zh:'其他通关 / 体验游戏', en:'Other Completed / Played Games' };
  M['gaming-footer']       = { zh:'BEST-辣椒 © 2026 · 游戏经历汇总 · 总游戏时长超过 3000 小时', en:'BEST-Chili © 2026 · Gaming Summary · 3000+ Hours Total' };

  // === Bilibili page ===
  M['bili-stats-fans']     = { zh:'粉丝', en:'Followers' };
  M['bili-stats-plays']    = { zh:'总播放量', en:'Total Views' };
  M['bili-live-tag']       = { zh:'实时', en:'Live' };
  M['bili-section-videos'] = { zh:'视频系列', en:'Video Series' };
  M['bili-section-audience'] = { zh:'观众画像', en:'Audience Profile' };
  M['bili-section-strategy'] = { zh:'内容策略', en:'Content Strategy' };
  M['bili-table-num']      = { zh:'#', en:'#' };
  M['bili-table-game']     = { zh:'游戏', en:'Game' };
  M['bili-table-find']     = { zh:'核心发现', en:'Key Discovery' };
  M['bili-table-views']    = { zh:'播放', en:'Views' };
  M['bili-table-coin']     = { zh:'硬币/点赞', en:'Coins/Likes' };
  M['bili-insight-title']  = { zh:'数据洞察', en:'Data Insights' };
  M['bili-radar-title']    = { zh:'指标雷达对比', en:'Metric Radar Comparison' };

  // === Worldbuilding page ===
  M['world-overview']      = { zh:'世界概览', en:'World Overview' };
  M['world-power']         = { zh:'能力体系', en:'Power System' };
  M['world-cities']        = { zh:'五大城市', en:'Five Cities' };
  M['world-social']        = { zh:'社会系统', en:'Social Systems' };
  M['world-history']       = { zh:'核心历史', en:'Core History' };
  M['world-books']         = { zh:'核心理论著作', en:'Key Theoretical Works' };
  M['world-three-sides']   = { zh:'三大侧系', en:'Three Branches' };
  M['world-dual-major']    = { zh:'主修/辅修制', en:'Major/Minor System' };
  M['world-tier']          = { zh:'等级体系：一阶至十阶', en:'Tier System: 1st to 10th' };
  M['world-search-ph']     = { zh:'输入关键词搜索设定集...', en:'Search the setting...' };
  M['world-full-btn']      = { zh:'阅读设定集全文（约3.2万字原版） →', en:'Read Full Setting (~32,000 words) →' };
  M['world-full-desc']     = { zh:'含方言对照指南、机密档案、历史年表等共16个章节', en:'Includes dialect guide, classified archives, historical timeline — 16 chapters total' };
  M['world-fig-map']       = { zh:'艾瑞斯大陆地图 · 图片由 GPT image2 生成 · 点击放大查看', en:'Iris Continent Map · Image by GPT image2 · Click to enlarge' };
  M['world-fig-classes']   = { zh:'物理侧与魔法侧职阶示意图 · 图片由 GPT image2 生成 · 点击放大查看', en:'Physical & Magic Branch Job Classes · Image by GPT image2 · Click to enlarge' };
  M['world-fig-war']       = { zh:'奥赖因战争示意图 · 图片由 GPT image2 生成 · 点击放大查看', en:'O\u2019Lein War Diagram \u00b7 Image by GPT image2 \u00b7 Click to enlarge' };
  M['world-city-img-note'] = { zh:'图片由 GPT image2 生成 · 点击放大', en:'Image by GPT image2 · Click to enlarge' };

  // === Game Design page ===
  M['design-radar']        = { zh:'能力者属性雷达评估', en:'Attribute Radar Assessment' };
  M['design-calc']         = { zh:'战斗伤害公式演算', en:'Combat Damage Calculator' };
  M['design-loot']         = { zh:'掉落模拟器', en:'Loot Simulator' };
  M['design-quest']        = { zh:'公会任务交互式决策', en:'Guild Quest Decision Flow' };
  M['design-board']        = { zh:'中世纪告示板 · 任务派发', en:'Medieval Notice Board · Quest Dispatch' };

  // === Common elements ===
  M['toc-label']           = { zh:'目录', en:'TOC' };
  M['back-to-top']         = { zh:'↑', en:'↑' };

  function t(key) {
    var entry = M[key];
    if (!entry) return key;
    return entry[LANG] || entry['zh'] || key;
  }

  function apply() {
    var els = document.querySelectorAll('[data-i18n]');
    for (var i = 0; i < els.length; i++) {
      var key = els[i].getAttribute('data-i18n');
      if (key === 'html') {
        els[i].innerHTML = t(els[i].getAttribute('data-i18n-html'));
      } else {
        els[i].textContent = t(key);
      }
    }
    // Placeholders
    var phs = document.querySelectorAll('[data-i18n-placeholder]');
    for (var j = 0; j < phs.length; j++) {
      phs[j].placeholder = t(phs[j].getAttribute('data-i18n-placeholder'));
    }
    // Title attributes
    var ts = document.querySelectorAll('[data-i18n-title]');
    for (var k = 0; k < ts.length; k++) {
      ts[k].title = t(ts[k].getAttribute('data-i18n-title'));
    }
    // Update toggle button text
    var btn = document.getElementById('lang-toggle');
    if (btn) btn.textContent = t('lang-label');
    // Update <title>
    var titleEl = document.querySelector('title[data-i18n]');
    if (titleEl) document.title = t(titleEl.getAttribute('data-i18n'));
    // Save
    localStorage.setItem('site-lang', LANG);
  }

  function toggle() {
    LANG = LANG === 'zh' ? 'en' : 'zh';
    apply();
  }

  document.addEventListener('DOMContentLoaded', function() {
    // Add toggle button to all navs
    var navs = document.querySelectorAll('nav .nav-inner');
    for (var i = 0; i < navs.length; i++) {
      if (navs[i].querySelector('#lang-toggle')) continue;
      var btn = document.createElement('button');
      btn.id = 'lang-toggle';
      btn.textContent = t('lang-label');
      btn.title = t('lang-title');
      btn.setAttribute('data-i18n', 'lang-label');
      btn.setAttribute('data-i18n-title', 'lang-title');
      btn.style.cssText = 'background:none;border:1px solid var(--border);padding:4px 10px;border-radius:4px;font-size:11px;color:var(--text-dim);cursor:pointer;font-family:inherit;letter-spacing:1px;transition:all 0.2s;margin-left:auto;';
      btn.onmouseenter = function() { this.style.color = 'var(--accent)'; this.style.borderColor = 'var(--accent)'; };
      btn.onmouseleave = function() { this.style.color = 'var(--text-dim)'; this.style.borderColor = 'var(--border)'; };
      btn.onclick = toggle;
      navs[i].appendChild(btn);
    }
    // Initial apply
    if (LANG === 'en') apply();
  });
})();
