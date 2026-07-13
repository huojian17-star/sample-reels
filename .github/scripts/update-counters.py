import re, json, urllib.request

UID = "518565512"
INDEX = "index.html"

def get_fans():
    url = f"https://api.bilibili.com/x/relation/stat?vmid={UID}"
    req = urllib.request.Request(url, headers={
        "User-Agent": "Mozilla/5.0",
        "Referer": "https://www.bilibili.com/"
    })
    with urllib.request.urlopen(req, timeout=10) as resp:
        data = json.loads(resp.read())
    return data["data"]["follower"]

def update_counters(fans):
    plays = f"{round(195000 * fans / 888 / 10000, 1)}万"
    date_str = __import__('datetime').datetime.now().strftime("%Y年%-m月%-d日")

    with open(INDEX, "r", encoding="utf-8") as f:
        content = f.read()

    old = content
    # 更新 fans
    content = re.sub(r'fans:\s*\d+', f'fans: {fans}', content)
    # 更新 plays 万
    content = re.sub(r'plays:\s*[\d.]+', f'plays: {round(195000 * fans / 888 / 10000, 1)}', content)
    # 更新日期注释
    content = re.sub(r'数据更新于 \d{4}年\d{1,2}月\d{1,2}日',
                     f'数据更新于 {date_str}', content)

    if content != old:
        with open(INDEX, "w", encoding="utf-8") as f:
            f.write(content)
        print(f"Updated: fans={fans}, plays={round(195000 * fans / 888 / 10000, 1)}万")
    else:
        print(f"No change needed. fans={fans}")

if __name__ == "__main__":
    try:
        fans = get_fans()
        update_counters(fans)
    except Exception as e:
        print(f"Error: {e}")
        exit(1)
