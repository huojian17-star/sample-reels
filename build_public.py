#!/usr/bin/env python3
"""Build the public/sanitized version of the portfolio website.
Removes personal info (name, phone, school, photo) while keeping email + Bilibili.
Injects AI disclaimer modal into all pages.
"""
import re, io, sys, os, shutil
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8', errors='replace')

PUBLIC = 'public'

# ===== AI Disclaimer Modal =====
DISCLAIMER_HTML = """
<div id="ai-disclaimer" style="position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.85);z-index:2147483647;display:flex;align-items:center;justify-content:center;font-family:system-ui,-apple-system,sans-serif;">
<div style="background:#fdfaf4;border:3px solid #4a3828;border-radius:12px;padding:32px 36px;max-width:600px;width:90%;max-height:85vh;overflow-y:auto;box-shadow:0 16px 48px rgba(0,0,0,0.4);text-align:center;">
<div style="font-size:24px;margin-bottom:16px;">&#9888;&#65039;</div>
<h2 style="font-size:18px;font-weight:700;color:#3a2a18;margin:0 0 16px 0;line-height:1.5;">AI-Assisted Design Notice<br><span style="font-size:14px;font-weight:400;color:#8a7a68;">AI 辅助设计声明</span></h2>
<p style="font-size:13px;color:#5a4a38;line-height:1.9;text-align:left;margin:0 0 16px 0;">
This portfolio site incorporates certain AI-assisted elements, aiming to demonstrate the integration of "human-AI collaboration" to optimize quality and pipeline efficiency. All core logical architectures, math models, and world-building texts are strictly handcrafted by the author. If you are sensitive to generative AI, please browse with caution. Thank you for your understanding.
</p>
<p style="font-size:13px;color:#5a4a38;line-height:1.9;text-align:left;margin:0 0 20px 0;">
本网站包含一定比例的 AI 辅助设计元素，旨在展示在"人机协同"管线中，如何最大化把控作品的最终质量与研发效率。本站所涉全部核心逻辑、数值架构及文本设定均为本人手作产出。如您对生成式 AI 持有不同看法，请谨慎使用或浏览本站，感谢您的理解。
</p>
<button id="ai-agree-btn" onclick="document.getElementById('ai-disclaimer').style.display='none';localStorage.setItem('ai-agreed','1');" style="background:#a98446;color:#fff;border:none;padding:12px 32px;border-radius:6px;font-size:15px;font-weight:600;cursor:pointer;font-family:inherit;letter-spacing:0.5px;transition:background 0.2s;" onmouseover="this.style.background='#8a6a2e'" onmouseout="this.style.background='#a98446'">Yes, I agree &nbsp;/&nbsp; 是的，我同意</button>
</div></div>
<script>
if (localStorage.getItem('ai-agreed') === '1') {
  document.getElementById('ai-disclaimer').style.display = 'none';
}
</script>
"""

def inject_disclaimer(html):
    """Inject the disclaimer right after <body> tag."""
    return html.replace('<body>', '<body>\n' + DISCLAIMER_HTML.strip(), 1)

def desensitize(text):
    """Apply all personal info replacements."""
    replacements = [
        # Name
        ('邓恺恒', '作者'),
        ('Deng Kaiheng', 'The Author'),
        # Phone - remove entirely
        ('15807825534 · ', ''),
        ('· 15807825534', ''),
        ('15807825534', ''),
        ('Phone: 15807825534. ', ''),
        ('电话 15807825534。', ''),
        ('，电话 15807825534', ''),
        # School
        ('湖南工商大学', '跨专业背景'),
        ('Hunan University of Commerce', 'Cross-disciplinary background'),
        ('Hunan University of Technology and Business', 'Cross-disciplinary background'),
        # Major (remove from edu context)
        (' | 工商管理 | 本科', ' | 本科'),
        (' &nbsp;|&nbsp; 工商管理 &nbsp;|&nbsp; 本科', ' &nbsp;|&nbsp; 本科'),
        (' | 工商管理 ', ' '),
        (' | Business Admin | Bachelor', ' | Bachelor'),
        (' | Business Admin ', ' '),
        ('工商管理专业，', ''),
        ('工商管理专业', ''),
        ('，工商管理', ''),
        ('Business Administration major, ', ''),
        ('Business Administration major', 'cross-disciplinary background'),
        ('B.A. in Business Administration, ', ''),
        # Search index tags
        ("本科 工商管理", "本科"),
        # QA keyword cleaning
        ("'跨专业','工商管理','为什么选'", "'跨专业','为什么选'"),
        # Business Admin in common.js
        ('Business Administration to game', 'Cross-disciplinary to game'),
        # Graduation
        ('，2027年毕业。', '。'),
        ('，2027年毕业', ''),
        ('2027年6月毕业，最早可以在毕业前实习或试用。具体时间可以沟通~', '可沟通。'),
        ('graduating in 2027.', ''),
        ('Graduating June 2027. Available for internships or trial periods before graduation. Specific timing is flexible~', 'Available. Specific timing is flexible~'),
        ('graduating in 2027', ''),
        # Job hunting context
        ('求职作品集', '作品集'),
        ('求职', '创作'),
        # Salary - remove QA entry will be handled separately
        # Keep: email, Bilibili link, brand name BEST-辣椒/BEST-Chili
    ]
    for old, new in replacements:
        text = text.replace(old, new)
    return text

def process_about_html(html):
    """Special handling for about.html."""
    # Replace avatar photo with pixel avatar
    html = html.replace('src="avatar.jpg"', 'src="pixel-avatar-clean-small.webp"')
    html = html.replace('src="avatar.webp"', 'src="pixel-avatar-clean-small.webp"')
    return html

def process_common_js(js):
    """Special handling for common.js QA entries."""
    # Fix QA index 0: "我叫 BEST-辣椒，是邓恺恒的像素分身"
    old0zh = "我叫 BEST-辣椒，是邓恺恒的像素分身！你也可以直接叫我「辣椒」~"
    new0zh = "我叫 BEST-辣椒，是这个作品集的像素向导！你也可以直接叫我「辣椒」~"
    js = js.replace(old0zh, new0zh)

    old0en = "I'm BEST-Chili, Deng Kaiheng's pixel avatar! You can just call me 'Chili'~"
    new0en = "I'm BEST-Chili, the pixel guide of this portfolio! You can just call me 'Chili'~"
    js = js.replace(old0en, new0en)

    # Fix QA index 1: "我的作者是邓恺恒..."
    old1zh = '我的作者是邓恺恒，湖南工商大学工商管理专业，意向游戏策划/产品经理~'
    new1zh = '这个作品集的作者是一位跨专业背景的创作者，关注游戏策划与产品设计~'
    js = js.replace(old1zh, new1zh)

    old1en = 'My creator is Deng Kaiheng, a Business Administration major at Hunan University of Technology and Business, aiming for game design / product manager roles~'
    new1en = "This portfolio's creator comes from a cross-disciplinary background, focusing on game design and product management~"
    js = js.replace(old1en, new1en)

    # Fix QA index 4: school info
    old4zh = '湖南工商大学，工商管理专业，本科，2027年毕业。'
    new4zh = '跨专业背景，本科。'
    js = js.replace(old4zh, new4zh)

    old4en = "Hunan University of Technology and Business, B.A. in Business Administration, graduating in 2027."
    new4en = "Cross-disciplinary background, bachelor's degree."
    js = js.replace(old4en, new4en)

    # Fix about page dialog (line 157 zh, line 164 en)
    old_ab_zh = "'邓恺恒，湖南工商大学，工商管理——跨专业做游戏。',"
    new_ab_zh = "'跨专业背景，把管理思维带入游戏设计。',"
    js = js.replace(old_ab_zh, new_ab_zh)

    old_ab_zh2 = "'作者，跨专业背景，工商管理——跨专业做游戏。',"
    new_ab_zh2 = "'跨专业背景，把管理思维带入游戏设计。',"
    js = js.replace(old_ab_zh2, new_ab_zh2)

    old_ab_en = "'Deng Kaiheng, Hunan University of Commerce, Business Administration — cross-disciplinary game design.',"
    new_ab_en = "'Cross-disciplinary background — bringing management thinking into game design.',"
    js = js.replace(old_ab_en, new_ab_en)

    old_ab_en2 = "'The Author, Cross-disciplinary background, Business Administration — cross-disciplinary game design.',"
    js = js.replace(old_ab_en2, new_ab_en)

    # Fix QA "跨专业" keyword entry - still allow matching but generalize answer
    old_cross = "'工商管理跨到游戏策划，看起来跨度大，但其实逻辑是通的——管理学教的是「如何在资源约束下协调多方达成目标」，游戏策划做的也是这件事。而且B站视频系列、世界观设定、交互原型这些都不是课堂作业，是实打实的自驱产出。跨专业不可怕，可怕的是跨了还不做事。作者做了。'"
    new_cross = "'跨专业到游戏策划，看起来跨度大，但其实逻辑是通的——管理学教的是「如何在资源约束下协调多方达成目标」，游戏策划做的也是这件事。B站视频系列、世界观设定、交互原型这些都不是课堂作业，是实打实的自驱产出。跨专业不可怕，可怕的是跨了还不做事。'"
    js = js.replace(old_cross, new_cross)

    old_cross_en = '"Business Administration to game design looks like a big leap, but the logic transfers — management teaches \'how to coordinate multiple parties to achieve goals under resource constraints,\' and game design does the exact same thing. Plus, the Bilibili series, worldbuilding, and interactive prototypes aren\'t class assignments — they\'re self-driven output. Cross-disciplinary isn\'t scary — not doing anything is."'
    new_cross_en = '"Cross-disciplinary transitions into game design look like a big leap, but the logic transfers — management teaches \'how to coordinate multiple parties to achieve goals under resource constraints,\' and game design does the exact same thing. The Bilibili series, worldbuilding, and interactive prototypes aren\'t class assignments — they\'re self-driven output. Cross-disciplinary isn\'t scary — not doing anything is."'
    js = js.replace(old_cross_en, new_cross_en)

    # Remove graduation references via regex (handles em dash variants)
    js = re.sub(r"Graduating June 2027\..+?(?=\")", "Available. Specific timing is flexible~", js)

    return js

def process_index_html(html):
    """Special handling for index.html search index."""
    # Clean search index tags
    html = html.replace('邓恺恒 ', '')
    html = html.replace('15807825534 ', '')
    html = html.replace('湖南工商大学 ', '')
    html = html.replace('工商管理 ', '')
    html = html.replace('Business Admin', '')
    return html

# ===== Main =====
html_files = [f for f in os.listdir(PUBLIC) if f.endswith('.html')]
js_files = [f for f in os.listdir(PUBLIC) if f.endswith('.js') and f != 'check-v11.js']
css_files = [f for f in os.listdir(PUBLIC) if f.endswith('.css')]

print(f'Processing {len(html_files)} HTML files, {len(js_files)} JS files...')

for fn in html_files:
    path = os.path.join(PUBLIC, fn)
    with open(path, encoding='utf-8') as f:
        html = f.read()

    # Inject disclaimer
    html = inject_disclaimer(html)

    # Desensitize
    html = desensitize(html)

    # Page-specific
    if fn == 'about.html':
        html = process_about_html(html)
    elif fn == 'index.html':
        html = process_index_html(html)
    elif fn == 'portfolio-print.html':
        # special print page
        html = desensitize(html)

    with open(path, 'w', encoding='utf-8') as f:
        f.write(html)
    print(f'  {fn}: done')

for fn in js_files:
    if fn == 'check-v11.js':
        continue  # skip old check file
    path = os.path.join(PUBLIC, fn)
    with open(path, encoding='utf-8') as f:
        js = f.read()

    js = desensitize(js)
    if fn == 'common.js':
        js = process_common_js(js)

    with open(path, 'w', encoding='utf-8') as f:
        f.write(js)
    print(f'  {fn}: done')

# Remove unwanted files
for rm in ['check-v11.js']:
    p = os.path.join(PUBLIC, rm)
    if os.path.exists(p):
        os.remove(p)
        print(f'  Removed {rm}')

print('\nBuild complete!')
