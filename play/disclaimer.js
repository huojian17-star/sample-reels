(function(){
  if (localStorage.getItem('ai-agreed') === '1') return;
  var o = document.createElement('div');
  o.id = 'ai-disclaimer';
  o.innerHTML = '<div style="background:#fdfaf4;border:3px solid #4a3828;border-radius:12px;padding:32px 36px;max-width:600px;width:90%;max-height:85vh;overflow-y:auto;box-shadow:0 16px 48px rgba(0,0,0,0.4);text-align:center;">' +
    '<div style="font-size:24px;margin-bottom:16px;">&#9888;&#65039;</div>' +
    '<h2 style="font-size:18px;font-weight:700;color:#3a2a18;margin:0 0 16px 0;line-height:1.5;">AI-Assisted Design Notice<br><span style="font-size:14px;font-weight:400;color:#8a7a68;">AI \u8f85\u52a9\u8bbe\u8ba1\u58f0\u660e</span></h2>' +
    '<p style="font-size:13px;color:#5a4a38;line-height:1.9;text-align:left;margin:0 0 16px 0;">This portfolio incorporates AI-assisted elements to demonstrate human-AI collaboration. All core logic, math models, and world-building texts are strictly handcrafted. If you are sensitive to generative AI, please browse with caution. Thank you.</p>' +
    '<p style="font-size:13px;color:#5a4a38;line-height:1.9;text-align:left;margin:0 0 20px 0;">\u672c\u7f51\u7ad9\u5305\u542b AI \u8f85\u52a9\u8bbe\u8ba1\u5143\u7d20\uff0c\u6838\u5fc3\u903b\u8f91\u3001\u6570\u503c\u67b6\u6784\u53ca\u6587\u672c\u8bbe\u5b9a\u5747\u4e3a\u624b\u4f5c\u4ea7\u51fa\u3002\u5982\u5bf9\u751f\u6210\u5f0f AI \u654f\u611f\uff0c\u8bf7\u8c28\u614e\u6d4f\u89c8\u3002</p>' +
    '<button id="ai-agree-btn" style="background:#a98446;color:#fff;border:none;padding:12px 32px;border-radius:6px;font-size:15px;font-weight:600;cursor:pointer;font-family:inherit;">Yes, I agree / \u662f\u7684\uff0c\u6211\u540c\u610f</button>' +
    '</div>';
  o.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.85);z-index:2147483647;display:flex;align-items:center;justify-content:center;font-family:system-ui,-apple-system,sans-serif;';
  document.body.appendChild(o);
  o.querySelector('button').onclick = function() {
    if (o.parentNode) o.parentNode.removeChild(o);
    try { localStorage.setItem('ai-agreed', '1'); } catch(e) {}
  };
})();
