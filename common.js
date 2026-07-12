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
  mascot.style.cssText = 'position:fixed;bottom:24px;right:24px;z-index:9999;cursor:grab;user-select:none;';
  mascot.innerHTML = '<div id="guest-bubble" style="position:absolute;bottom:110%;left:50%;transform:translateX(-50%);background:#fdfaf4;border:3px solid #4a3828;padding:10px 16px;max-width:380px;min-width:100px;text-align:center;font-size:13px;color:#3a2a18;line-height:1.5;word-break:keep-all;box-shadow:4px 4px 0 0 #2a1a08;font-family:Georgia,serif;cursor:pointer;display:none;"></div><img id="guest-img" src="pixel-avatar-clean-small.png" alt="小人" style="width:80px;height:auto;display:block;" draggable="false">';
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
    // 自适应宽度
    var len = msg.length;
    bubble.style.maxWidth = len <= 10 ? '240px' : len <= 18 ? '340px' : len <= 30 ? '440px' : '540px';
    bubble.style.display = 'block';
    bubble.classList.remove('pop');
    void bubble.offsetWidth;
    bubble.classList.add('pop');
  }

  // 点击小人：对话
  img.addEventListener('click', function(e) {
    if (wasDrag) return;
    e.stopPropagation();
    img.style.transform = 'scale(1.12)';
    setTimeout(function() { img.style.transform = ''; }, 150);
    say(pickMsg());
  });

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
    e.preventDefault(); e.stopPropagation();
    wasDrag = false; isDrag = false;
    var r = mascot.getBoundingClientRect();
    startX = e.touches[0].clientX; startY = e.touches[0].clientY;
    startLeft = r.left; startTop = r.top;
    offX = e.touches[0].clientX - r.left; offY = e.touches[0].clientY - r.top;
    document.addEventListener('touchmove', onTouch, { passive: false });
    document.addEventListener('touchend', onUp);
  });

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
    bubble.style.display = '';
    if (Math.random() < 0.35) say(pickMsg());
  }

  // 来一句开场白
  setTimeout(function() { say('嘿，我跟你进来了！随便逛逛，点我聊天~'); }, 600);
})();

// ====== 4. 回到顶部 ======
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
