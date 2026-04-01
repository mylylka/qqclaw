#!/usr/bin/env python3
"""
Daily memory compression script.
Compresses full daily logs into summaries (10:1 ratio).

Usage:
    python3 compress-memory.py [YYYY-MM-DD]
    
If no date provided, uses today's date.
"""

import sys
import os
from datetime import datetime, timedelta
import re

def get_workspace_root():
    """Get workspace root directory."""
    script_dir = os.path.dirname(os.path.abspath(__file__))
    return os.path.dirname(script_dir)

def extract_summary(full_log_path):
    """
    Extract summary from full log.
    Keeps: titles, key decisions, user preferences, technical details.
    Removes: detailed process records, timestamps, verbose explanations.
    """
    with open(full_log_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    lines = content.split('\n')
    summary_lines = []
    
    in_key_section = False
    skip_next_empty = False
    
    for i, line in enumerate(lines):
        # Always keep headers
        if line.startswith('#'):
            summary_lines.append(line)
            in_key_section = False
            skip_next_empty = False
            continue
        
        # Keep key sections
        if any(keyword in line for keyword in [
            '关键决策', 'Key Decision',
            '用户偏好', 'User Preference',
            '技术细节', 'Technical Detail',
            '重要结论', 'Important Conclusion'
        ]):
            in_key_section = True
            summary_lines.append(line)
            continue
        
        # In key sections, keep bullet points
        if in_key_section and line.strip().startswith('-'):
            summary_lines.append(line)
            continue
        
        # Skip empty lines between sections
        if not line.strip():
            if not skip_next_empty:
                summary_lines.append(line)
                skip_next_empty = True
            continue
        
        skip_next_empty = False
        
        # Keep important patterns
        if any(pattern in line for pattern in [
            '✅', '✓', '→', '决策', 'Decision',
            '偏好', 'Preference', '更新', 'Update'
        ]):
            summary_lines.append(line)
            continue
    
    # Clean up excessive blank lines
    summary_text = '\n'.join(summary_lines)
    summary_text = re.sub(r'\n\n\n+', '\n\n', summary_text)
    
    return summary_text.strip()

def compress_memory(date_str=None):
    """
    Compress daily log into summary.
    
    Args:
        date_str: Date in YYYY-MM-DD format. If None, uses today.
    
    Returns:
        dict with compression stats
    """
    if date_str is None:
        date_str = datetime.now().strftime('%Y-%m-%d')
    
    workspace_root = get_workspace_root()
    memory_dir = os.path.join(workspace_root, 'memory')
    summaries_dir = os.path.join(memory_dir, 'summaries')
    
    full_log_path = os.path.join(memory_dir, f'{date_str}.md')
    summary_path = os.path.join(summaries_dir, f'{date_str}-summary.md')
    
    # Check if full log exists
    if not os.path.exists(full_log_path):
        return {
            'status': 'error',
            'message': f'Full log not found: {full_log_path}',
            'date': date_str
        }
    
    # Create summaries directory if needed
    os.makedirs(summaries_dir, exist_ok=True)
    
    # Extract summary
    summary_content = extract_summary(full_log_path)
    
    # Write summary
    with open(summary_path, 'w', encoding='utf-8') as f:
        f.write(summary_content)
    
    # Calculate stats
    full_size = os.path.getsize(full_log_path)
    summary_size = os.path.getsize(summary_path)
    ratio = full_size / summary_size if summary_size > 0 else 0
    
    return {
        'status': 'success',
        'date': date_str,
        'full_log': full_log_path,
        'summary': summary_path,
        'full_size': full_size,
        'summary_size': summary_size,
        'compression_ratio': f'{ratio:.1f}:1',
        'message': f'Compressed {date_str}: {full_size} → {summary_size} bytes ({ratio:.1f}:1)'
    }

def main():
    date_str = sys.argv[1] if len(sys.argv) > 1 else None
    
    result = compress_memory(date_str)
    
    # Print result
    if result['status'] == 'success':
        print(f"✅ {result['message']}")
        print(f"   Full log: {result['full_size']} bytes")
        print(f"   Summary:  {result['summary_size']} bytes")
        print(f"   Ratio:    {result['compression_ratio']}")
        sys.exit(0)
    else:
        print(f"❌ {result['message']}")
        sys.exit(1)

if __name__ == '__main__':
    main()
