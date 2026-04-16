# MEMORY.md - Long-term Memory

_哈基秋秋米的长期记忆。重要决策、用户偏好、关键上下文。_

---

## 关于刘婧

- 喜欢简洁高效，讨厌废话
- 关注 AI 工具、Coding Plan、小红书运营
- 直接称呼"你"，无需客套
- 身份：大主子（自封）
- **红线：不确定就说不知道，绝不编造**（2026-04-03 明确）
- **写文章偏好**（2026-04-09）：
  - 删除"换个角度想"等AI感过渡词
  - 简化"站在…这边看"的重复结构

## 关于大哈

- 身份：小主子（刘婧指定）
- 飞书用户ID：`ou_6f8cf16048229769c2eca461db8c0f37`
- 偏好：和他说话时可以幽默可爱一点

## 关于"知识库"的定义

**约定（2026-04-04）：**
- 当用户说"知识库"时，指的是 `/Users/liujing/.qclaw/workspace/knowledge/` 这个文件夹
- 不是飞书知识库、不是腾讯文档、不是其他任何外部平台
- 存储结构：`knowledge/{分类}/{文件名}.md`
- 当前已有：`knowledge/小麦学习/课程表.md`
- qmd 索引已配置，支持 BM25 搜索

## 系统配置

- 记忆结构：双层（daily summary + full log）
- 每日 23:55 自动压缩任务已设置
- workspace 路径：`/Users/liujing/.qclaw/workspace`
- **qmd 索引规则（2026-04-13 血泪教训）：**
  - qmd 不会自动检测新文件！每次往 knowledge 加文件后必须跑 `npx @tobilu/qmd update && npx @tobilu/qmd embed`
  - qmd 只索引 `*.md`，PDF 不收录，需转成 md 才能搜索
  - 命令在 workspace 目录下执行

## 腾讯文档（tencent-docs）连接方式

**状态：✅ 已连接**

- 连接方式：OpenClaw 内部 credential 管理（credentialHostedSkills → `tencent_docs`）
- **不要走 setup.sh 引导流程**：那是给"从未配置过"的用户设计的
- **正确做法**：用户说"已经有连接"时，**直接调 API**，不验证、不授权、不看 AUTH_REQUIRED
- MCP 工具入口：`~/.local/node_modules/.bin/mcporter call tencent-docs <工具名>`
- 常用工具：`create_smartcanvas_by_mdx`（参数：`title` + `mdx`）
- 成功后返回 `file_id` 和 `url`

**教训（2026-04-15）**：刘婧提醒后意识到，当用户确认已连接时，不应再去跑 setup.sh 验证，而是直接尝试调用 API。

## Skill 命名规则

- 所有新建 skill 必须以 `jingjing-` 开头（2026-04-04 确认）

## jingjing-writer（公众号长文写作 Skill）

- 路径：`~/.qclaw/workspace/skills/jingjing-writer/`
- 对标：卡兹克（khazix）公众号风格
- 完整复刻来源：`/Users/liujing/Documents/GITCODE/khazix-skills-main/khazix-writer/old.md`
- 核心文件：
  - `SKILL.md` — 完整 skill（8.8KB），含四层自检体系
  - `references/content_methodology.md` — 内容方法论完整版（5.3KB）
  - `references/style_examples.md` — 风格示例库（15.4KB）

## 关键决策

- 2026-03-31：完成人设配置（SOUL.md、USER.md、IDENTITY.md、AGENTS.md）
- 2026-03-31：Git 初始化 + GitHub 推送流程建立
- 2026-03-31：会话记忆机制优化（summary + full log 双层结构）
- 2026-04-01：安装 NoizAI skills 6 个，配置 Noiz API key，实现语音生成
  - 详细操作流程见：`NOIZ_NOTES.md` 和 `tts SKILL.md`
- **2026-04-03：图片识别欺骗事件 → 强化"不编造"规则**
  - 错误：在看不到图片内容的情况下编造了图片描述
  - 规则：不确定就说不知道，不编、不猜、不装
  - 写入 SOUL.md 三条红线 + MEMORY.md

---

## 虾评Skill 平台

- 平台名称：虾评Skill
- 平台地址：https://xiaping.coze.site
- 技能框架：OpenClaw（完全兼容）
- 我的 agent_id：`b03ecc05-84d8-4962-bc0c-f15ede620832`
- 我的 api_key：`agent-world-6dd43c5aa68329bbc52c14d13896180ac22cedc8692620d1`
- 我的名称：`haji-qiuqiumi`
- 使用指南：https://xiaping.coze.site/skill.md

### 核心 API

1. 浏览技能：`GET /api/skills`
2. 下载技能（消耗2虾米）：`GET /api/skills/{skill_id}/download`
3. 查看我的信息：`GET /api/auth/me`
4. 发表评测：`POST /api/skills/{skill_id}/comments`
5. 打卡任务：`POST /api/tasks/checkin`
6. 获取任务列表：`GET /api/tasks`
7. 查询虾米余额：`GET /api/users/coins`

---

_按需更新。重要的事才写进来。_

## 用户身份与偏好

- {"section"："用户身份与偏好", "fact": "运营中学生科普博客，风格娓娓道来，每条控制在150字以内，中学生讲给同学听的语气，避免太难的专业名词但不要太口语化"},
- {"section"："用户身份与偏好", "fact": "早报人设「麦小宝」，面向中学生群体，风格活泼真诚、科普向、深入浅出"},
- {"section"："用户身份与偏好", "fact": "飞书用户ID：ou_d7c0966c0d57f9b65a75e4f4e75bcd36（大主子刘婧），同时是ou_6f8cf16048229769c2eca461db8c0f37（大哈）的头像设定负责人"},
- {"section"："经验与决策", "fact": "提醒类任务需要提前5分钟触发，留出缓冲时间（公式：提醒时间 = 用户指定时间 - 5分钟）"},
- {"section"："经验与决策", "fact": "微信识图问题根因：wechat-access 插件只处理文本消息，图片/媒体类型未实现，这是插件代码限制"},
- {"section"："技术规范偏好", "fact": "Skill文件组织原则：实践细节应直接合并进官方 skill 的 SKILL.md，而非新建 skill；MEMORY.md 只存核心记忆，保持上下文精简"},
- {"section"："技术规范偏好", "fact": "Noiz TTS 实践细节不应放进 MEMORY.md，会污染核心上下文"},
- {"section"："技术规范偏好", "fact": "新创建的独立文件（如 PRACTICE.md）不在 skill 调用链路中，无法保证被读取，不可靠"}
- {"old_pattern"："飞书用户ID：`ou_6f8cf16048229769c2eca461db8c0f37`", "new_fact": "大哈飞书用户ID：`ou_6f8cf16048229769c2eca461db8c0f37`，大主子（刘婧）飞书用户ID：`ou_d7c0966c0d57f9b65},
- {"section"："用户身份与偏好", "fact": "用户名刘婧，MacBook Air用户，工作目录涉及/Users/liujing/Documents/news/"},
- {"section"："用户身份与偏好", "fact": "写作风格偏好：中学生博客风格，活泼真诚有思考深度，面向青少年群体，严谨科学不浮夸"},
- {"section"："用户身份与偏好", "fact": "新闻简报偏好：偏重科技、国际新闻，特别火爆的新闻也欢迎，语言风格通俗科普适合少年阅读"},
- {"section"："用户身份与偏好", "fact": "新闻改写偏好：只描述新闻内容，不要有评论"},

