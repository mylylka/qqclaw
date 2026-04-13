#!/usr/bin/env python3
"""
新闻简报最终生成器 - 根据草稿生成带格式的 Markdown 简报
摘要要求：150字以内完整讲清楚新闻（时间、地点、人物、事件、结果）
"""

import json
import sys
import re
from pathlib import Path
from datetime import datetime


def extract_summary(materials, title):
    """从素材中提取完整摘要，控制在150字以内"""
    if not materials:
        return "暂无详细报道"
    
    # 合并所有素材
    all_text = " ".join([m['content'] for m in materials[:3]])
    
    # 提取关键信息
    # 时间
    time_match = re.search(r'(\d{4}年)?\d{1,2}月\d{1,2}日|近日|日前', all_text)
    time_str = time_match.group(0) if time_match else ""
    
    # 地点
    loc_match = re.search(r'(河南|浙江|上海|北京|山东|江苏|安徽|江西|湖南|湖北|内蒙古|吉林|青岛|台州|开封|郑州|洮南)[\u4e00-\u9fa5]{0,3}', all_text)
    loc_str = loc_match.group(0) if loc_match else ""
    
    # 人物
    who_patterns = [
        r'(\d{1,2}岁[\u4e00-\u9fa5]{1,4}(?:先生|女士|女孩|男孩|老人|车主))',
        r'([\u4e00-\u9fa5]{2,4}先生|[\u4e00-\u9fa5]{2,4}女士)',
        r'(可可|欣欣|孙杨|张豆豆|邓紫棋|王先生|欧阳先生)',
        r'(66岁|16岁|15岁|9岁|98岁|24岁)[\u4e00-\u9fa5]*'
    ]
    who_str = ""
    for pattern in who_patterns:
        match = re.search(pattern, all_text)
        if match:
            who_str = match.group(0)
            break
    
    # 找核心事件（最长的有意义的句子）
    sentences = re.split(r'[。！？]', all_text)
    best_event = ""
    for sent in sentences:
        sent = sent.strip()
        sent = re.sub(r'["\u201c\u201d\u2018\u2019]', '', sent)
        sent = re.sub(r'\([^)]*\)', '', sent)
        sent = re.sub(r'（[^）]*）', '', sent)
        sent = re.sub(r'^[，,、\s]+|[，,、\s]+$', '', sent)
        if len(sent) > 40 and len(sent) < 200 and len(sent) > len(best_event):
            best_event = sent
    
    # 找结果/后续
    result_keywords = ['目前', '最新', '进展', '处理', '处罚', '退款', '道歉', '回应', '已', '决定']
    result_sent = ""
    for keyword in result_keywords:
        if keyword in all_text:
            pattern = f'[^。]*{keyword}[^。]*。'
            match = re.search(pattern, all_text)
            if match:
                result_sent = match.group(0).strip()
                result_sent = re.sub(r'["\u201c\u201d\u2018\u2019]', '', result_sent)
                result_sent = re.sub(r'\([^)]*\)', '', result_sent)
                if len(result_sent) > 15:
                    break
    
    # 组合摘要
    parts = []
    
    # 开头：时间+地点
    header = ""
    if time_str and time_str not in ["近日", "日前"]:
        header = time_str
    if loc_str:
        header += ("，" if header else "") + loc_str
    if header:
        parts.append(header)
    
    # 人物（如果不在标题里）
    if who_str and who_str not in title:
        parts.append(who_str)
    
    # 核心事件
    if best_event:
        # 清理并简化
        best_event = re.sub(r'["\u201c\u201d\u2018\u2019]', '', best_event)
        best_event = re.sub(r'\([^)]*\)', '', best_event)
        best_event = re.sub(r'（[^）]*）', '', best_event)
        parts.append(best_event)
    
    # 结果
    if result_sent and result_sent not in best_event:
        parts.append(result_sent)
    
    # 组合
    summary = '。'.join(parts)
    summary = re.sub(r'[。]{2,}', '。', summary)
    summary = re.sub(r'[\s]+', '', summary)
    summary = summary.strip('。')
    
    # 确保长度在150字以内，但要完整
    if len(summary) > 150:
        # 找最后一个完整语义点截断
        truncated = summary[:150]
        for sep in ['，', '。']:
            idx = truncated.rfind(sep)
            if idx > 100:  # 至少保留100字
                summary = truncated[:idx]
                break
        else:
            summary = truncated[:147] + "..."
    
    if summary and not summary.endswith('。') and not summary.endswith('...'):
        summary += '。'
    
    return summary if len(summary) > 40 else (all_text[:147] + "...")


def finalize_brief(draft_path):
    """根据草稿生成最终简报"""
    
    with open(draft_path, 'r', encoding='utf-8') as f:
        draft = json.load(f)
    
    items = draft['items']
    
    # 分类
    weibo_items = [i for i in items if i['source'] == '微博热搜']
    pengpai_items = [i for i in items if i['source'].startswith('澎湃')]
    
    # 生成时间戳
    now = datetime.now()
    date_str = now.strftime('%Y-%m-%d %H:%M')
    
    lines = [
        f'# 📰 今日简报 · {date_str}',
        '',
        '## 🔥 微博热搜',
        ''
    ]
    
    for item in weibo_items:
        heat = item.get('heat', '')
        heat_str = f'（热度：{heat}）' if heat and heat != '0' else ''
        
        # 提取完整摘要
        materials = item.get('materials', [])
        summary = extract_summary(materials, item['title'])
        
        lines.extend([
            f"**{item['title']}**{heat_str}",
            f'> {summary}',
            '',
            f"🔗 [链接]({item['url']})",
            ''
        ])
    
    lines.extend([
        '---',
        '',
        '## 📢 澎湃新闻',
        ''
    ])
    
    for item in pengpai_items:
        source = item['source'].replace('澎湃·', '')
        time_str = item.get('time', '')
        meta = f' · {source}' + (f' · {time_str}' if time_str else '')
        
        # 提取完整摘要
        materials = item.get('materials', [])
        summary = extract_summary(materials, item['title'])
        
        lines.extend([
            f"**{item['title']}**{meta}",
            f'> {summary}',
            '',
            f"🔗 [链接]({item['url']})",
            ''
        ])
    
    md_content = '\n'.join(lines)
    
    # 保存
    output_dir = Path('/Users/liujing/Documents/news')
    output_dir.mkdir(parents=True, exist_ok=True)
    filename = now.strftime('%Y-%m-%d-%H-%M-brief.md')
    output_path = output_dir / filename
    
    with open(output_path, 'w', encoding='utf-8') as f:
        f.write(md_content)
    
    print(f'简报已保存: {output_path}')
    return output_path


if __name__ == '__main__':
    if len(sys.argv) < 2:
        # 自动找最新的草稿
        draft_dir = Path('/Users/liujing/Documents/news')
        drafts = sorted(draft_dir.glob('brief-draft-*.json'))
        if not drafts:
            print('未找到草稿文件')
            sys.exit(1)
        draft_path = drafts[-1]
    else:
        draft_path = Path(sys.argv[1])
    
    finalize_brief(draft_path)
