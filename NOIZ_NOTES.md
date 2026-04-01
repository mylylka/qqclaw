# Noiz TTS 实践笔记

日期：2026-04-01  
目标：用 Noiz API 生成高质量中文语音

## API 配置

- **API key**：`16da0a99-a1e6-44c0-aa71-3cdd2ee3ec7f$mylylka@gmail.com`
- **Base64 编码**：`MTZkYTBhOTktYTFlNi00NGMwLWFhNzEtM2NkZDJlZTNlYzdmJG15bHlsa2FAZ21haWwuY29t`
- **端点**：`https://noiz.ai/v1/text-to-speech`

## curl 调用方法

当 Python requests 库 SSL 握手失败时，用 curl 直接调用：

```bash
api_key_b64="MTZkYTBhOTktYTFlNi00NGMwLWFhNzEtM2NkZDJlZTNlYzdmJG15bHlsa2FAZ21haWwuY29t"
curl -X POST "https://noiz.ai/v1/text-to-speech" \
  -H "Authorization: $api_key_b64" \
  -F "text=文本内容" \
  -F "voice_id=3b9f1e27" \
  -F "target_lang=zh" \
  -F "output_format=wav" \
  -o output.wav
```

## 推荐音色 ID

- `3b9f1e27` - 小明｜科技达人（男性，欢快、活泼）✓ 已用
- `ac09aeb4` - 阿豪｜磁性主持（男性，平静）
- `b4775100` - 悦悦｜社交分享（女性，欢快）
- `77e15f2c` - 婉青｜情绪抚慰（女性，平静）

## 已知问题 & 解决方案

### Python SSL 握手失败
- **现象**：requests 库调用 API 时 SSL 连接被重置（ConnectionResetError: [Errno 54]）
- **原因**：Python 的 SSL 握手与 Noiz 服务器不兼容
- **解决**：用 curl 调用 API，绕过 Python SSL 问题
- **参数格式**：multipart/form-data（curl 的 `-F` 参数）

## 工作流

1. 用户要求生成语音
2. 用 curl 调用 Noiz API
3. 生成 WAV 文件
4. 转换为 MP3（ffmpeg）
5. 发送给用户
