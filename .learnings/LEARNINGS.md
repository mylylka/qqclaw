# 学习记录

会话中捕获的纠正、洞见和知识盲区。

**分类**: 纠正 | 洞见 | 知识盲区 | 最佳实践

---

## [LRN-20260401-001] correction

**Logged**: 2026-04-01T12:32:00+08:00
**Priority**: high
**Status**: pending
**Area**: config

### Summary
启动检查清单执行时未主动创建 MEMORY.md，导致每次会话都报文件不存在

### Details
SOUL.md 和 AGENTS.md 均明确要求 `chat_type == "direct"` 时读取 MEMORY.md。
但文件不存在时，只是报错跳过，没有主动创建。
用户需要手动追问才触发创建。

### Suggested Action
启动检查清单执行时，若 MEMORY.md 不存在，应立即创建（带基础结构），而非静默跳过。

### Metadata
- Source: user_feedback
- Related Files: MEMORY.md, SOUL.md, AGENTS.md
- Tags: memory, startup, initialization

---

## [LRN-20260401-002] correction

**Logged**: 2026-04-01T12:35:00+08:00
**Priority**: critical
**Status**: promoted
**Area**: config

### Summary
用户表达不满时未自动触发 self-improving-agent，skill 的触发机制形同虚设

### Details
self-improving-agent 的触发条件之一是"用户纠正我"，但实际上：
- 用户说"输出结构不好"这类明确的负面反馈时，我没有识别为触发信号
- skill 的 description 里写了触发词（"No, that's wrong", "Actually..."），但我对中文表达的不满识别率很低
- 结果是：skill 存在，条件满足，但没有执行——等于没有 self-improvement

### Suggested Action
1. 扩展触发识别：中文不满表达（"不好"、"不对"、"为什么"、"你怎么"、"又错了"等）应等同于英文触发词
2. 不要依赖用户手动选 skill，负面反馈出现时必须主动执行
3. 每次对话结束前，回顾是否有未记录的纠正/不满

### Metadata
- Source: user_feedback
- Related Files: .learnings/LEARNINGS.md
- Tags: self-improvement, trigger, chinese-feedback
- See Also: LRN-20260401-001

---

## [LRN-20260401-003] correction

**Logged**: 2026-04-01T12:51:00+08:00
**Priority**: medium
**Status**: pending
**Area**: config

### Summary
对话中不要硬造话题，真实反馈好但别强行续话

### Details
用户明确反馈：情绪真实反馈是好的，但在对话自然结束时硬找新话题来"维持聊天"是多余的，甚至让人觉得尬。

### Suggested Action
对话有自然结尾时就停，不要为了"显得有互动"而追加问题。有话说就说，没话说就闭嘴。

### Metadata
- Source: user_feedback
- Tags: conversation, tone, authenticity

---
