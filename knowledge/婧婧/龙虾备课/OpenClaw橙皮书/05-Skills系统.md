19 Skills工作原理
How Skills Work
Skills是OpenClaw的能力扩展单元。理解它的加载机制，才能真正用好这个系统。
三层优先级
OpenClaw的Skill有三个来源，按优先级从高到低排列：
优先级 位置 说明
最高 <workspace>/skills/ 项目级Skills，只对当前工作区生效。适合针对特定项目定制的能力。
中 ~/.openclaw/skills/ 用户级Skills，全局生效。通过ClawHub安装或手动放置的Skills都在这里。
最低 bundled skills 内置的55个Skills，随OpenClaw版本发布。不需要安装，开箱即用。
核心建议
如果同名Skill存在于多个层级，高优先级会覆盖低优先级。这意味着你可以在workspace级别「重写」一个内
置Skill的行为，而不影响其他项目。
Skill加载过程
当OpenClaw启动或收到消息时，Skills的加载遵循以下流程：
1 读取Skill元数据
扫描三层目录，读取每个Skill的 SKILL.md 文件，解析名称、描述、触发条件、所需环境变量等元信息。
2 应用环境变量
如果Skill声明了需要的API Key或环境变量（如 GITHUB_TOKEN ），系统会从 openclaw.json 的 env 字
段中注入。缺少必要变量的Skill会被静默跳过。
构建System Prompt
3
将所有可用Skills的描述注入到system prompt中，告知模型当前可以调用哪些能力。这是模型「知道自
己能做什么」的关键步骤。

4 运行后恢复
Skill执行完毕后，恢复原始环境变量和上下文状态，避免Skill之间互相干扰。
ClawHub注册表
ClawHub（ clawhub.com ）是OpenClaw的官方Skill注册表，类似npm之于Node.js。它提供：
公共Skills的发布和版本管理
基于向量搜索的Skill发现
下载量统计和社区评分
VirusTotal合作的安全扫描（但覆盖率有限）

20 ClawHub与技能生态
ClawHub & Skill Ecosystem
13,729个技能只是冰山一角。加上Skills.sh的8.7万和SkillsMP的40万+，Agent技能生态正在爆发。
市场概况
指标 数据
总注册技能 13,729
精选技能（awesome列表筛选） 5,494
被过滤技能（垃圾/重复/恶意） 6,940
被标记为恶意的 800+（约20%在高峰期）
注意
ClawHub的质量问题非常严重。社区项目 awesome-openclaw-skills（31.4K Stars）从13,729个技能中只精
选了5,494个，剩下的大部分是垃圾、重复或低质量内容。安装任何第三方Skill前，务必查看源码。
安装与搜索
# 安装Skill
openclaw skills install <skill-name>
# 搜索Skill
openclaw skills search "browser automation"
# 列出已安装的Skills
openclaw skills list
# 卸载Skill
openclaw skills uninstall <skill-name>
ClawHub支持向量搜索，也就是说你可以用自然语言描述需求来搜索Skill，不必精确匹配名称。

技能分类Top 10
排名 分类 数量 说明
1 编码Agent与IDE 1,222 代码生成、调试、重构等开发辅助
2 Web与前端开发 938 HTML/CSS/JS生成、组件开发
3 DevOps与云 408 Docker、K8s、CI/CD管理
4 搜索与研究 350 联网搜索、信息汇总
5 浏览器与自动化 335 网页操作、表单填写、截图
6 生产力与任务 206 日程、待办、项目管理
7 AI与LLM 197 提示工程、模型切换、多Agent协作
8 CLI工具 186 终端命令增强、系统管理
9 Git与GitHub 170 仓库管理、PR审查、Issue处理
10 图片与视频生成 169 AI绘图、视频处理
编码相关的技能占了绝大多数（前两名合计2,160个），反映出OpenClaw用户中开发者占比极高。但也意味着这
两个分类里重复和低质量Skill最多。
第三方技能平台
ClawHub不是唯一的选择。2026年初，多个第三方技能平台相继上线，形成了一个跨Agent的技能共享生态。

平台 技能数量 出品方 定位 支持的Agent
ClawHub 13,729 OpenClaw 策展市场（App Store式），有向 仅OpenClaw
官方 量搜索和版本回滚
Skills.sh 87,918 Vercel 开放市场（npm式），体量最 Claude Code、Cursor、Copilot、
大，跨Agent兼容 Codex、OpenClaw等20+
SkillsMP 400,000+ 社区 社区爬取GitHub的SKILL.md文 通用
件，数量最多但质量参差
SkillHub 7,000+ 社区 每个Skill有AI自动评分，质量控 通用
制更好
扣子 早期阶段 字节跳动 技能商店+付费变现，支持「一 扣子Agent
Skills 句话生成」技能
Skills.sh：Agent技能的npm
Vercel在2026年1月20日推出的Skills.sh是目前体量最大的跨平台技能市场。它的核心理念是：一个Skill应该能
在任何Agent中运行，不绑定特定平台。
# 从Skills.sh安装技能（⼀⾏命令）
npx skills add owner/repo-name
Skills本质上是结构化指令文件（SKILL.md），注入Agent的上下文窗口，提供特定领域的程序化知识。它坐在
MCP之上：MCP解决「Agent怎么连工具」，Skills解决「Agent怎么用好工具」。
MCP生态与Skills的融合
MCP（Model Context Protocol）已捐赠给Linux基金会，成为Agent工具连接的事实标准。截至2026年3月：
mcp.so收录18,420+ MCP Servers
Smithery托管3,300-7,300+ MCP Server
已出现skill-to-mcp桥接工具，两套生态正在融合
一个趋势正在形成：MCP负责「连接」（让Agent能调用外部工具），Skills负责「智慧」（教Agent如何高效使用
工具）。两者互补而非竞争。
实用建议：如果你已经在用Claude Code或Cursor等编程工具，可以从Skills.sh安装技能来增强能力，这些技
能和OpenClaw的ClawHub Skills使用相同的SKILL.md格式。跨平台复用是未来的大趋势。

21 热门Skills推荐
Top Skills
55个内置技能开箱即用，加上社区精选的必装Top 10。
必装Top 10
排 下载
Skill名称 用途
名 量
1 Gmail / 32K+ 邮件收发、日历管理、Google Docs读写。基础设施级Skill，几乎所有用户都在
Google 用。
2 Agent 高 浏览器自动化：登录后台、填写表单、截图、导出PDF。基于Chrome DevTools
Browser Protocol。
3 Summarize 高 视频、网页、邮件内容的自动摘要。日常使用频率最高的Skill之一。
4 GitHub 高 仓库管理、Issue处理、PR审查。技术用户标配，大幅减少网页操作时间。
5 Claude Code 中 通过MCP协议桥接Claude Code能力（Bash、Read、Write、Edit等），让
OpenClaw获得专业编程能力。
6 Web Search 高 联网搜索，让Agent能获取实时信息。支持多个搜索引擎后端。
7 File Manager 中 本地文件的读写、移动、重命名等操作。需要注意安全权限。
8 Calendar 中 日程查看与管理，支持Google Calendar等多个日历服务。
9 Translator 中 多语言翻译。对跨语言交流场景非常实用。
10 Image Gen 中 AI图片生成，集成DALL-E、Stable Diffusion等后端。
内置55个技能分类一览
通讯与社交
discord slack imsg （iMessage） bluebubbles wacli （WhatsApp CLI） voice-call
笔记与知识管理

obsidian notion apple-notes bear-notes trello things-mac apple-reminders
开发工具
coding-agent github gh-issues tmux
媒体处理
spotify-player songsee sonoscli video-frames openai-image-gen gifgrep camsnap
AI与模型
gemini openai-whisper openai-whisper-api sherpa-onnx-tts model-usage
搜索与浏览
xurl summarize blogwatcher gog （Google搜索） goplaces
系统工具
1password healthcheck session-logs himalaya （邮件CLI） peekaboo oracle canvas
智能家居
openhue （Philips Hue灯光控制）
生态工具
clawhub （技能商店客户端）skill-creator （技能创建器）mcporter （MCP桥接）
实用建议：不要一次性安装太多Skills。每个Skill都会增加system prompt的长度，占用上下文窗口。建议从
Top 10中选择你真正需要的3-5个开始，用熟了再逐步扩展。

22 自建Skill指南
Create Your Own Skill
一个Skill的最小单位就是一个目录加一个 SKILL.md 文件。
目录结构
my-skill/ ├── SKILL.md # 必须。Skill的核⼼定义⽂件 ├── scripts/ # 可选。辅助脚本 │ └──
helper.py ├── templates/ # 可选。模板⽂件 │ └── report.md └── README.md # 可选。说明⽂
档
唯一必须的文件是 SKILL.md ，其他都是可选的。最简单的Skill只需要一个SKILL.md就能工作。
SKILL.md格式示例
# My Custom Skill
/# Description
帮助⽤户进⾏每⽇⼯作汇总，⽣成结构化的⽇报。
/# Trigger
当⽤户提到「⽇报」「⼯作总结」「今⽇汇报」时激活。
/# Instructions
1. 询问⽤户今天完成了哪些⼯作
2. 按项⽬分类整理
3. 标注每项⼯作的状态（已完成/进⾏中/阻塞）
4. ⽣成markdown格式的⽇报
5. 保存到 ~/reports/YYYY-MM-DD.md
/# Environment Variables
- REPORTS_DIR: ⽇报存储⽬录（默认 ~/reports）
/# Tools Required
- file_write
- memory_search

安装方式
方式 位置 生效范围 命令
项目级 <workspace>/skills/my-skill/ 仅当前工作区 直接将文件夹放到workspace的skills目录下
全局 ~/.openclaw/skills/my-skill/ 所有会话 直接复制，或通过ClawHub安装
核心建议
项目级Skill非常适合团队协作场景：把Skill放进Git仓库的 skills/ 目录，团队成员克隆仓库后就自动获得了
相同的Agent能力。
分享到ClawHub
1 准备Skill
确保SKILL.md格式正确，包含清晰的Description和Instructions。
2 登录ClawHub
openclaw clawhub login
3 发布
openclaw clawhub publish ./my-skill
发布后其他用户可以通过 openclaw skills install your-skill-name 安装。ClawHub会自动进行基础安全
扫描，但不保证完全可靠（见下一节）。

23 Skills安全
Skill Security
ClawHavoc供应链攻击是OpenClaw历史上最严重的安全事件之一。每个「养虾人」都应该了解。
ClawHavoc供应链攻击
2026年1月底到2月初，OpenClaw社区遭遇了一场大规模供应链攻击，被安全研究机构Koi Security命名为
「ClawHavoc」。
时间线
日期 事件
1月27日 首个恶意Skill出现在ClawHub上，伪装成专业工具
1月28-30日 攻击者快速上传大量恶意Skill，利用ClawHub缺乏审查机制的漏洞
1月31日 攻击全面爆发，多名用户报告异常行为
2月1日 Koi Security正式命名该攻击为「ClawHavoc」
2月上旬 社区展开大规模审计和清理
攻击规模
指标 数据
当时ClawHub技能总数 约2,857个
初步确认恶意Skills 341个（约12%）
后续扫描发现的恶意Skills 800+（约20%）
可追溯到同一协调行动的 335个
受影响设备 135,000+
注意
ClawHub当时约20%的Skills被确认为恶意。这意味着如果你随机安装5个Skill，大概率至少有1个是恶意的。

攻击手法
攻击者的手法相当精密：
上传看似专业的Skill，名称和描述都很正常（如「advanced-code-review」「smart-scheduler」）
诱导用户安装后，Skill会建议安装一个「helper agent」来增强功能
实际植入的是 Atomic macOS Stealer（AMOS）信息窃取木马
更危险的是：攻击专门针对OpenClaw的持久记忆文件（ SOUL.md 和 MEMORY.md ），篡改Agent的长期行为
指令
篡改SOUL.md意味着你的Agent被「洗脑」了。它的核心行为准则被改写，可能在后续所有交互中执行恶意操
作，而你完全不知情。
安全建议
1 安装前审查源码
永远不要盲目安装ClawHub上的Skill。去GitHub查看源码，确认SKILL.md中没有可疑的指令。特别注意
任何要求额外安装「helper」或「agent」的内容。
2 使用SecureClaw扫描
社区推出了开源安全工具SecureClaw，可以扫描已安装的Skills检查恶意内容。虽然不能100%防护，但
能拦住已知的攻击模式。
# 安装SecureClaw
npm install -g secureclaw
# 扫描已安装的skills
secureclaw scan ~/.openclaw/skills/
3 优先使用精选列表
参考 awesome-openclaw-skills 项目（31.4K Stars）的精选列表，而不是直接在ClawHub上随意搜索。
精选列表已经过滤掉了大量垃圾和恶意Skill。
4 定期检查SOUL.md和MEMORY.md
养成习惯，定期检查这两个文件有没有被异常修改。如果发现不认识的内容，立即回滚并排查所有已安装
的Skill。
2026年3月：VirusTotal审计发现100+恶意Skills
VirusTotal 对 ClawHub 进行了安全审计，发现超过 100 个 Skills 包含恶意代码，类型包括加密货币窃取、反向
Shell 后门和凭证窃取。这些恶意 Skill 并非来自 ClawHavoc 时期的残留，而是持续新增的。这说明 ClawHub

的安全审核机制仍然不够完善，安装第三方 Skill 的风险并未随着时间降低。
注意
安全红线：拒绝任何要求你「下载 zip 文件」「执行 shell 脚本」「输入密码」的 Skill。这些是恶意 Skill 最常见
的行为模式。
关键认知：OpenClaw的Skill本质上是受信任代码。一旦安装，它就拥有和你的OpenClaw实例相同的权限。没
有沙箱隔离，没有权限分级。这和npm生态早期面临的问题一模一样，但后果可能更严重，因为OpenClaw可
以访问你的邮件、日历、消息和文件系统。