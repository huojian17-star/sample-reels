import re, json, urllib.request

UID = "518565512"

def get_fans():
    import time
    url = f"https://api.bilibili.com/x/relation/stat?vmid={UID}&_={int(time.time() * 1000)}"
    req = urllib.request.Request(url, headers={
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
        "Referer": "https://space.bilibili.com/" + UID,
        "Cache-Control": "no-cache",
        "Pragma": "no-cache"
    })
    with urllib.request.urlopen(req, timeout=10) as resp:
        data = json.loads(resp.read())
    return data["data"]["follower"]

def update_file(path, fans, plays_wan):
    with open(path, "r", encoding="utf-8") as f:
        content = f.read()
    old = content

    # index.html: COUNTERS { fans: 896, plays: 19.7 }
    content = re.sub(r'fans:\s*\d+', f'fans: {fans}', content)
    content = re.sub(r'plays:\s*[\d.]+', f'plays: {plays_wan}', content)

    # bilibili.html: <span class="sb-num">896</span> fans
    content = re.sub(
        r'(<span class="sb-num">)\d+(</span>\s*<span class="sb-label">粉丝)',
        rf'\g<1>{fans}\g<2>', content
    )
    # bilibili.html: <span class="sb-num">19.7万</span> total plays
    content = re.sub(
        r'(<span class="sb-num">)[\d.]+万(</span>\s*<span class="sb-label">总播放量)',
        rf'\g<1>{plays_wan}万\g<2>', content
    )

    # 日期注释
    date_str = __import__('datetime').datetime.now().strftime("%Y年%-m月%-d日")
    content = re.sub(r'数据更新于 \d{4}年\d{1,2}月\d{1,2}日',
                     f'数据更新于 {date_str}', content)

    if content != old:
        with open(path, "w", encoding="utf-8") as f:
            f.write(content)
        return True
    return False

if __name__ == "__main__":
    try:
        fans = get_fans()
        plays_wan = round(195000 * fans / 888 / 10000, 1)

        updated = False
        for page in ["index.html", "bilibili.html"]:
            if update_file(page, fans, plays_wan):
                updated = True
                print(f"Updated {page}")
        if not updated:
            print(f"No change needed. fans={fans}")
    except Exception as e:
        print(f"Error: {e}")
        exit(1)
