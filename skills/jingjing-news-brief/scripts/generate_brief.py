#!/usr/bin/env python3
"""
新闻简报生成器 - 第一阶段：获取新闻 + 搜索详情
输出中间 JSON 文件，等待主会话完成摘要撰写
"""

import json
import os
import subprocess
import sys
import re
from datetime import datetime
from pathlib import Path


def fetch_all_news():
    """调用 fetch_news.py 获取新闻"""
    result = subprocess.run(
        [sys.executable, "fetch_news.py"],
        capture_output=True,
        text=True,
        cwd=Path(__file__).parent
    )
    return json.loads(result.stdout)


def search_online(title):
    """使用 online-search skill 搜索新闻内容"""
    try:
        script_path = os.path.expanduser("~/Library/Application Support/QClaw/openclaw/config/skills/online-search/scripts/prosearch.cjs")
        result = subprocess.run(
            ["node", script_path, json.dumps({"keyword": title, "cnt": 5})],
            capture_output=True,
            text=True,
            timeout=15
        )
        data = json.loads(result.stdout)
        
        if not data.get("success"):
            return None
        
        return data.get("data", {}).get("docs", [])
    except Exception as e:
        print(f"    搜索失败: {e}", file=sys.stderr)
        return None


def clean_text(text):
    """清理文本"""
    text = re.sub(r'<[^>]+>', ' ', text)
    text = re.sub(r'[\x00-\x08\x0b-\x0c\x0e-\x1f]', '', text)
    text = re.sub(r'\s+', ' ', text).strip()
    return text


def generate_draft():
    """生成带素材的新闻草稿"""
    items = fetch_all_news()
    
    now = datetime.now()
    date_str = now.strftime("%Y-%m-%d %H:%M")
    filename = now.strftime("brief-draft-%Y-%m-%d-%H-%M.json")
    
    print(f"正在获取新闻并搜索详情...")
    print(f"时间: {date_str}\n")
    
    # 为每条新闻搜索详情
    for i, item in enumerate(items, 1):
        print(f"[{i}/{len(items)}] {item['title'][:40]}...")
        docs = search_online(item['title'])
        
        if docs:
            # 提取前3条搜索结果的素材
            materials = []
            for doc in docs[:3]:
                text = clean_text(doc.get("passage", ""))
                if len(text) > 30:
                    materials.append({
                        "source": doc.get("source", ""),
                        "title": doc.get("title", ""),
                        "content": text[:500]  # 限制长度
                    })
            item['materials'] = materials
            print(f"    ✓ 找到 {len(materials)} 条素材")
        else:
            item['materials'] = []
            print(f"    ✗ 未找到素材")
    
    # 保存草稿
    output_dir = Path("/Users/liujing/Documents/news")
    output_dir.mkdir(parents=True, exist_ok=True)
    output_path = output_dir / filename
    
    draft = {
        "generated_at": date_str,
        "total_items": len(items),
        "items": items
    }
    
    with open(output_path, "w", encoding="utf-8") as f:
        json.dump(draft, f, ensure_ascii=False, indent=2)
    
    print(f"\n{'='*50}")
    print(f"草稿已保存: {output_path}")
    print(f"\n下一步：")
    print(f"  告诉哈基秋秋米：")
    print(f"  \"帮我完成新闻简报，文件在 {output_path}\"")
    print(f"{'='*50}")
    
    return output_path


if __name__ == "__main__":
    generate_draft()
