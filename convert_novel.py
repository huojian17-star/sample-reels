# -*- coding: utf-8 -*-
"""将渡鸦镇小说docx转为HTML页面"""
import sys, re
sys.stdout.reconfigure(encoding='utf-8')
from docx import Document

doc = Document(r'D:\QQ\渡鸦镇(7)(1).docx')

html_parts = []
for p in doc.paragraphs:
    text = p.text.strip()
    if not text:
        html_parts.append('')
        continue
    # 章节标题
    if re.match(r'^第[一二三四五六七八九十百零]+章', text):
        html_parts.append(f'<h2>{text}</h2>')
    else:
        html_parts.append(f'<p>{text}</p>')

body = '\n'.join(html_parts)

full_html = f'''<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>渡鸦镇 · 全文 · BEST-辣椒</title>
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
      <a href="novel.html">小说</a>
    </div>
  </div>
</nav>

<div class="page-hero">
  <p><a href="novel.html" class="back-link">&larr; 返回小说概述</a></p>
  <h1>渡鸦镇 · 全文</h1>
  <p>十二章 · 约四万一千字</p>
</div>

<div class="content-section">
{body}
</div>

<footer>
  <p>BEST-辣椒 &copy; 2026 · <a href="https://space.bilibili.com/518565512" target="_blank" rel="noopener" style="color:var(--text-dim);">B站主页</a></p>
</footer>

</body>
</html>'''

out = r'C:\Users\28253\Desktop\portfolio-website\novel-full.html'
with open(out, 'w', encoding='utf-8') as f:
    f.write(full_html)

chapters = body.count('<h2>')
paras = body.count('<p>')
print(f'生成完成: {out}')
print(f'章节: {chapters}  正文段落: {paras}  总大小: {len(full_html)} 字符')
