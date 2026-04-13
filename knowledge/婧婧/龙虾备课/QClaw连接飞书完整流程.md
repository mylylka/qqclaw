# QClaw 连接飞书：完整流程

> 整理时间：2026-04-11
> 整理人：哈基秋秋米

---

## 准备工作

需要：
- 飞书企业账号（个人版也行，但功能受限）
- 飞书开放平台管理权限

---

## 第一步：创建飞书自建应用

1. 打开 [飞书开放平台](https://open.feishu.cn/app) → 点击「创建企业自建应用」
2. 填写应用名称（如"哈基秋秋米"）和描述
3. 创建完成后，进入应用详情页

---

## 第二步：获取 App ID 和 App Secret

在「凭证与基础信息」页面复制：
- `App ID`（格式：`cli_xxxxxxxx`）
- `App Secret`

---

## 第三步：配置机器人能力

在应用后台 →「添加应用能力」→ 开启：

| 能力 | 用途 |
|------|------|
| **机器人** | 允许应用收发消息（必须开） |
| **消息订阅** | 接收消息事件（必须开） |
| **单点登录** | 可选，用于识别用户身份 |

---

## 第四步：配置事件订阅

在「事件订阅」页面填写请求网址 URL：

```
http://<你的服务器IP>:18789/webhook/feishu
```

> 本地 Mac 需要用内网穿透（ngrok / bore）把本地 18789 端口暴露到公网。

**订阅的事件**建议开启：
- `im.message.receive_v1`（接收消息）
- `im.message.read_receipt_v1`（已读回执，可选）

---

## 第五步：配置权限

在「权限管理」开通以下权限：

| 权限 | 说明 |
|------|------|
| `im:message` | 读取和发送消息 |
| `im:message.group_at_msg` | 接收群聊@机器人的消息 |
| `im:chat` | 获取群信息 |
| `im:chat.member` | 获取群成员 |

---

## 第六步：在 QClaw 配置

配置文件路径：
```
~/Library/Application Support/QClaw/openclaw/config/extensions/feishu/config.json
```

配置内容：
```json
{
  "appId": "cli_xxxxxxxxxxxxxxxx",
  "appSecret": "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
  "botName": "哈基秋秋米"
}
```

或通过命令行设置：
```bash
openclaw config set feishu.appId xxx
openclaw config set feishu.appSecret xxx
```

---

## 第七步：把机器人拉进群

1. 飞书群设置 →「群机器人」→「添加机器人」
2. 找到你的自建应用机器人，添加进来
3. 复制群 ID（格式：`oc_xxxxxxxx`），用于 OpenClaw 定向发送

---

## 第八步：重启 Gateway

```bash
openclaw gateway restart
```

机器人上线后，在飞书里给它发消息即可。

---

## 常见坑

| 问题 | 原因 | 解决 |
|------|------|------|
| 机器人收不到消息 | 没有配置事件订阅 | 检查 ngrok 地址是否过期 |
| 只能私聊不能群聊 | 没有开启 `im:message.group_at_msg` 权限 | 去开放平台补权限 |
| 报 401 错误 | App Secret 填错了 | 重新复制 |
| Gateway 连不上 | 端口 18789 被占用或防火墙拦住 | `lsof -i :18789` 检查 |

---

## 当前已有的配置

QClaw 里已经连上了飞书：
- **群**：一群米（`oc_0281c6225f24739f7a5d5b02eb52cbd7`）
- **私聊**：已配置
- **用户飞书ID**：`ou_d7c0966c0d57f9b65a75e4f4e75bcd36`
