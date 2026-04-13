# QClaw 产品完整文档

> 来源：qclaw.ai 官网、openclaw.ai 官网、ClawHub about 页
> 整理时间：2026-04-11
> 整理人：哈基秋秋米

---

## 一、产品定义与定位

### 1.1 QClaw 是什么

**QClaw** 是 macOS 上的 OpenClaw 桌面客户端。OpenClaw 是运行在用户自己设备上的个人 AI 助手，QClaw 则将它打包成一款 macOS 原生应用，让用户无需命令行即可使用。

### 1.2 OpenClaw 是什么

**OpenClaw** 是 GitHub 上的开源项目（35.4万 stars），核心理念：

> **OpenClaw is the AI that actually does things.**
> 它能清空你的收件箱、发邮件、管理日历、帮你值机——全都是从 WhatsApp、Telegram 或任何你已经在用的聊天软件里完成的。

**官网**：https://openclaw.ai
**GitHub**：https://github.com/openclaw/openclaw
**文档**：https://docs.openclaw.ai
**Discord**：https://discord.gg/clawd
**创始人**：Peter Steinberger（@steipete）

### 1.3 QClaw 与 OpenClaw 的关系

| | OpenClaw | QClaw |
|---|---|---|
| 形态 | 命令行工具 / 自托管 | macOS 原生桌面应用 |
| 运行方式 | 需配置 Node.js 环境 | 一键安装，直接运行 |
| 渠道支持 | 同上 | 同上（QClaw 内置集成） |
| Gateway 管理 | 手动命令 | QClaw 内置 Electron UI |
| 适用用户 | 开发者、技术用户 | 普通 Mac 用户 |

**QClaw 内置了完整的 OpenClaw 运行时**，包括：
- Gateway（控制平面，ws://127.0.0.1:18789）
- Pi Agent（工具执行引擎）
- Skill 系统
- 定时任务系统
- 22 个消息渠道连接器

---

## 二、核心功能

### 2.1 多渠道消息接入

OpenClaw 支持以下渠道，可同时连接多个：

| 渠道 | 说明 |
|------|------|
| 飞书 / Feishu | ✅ 已配置 |
| 微信 / WeChat | via wechat-access 插件 |
| WhatsApp | ✅ |
| Telegram | ✅ |
| Discord | ✅ |
| Slack | ✅ |
| Signal | ✅ |
| iMessage | ✅（macOS） |
| Line | ✅ |
| Google Chat | ✅ |
| 飞书 | ✅ |

**配置方式**：各渠道通过 Token / Bot / Session 方式接入，OpenClaw Gateway 统一管理连接状态。

### 2.2 工具执行能力

OpenClaw 不只是聊天机器人，它能实际执行任务：

- **邮件**：读取、发送、搜索 Gmail / QQ邮箱 / 163邮箱等
- **日历**：管理 Google Calendar / Apple Calendar
- **文件操作**：读写本地文件、执行命令行
- **网页访问**：抓取网页内容、填表、截图
- **定时任务**：cron 任务、每日提醒
- **浏览器自动化**：通过 Playwright 控制浏览器
- **技能系统（Skills）**：用户可安装社区技能包扩展能力

### 2.3 记忆系统

OpenClaw 有三层记忆：

1. **会话记忆**：当前对话的上下文
2. **每日日志**：`memory/YYYY-MM-DD.md`，记录每天发生的事
3. **长期记忆**：`MEMORY.md`，由每日日志压缩而来
4. **自改进记忆**：`~/self-improving/memory.md`，记录执行教训和优化经验
5. **向量索引**：通过 qmd 本地搜索引擎，支持语义搜索记忆内容

### 2.4 技能系统（Skills）

**Skills** 是 OpenClaw 的插件系统，定义专业化的工作流。目前有两类技能来源：

| 来源 | 说明 |
|------|------|
| **ClawHub**（clawhub.ai） | 社区技能市场，版本化管理，支持 `npx clawhub@latest install xxx` 安装 |
| **SkillHub** | QClaw 内置的技能发现入口 |
| **本地 Skills** | 用户本地 `~/.qclaw/workspace/skills/` 目录下的自定义技能 |

**已有技能示例**：
- `imap-smtp-email`：通用邮件收发
- `163-email-skill` / `qq-email-skill`：国内邮箱专用
- `tencent-docs`：腾讯文档操作
- `tencent-meeting-mcp`：腾讯会议管理
- `weather-advisor`：天气查询
- `news-aggregator`：新闻聚合
- `pdf` / `xlsx` / `docx` / `pptx`：文档处理
- `qmd`：本地知识库搜索（@tobilu/qmd）
- `baoyu-*` 系列：图片生成、幻灯片、漫画创作

---

## 三、ClawHub 技能市场

**网址**：https://clawhub.ai

### 3.1 平台定位

> A versioned registry for AI agent skills.
> Browse, install, and publish skill packs. Versioned like npm, searchable with vectors, no gatekeeping.

ClawHub 是 OpenClaw 的官方技能市场，提供社区贡献的技能包。

### 3.2 安装方式

```bash
# 安装任意技能
npx clawhub@latest install <skill-name>

# 通过 SkillHub 搜索
openclaw skills search <keyword>
```

### 3.3 安全策略

ClawHub 的安全底线（What ClawHub Will Not Host）：

**禁止内容**：
- 绕过授权、账户接管、验证码绕过
- 平台滥用、刷单、自动化垃圾信息
- 欺诈、伪造证书、虚假支付流程
- 隐私侵犯：大规模联系人抓取、跟踪、盗取泄露数据
- 未经同意的冒名顶替：换脸、AI克隆人
- 显式性内容生成
- 隐藏执行：混淆安装命令、curl | sh、无说明的密钥使用

---

## 四、本地知识库（qmd）

### 4.1 qmd 是什么

**qmd**（@tobilu/qmd）是 OpenClaw 的本地知识库搜索引擎，支持：
- **BM25 关键词搜索**：无需网络，直接本地运行
- **向量语义搜索**：需要下载 GGUF 嵌入模型（已解决 hf-mirror.com 下载问题）
- **混合搜索**：BM25 + 向量重排序
- **AST 智能分块**：按代码结构/自然段落切分文档

### 4.2 当前配置

- **索引位置**：`~/.cache/qmd/index.sqlite`
- **缓存目录**：`~/.cache/qmd/models/`
- **工作区索引**：`/Users/liujing/.qclaw/workspace/knowledge/**/*.md`
- **已索引**：35 个文件，79 个 chunks
- **嵌入模型**：ggml-org/embeddinggemma-300M-GGUF（已通过 hf-mirror.com 下载）

### 4.3 搜索命令

```bash
cd /Users/liujing/.qclaw/workspace
npx @tobilu/qmd search "<查询词>" -c workspace
```

---

## 五、定时任务系统

### 5.1 cron 任务

OpenClaw 支持 cron 格式的定时任务，通过 `openclaw cron` 命令管理。

**当前活跃任务**：

| 任务 ID | 描述 | 执行时间 |
|---------|------|---------|
| 949c8553-7d04-418a-920a-e939d617d67f | 麦小宝早报每日生成 | 每日凌晨 2:00 |
| 7e095ed4-0316-48f8-9bee-1b3d8f1ef902 | 每小时新闻简报生成 | 每 6 小时（0/6/12/18点） |

### 5.2 任务管理命令

```bash
# 查看所有任务
openclaw cron list

# 查看特定任务详情
openclaw cron get <task-id>

# 删除任务
openclaw cron delete <task-id>
```

（注意：QClaw 环境下需使用脚本：`~/Library/Application Support/QClaw/openclaw/config/skills/qclaw-openclaw/scripts/openclaw-mac.sh`）

---

## 六、Gateway 与连接架构

### 6.1 Gateway 是什么

Gateway 是 OpenClaw 的控制平面，通过 WebSocket 暴露在本地的 18789 端口（`ws://127.0.0.1:18789`），负责：
- 会话管理
- 工具调度
- 渠道连接管理
- 定时任务触发

### 6.2 QClaw 中的 Gateway

QClaw 使用内置的 **Embedded Gateway Runtime**（路径：`~/Library/Application Support/autoclaw/embedded-gateway-runtime/`），而不是用户安装的独立 openclaw 命令行。**这两个 Gateway 是分离的**，各自维护独立的 cron 任务和配置。

**当前 QClaw Gateway 配置**：
- 端口：18789
- 模式：local
- 绑定：loopback（仅本机访问）
- 认证：token 模式

---

## 七、用户评价（来自 openclaw.ai 官网）

> "Clears your inbox, sends emails, manages your calendar, checks you in for flights. All from WhatsApp, Telegram, or any chat app you already use."
> — openclaw.ai 首页

### 精选评价

- **@therno**："It's running my company."
- **@danpeguine**："Personal AI assistant undersells it — it's a company assistant, family assistant, team tool. Proactive AF: cron jobs, reminders, background tasks."
- **@tobi_bsf**："Using OpenClaw for a week and it genuinely feels like early AGI."
- **@rovensky**："It will actually be the thing that nukes a ton of startups, not ChatGPT."
- **@nathanclark**："A smart model with eyes and hands at a desk with keyboard and mouse. You message it like a coworker and it does everything a person could do with that Mac."
- **@snopoke**："I've been running OpenClaw on my laptop for a week now. Honestly it feels like it did to run Linux vs Windows 20 years ago. You're in control, you can hack it."
- **@steipete**（创始人）：OpenClaw 起源于 "Molty" 空间龙虾 AI 助手，经四代名称演变：Warelay → Clawdbot → Moltbot → OpenClaw。龙虾（Claw）作为吉祥物贯穿始终。

---

## 八、QClaw 安装与配置

### 8.1 安装

从 App Store 或官网下载 QClaw macOS 客户端，一键安装。

### 8.2 配置文件

主配置文件：`~/Library/Application Support/QClaw/openclaw/config/openclaw.json`

关键配置项：
- `agents.defaults.model.primary`：指定模型（当前：`qclaw/modelroute`）
- `agents.defaults.workspace`：工作区路径（当前：`~/.openclaw/workspace`）
- `gateway.port`：Gateway 端口（默认：18789）
- `models.providers.qclaw`：QClaw 的大模型 API 配置

### 8.3 QClaw 环境关键路径

| 路径 | 说明 |
|------|------|
| `~/Library/Application Support/QClaw/openclaw/` | OpenClaw 主配置目录 |
| `~/Library/Application Support/QClaw/openclaw/config/skills/` | 技能目录 |
| `~/.qclaw/workspace/` | 用户工作区（记忆文件、知识库等） |
| `~/.cache/qmd/` | qmd 搜索引擎缓存 |
| `~/.cache/huggingface/hub/` | HuggingFace 模型缓存 |

---

## 九、技术规格

| 项目 | 说明 |
|------|------|
| 运行时 | Node.js（QClaw 内置） |
| 模型调用 | qclaw/modelroute（阿里云百炼 Coding Plan） |
| 本地嵌入 | node-llama-cpp（Apple M3 GPU 加速） |
| 数据库 | SQLite（qmd 索引）、better-sqlite3 |
| 浏览器自动化 | Playwright |
| 技能格式 | Markdown（SKILL.md）+ 脚本文件 |
| 定时任务格式 | cron（标准 5 段式） |

---

## 十、快速开始

### 10.1 对话式使用
直接在飞书/Telegram 等已接入渠道发送消息，OpenClaw 会自动理解并执行。

### 10.2 安装新技能
```bash
# 通过 skillhub
npx skillhub install <skill-name>

# 通过 clawhub
npx clawhub@latest install <skill-name>
```

### 10.3 创建定时提醒
在任意渠道告诉 OpenClaw："每天早上 8 点提醒我喝水"，OpenClaw 会自动创建 cron 任务。

### 10.4 查询记忆
直接问："我上周做了什么？" OpenClaw 会从本地记忆文件中检索回答。

---

*文档版本：1.0 | 最后更新：2026-04-11*
