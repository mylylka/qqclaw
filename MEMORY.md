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

## Skill 命名规则

- 所有新建 skill 必须以 `jingjing-` 开头（2026-04-04 确认）

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
