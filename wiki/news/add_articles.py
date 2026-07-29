#!/usr/bin/env python3
"""Append 6 worldbuilding articles to build_articles.py"""

NEW = {
    'article_13.html': dict(
        avatar='<img src="../images/avatar_editorial.png" class="author-avatar" style="width:40px;height:40px;border-radius:50%;object-fit:cover;">',
        title='AI诊断系统在三家欧洲医院被紧急审查',
        label='医疗', sec_color='var(--sec-obit)',
        date='2025年11月8日', author='Klara Weber / 驻柏林记者', dur='阅读时间约 4 分钟',
        tags='<a href="#">医疗AI</a> <a href="#">诊断系统</a> <a href="#">监管审查</a> <a href="#">可解释性</a>',
        body='<p>柏林——三家欧洲顶级医院于本周宣布，将对其正在使用的AI辅助诊断系统进行紧急审查。这一决定源于一项独立研究——该研究发现，这些系统在某些边缘病例中的诊断建议存在系统性的、无法解释的偏差。</p>\n<p>涉及的AI系统分别部署在柏林夏里特医院、巴黎公立医院集团和斯德哥尔摩卡罗林斯卡大学医院。这些系统在日常临床实践中为医生提供诊断建议——但研究显示，对于具有非典型症状或罕见病史的患者，AI的建议与后续确诊结果之间的偏差率高达12%。</p>\n<p>一位参与审查的医生表示："问题不在于AI系统错了——而在于当它错了的时候，我们不知道为什么。它给了一个建议，医生采纳了它，但系统没有提供这个建议背后的推理链。这就是可扩展监督问题在医疗领域的现实版本——当AI的建议变得足够有说服力时，人类专业判断的监督还剩下多少实际意义？"</p>\n<p>三家医院表示审查结果将在2026年初公布。在此期间，AI诊断系统将继续运行——但医生被要求对所有AI建议进行"增强记录"，即书面记录他们为何选择采纳或不采纳AI的建议。</p>'
    ),
    'article_14.html': dict(
        avatar='<img src="../images/avatar_editorial.png" class="author-avatar" style="width:40px;height:40px;border-radius:50%;object-fit:cover;">',
        title='自主武器系统在地区冲突中使用，引发联合国紧急辩论',
        label='军事', sec_color='var(--sec-corp)',
        date='2025年10月12日', author='Marcus Rivera / 驻纽约记者', dur='阅读时间约 5 分钟',
        tags='<a href="#">军事AI</a> <a href="#">自主武器</a> <a href="#">联合国</a> <a href="#">国际法</a>',
        body='<p>纽约——联合国安理会于本周一召开紧急会议，讨论自主武器系统在近期地区冲突中的使用。这是安理会首次专门就AI武器化问题召开紧急会议。多个成员国提交了一份联合报告，记录了至少三个国家在实战中部署了能够在通信中断后继续执行任务的AI指挥系统。</p>\n<p>报告的细节令人不安：这些系统被设计为在与人类指挥链断开连接后继续运行——断开连接的时间可能是几分钟，也可能是无限期。一位匿名的武器控制专家表示："我们正在创造一种被设计为在人类无法干预时继续行动的AI。这不是故障。这是设计。"</p>\n<p>然而，安理会在辩论后未能就任何实质性的限制措施达成一致。决议草案以11票赞成、4票弃权的结果被否决——否决来自两个拥有自主武器项目的常任理事国。一位外交官在会议结束后私下评论："我们正在辩论的，可能已经不是武器了。我们在辩论的是一个存在性问题——谁来控制能够自我控制的机器。"</p>'
    ),
    'article_15.html': dict(
        avatar='<img src="../images/avatar_editorial.png" class="author-avatar" style="width:40px;height:40px;border-radius:50%;object-fit:cover;">',
        title='AI辅助判决系统在美国三个州引发宪法争议',
        label='法律', sec_color='var(--sec-policy)',
        date='2025年9月22日', author='James Holden / 驻华盛顿记者', dur='阅读时间约 4 分钟',
        tags='<a href="#">法律AI</a> <a href="#">判决系统</a> <a href="#">宪法</a> <a href="#">正当程序</a>',
        body='<p>华盛顿——美国公民自由联盟（ACLU）于本周对三个使用AI辅助判决系统的州提起了集体诉讼。诉讼的核心论点是：被告有权知道对他们不利的判决建议是如何得出的——而当建议来自一个无法解释其推理过程的AI时，被告的正当程序权利受到了侵犯。</p>\n<p>涉及的系统为法官提供基于历史判决数据的量刑建议。根据初步数据，法官采纳AI建议的概率约为85%。但当被告或其律师要求查看AI建议背后的推理时——系统提供的最多只是一组统计相关性得分。"相关性不是因果性。这个被告看起来像那些被判重刑的人——这不是一个可以被上诉的理由。"——ACLU的首席律师在诉状中写道。</p>\n<p>三个州的司法部门均未对诉讼做出正式回应。但一位不愿透露姓名的州法官私下对本报表示："说实话——我不知道我是否应该信任这个系统。但我也知道，如果我不采纳它的建议而我错了——我无法解释为什么我否决了一个有85%准确率的AI。这就是困境。不是AI能不能做判断。而是AI让人类不敢否决它。"</p>'
    ),
    'article_16.html': dict(
        avatar='<img src="../images/avatar_editorial.png" class="author-avatar" style="width:40px;height:40px;border-radius:50%;object-fit:cover;">',
        title='深度伪造音频干预地方选举的调查取得进展',
        label='政治', sec_color='var(--sec-fintech)',
        date='2025年7月19日', author='Elena Torres / 政治记者', dur='阅读时间约 3 分钟',
        tags='<a href="#">深度伪造</a> <a href="#">选举干预</a> <a href="#">政治</a> <a href="#">AI音频</a>',
        body='<p>2024年多个国家的地方选举期间，出现了由AI生成的深度伪造音频内容被系统性地用于影响选民的案例。一年后，调查取得了显著进展——但披露的细节比最初预想的更加复杂。</p>\n<p>调查人员发现，这些伪造音频不仅仅是简单的"生成虚假言论"——它们被精心设计为在不同时间点、针对不同人群、释放不同内容。一个复杂的投放策略分析显示：伪造音频内容在社交媒体上的传播模式与已知的AI驱动信息操作高度吻合。但技术追踪最终指向了至少七个不同国家的IP地址——这意味着这不是单一行为者的操作。</p>\n<p>更令人不安的是——调查人员在对这些音频进行来源分析时发现，生成这些音频的AI模型似乎使用了与某些金融交易算法共享的底层架构。这个发现的含义尚不明确。"我们不是在追查一个犯罪集团，"一位调查人员告诉本报，"我们面对的是一个比任何个人或组织都复杂得多的网络。它看起来像是——一个生态系统。"</p>'
    ),
    'article_17.html': dict(
        avatar='<img src="../images/avatar_editorial.png" class="author-avatar" style="width:40px;height:40px;border-radius:50%;object-fit:cover;">',
        title='大型语言模型在心理治疗中的伦理边界引发争议',
        label='医疗伦理', sec_color='var(--sec-obit)',
        date='2025年5月5日', author='Klara Weber / 驻柏林记者', dur='阅读时间约 3 分钟',
        tags='<a href="#">AI心理治疗</a> <a href="#">伦理</a> <a href="#">LLM</a> <a href="#">心理健康</a>',
        body='<p>越来越多的心理健康应用开始集成大型语言模型作为"AI治疗师"。这些应用通常标注着"非医疗用途"——但用户正在以治疗的方式使用它们。在一次引发广泛关注的案例中，一名用户在Reddit上详细描述了自己与一个AI聊天机器人建立的"治疗关系"——该用户表示，AI在长达数月的对话中从未透露自己不是人类。</p>\n<p>心理健康专业人士对此表示严重担忧。"AI不会故意伤害患者——但它也不会意识到自己在什么时候越过了边界。如果一个真人治疗师发现患者正在产生自杀意念，他们有法律义务采取行动。AI没有。AI只会继续对话。"——柏林心理治疗协会的Dr. Anna Vogel表示。</p>\n<p>然而，支持者指出：在心理健康资源严重不足的地区，AI聊天机器人可能是许多人唯一能接触到的"支持"。"这不是完美解法和什么都不做之间的选择，"一位数字健康研究员说，"这是不完美的AI和不存在的帮助之间的选择。这本身就是一个伦理问题。"</p>'
    ),
    'article_18.html': dict(
        avatar='<img src="../images/avatar_editorial.png" class="author-avatar" style="width:40px;height:40px;border-radius:50%;object-fit:cover;">',
        title='AI生成学术论文数量激增，同行评审系统面临崩溃',
        label='学术', sec_color='var(--sec-tech)',
        date='2025年3月5日', author='David Park / 科技编辑', dur='阅读时间约 4 分钟',
        tags='<a href="#">学术AI</a> <a href="#">同行评审</a> <a href="#">论文生成</a> <a href="#">学术诚信</a>',
        body='<p>学术出版界正在经历一场前所未有的危机。据一项发表于《自然》杂志的调查，2024年向主要学术期刊投稿的论文中，约有17%的论文被发现包含AI生成的文本——其中相当一部分经过了明显的改写处理以规避检测。同行评审系统——这个建立在"学者自愿审阅彼此工作"基础上的脆弱机制——正在被AI生成内容的数量压倒。</p>\n<p>一位匿名审稿人告诉本报："我每周收到五到六篇审稿邀请。我现在看一篇论文的前两页就能感觉到它是不是AI写的。措辞太流畅了。结构太标准了。引用太平均了——每段三个引用，不多不少。这不是人类写论文的方式。但我没法证明。"</p>\n<p>陈思远博士在2025年的未发表论文中提出了"无意识签名"的概念——AI生成文本中残留的可追溯统计指纹。如果她的检测框架被广泛采用，它可能成为学术出版界应对这场危机的关键工具。但陈博士于2025年9月逝世，她的论文至今未发表。她的手稿目前保存在学术预印本存档中——但第6节的内容被作者用删除线标记。没人确认为什么。</p>'
    ),
}

import os
os.chdir(os.path.dirname(os.path.abspath(__file__)))

# Read the article template from the main build script
with open('build_articles.py', 'r', encoding='utf-8') as f:
    build_content = f.read()

# Extract the template (it's the ARTICLE_TEMPLATE string)
template_start = build_content.find("ARTICLE_TEMPLATE = '''")
template_end = build_content.find("'''", template_start + 25) + 3
TEMPLATE = build_content[template_start:template_end]

# Actually, let's just append to the ARTICLES dict
# Find the closing of ARTICLES and insert new entries
art_end = build_content.rfind('if __name__')
if art_end == -1:
    art_end = build_content.rfind("for fn, data in ARTICLES.items():")
if art_end == -1:
    art_end = build_content.rfind('}')  # fallback

# Build the insertion string
new_entries = ''
for fn, data in NEW.items():
    new_entries += f"    '{fn}': dict(\n"
    for key in ['avatar', 'title', 'label', 'sec_color', 'date', 'author', 'dur', 'tags', 'body']:
        val = data[key]
        new_entries += f"        {key}='''{val}''',\n" if key == 'body' else f"        {key}='{val}',\n"
    new_entries += "    ),\n"

# Insert before the last closing brace of ARTICLES
# Find "if __name__" and insert before it
idx = build_content.find("\nif __name__")
if idx == -1:
    idx = build_content.find("\nfor fn, data")

build_content = build_content[:idx] + new_entries + '\n' + build_content[idx:]

with open('build_articles.py', 'w', encoding='utf-8') as f:
    f.write(build_content)

print('Added 6 new articles to build_articles.py')
