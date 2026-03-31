# 错误记录

命令失败和集成错误。

---

## 2026-03-31 13:49 - 文件不存在错误

**命令：** `cat /nonexistent/file.txt`

**错误：** `cat: /nonexistent/file.txt: No such file or directory`

**上下文：** self-improving-agent 技能测试 — 故意触发错误以验证日志机制

**学习：** 读取文件前必须确认路径存在，先用 `ls` 或 `test -f` 检查。

---
