# jingjing-news-brief

生成每日新闻简报，整合微博热搜和澎湃新闻，每条新闻配有 150 字左右精炼摘要。

## 工作流程

本 skill 采用**人机协作**模式：

1. **自动阶段**（脚本执行）：
   - 获取微博热搜 Top 5
   - 获取澎湃新闻 Top 5
   - 用 online-search 搜索每条新闻的详细内容
   - 输出带素材的新闻列表（JSON 中间文件）

2. **人工阶段**（需要调用主会话）：
   - 读取中间文件的素材
   - 由我（哈基秋秋米）根据素材撰写 150 字左右精炼摘要
   - 生成最终的 Markdown 简报

## 使用方法

### 方式一：完整流程（推荐）

```bash
cd ~/.qclaw/workspace/skills/jingjing-news-brief/scripts
python3 generate_brief.py
```

脚本会：
1. 自动完成搜索，生成 `brief-draft-YYYY-MM-DD-HH-MM.json`
2. 提示你调用主会话完成摘要撰写

然后告诉我：
> "帮我完成新闻简报，文件在 `/Users/liujing/Documents/news/brief-draft-XXX.json`"

我会读取素材，撰写摘要，生成最终简报。

### 方式二：快速生成（当前会话直接执行）

如果你想让我立即完成全部流程，直接说：
> "生成今日新闻简报"

我会：
1. 调用 fetch_news.py 获取新闻
2. 调用 online-search 搜索详情
3. 直接撰写 150 字摘要
4. 生成 Markdown 文件

## 输出文件

- 中间文件：`/Users/liujing/Documents/news/brief-draft-YYYY-MM-DD-HH-MM.json`
- 最终简报：`/Users/liujing/Documents/news/YYYY-MM-DD-HH-MM-brief.md`

## 依赖

- online-search skill（已内置）
- Python 3.8+
- Node.js（用于 online-search）

## 新闻源

- **微博热搜**：https://weibo.com/ajax/side/hotSearch
- **澎湃新闻**：https://feed.thepaper.cn

## 摘要规范

- 长度：150 字左右（120-180 字）
- 结构：时间/地点 → 人物 → 事件 → 结果/进展
- 风格：客观、简洁、信息完整
