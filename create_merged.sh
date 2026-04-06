#!/bin/bash
ELECTRON_RUN_AS_NODE=1 NODE_OPTIONS="--no-warnings" OPENCLAW_NIX_MODE=1 "/Applications/QClaw.app/Contents/Frameworks/QClaw Helper.app/Contents/MacOS/QClaw Helper" "/Users/liujing/Library/Application Support/QClaw/openclaw/node_modules/openclaw/openclaw.mjs" cron create \
  --name "每日早报(合并版)" \
  --cron "0 6 * * *" \
  --tz "Asia/Shanghai" \
  --session "isolated" \
  --message "直接输出以下提醒内容，禁止调用message工具：严格按照以下步骤执行，不允许中途停止！

【第一步】调用news-aggregator-skill搜索昨日真实热点新闻，优先从Wall Street CN和Tencent News提取国际政治/军事新闻

【第二步】每条新闻必须完整输出以下内容（200-300字新闻主体描述+八卦/趣闻/思辨问题简短一行），口吻活泼真诚科学面向青少年

【第三步】读取knowledge/小麦学习/课程表.md获取今日课程，如果是法定假日要识别出来放假

【第四步】整合全部内容一次性输出：
- 新闻板块（国际热点→科技→爆款微博热搜，按热度+新鲜度排序，共约8条）
- 今日课程表
- @大哈提醒

⚠️ 必须完成以上所有步骤再结束！" \
  --to "oc_0281c6225f24739f7a5d5b02eb52cbd7" \
  --channel "feishu" \
  --expect-final