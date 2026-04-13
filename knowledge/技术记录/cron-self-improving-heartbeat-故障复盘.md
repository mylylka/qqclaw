# self-improving-heartbeat 定时任务故障复盘

## 时间

2026-04-09 09:33（排查完成）

## 问题现象

`self-improving-heartbeat` 定时任务（cron ID: a5511ff6-c305-4b72-ab24-93dc57d62596）连续 6 次运行失败，每次状态均为 `"error": "cron: job execution timed out"`，耗时 120010ms。

## 根因分析

### 问题一：heartbeat-rules.md 缺失

cron 任务的 message 第一步就是「读取 ~/self-improving/heartbeat-rules.md」，但该文件在修复前不存在。

推测为何不同模型行为不同：

| | ark-code-latest | modelroute (qclaw) |
|---|---|---|
| 执行结果 | 83-84秒完成 | 超时120秒 |
| 推测行为 | 遇到文件不存在时快速失败/跳过 | 可能陷入重复尝试、过度推理、或执行额外无效步骤 |

根本教训：**不要让 cron 任务依赖可能不存在的文件**。这个错误最早应该被避免。

### 问题二：投递渠道配置冲突

任务配置了 `announce` 但未指定 channel，系统检测到飞书/企微等多个渠道时直接报错：

```
Channel is required when multiple channels configured: feishu, openclaw-weixin, wechat-access
```

该错误不会导致任务本身失败，但会被记录为任务 error 状态。

## 修复措施

### 1. 创建 heartbeat-rules.md

路径：`/Users/liujing/self-improving/heartbeat-rules.md`

内容：心跳维护的标准流程（读取状态 → 更新心跳时间 → 检查目录变更 → 必要时保守整理 → 输出结果）

### 2. 更新 cron 任务 message

- 路径从 `~/` 改为绝对路径 `/Users/liujing/self-improving/`（避免 isolated session 中 tilde 展开异常）
- 简化指令结构，降低推理开销

### 3. 修复 delivery 配置

将 `announce` 改为 `none`（心跳任务本地默默跑，不需要推送到任何渠道）

## 修复后验证

手动触发测试，运行时间 73389ms（73秒），正常完成，输出：

> self-improving 心跳维护完成。
> 心跳时间已更新为 2026-04-09 09:33
> 核心文件 memory.md (3.3KB) 和 corrections.md (1.4KB) 均未超 200KB 阈值
> 无需整理

---

## 附：两个大模型在 isolated session 中行为差异深度分析

### 观察到的现象

| 指标 | ark-code-latest | modelroute |
|---|---|---|
| 运行结果 | 成功完成（83-84秒） | 超时120秒 |
| token 消耗 | input: 342195 / output: 1610 | input: 71343 / output: 1290 |
| 行为推测 | 快速定位问题并执行 | 陷入推理开销或重复尝试 |

### 为何 ark 跑通了，modelroute 不行？

**核心差异不在模型能力，而在 tool calling 效率。**

isolated session 的本质是：AI 接收一段 text prompt（包含系统 prompt + 任务描述），然后通过 tool calls 读写文件、执行命令。

当 prompt 中要求「读取 ~/self-improving/heartbeat-rules.md」但文件不存在时：

**ark-code-latest 的处理路径（推测）：**
1. 调用 read tool
2. 文件不存在 → 收到 error
3. **立即决定：文件不存在，跳过此步，继续执行后续步骤**
4. 直接进入写文件、更新状态等操作
5. 任务完成

**modelroute 的处理路径（推测）：**
1. 调用 read tool
2. 文件不存在 → 收到 error
3. **触发过度推理：分析错误原因 → 尝试找替代路径 → 再次尝试读取 → 陷入循环或等待**
4. 反复尝试直到超时

### 关键证据

token 消耗差异最能说明问题：

- ark-code-latest: input 342195 tokens，output 1610 tokens
  → 模型收到大量上下文后快速决策，output 极少
- modelroute: input 71343 tokens，output 1290 tokens
  → output 量相近，但 input 少得多，说明模型在更少的上下文下就开始重复推理

### 实际教训

1. **isolated session 中的 file read 必须保证文件存在**，不存在就跳过的能力不是所有模型都有
2. **指令越精确、行为边界越清晰**，模型越不容易跑偏
3. **ark-code-latest 适合复杂任务**（tool calling 精准），modelroute 适合通用推理
4. **对于 file I/O 密集型 cron 任务，优先确保文件存在，而不是依赖模型容错**

### 附：相关 cron 任务信息

- cron ID: `a5511ff6-c305-4b72-ab24-93dc57d62596`
- 心跳频率: 每6小时（`0 */6 * * *`，Asia/Shanghai）
- 任务目录: `/Users/liujing/self-improving/`
- 关键文件: heartbeat-rules.md, heartbeat-state.md, memory.md

## 关键教训

1. **文件依赖必须在任务执行前确保存在**，不能假设文件已创建
2. **isolated session 中不要用 `~` 路径**，用绝对路径
3. **多渠道环境下 `announce` 必须指定 channel**，否则直接报错
4. **心跳类任务 mode 应设为 `none`**，不需要推送到任何地方
5. **工具调用密集型任务优先用 ark-code-latest**，通用推理任务用 modelroute
