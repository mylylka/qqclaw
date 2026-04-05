# QMD 安装与使用指南

> 工具：QMD（Quick Markdown Database）
> 用途：本地知识库搜索引擎，支持 BM25 + 向量 + LLM rerank
> 记录时间：2026-04-05

---

## 什么是 QMD

**QMD = Query Markdown Database**

由 tobi 开发的本地知识库搜索引擎，特点：
- **纯本地**：所有数据存在本地，不上传云端
- **混合搜索**：BM25 文本搜索 + 向量语义搜索 + LLM 重排序
- **Markdown 原生**：专为 Markdown 笔记设计，自动索引 .md 文件
- **零配置**：一条命令初始化，开箱即用

**与常规搜索的区别**：
- 不是简单的关键词匹配
- 能理解语义，比如搜"安装步骤"也能找到"怎么装"的内容
- 适合个人知识库、笔记管理

---

## 安装过程

### 方法一：全局安装（失败）
```bash
npm install -g @tobilu/qmd
```
**问题**：权限不足，无法写入全局目录

### 方法二：npx 运行（成功）
```bash
npx @tobilu/qmd
```
**原理**：npx 临时下载包到缓存目录，无需 sudo 权限
**优点**：免安装、免配置、即用即走

---

## 初始化知识库

### 1. 进入工作目录
```bash
cd /Users/liujing/.qclaw/workspace
```

### 2. 创建 Collection
```bash
npx @tobilu/qmd init
```
**作用**：扫描目录下所有 .md 文件，建立索引

### 3. 生成向量嵌入
```bash
npx @tobilu/qmd embed
```
**作用**：为所有文档生成向量表示，支持语义搜索

---

## 常用命令

| 命令 | 作用 |
|------|------|
| `npx @tobilu/qmd update` | 更新索引（新增/修改文件后执行）|
| `npx @tobilu/qmd search <关键词>` | 搜索知识库 |
| `npx @tobilu/qmd status` | 查看索引状态 |

---

## 使用场景

1. **新增文件后**：执行 `update` 更新索引
2. **查找资料**：用 `search` 语义搜索，不用记文件名
3. **定期维护**：每周执行一次 `embed` 保持向量最新

---

## 注意事项

- 每次使用都要带 `npx @tobilu/qmd` 前缀
- update 和 embed 都要执行，update 更新文件列表，embed 生成向量
- 索引文件保存在 `.qmd/` 隐藏目录，不要手动删除
