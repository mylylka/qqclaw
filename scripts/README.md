# compress-memory.py

每日记忆压缩脚本。将完整的日志文件压缩成摘要。

## 功能

- 读取 `memory/YYYY-MM-DD.md`（完整日志）
- 提取关键信息（标题、决策、偏好、技术细节）
- 生成 `memory/summaries/YYYY-MM-DD-summary.md`（摘要）
- 删除冗余的过程记录
- 目标压缩比：10:1（实际 3-5:1）

## 使用

```bash
# 压缩今天的日志
python3 compress-memory.py

# 压缩指定日期的日志
python3 compress-memory.py 2026-03-31
```

## Cron 集成

每日 23:55 自动执行：

```
55 23 * * * python3 /Users/liujing/.qclaw/workspace/scripts/compress-memory.py
```

## 输出示例

```
✅ Compressed 2026-03-31: 1659 → 460 bytes (3.6:1)
   Full log: 1659 bytes
   Summary:  460 bytes
   Ratio:    3.6:1
```

## 保留内容

- ✅ 所有标题结构
- ✅ 关键决策（标记 ✅）
- ✅ 用户偏好更新
- ✅ 技术细节
- ✅ 重要结论

## 删除内容

- ❌ 详细的过程记录
- ❌ 冗余的时间戳
- ❌ 冗长的解释文本
- ❌ 过多的空行
