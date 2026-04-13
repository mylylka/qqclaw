#!/usr/bin/env python3
"""
jingjing-news-brief 新闻抓取脚本
支持：weibo（微博热搜）、sogou（搜狗热搜榜）、pengpai（澎湃新闻）
"""

import json
import sys
import re
import subprocess
import urllib.parse
from datetime import datetime


HEADERS = {
    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) "
                  "AppleWebKit/537.36 (KHTML, like Gecko) "
                  "Chrome/120.0.0.0 Safari/537.36"
}

# 过滤词：军事、政治、经济类敏感内容（仅标题过滤）
BLOCKED_KEYWORDS = [
    # 军事
    "导弹", "军队", "国防部", "军事", "武器", "战机", "航母", "核", "战争", "冲突",
    "袭击", "轰炸", "部队", "演习", "防空", "潜艇", "坦克", "军舰", "解放军",
    "分裂", "干涉", "真主党", "以色列", "伊朗", "以军",
    # 政治
    "巡视", "中央", "政治局", "部委", "人大", "政协", "两会", "官员",
    "反腐", "纪委", "监察", "外交", "领土", "主权", "制裁",
    # 经济/国际政治
    "油价", "汇率", "关税", "停火", "谈判", "中东",
    "俄乌", "特朗普", "拜登", "美联储", "加息",
    "港台", "参访", "访华", "会见"
]


def is_blocked(title):
    """检查标题是否包含敏感词"""
    if not title:
        return True
    title_lower = title.lower()
    for kw in BLOCKED_KEYWORDS:
        if kw in title_lower:
            return True
    return False


def fetch_weibo(limit=2):
    """微博热搜 API"""
    try:
        import requests
        url = "https://weibo.com/ajax/side/hotSearch"
        headers = {**HEADERS, "Referer": "https://weibo.com/"}
        resp = requests.get(url, headers=headers, timeout=10)
        data = resp.json()
        items = data.get("data", {}).get("realtime", [])
        result = []
        for item in items:
            title = item.get("note", "") or item.get("word", "")
            if not title or is_blocked(title):
                continue
            heat = item.get("num", 0)
            url = f"https://s.weibo.com/weibo?q={urllib.parse.quote(title)}&Refer=top"
            result.append({
                "source": "微博热搜",
                "title": title,
                "url": url,
                "heat": str(heat),
                "time": "实时"
            })
            if len(result) >= limit:
                break
        return result
    except Exception as e:
        print(f"[ERROR] weibo: {e}", file=sys.stderr)
        return []


def fetch_sogou(limit=2):
    """搜狗热搜榜：解析 sogou.com 搜索页中的 rank200707 热搜区块"""
    try:
        import requests
        url = "https://sogou.com/web?query=" + urllib.parse.quote("今日热点")
        headers = {**HEADERS, "Accept": "text/html"}
        resp = requests.get(url, headers=headers, timeout=10)
        html = resp.text

        items = []
        seen_titles = set()

        # 定位热搜榜区域
        idx = html.find("全网热搜榜")
        if idx < 0:
            return []

        # 从热搜榜区域提取 <a> 标签
        chunk = html[idx:idx + 5000]
        pattern = r'<a[^>]*href="(https://www\.sogou\.com/web\?[^"]*)"[^>]*>([^<]+)</a>'
        matches = re.findall(pattern, chunk)

        for link, title in matches:
            title = title.strip()
            if not title or len(title) < 4 or len(title) > 60:
                continue
            if title in seen_titles:
                continue
            if is_blocked(title):
                continue
            seen_titles.add(title)
            items.append({
                "source": "搜狗热搜",
                "title": title,
                "url": link,
                "heat": "",
                "time": "实时"
            })
            if len(items) >= limit:
                break

        return items
    except Exception as e:
        print(f"[ERROR] sogou: {e}", file=sys.stderr)
        return []


def fetch_pengpai(limit=2):
    """澎湃新闻：解析首页 __NEXT_DATA__ JSON"""
    try:
        import requests
        url = "https://www.thepaper.cn/"
        headers = {**HEADERS, "Accept": "text/html"}
        resp = requests.get(url, headers=headers, timeout=10)
        html = resp.text

        # 提取 __NEXT_DATA__ JSON
        match = re.search(
            r'<script id="__NEXT_DATA__" type="application/json">(.*?)</script>',
            html, re.DOTALL
        )
        if not match:
            print("[ERROR] pengpai: __NEXT_DATA__ not found", file=sys.stderr)
            return []

        data = json.loads(match.group(1))
        page_props = data.get("props", {}).get("pageProps", {}).get("data", {})

        items = []
        seen = set()

        # 从 recommendImg（大图推荐）提取
        for item in page_props.get("recommendImg", []):
            cont_id = item.get("contId", "")
            if cont_id in seen:
                continue
            seen.add(cont_id)
            title = item.get("name", "").strip()
            if not title or is_blocked(title):
                continue
            pub_time = item.get("pubTimeNew", "")
            node_info = item.get("nodeInfo", {})
            channel = node_info.get("name", "") if node_info else ""
            article_url = f"https://www.thepaper.cn/newsDetail_forward_{cont_id}"
            items.append({
                "source": f"澎湃·{channel}" if channel else "澎湃新闻",
                "title": title,
                "url": article_url,
                "heat": str(item.get("praiseTimes", "")),
                "time": pub_time
            })
            if len(items) >= limit:
                return items

        # 如果大图推荐不够，从 recommendChannels 补
        for ch in page_props.get("recommendChannels", []):
            for item in ch.get("contentList", []):
                cont_id = item.get("contId", "")
                if cont_id in seen:
                    continue
                seen.add(cont_id)
                title = item.get("name", "").strip()
                if not title or is_blocked(title):
                    continue
                pub_time = item.get("pubTimeNew", "")
                node_info = item.get("nodeInfo", {})
                channel = node_info.get("name", "") if node_info else ""
                article_url = f"https://www.thepaper.cn/newsDetail_forward_{cont_id}"
                items.append({
                    "source": f"澎湃·{channel}" if channel else "澎湃新闻",
                    "title": title,
                    "url": article_url,
                    "heat": str(item.get("praiseTimes", "")),
                    "time": pub_time
                })
                if len(items) >= limit:
                    return items

        return items
    except Exception as e:
        print(f"[ERROR] pengpai: {e}", file=sys.stderr)
        return []


def main():
    sources = {
        "weibo": fetch_weibo,
        "sogou": fetch_sogou,
        "pengpai": fetch_pengpai,
    }

    args = sys.argv[1:]
    source = None
    limit = 2

    i = 0
    while i < len(args):
        if args[i] == "--source":
            source = args[i + 1]
            i += 2
        elif args[i] == "--limit":
            limit = int(args[i + 1])
            i += 2
        else:
            i += 1

    if not source:
        # 抓微博和澎湃，各5条
        all_items = []
        all_items.extend(fetch_weibo(5))
        all_items.extend(fetch_pengpai(5))
        print(json.dumps(all_items, ensure_ascii=False, indent=2))
    elif source in sources:
        items = sources[source](limit)
        print(json.dumps(items, ensure_ascii=False, indent=2))
    else:
        print(f"Unknown source: {source}. Available: {', '.join(sources.keys())}", file=sys.stderr)
        sys.exit(1)


if __name__ == "__main__":
    main()
