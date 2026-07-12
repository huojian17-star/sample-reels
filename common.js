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

// ====== 3. 回到顶部 ======
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
