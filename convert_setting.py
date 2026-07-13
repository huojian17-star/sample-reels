# -*- coding: utf-8 -*-
"""将艾瑞斯大陆设定集docx转为HTML页面"""
import sys, re
sys.stdout.reconfigure(encoding='utf-8')
from docx import Document

doc = Document(r'F:\艾瑞斯大陆设定集.docx')

# 标题识别规则（与排版脚本一致）
MONTH_NAMES = r'(初生月|雨月|芽月|花月|阳月|暑月|收获月|金月|雾月|寒月|影月|炉火月|新年庆典|仲夏庆典|丰收庆典|先祖之夜|星辰归位|闰日)'

H1_SIGNATURES = [
    r'^艾瑞斯大陆核心历史', r'^艾瑞斯大陆最高机密档案', r'^艾瑞斯大陆历法体系',
    r'^艾瑞斯大陆历史年表补充', r'^艾瑞斯大陆主要艺术流派及其奠基人',
    r'^中心市研究院\s*[-—]\s*语言与民俗学部', r'^中心市中央档案馆',
    r'^中心市研究院\s*[-—]\s*生物学与社会学分部',
    r'^中心市元老会议\s*[-—]\s*能力评定与管理部',
    r'^著作介绍：', r'^人物档案：', r'^著名吟游诗人及其代表作',
    r'^《岩湖市.+深度剖析',
]

def get_tag(text):
    t = text.strip()
    if not t:
        return None
    # H1
    for sig in H1_SIGNATURES:
        if re.match(sig, t):
            return 'h2'  # 用 h2 因为页面标题是 h1
    if t.startswith('《岩湖市'):
        return 'h2'
    # 排除月份
    if re.match(rf'^\d+\.\s*{MONTH_NAMES}', t):
        return None
    # H2: 编号章节
    if re.match(r'^\d+\.\s*[宗教育医疗艺术法律历法].{1,20}$', t):
        return 'h3'
    if re.match(r'^\d+\.\s*(通用历法|其他历法|时间单位|历法与社会|起源与制定者)', t):
        return 'h3'
    if re.match(r'^[一二三四五六七八九十]+、.{2,}', t):
        return 'h3'
    if re.match(r'^第[一二三四五六七八九十]+章[：:].+', t):
        return 'h3'
    if re.match(r'^(假说[一二三四五六七八九十])[：:].+', t):
        return 'h3'
    if re.match(r'^(模块[一二三四五六七八九十])[：:].+', t):
        return 'h3'
    if re.match(r'^\d+\.\s*(内部结构|外部纽带|社会生态|经济|核心|现状|影响|结论|摘要|引言|文件)', t):
        return 'h3'
    if re.match(r'^\d+\.\s*.{4,}', t) and len(t) <= 80:
        if not (len(t) > 40 and re.search(r'[。？！]', t)):
            return 'h3'
    if re.match(r'^(第[一二三四五六七八九十]+卷)[：:].+', t):
        return 'h3'
    if re.match(r'^(第一卷|第二卷|第三卷|第四卷|第五卷|第六卷)[：:]', t):
        return 'h3'
    if re.match(r'^第[一二三四五六七八九十]+部分[：:].+', t):
        return 'h3'
    if re.match(r'^[一二三四五六七八九十]+[、，][\u4e00-\u9fff]+.{0,30}$', t):
        return 'h3'
    # H4: 子标题
    if re.match(r'^（[一二三四五六七八九十]+）.+', t):
        return 'h4'
    if re.match(r'^·\s*(物理侧|魔法侧|研究侧|能力者|非能力者)', t):
        return 'h4'
    if re.match(r'^\d+\.\s*(清剿任务|护卫任务|探索与侦察|要塞协防|特殊讨伐|风险溢价|能力折旧|财富循环|驱动创新|社会地位)', t):
        return 'h4'
    if re.match(r'^·\s*.{1,30}$', t):
        return 'h4'
    if re.match(r'^(结论|影响与遗产|社会影响|支持证据|隐含意义|核心论题|主要内容概要)[：:]', t):
        return 'h4'
    return None

# 生成HTML
html_parts = []
for p in doc.paragraphs:
    text = p.text.strip()
    if not text:
        html_parts.append('')
        continue

    tag = get_tag(text)
    if tag:
        html_parts.append(f'<{tag}>{text}</{tag}>')
    else:
        html_parts.append(f'<p>{text}</p>')

body_content = '\n'.join(html_parts)

# 嵌入模板
full_html = f'''<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>艾瑞斯大陆设定集 · 全文 · BEST-辣椒</title>
<link rel="stylesheet" href="style.css">
</head>
<body>

<nav>
  <div class="nav-inner">
    <a href="index.html" class="nav-brand">BEST-辣椒</a>
    <div class="nav-links">
      <a href="about.html">关于</a>
      <a href="bilibili.html">B站</a>
      <a href="worldbuilding.html">设定集</a>
    </div>
  </div>
</nav>

<div class="page-hero">
  <p><a href="worldbuilding.html" class="back-link">&larr; 返回设定集概述</a></p>
  <h1>艾瑞斯大陆设定集 · 全文</h1>
  <p>原版世界观设定，全文约六万字</p>
</div>

<div class="content-section">
{body_content}
</div>

<footer>
  <p>BEST-辣椒 &copy; 2026 · <a href="https://space.bilibili.com/518565512" target="_blank" rel="noopener" style="color:var(--text-dim);">B站主页</a></p>
</footer>

</body>
</html>'''

out = r'C:\Users\28253\Desktop\portfolio-website\worldbuilding-full.html'
with open(out, 'w', encoding='utf-8') as f:
    f.write(full_html)

# 统计
import html
h2 = body_content.count('<h2>')
h3 = body_content.count('<h3>')
h4 = body_content.count('<h4>')
paras = body_content.count('<p>')
print(f'生成完成: {out}')
print(f'H2: {h2}  H3: {h3}  H4: {h4}  正文段落: {paras}')
print(f'总大小: {len(full_html)} 字符')
