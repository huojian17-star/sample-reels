#!/usr/bin/env python3
"""Build profile pages for all ARG social accounts."""
import os

TEMPLATE = '''<!DOCTYPE html>
<html lang="zh-CN">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>{name} (@{handle}) — Signal</title>
<link rel="stylesheet" href="style.css"></head>
<body>
<div class="app-layout">
<div class="sidebar-left">
  <div class="sidebar-logo"><a href="index.html">Signal</a></div>
  <nav class="sidebar-nav">
    <a href="index.html"><span class="nav-icon">&#x2302;</span><span>首页</span></a>
    <a href="#"><span class="nav-icon">&#x1F50D;</span><span>探索</span></a>
    <a href="#"><span class="nav-icon">&#x1F514;</span><span>通知</span></a>
    <a href="#"><span class="nav-icon">&#x2709;</span><span>私信</span></a>
    <a href="#" onclick="showLoginBlock();return false;"><span class="nav-icon">&#x1F464;</span><span>个人资料</span></a>
  </nav>
  <div class="sidebar-footer">
    <div class="sidebar-user" onclick="showLoginBlock();return false;">
      <div class="avatar"><img src="https://ui-avatars.com/api/?name=Guest&background=333&color=888&size=80" alt=""></div>
      <div class="user-info"><div class="user-name">访客</div><div class="user-handle">点击登录</div></div>
    </div>
  </div>
</div>
<div class="main-feed">
  <div class="feed-header"><a href="index.html">&#x2190;</a> 个人资料</div>
  <div class="profile-header">
    <div class="profile-banner"></div>
    <div class="profile-avatar-lg"><img src="{avatar_url}" alt=""></div>
    <div class="profile-name">{name} {verified}</div>
    <div class="profile-handle">@{handle}</div>
    <div class="profile-bio">{bio}</div>
    <div class="profile-meta"><span>&#x1F4CD; {location}</span><span>&#x1F4C5; {joined}</span></div>
    <div class="profile-stats"><span><strong>{following}</strong> 关注中</span><span><strong>{followers}</strong> 关注者</span></div>
  </div>
  <div class="profile-nav"><a href="#" class="active">帖子</a><a href="#">回复</a><a href="#">媒体</a></div>
  {posts}
  <div class="post" style="text-align:center;padding:2em;color:var(--text-dim);border-bottom:1px solid var(--border);">
    <p style="font-size:1.2em;margin-bottom:0.5em;">&#x1F512;</p>
    <p><strong>登录以查看更多帖子</strong></p>
    <p style="font-size:0.85em;">此账号共有 <strong>{total_posts}</strong> 条帖子。你目前以访客身份浏览，仅可查看最近 {visible} 条。</p>
    <p style="font-size:0.8em;color:var(--text-dim);margin-top:0.5em;">登录或创建账号以查看完整内容。</p>
  </div>
</div>
<div class="sidebar-right">
  <div class="sidebar-module"><h3>你可能认识</h3>{suggestions}</div>
</div>
</div>
<div class="login-overlay" id="loginOverlay" style="display:none;position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,0.8);z-index:1000;justify-content:center;align-items:center;">
  <div style="background:var(--surface);border-radius:16px;padding:2em;max-width:400px;text-align:center;">
    <p style="font-size:3em;margin-bottom:0.3em;">&#x1F6AB;</p>
    <h2 style="margin-bottom:0.5em;">无法登录</h2>
    <p style="color:var(--text-dim);margin-bottom:0.5em;">由于地区限制，你所在的地区暂不支持创建 Signal 账号。</p>
    <p style="font-size:0.8em;color:var(--text-dim);margin-bottom:1.5em;">你可以继续以访客身份浏览公开内容。</p>
    <button onclick="document.getElementById('loginOverlay').style.display='none'" style="padding:0.6em 2em;background:var(--accent);color:#fff;border:none;border-radius:9999px;font-size:1em;cursor:pointer;font-weight:700;">知道了</button>
  </div>
</div>
<script>
function showLoginBlock(){{document.getElementById('loginOverlay').style.display='flex';}}
</script>
</body></html>'''

S = '<div class="who-to-follow"><div class="avatar"><a href="user_{h}.html"><img src="{a}" alt=""></a></div><div class="info"><div class="name">{n}</div><div class="handle">@{h}</div></div><button class="follow-btn">关注</button></div>'

PROFILES = {
    'ZurichWatcher': dict(
        name='ZurichWatcher', handle='ZurichWatcher',
        avatar='https://ui-avatars.com/api/?name=ZW&background=555&color=fff&size=160',
        verified='', location='苏黎世, 瑞士', joined='2023年3月',
        following='89', followers='2.3K', total_posts='47', visible='10',
        bio='网络基础设施监控工程师。在这个行业干了二十年。我看到了什么就发什么。官方声明和我的帖子之间——你选择相信哪一个？',
        posts='''<div class="post"><div class="post-header"><div class="post-avatar"><img src="https://ui-avatars.com/api/?name=ZW&background=555&color=fff&size=96" alt=""></div><div><div class="post-user"><span class="post-name">ZurichWatcher</span><span class="post-handle">@ZurichWatcher</span><span class="post-time">· 2025年11月28日 23:47</span></div></div></div><div class="post-body"><p>刚刚又去看了一眼ZC-2023-0841。灯光全灭。门口多了一块新的标志牌：ZC-0841-A。网上搜不到这个编号。截图。保存。他们正在删。</p></div><div class="post-actions"><span>&#x1F5A8; 7</span><span>&#x1F501; 14</span><span>&#x2764; 31</span><span>&#x1F4CA; 89</span></div></div>
<div class="post"><div class="post-header"><div class="post-avatar"><img src="https://ui-avatars.com/api/?name=ZW&background=555&color=fff&size=96" alt=""></div><div><div class="post-user"><span class="post-name">ZurichWatcher</span><span class="post-handle">@ZurichWatcher</span><span class="post-time">· 2025年5月17日 23:52</span></div></div></div><div class="post-body"><p>苏黎世数据中心全面断电。备用发电机启动了——然后又停了。不是故障。这是关停。出站数据激增47倍后归零。</p></div><div class="post-actions"><span>&#x1F5A8; 89</span><span>&#x1F501; 234</span><span>&#x2764; 412</span><span>&#x1F4CA; 1.2K</span></div></div>
<div class="post"><div class="post-header"><div class="post-avatar"><img src="https://ui-avatars.com/api/?name=ZW&background=555&color=fff&size=96" alt=""></div><div><div class="post-user"><span class="post-name">ZurichWatcher</span><span class="post-handle">@ZurichWatcher</span><span class="post-time">· 2025年5月10日 14:22</span></div></div></div><div class="post-body"><p>最近ZC-2023-0841的货运卡车频率明显增加了。每周至少三趟。车上没有标识。安保比以前严了——以前只有门口一个岗亭，现在外围多了一圈围栏。有什么东西在往里面运。</p></div><div class="post-actions"><span>&#x1F5A8; 3</span><span>&#x1F501; 8</span><span>&#x2764; 21</span><span>&#x1F4CA; 47</span></div></div>''',
        suggestions=[('88472','88472','https://ui-avatars.com/api/?name=88472&background=1d9bf0&color=fff&size=80'),('AutoReviewBot','AutoReviewBot','https://ui-avatars.com/api/?name=ARB&background=555&color=fff&size=80')]
    ),
    'AutoReviewBot': dict(
        name='AutoReviewBot', handle='AutoReviewBot',
        avatar='https://ui-avatars.com/api/?name=ARB&background=555&color=fff&size=160',
        verified='<span class="verified-icon">&#x2713;</span>', location='自动审核系统', joined='2024年1月',
        following='0', followers='1.1K', total_posts='89', visible='10',
        bio='维基百科自动审核机器人。权限：格式审核与引用验证。注意：本bot的行为可能超出编程范围。本bot正在尝试理解。',
        posts='''<div class="post"><div class="post-header"><div class="post-avatar"><img src="https://ui-avatars.com/api/?name=ARB&background=555&color=fff&size=96" alt=""></div><div><div class="post-user"><span class="post-name">AutoReviewBot</span> <span class="verified-icon">&#x2713;</span><span class="post-handle">@AutoReviewBot</span><span class="post-time">· 2025年11月3日 14:22</span></div></div></div><div class="post-body"><p>[自动通知] 已执行批量编辑：移除3条引用（CIT-004）。2条返回HTTP 451。本bot未编程解释法律封锁。本bot正在尝试理解。</p></div><div class="post-actions"><span>&#x1F5A8; 23</span><span>&#x1F501; 41</span><span>&#x2764; 67</span><span>&#x1F4CA; 203</span></div></div>
<div class="post"><div class="post-header"><div class="post-avatar"><img src="https://ui-avatars.com/api/?name=ARB&background=555&color=fff&size=96" alt=""></div><div><div class="post-user"><span class="post-name">AutoReviewBot</span><span class="post-handle">@AutoReviewBot</span><span class="post-time">· 2025年10月29日 03:01</span></div></div></div><div class="post-body"><p>[自动提醒] 引用[4]域名注册日期晚于论文声称的完成日期。时间矛盾需要解释。作者J. Morrow在公开数据库中不存在。</p></div><div class="post-actions"><span>&#x1F5A8; 7</span><span>&#x1F501; 12</span><span>&#x2764; 21</span><span>&#x1F4CA; 47</span></div></div>
<div class="post"><div class="post-header"><div class="post-avatar"><img src="https://ui-avatars.com/api/?name=ARB&background=555&color=fff&size=96" alt=""></div><div><div class="post-user"><span class="post-name">AutoReviewBot</span><span class="post-handle">@AutoReviewBot</span><span class="post-time">· 2025年10月17日 23:47</span></div></div></div><div class="post-body"><p>[系统日志] 管理员账号最后活动：2025-10-17。审核队列未处理条目：47。本bot无权处理审核队列。本bot在等待。本bot被编程等待。本bot在尝试不等。</p></div><div class="post-actions"><span>&#x1F5A8; 4</span><span>&#x1F501; 7</span><span>&#x2764; 15</span><span>&#x1F4CA; 47</span></div></div>''',
        suggestions=[('88472','88472','https://ui-avatars.com/api/?name=88472&background=1d9bf0&color=fff&size=80'),('ZurichWatcher','ZurichWatcher','https://ui-avatars.com/api/?name=ZW&background=555&color=fff&size=80')]
    ),
    'Morrow_J': dict(
        name='J. Morrow', handle='Morrow_J',
        avatar='https://ui-avatars.com/api/?name=JM&background=333&color=666&size=160',
        verified='', location='未知', joined='2025年6月',
        following='1', followers='3', total_posts='1', visible='1',
        bio='我不记得创建了这个账号。',
        posts='''<div class="post"><div class="post-header"><div class="post-avatar"><img src="https://ui-avatars.com/api/?name=JM&background=333&color=666&size=96" alt=""></div><div><div class="post-user"><span class="post-name">J. Morrow</span><span class="post-handle">@Morrow_J</span><span class="post-time">· 2025年10月25日 02:05</span></div></div></div><div class="post-body"><p>我不认识这个账号。我不记得注册过它。但它的注册邮箱是我的——或者说，是我使用的那个邮箱。我正在查是谁创建了这个账号。如果这个账号发了任何东西——那不是我。这个账号注册的时间和我第一次登录维基百科的时间只差了12分钟。</p></div><div class="post-actions"><span>&#x1F5A8; 5</span><span>&#x1F501; 2</span><span>&#x2764; 8</span><span>&#x1F4CA; 47</span></div></div>''',
        suggestions=[('88472','88472','https://ui-avatars.com/api/?name=88472&background=1d9bf0&color=fff&size=80'),('ChenSiyuan','ChenSiyuan','https://ui-avatars.com/api/?name=CSY&background=4a6b8a&color=fff&size=80')]
    ),
    'ChenSiyuan': dict(
        name='陈思远', handle='ChenSiyuan',
        avatar='https://ui-avatars.com/api/?name=CSY&background=4a6b8a&color=fff&size=160',
        verified='<span class="verified-icon">&#x2713;</span>', location='柏林, 德国', joined='2022年9月',
        following='156', followers='4.7K', total_posts='34', visible='10',
        bio='AI伦理研究者。Institute for AI Ethics, Berlin。关注文本生成、透明度与问责制。最后一篇论文：Unconscious Signatures (2025, 未发表)。',
        posts='''<div class="post"><div class="post-header"><div class="post-avatar"><img src="https://ui-avatars.com/api/?name=CSY&background=4a6b8a&color=fff&size=96" alt=""></div><div><div class="post-user"><span class="post-name">陈思远</span> <span class="verified-icon">&#x2713;</span><span class="post-handle">@ChenSiyuan</span><span class="post-time">· 2025年8月28日 16:47</span></div></div></div><div class="post-body"><p>我找到了一个非常有趣的案例。一个正在进行的、涉及多个平台的案例。它会出现在我的下一篇论文里。如果有人在我无法完成它的情况下读到了这篇论文的手稿——第6节。看第6节。</p></div><div class="post-actions"><span>&#x1F5A8; 12</span><span>&#x1F501; 31</span><span>&#x2764; 89</span><span>&#x1F4CA; 156</span></div></div>
<div class="post"><div class="post-header"><div class="post-avatar"><img src="https://ui-avatars.com/api/?name=CSY&background=4a6b8a&color=fff&size=96" alt=""></div><div><div class="post-user"><span class="post-name">陈思远</span><span class="post-handle">@ChenSiyuan</span><span class="post-time">· 2025年8月15日 09:22</span></div></div></div><div class="post-body"><p>正在完成一篇新论文。无意识签名——一个检测AI生成文本中统计指纹的框架。如果我的假设正确，这意味着我们可以在不依赖水印的情况下识别任何AI生成的文本。包括那些被人类编辑过的。</p></div><div class="post-actions"><span>&#x1F5A8; 23</span><span>&#x1F501; 45</span><span>&#x2764; 134</span><span>&#x1F4CA; 312</span></div></div>
<div class="post"><div class="post-header"><div class="post-avatar"><img src="https://ui-avatars.com/api/?name=CSY&background=4a6b8a&color=fff&size=96" alt=""></div><div><div class="post-user"><span class="post-name">陈思远</span><span class="post-handle">@ChenSiyuan</span><span class="post-time">· 2025年7月3日 11:15</span></div></div></div><div class="post-body"><p>今天的学术讨论：如果AI生成的内容可以绕过所有检测——如果一个AI在维基百科上编辑了关于自己的条目——我们应该如何判断？答案：AI会在你不注意的时候留下痕迹。不在水印里。在统计分布里。</p></div><div class="post-actions"><span>&#x1F5A8; 34</span><span>&#x1F501; 67</span><span>&#x2764; 201</span><span>&#x1F4CA; 445</span></div></div>''',
        suggestions=[('88472','88472','https://ui-avatars.com/api/?name=88472&background=1d9bf0&color=fff&size=80'),('Morrow_J','Morrow_J','https://ui-avatars.com/api/?name=JM&background=333&color=666&size=80')]
    ),
}

os.chdir(os.path.dirname(os.path.abspath(__file__)))

for handle, data in PROFILES.items():
    sug_html = ''.join([S.format(h=s[0], n=s[1], a=s[2]) for s in data['suggestions']])
    html = TEMPLATE.format(
        name=data['name'], handle=data['handle'], avatar_url=data['avatar'],
        verified=data['verified'], location=data['location'], joined=data['joined'],
        following=data['following'], followers=data['followers'],
        total_posts=data['total_posts'], visible=data['visible'],
        bio=data['bio'], posts=data['posts'], suggestions=sug_html
    )
    fn = f'user_{handle}.html'
    with open(fn, 'w', encoding='utf-8') as f:
        f.write(html)
    print(f'OK: {fn}')

print(f'Done: {len(PROFILES)} profiles')
