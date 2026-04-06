#!/bin/bash
ELECTRON_RUN_AS_NODE=1 NODE_OPTIONS="--no-warnings" OPENCLAW_NIX_MODE=1 "/Applications/QClaw.app/Contents/Frameworks/QClaw Helper.app/Contents/MacOS/QClaw Helper" "/Users/liujing/Library/Application Support/QClaw/openclaw/node_modules/openclaw/openclaw.mjs" cron create \
  --name "每日记忆压缩" \
  --cron "55 23 * * *" \
  --tz "Asia/Shanghai" \
  --session "isolated" \
  --message "直接输出以下提醒内容，禁止调用message工具：执行 Python 脚本 /Users/liujing/.qclaw/workspace/scripts/compress-memory.py 进行记忆压缩。完成后输出'✅ 记忆压缩完成'" \
  --expect-final