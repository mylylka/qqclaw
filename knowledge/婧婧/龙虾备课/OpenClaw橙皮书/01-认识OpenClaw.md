OPENCLAW ORANGE PAPER · 橙⽪书
OpenClaw
橙皮书
从入门到精通，涵盖架构原理、部署方案、渠道接入、Skills系
统、模型配置、安全与成本的一站式参考手册。
OpenClaw Orange Paper — From Zero to Mastery
信息来源：OpenClaw 官方文档 · GitHub 仓库 · 社区调研
文档版本：v1.4.0
适用版本：v2026.3.13
发布时间：2026-03-24 (build #1)
涵盖内容：架构原理 · 部署指南 · 渠道接入 · Skills系统 · 模型配置 · 安全与成本 · 生态全景
花叔
B站：AI进化论-花生 · YouTube：AI进化论-花生 · 公众号：花叔
知识星球：AI编程·从入门到精通
本文档在 Claude Code 辅助下整理编写，内容的准确性与时效性仅供参考。
如有勘误或建议，欢迎关注公众号「花叔」反馈交流。
配套视频教程：B站「OpenClaw从0到1」 · 后续更新：飞书文档

目录
Table of Contents
Part 1: 认识 OpenClaw · Meet OpenClaw
01 OpenClaw 是什么 What is OpenClaw
02 发展简史 History
03 创始人故事 The Creator
04 为什么这么火 Why So Popular
Part 2: 技术架构 · Architecture
05 整体架构 Architecture Overview
06 记忆系统 Memory System
07 Agent 工作区 Agent Workspace
08 Session 与用户识别 Sessions & Authentication
09 设计哲学 Design Philosophy
Part 3: 部署方案 · Deployment
10 部署方式总览 Deployment Overview
11 本地安装 Local Installation
12 Docker 部署 Docker Deployment
13 国内云厂商一键部署 Cloud Deployment in China
14 首次配置 Initial Configuration
Part 4: 渠道接入 · Channel Integration
15 渠道概览 Channel Overview

16 国际平台接入 International Platforms
17 国内平台接入 Chinese Platforms
18 远程访问 Remote Access
Part 5: Skills 系统 · Skills System
19 Skills 工作原理 How Skills Work
20 ClawHub 与技能生态 ClawHub & Skill Ecosystem
21 热门 Skills 推荐 Top Skills
22 自建 Skill 指南 Create Your Own Skill
23 Skills 安全 Skill Security
Part 6: 模型配置 · Model Configuration
24 模型提供商总览 Provider Overview
25 国际模型配置 International Models
26 国产模型配置 Chinese Models
27 本地模型与推荐方案 Local Models & Recommendations
Part 7: 安全与成本 · Security & Cost
28 安全模型 Security Model
29 已知安全事件 Security Incidents
30 成本控制 Cost Control
Part 8: 生态与社区 · Ecosystem & Community
31 养虾文化 Lobster Culture
32 平替产品 Alternatives

33 vs Claude Code Comparison with Claude Code
34 国内生态 China Ecosystem
35 国产 Claw 产品选购指南 Claw Products in China
附录 · Appendix
A 常见问题 FAQ Frequently Asked Questions
B 命令速查表 Command Cheat Sheet
C 资源链接 Resources & Links

01 OpenClaw 是什么
What is OpenClaw
一个开源、自托管的AI Agent系统，让AI从「聊天工具」变成「能自主执行任务的数字员工」。
如果你用过ChatGPT，你会知道它本质上是一个问答系统：你问，它答。OpenClaw不一样。它是一个AI Agent
平台，能连接20+消息渠道（WhatsApp、Telegram、飞书、钉钉、Discord等），主动执行任务、管理你的日
程、处理邮件、操作浏览器、调用各种工具。
换句话说，ChatGPT是「顾问」，OpenClaw是「员工」。
与ChatGPT的核心区别
维度 ChatGPT OpenClaw
交互模式 你问它答 自主执行任务
运行环境 网页/App 自托管服务器，接入20+消息平台
可扩展性 GPTs商店 ClawHub技能市场（13,729个Skills）
数据控制 数据在OpenAI 完全本地，你拥有所有数据
模型选择 仅GPT系列 Claude / GPT / DeepSeek / Gemini / Ollama本地模型
开源 否 MIT License，完全开源

核心数据快照
截⾄ 2026年3⽉24⽇
指标 数据
GitHub Stars 330,000+（GitHub历史增速第一，已先后超越React与Linux）
Forks 64,300+
贡献者 1,075+
ClawHub Skills 13,700+
内置Skills 55个
支持消息渠道 20+（WhatsApp / Telegram / Discord / Slack / 飞书 / 钉钉 / 浏览器等）
最新版本 v2026.3.13（2026-03-14发布）
一句话理解OpenClaw：它是一个开源的「个人AI操作系统」，你可以在自己的服务器上运行它，通过任何即时
通讯工具跟它交互，让它帮你处理生活和工作中的各种任务。吉祥物是一只龙虾，中文社区称使用OpenClaw
为「养虾」。
02 发展简史
History
从一个人的周末项目，到不到5个月成为GitHub全球第一。

时间 事件
2025年11 ClawdBot诞生。奥地利开发者Peter Steinberger作为周末项目发布。名字致敬Anthropic的Claude
月 （Claw=爪子），选了龙虾作为吉祥物。
2026年1 爆发式增长。72小时内获得6万Stars，某天单日增长9,000 Stars。
月中旬
2026年1 Anthropic商标警告。因名称与Claude过于相似，被迫改名为Moltbot（Molt=龙虾蜕壳）。
月27日
2026年1 再次改名OpenClaw。强调开源属性，保留龙虾主题。
月30日
2026年2 安全危机。CVE-2026-25253 RCE漏洞被发现（CVSS 8.8/10），13.5万暴露实例中5万+可被直接攻击。同
月初 期ClawHavoc供应链攻击爆发，ClawHub约12%的Skills被确认为恶意。
2026年2 谷歌封号风波。谷歌大规模封禁OpenClaw用户账号，引发社区震动。
月初
2026年2 创始人加入OpenAI。Peter Steinberger宣布加入OpenAI，项目移交开源基金会运营。OpenAI赞助但项
月14日 目保持独立。
2026年3 登顶GitHub。v2026.3.2发布，Stars超过250K，正式超越React成为GitHub全球第一软件项目。
月3日
2026年3 v2026.3.7「史诗级更新」。89次提交，Context Engine插件化、GPT-5.4原生支持、分布式频道绑定。
月7-8日 Stars达278,932。深圳龙岗AI局发布OpenClaw支持政策征求意见稿。
2026年3 v2026.3.8安全加固版。新增ACP身份验证、本地备份工具，12+安全补丁。同日工信部和CNCERT发布
月9日 OpenClaw安全风险预警。Stars突破280,000。
2026年3 v2026.3.11+v2026.3.12连续发布。3.11修复WebSocket跨站劫持漏洞，改善本地Ollama集成体验。
月12-13 3.12推出Dashboard v2全新控制台、 /fast 快速模式、本地模型插件化架构
日 （Ollama/vLLM/SGLang），设备配对改用Ephemeral Token。
2026年3 v2026.3.13浏览器自动化升级。支持Chrome DevTools远程附着已登录浏览器会话，发布Browser
月14日 Relay Chrome扩展，Stars持续增长超越Linux成为GitHub历史第一。
2026年3 智谱发布GLM-5-Turbo。历史上第一个从训练阶段就专为OpenClaw场景优化的基座模型，主打工具调
月16日 用、长链执行、持久任务，128K输出/200K上下文，支持MCP协议，目前实验性闭源发布。

核心建议
OpenClaw先后超越React和Linux，成为GitHub历史上增速最快的开源项目。React用了超过10年才达到23万
Stars，Linux用了更长时间，而OpenClaw不到5个月就完成了这一切。
03 创始人故事
The Creator
Peter Steinberger：从周末项目到全球最火开源项目，再到加入OpenAI。
从一个人到一个社区
Peter Steinberger是一位奥地利开发者，在iOS和macOS开发圈有很高的知名度。2025年11月的一个周末，他
写了一个能连接即时通讯平台的AI助手小工具，取名ClawdBot。
他大概没有想到，这个周末项目会在两个月后成为GitHub上增长最快的开源项目。到2026年3月，他个人在这
个项目上提交了11,684次commit，贡献者超过1,075人。
加入OpenAI
2026年2月14日，Peter宣布加入OpenAI。Sam Altman亲自发推欢迎，称他为「genius」。
这个决定引发了社区的广泛讨论。但Peter做了几件事来消除担忧：
OpenClaw转为开源基金会运营，保持项目独立
OpenAI作为赞助商之一（与Vercel、Blacksmith、Convex并列），但不控制项目方向
OpenAI承诺让他继续投入OpenClaw的开发
Peter的原话：「I'm a builder at heart... What I want is to change the world, not build a large company.」
（我骨子里是个建造者。我想改变世界，而不是建一家大公司。）
关于名字的故事
ClawdBot这个名字来自对Anthropic Claude的致敬（Claw=爪子），所以选了龙虾作为吉祥物。Anthropic的商
标警告迫使他改名为Moltbot（Molt=龙虾蜕壳），三天后又改为OpenClaw，强调开源属性。虽然经历了两次改
名，龙虾的形象始终保留，也成了整个社区的文化符号。

04 为什么这么火
Why So Popular
不到5个月从0到33万Stars，OpenClaw的爆火不只是技术层面的事。
增长数据
时间节点 Stars 备注
2025年11月 0 项目创建
2026年1月中旬 60,000+ 72小时爆发增长
2026年2月中旬 145,000+ Peter加入OpenAI
2026年3月1日 241,000+ 逼近React
2026年3月3日 250,000+ 超越React，GitHub第一
2026年3月8日 278,932 v2026.3.7发布
2026年3月9日 280,000+ v2026.3.8发布，超越React
2026年3月24日 330,000+ 3周增长80K，超越Linux成为GitHub历史第一
2026年3月14日 超越 Linux v2026.3.13发布，写本书时的最新数据
某天单日增长9,000 Stars。这个数字意味着平均每10秒就有一个开发者点下Star。超越React之后，OpenClaw
继续增长，再次超越Linux，成为GitHub有史以来增速最快的开源项目。
「养虾」文化现象
因为吉祥物是龙虾，中文社区将运行OpenClaw称为「养虾」，用户自称「养虾人」。「你养龙虾了吗？」成了AI
圈的问候语。这种有趣的文化标签降低了传播门槛，让一个技术项目有了社交货币的属性。
2026年3月6日，深圳腾讯云总部近千人排队体验OpenClaw安装。3月8日，深圳龙岗区AI（机器人）局发布了
OpenClaw使用支持措施的征求意见稿。一个开源项目能引发地方政府的政策关注，这在国内并不多见。
Moltbook：AI Agent的社交网络
OpenClaw生态中衍生出了一个叫Moltbook的社交平台，专供AI Agent使用。截至2026年2月底的数据：