# OpenClaw 项目完整信息

> 来源：GitHub openclaw/openclaw（35.4万星）
> 更新时间：2026-04-11

---

## 一、项目概述

**OpenClaw** 是运行在你自己设备上的个人AI助手，通过你已经在用的渠道（飞书、微信、WhatsApp、Telegram等）回答你。它能在 macOS/iOS/Android 上听和说，还能渲染一个你控制的实时 Canvas。

- **GitHub**：https://github.com/openclaw/openclaw
- **官网**：https://openclaw.ai
- **文档**：https://docs.openclaw.ai
- **愿景文档**：https://github.com/openclaw/openclaw/blob/main/VISION.md
- **Discord**：https://discord.gg/clawd
- **Stars**：354,573（截至2026-04-11）
- **创始人**：Peter Steinberger（@steipete）
- **项目起源**：从 Molty 空间龙虾AI助手演化而来，历经 Warelay → Clawdbot → Moltbot → OpenClaw 四代名称

**核心理念**：OpenClaw is the AI that actually does things. It runs on your devices, in your channels, with your rules.

---

## 二、核心架构

```
WhatsApp / Telegram / Slack / Discord / Signal / iMessage / Feishu / 飞书 / WeChat / ...
         │
         ▼
┌─────────────────────────────────┐
│  Gateway（控制平面）             │
│  ws://127.0.0.1:18789           │
│  - 会话管理                      │
│  - 工具调度                      │
│  - 渠道连接                      │
│  - 定时任务                      │
└──────────────┬──────────────────┘
              │
   ├─ Pi Agent（RPC，工具流式输出）
   ├─ CLI（openclaw …）
   ├─ WebChat UI
   ├─ macOS 桌面应用
   └─ iOS / Android 节点
```

### 关键组件

| 组件 | 说明 |
|------|------|
| **Gateway** | 本地优先，控制平面，管理会话、渠道、工具、事件 |
| **Pi Agent** | RPC模式，支持工具流式输出和块流式输出 |
| **会话模型** | main用于直接对话，支持群组隔离、激活模式、队列模式 |
| **Media Pipeline** | 图片/音频/视频处理，支持转录钩子、大小限制、临时文件生命周期 |
| **Gateway WS** | WebSocket控制平面，连接客户端、工具和事件 |

---

## 三、支持的消息渠道（完整列表）

WhatsApp、Telegram、Slack、Discord、Google Chat、Signal、iMessage、BlueBubbles（iMessage推荐）、IRC、Microsoft Teams、Matrix、**飞书（Feishu）**、LINE、Mattermost、Nextcloud Talk、Nostr、Synology Chat、Tlon、Twitch、Zalo、WeChat（腾讯官方插件 @tencent-weixin/openclaw-weixin）、WebChat、macOS原生、iOS、Android

---

## 四、支持的功能模块

### 1. 浏览器控制
- openclaw管理的Chrome/Chromium，CDP控制
- 快照、动作、上传、profile管理

### 2. Canvas（画布）
- A2UI push/reset、eval、snapshot
- agent驱动的可视化工作区

### 3. 语音功能
- **Voice Wake**：macOS/iOS唤醒词 + Android持续语音
- **Talk Mode**：持续对话模式（ElevenLabs + 系统TTS兜底）

### 4. 设备节点（Nodes）
- Canvas、摄像头拍照/录像、屏幕录制
- 位置获取、系统通知
- macOS专属：system.run / system.notify

### 5. 定时任务与自动化
- Cron + wakeups
- Webhooks
- Gmail Pub/Sub触发器

### 6. Skills平台
- 三类Skill：bundled（内置）、managed（托管）、workspace（用户工作区）
- ClawHub技能市场：https://clawhub.com

### 7. MCP集成
- 通过 mcporter（https://github.com/steipete/mcporter）桥接MCP服务器
- 优势：无需重启Gateway即可添加/修改MCP服务器，保持核心工具精简

### 8. Tailscale远程访问
- serve模式：tailnet内HTTPS
- funnel模式：公开HTTPS（需密码认证）
- SSH隧道远程访问

---

## 五、安装与运行

### 推荐安装（npm）
```bash
npm install -g openclaw@latest
# 或：pnpm add -g openclaw@latest
# 或：bun

openclaw onboard --install-daemon  # 安装网关守护进程
```

### 从源码构建
```bash
git clone https://github.com/openclaw/openclaw.git
cd openclaw
pnpm install
pnpm ui:build
pnpm build
pnpm openclaw onboard --install-daemon
```

### 运行时要求
- Node 24（推荐）或 Node 22.16+
- 推荐 pnpm 从源码构建

### 常用CLI命令
```bash
openclaw gateway --port 18789 --verbose    # 启动网关
openclaw message send --to +1234567890    # 发送消息
openclaw agent --message "Ship checklist"  # 与助手对话
openclaw onboard --install-daemon          # 引导设置
openclaw doctor                            # 诊断问题
```

---

## 六、升级渠道

| 渠道 | 说明 |
|------|------|
| stable | 正式发布版（npm dist-tag latest） |
| beta | 预发布版（npm dist-tag beta） |
| dev | 主分支最新（npm dist-tag dev） |

切换：`openclaw update --channel stable|beta|dev`

---

## 七、安全机制

### DM策略（默认保护）
- Telegram/WhatsApp/Signal/iMessage 等默认：未知发送者收到配对码，不处理消息
- 配对：`openclaw pairing approve` 批准后加入白名单
- 公开DM：需设置 dmPolicy="open" 并在 allowFrom 包含 "*"

**重要**：运行 `openclaw doctor` 检查DM策略风险配置

### 执行工具安全
- 默认：工具在主机运行（main会话拥有完整权限）
- 群组安全：设置 `agents.defaults.sandbox.mode: "non-main"`，非main会话运行在Docker沙盒中
- 沙盒默认：允许 bash、process、read、write、edit、sessions_list、sessions_history、sessions_send、sessions_spawn；禁止 browser、canvas、nodes、cron、discord、gateway

---

## 八、开放API配置示例

### 最小配置（~/.openclaw/openclaw.json）
```json
{
  "agent": {
    "model": "<provider>/<model-id>"
  }
}
```

### Telegram配置
```json
{
  "channels": {
    "telegram": {
      "botToken": "123456:ABCDEF"
    }
  }
}
```

### Discord配置
```json
{
  "channels": {
    "discord": {
      "token": "1234abcd"
    }
  }
}
```

### WeChat配置
- 安装：`openclaw plugins install "@tencent-weixin/openclaw-weixin"`
- 登录：`openclaw channels login --channel openclaw-weixin`（扫码）
- 前提：微信 → 我 → 设置 → 插件 → ClawBot（腾讯灰度开放）
- 版本 v2.x 要求 OpenClaw >= 2026.3.22

---

## 九、Companion应用

| 平台 | 功能 |
|------|------|
| **macOS** | 菜单栏控制、Voice Wake、PTT、Talk Mode覆盖层、WebChat、远程Gateway控制 |
| **iOS** | Canvas、Voice Wake、Talk Mode、摄像头、屏幕录制、Bonjour设备配对 |
| **Android** | Connect/Chat/Voice标签、Canvas、摄像头/屏幕录制、设备命令（通知/位置/短信/照片/联系人/日历/运动/应用更新） |

---

## 十、项目路线图与优先级

### 当前优先级
1. **安全性与安全默认值**
2. **Bug修复与稳定性**
3. **设置可靠性与首次运行体验**

### 下一优先级
- 支持所有主流模型提供商
- 改善主要消息渠道支持（增加高需求渠道）
- 性能与测试基础设施
- 更强的计算机使用和Agent能力
- CLI和Web前端的 ergonomics
- macOS、iOS、Android、Windows、Linux伴侣应用

### 不会做的事（明确拒绝）
- 在Core添加非可选插件（Core保持精简）
- 大型AI vibe-coded PR批量合并
- 非可选的Breaking changes
- 新Core技能（除非强安全和产品原因）
- 商业服务集成（不明确属于模型提供商类别的）
- 包装已有渠道的新渠道封装（无明确能力或安全差距）
- Core内置MCP运行时（mcporter已提供桥接路径）
- Agent层级框架（manager-of-managers/嵌套规划树）作为默认架构
- 重复现有基础设施的重量级编排层

---

## 十一、设计哲学

1. **本地优先**：在你自己设备上运行，感觉本地、快速、始终在线
2. **TypeScript优先**：保持OpenClaw默认可黑客化，广泛使用、易读易改
3. **终端优先**：设置显式化，用户直面文档、认证、权限和安全态势
4. **插件生态**：Core保持精简，可选能力以插件形式发布到 ClawHub
5. **安全是权衡**：强默认设置，不牺牲真实工作能力，危险路径明确且可由操作员控制

---

## 十二、贡献指南

- One PR = one issue/topic，不捆绑多个不相关的修复/功能
- 超过约5000行变更的PR仅在特殊情况下审查
- 不要一次性开大量小型PR
- AI/vibe-coded PR欢迎！🤖

---

## 十三、相关资源

- **awesome-openclaw-skills**：https://github.com/VoltAgent/awesome-openclaw-skills（4.5万星）
- **awesome-openclaw-usecases**：https://github.com/hesamsheikh/awesome-openclaw-usecases（2.9万星）
- **ClawHub技能市场**：https://clawhub.com
- **中文翻译**：https://github.com/1186258278/OpenClawChineseTranslation（3686星）
- **中文精选技能列表**：https://github.com/AgentWorkers/awesome-openclaw-skills-cn
- **mcporter（MCP桥接）**：https://github.com/steipete/mcporter

---

## 十四、QClaw与OpenClaw的关系

**QClaw** 是基于OpenClaw的本地封装/客户端，为用户提供更友好的界面和额外的本地能力（如sharp图像处理等内置工具）。用户通过QClaw与OpenClaw交互，无需直接操作底层CLI。

当前用户使用的环境：
- 模型路由：`qclaw/modelroute`（QClaw内置）
- 工作目录：`~/.qclaw/workspace`
- Skill目录：`~/.qclaw/workspace/skills/`、`~/.agents/skills/`、`~/.openclaw/workspace/skills/`
- Gateway地址：`ws://127.0.0.1:18789`
- 运行时：Node v22.21.1，macOS Darwin 24.6.0
