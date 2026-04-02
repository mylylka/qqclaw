# Noiz AI 使用指南

## 什么是 Noiz AI？

- **功能**：文字转语音（TTS）
- **支持语言**：中文、英文等多语言
- **推荐音色**：4 种（科技男、磁性主持、社交女、情绪女）
- **应用场景**：语音生成、视频配音、无障碍阅读

## 快速开始

### 1. 获取 API Key
- 登录 Noiz 官网获取 key
- 格式：`your-key$email`

### 2. curl 调用示例
```bash
curl -X POST "https://noiz.ai/v1/text-to-speech" \
  -H "Authorization: base64-encoded-key" \
  -F "text=要转换的文字" \
  -F "voice_id=3b9f1e27" \
  -F "target_lang=zh" \
  -F "output_format=wav" \
  -o output.wav
```

### 3. 转换为 MP3（可选）
```bash
ffmpeg -i output.wav -ar 44100 output.mp3
```

## 推荐音色

| Voice ID | 名称 | 特点 | 适用场景 |
|----------|------|------|----------|
| 3b9f1e27 | 小明｜科技达人 | 男声、欢快活泼 | 科技内容 |
| ac09aeb4 | 阿豪｜磁性主持 | 男声、平静 | 叙述讲解 |
| b4775100 | 悦悦｜社交分享 | 女声、欢快 | 社交媒体 |
| 77e15f2c | 婉青｜情绪抚慰 | 女声、平静 | 情感内容 |

## 注意事项

- Python 调用有 SSL 问题，建议用 curl
- 需要 base64 编码 API Key
- 输出格式支持 wav、mp3