const pptxgen = require("pptxgenjs");

let pres = new pptxgen();
pres.layout = "LAYOUT_16x9";
pres.author = "AI Assistant";
pres.title = "儿童智能学习陪伴督导系统";

const C = {
  darkBg: "0F2027",
  midBg:  "203A43",
  accent: "2C5364",
  light:  "F0F4F8",
  white:  "FFFFFF",
  text:   "1A202C",
  muted:  "718096",
  blue:   "3182CE",
  teal:   "319795",
  orange: "DD6B20",
  green:  "38A169",
  purple: "805AD5",
};

const SHADOW = () => ({ type: "outer", blur: 6, offset: 3, angle: 135, color: "000000", opacity: 0.12 });

// ── Slide 1: 封面 ──────────────────────────────────────────────────────────
{
  const s = pres.addSlide();
  s.background = { color: C.darkBg };
  s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 4.5, h: 5.625, fill: { color: C.midBg, transparency: 60 } });
  s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 3.5, w: 10, h: 2.125, fill: { color: C.accent, transparency: 50 } });
  s.addText("儿童智能学习陪伴\n督导系统", {
    x: 0.6, y: 1.2, w: 8, h: 2.2,
    fontSize: 44, fontFace: "Microsoft YaHei", bold: true, color: C.white,
    align: "left", valign: "top", lineSpacing: 52
  });
  s.addText("树莓派端 · 技术架构方案", {
    x: 0.6, y: 3.5, w: 6, h: 0.5,
    fontSize: 20, fontFace: "Microsoft YaHei", color: "7FDBFF"
  });
  s.addText("Raspberry Pi  ·  AI Companion  ·  Learning Supervision", {
    x: 0.6, y: 4.2, w: 6, h: 0.4,
    fontSize: 13, fontFace: "Arial", color: C.muted
  });
  s.addShape(pres.shapes.OVAL, { x: 7.8, y: 1.5, w: 1.6, h: 1.6, fill: { color: C.blue, transparency: 30 }, line: { color: "7FDBFF", width: 1.5 } });
  s.addText("🤖", { x: 7.8, y: 1.7, w: 1.6, h: 1.2, fontSize: 48, align: "center", valign: "middle" });
}

// ── Slide 2: 架构概览 ────────────────────────────────────────────────────────
{
  const s = pres.addSlide();
  s.background = { color: C.light };
  s.addText("系统架构概览", { x: 0.5, y: 0.4, w: 9, h: 0.7, fontSize: 32, fontFace: "Microsoft YaHei", bold: true, color: C.text });
  s.addShape(pres.shapes.RECTANGLE, { x: 0.5, y: 1.05, w: 1.2, h: 0.06, fill: { color: C.blue } });

  const nodes = [
    { num: "01", title: "任务声明",   desc: "孩子通过按键语音输入学习任务", color: C.blue },
    { num: "02", title: "伴随式督导", desc: "全程静默，AI 影子教练式督导", color: C.teal },
    { num: "03", title: "主动休眠唤醒",desc: "临时离开自动休眠，人脸回归唤醒",color: C.green },
    { num: "04", title: "任务结束",   desc: "计时结束，主动询问，数据落盘", color: C.orange },
    { num: "05", title: "数据分析报告",desc: "智能体分析 + 邮件推送亲子报告",color: C.purple },
  ];
  const cardW = 1.72, startX = 0.45, gapX = 0.2;
  nodes.forEach((n, i) => {
    const cx = startX + i * (cardW + gapX);
    s.addShape(pres.shapes.RECTANGLE, { x: cx, y: 1.5, w: cardW, h: 3.4, fill: { color: C.white }, shadow: SHADOW() });
    s.addShape(pres.shapes.RECTANGLE, { x: cx, y: 1.5, w: cardW, h: 0.6, fill: { color: n.color } });
    s.addText(n.num, { x: cx, y: 1.5, w: cardW, h: 0.6, fontSize: 22, fontFace: "Arial", bold: true, color: C.white, align: "center", valign: "middle" });
    s.addText(n.title, { x: cx + 0.1, y: 2.2, w: cardW - 0.2, h: 0.6, fontSize: 15, fontFace: "Microsoft YaHei", bold: true, color: C.text, align: "center" });
    s.addText(n.desc, { x: cx + 0.1, y: 2.85, w: cardW - 0.2, h: 0.9, fontSize: 11, fontFace: "Microsoft YaHei", color: C.muted, align: "center" });
  });
}

// ── Slide 3: 节点一 - 任务声明 ──────────────────────────────────────────────
{
  const s = pres.addSlide();
  s.background = { color: C.white };
  // 左侧深色栏
  s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 3.2, h: 5.625, fill: { color: "1A365D" } });
  s.addText("01", { x: 0.3, y: 0.5, w: 2.5, h: 0.8, fontSize: 52, fontFace: "Arial", bold: true, color: "7FDBFF" });
  s.addText("任务声明", { x: 0.3, y: 1.4, w: 2.6, h: 0.6, fontSize: 24, fontFace: "Microsoft YaHei", bold: true, color: C.white });
  s.addText("孩子侧交互入口", { x: 0.3, y: 2.0, w: 2.6, h: 0.4, fontSize: 12, fontFace: "Microsoft YaHei", color: "7FDBFF" });

  // 三步流程
  const steps = [
    { icon: "🔘", title: "按下按键",   desc: "孩子长按物理按键" },
    { icon: "🎤", title: "语音输入",   desc: "说出任务类型和时长\n例如：我要做40分钟数学" },
    { icon: "🔊", title: "松开按键",   desc: "TTS语音回复确认\n系统正式进入任务模式" },
  ];
  steps.forEach((st, i) => {
    const sx = 3.6 + i * 2.1;
    s.addShape(pres.shapes.RECTANGLE, { x: sx, y: 1.3, w: 1.9, h: 2.0, fill: { color: C.light }, shadow: SHADOW() });
    s.addText(st.icon, { x: sx, y: 1.4, w: 1.9, h: 0.6, fontSize: 28, align: "center" });
    s.addText(st.title, { x: sx + 0.1, y: 2.0, w: 1.7, h: 0.4, fontSize: 13, fontFace: "Microsoft YaHei", bold: true, color: C.text, align: "center" });
    s.addText(st.desc, { x: sx + 0.1, y: 2.45, w: 1.7, h: 0.7, fontSize: 10, fontFace: "Microsoft YaHei", color: C.muted, align: "center" });
    if (i < steps.length - 1) s.addText("→", { x: sx + 1.9, y: 1.9, w: 0.3, h: 0.6, fontSize: 22, color: C.blue, align: "center" });
  });

  // 技术路径
  s.addShape(pres.shapes.RECTANGLE, { x: 3.6, y: 3.6, w: 6.0, h: 1.7, fill: { color: "EBF8FF" } });
  s.addText("技术路径", { x: 3.8, y: 3.7, w: 2, h: 0.35, fontSize: 12, fontFace: "Microsoft YaHei", bold: true, color: C.blue });
  s.addText([
    { text: "Faster-Whisper", options: { bold: true, breakLine: true } },
    { text: "本地语音识别，无需联网，隐私安全  ", options: { breakLine: true } },
    { text: "正则表达式（Regex）", options: { bold: true, breakLine: true } },
    { text: "提取任务类型 + 任务时长  ", options: { breakLine: true } },
    { text: "TTS 语音合成", options: { bold: true, breakLine: true } },
    { text: "实时语音反馈：收到，40分钟数学开始，加油！", options: {} },
  ], { x: 3.8, y: 4.05, w: 5.6, h: 1.2, fontSize: 10, fontFace: "Microsoft YaHei", color: C.text });
}

// ── Slide 4: 节点二 - 伴随式督导 ────────────────────────────────────────────
{
  const s = pres.addSlide();
  s.background = { color: C.white };
  s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 3.2, h: 5.625, fill: { color: "234E52" } });
  s.addText("02", { x: 0.3, y: 0.5, w: 2.5, h: 0.8, fontSize: 52, fontFace: "Arial", bold: true, color: "81E6D9" });
  s.addText("伴随式督导", { x: 0.3, y: 1.4, w: 2.6, h: 0.6, fontSize: 24, fontFace: "Microsoft YaHei", bold: true, color: C.white });
  s.addText("影子教练 · 静默守护", { x: 0.3, y: 2.0, w: 2.6, h: 0.4, fontSize: 12, fontFace: "Microsoft YaHei", color: "81E6D9" });

  const states = [
    { icon: "🧘", badge: "静默",    badgeColor: C.green,  title: "深度心流", desc: "Yaw 角度持续正对书桌\n系统保持静默，不打扰专注" },
    { icon: "👀", badge: "轻声提醒", badgeColor: C.orange, title: "分心预警", desc: "Yaw 偏离 >30° 超过2分钟\n轻声提醒：感觉遇到难题了？" },
    { icon: "😴", badge: "坐姿矫正", badgeColor: C.purple, title: "疲劳关怀", desc: "Pitch 低头角超标\n触发坐姿矫正或休息提醒" },
  ];
  states.forEach((st, i) => {
    const sx = 3.5 + i * 2.15;
    s.addShape(pres.shapes.RECTANGLE, { x: sx, y: 0.5, w: 2.0, h: 2.9, fill: { color: C.white }, line: { color: st.badgeColor, width: 2 }, shadow: SHADOW() });
    s.addShape(pres.shapes.RECTANGLE, { x: sx + 0.1, y: 0.6, w: 1.8, h: 0.32, fill: { color: st.badgeColor } });
    s.addText(st.badge, { x: sx + 0.1, y: 0.6, w: 1.8, h: 0.32, fontSize: 10, fontFace: "Microsoft YaHei", bold: true, color: C.white, align: "center", valign: "middle" });
    s.addText(st.icon, { x: sx, y: 1.0, w: 2.0, h: 0.6, fontSize: 32, align: "center" });
    s.addText(st.title, { x: sx + 0.1, y: 1.6, w: 1.8, h: 0.4, fontSize: 14, fontFace: "Microsoft YaHei", bold: true, color: C.text, align: "center" });
    s.addText(st.desc, { x: sx + 0.1, y: 2.05, w: 1.8, h: 1.2, fontSize: 10, fontFace: "Microsoft YaHei", color: C.muted, align: "center" });
  });

  s.addShape(pres.shapes.RECTANGLE, { x: 3.5, y: 3.6, w: 6.1, h: 1.7, fill: { color: "E6FFFA" } });
  s.addText("核心技术", { x: 3.7, y: 3.7, w: 2, h: 0.35, fontSize: 12, fontFace: "Microsoft YaHei", bold: true, color: C.teal });
  s.addText([
    { text: "3D 头部姿态估计", options: { bold: true, breakLine: true } },
    { text: "通过 MediaPipe 计算 Yaw / Pitch / Roll 三维角度", options: { breakLine: true } },
    { text: "低频监测频率：每 2-5 秒采集一次画面，兼顾性能与准确率", options: { breakLine: true } },
    { text: "数据闭环：专注 / 分心 / 疲劳状态数据实时存入缓存 CSV", options: {} },
  ], { x: 3.7, y: 4.05, w: 5.8, h: 1.2, fontSize: 10, fontFace: "Microsoft YaHei", color: C.text });
}

// ── Slide 5: 节点三 - 主动休眠与唤醒 ─────────────────────────────────────────
{
  const s = pres.addSlide();
  s.background = { color: C.white };
  s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 3.2, h: 5.625, fill: { color: "276749" } });
  s.addText("03", { x: 0.3, y: 0.5, w: 2.5, h: 0.8, fontSize: 52, fontFace: "Arial", bold: true, color: "9AE6B4" });
  s.addText("主动休眠\n与唤醒", { x: 0.3, y: 1.35, w: 2.6, h: 0.9, fontSize: 22, fontFace: "Microsoft YaHei", bold: true, color: C.white, lineSpacing: 30 });
  s.addText("异常处理 · 低功耗设计", { x: 0.3, y: 2.3, w: 2.6, h: 0.4, fontSize: 12, fontFace: "Microsoft YaHei", color: "9AE6B4" });

  // 左：休眠
  s.addShape(pres.shapes.RECTANGLE, { x: 3.5, y: 0.5, w: 2.9, h: 2.3, fill: { color: "FFF5F5" }, line: { color: "FC8181", width: 1.5 } });
  s.addText("😴  自动休眠", { x: 3.6, y: 0.6, w: 2.7, h: 0.45, fontSize: 14, fontFace: "Microsoft YaHei", bold: true, color: "C53030" });
  s.addText([
    { text: "触发条件", options: { bold: true, breakLine: true } },
    { text: "人脸消失 > 5 分钟", options: { breakLine: true } },
    { text: " ", options: { breakLine: true } },
    { text: "执行动作", options: { bold: true, breakLine: true } },
    { text: "系统切换至低功耗休眠模式", options: { breakLine: true } },
    { text: "任务计时器自动暂停", options: {} },
  ], { x: 3.6, y: 1.1, w: 2.7, h: 1.6, fontSize: 11, fontFace: "Microsoft YaHei", color: C.text });

  // 右：唤醒
  s.addShape(pres.shapes.RECTANGLE, { x: 6.7, y: 0.5, w: 2.9, h: 2.3, fill: { color: "F0FFF4" }, line: { color: "68D391", width: 1.5 } });
  s.addText("😊  智能唤醒", { x: 6.8, y: 0.6, w: 2.7, h: 0.45, fontSize: 14, fontFace: "Microsoft YaHei", bold: true, color: "276749" });
  s.addText([
    { text: "触发条件", options: { bold: true, breakLine: true } },
    { text: "人脸重新出现在画面中", options: { breakLine: true } },
    { text: " ", options: { breakLine: true } },
    { text: "执行动作", options: { bold: true, breakLine: true } },
    { text: "AI 语音唤醒：", options: { breakLine: true } },
    { text: "欢迎回来，我们继续\n完成剩下的15分钟吧！", options: { italic: true, color: C.muted } },
  ], { x: 6.8, y: 1.1, w: 2.7, h: 1.6, fontSize: 11, fontFace: "Microsoft YaHei", color: C.text });

  s.addShape(pres.shapes.RECTANGLE, { x: 3.5, y: 3.0, w: 6.1, h: 0.9, fill: { color: "EBF8FF" } });
  s.addText("⚡ 数据真实性保障：休眠期间计时暂停，排除孩子离开时间干扰，保证学习效率分析精准性", {
    x: 3.6, y: 3.0, w: 5.9, h: 0.9, fontSize: 11, fontFace: "Microsoft YaHei", color: "2B6CB0", valign: "middle"
  });

  s.addShape(pres.shapes.RECTANGLE, { x: 3.5, y: 4.1, w: 6.1, h: 1.2, fill: { color: "FAF5FF" } });
  s.addText("硬件低功耗设计", { x: 3.7, y: 4.2, w: 2, h: 0.35, fontSize: 12, fontFace: "Microsoft YaHei", bold: true, color: "6B46C1" });
  s.addText("摄像头休眠断电控制  ·  Pi Zero 2 W 低功耗模组  ·  系统级待机策略", {
    x: 3.7, y: 4.6, w: 5.7, h: 0.6, fontSize: 11, fontFace: "Microsoft YaHei", color: C.muted
  });
}

// ── Slide 6: 节点四 - 任务结束 ─────────────────────────────────────────────
{
  const s = pres.addSlide();
  s.background = { color: C.white };
  s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 3.2, h: 5.625, fill: { color: "7B341E" } });
  s.addText("04", { x: 0.3, y: 0.5, w: 2.5, h: 0.8, fontSize: 52, fontFace: "Arial", bold: true, color: "FEB2B2" });
  s.addText("任务结束", { x: 0.3, y: 1.4, w: 2.6, h: 0.6, fontSize: 24, fontFace: "Microsoft YaHei", bold: true, color: C.white });
  s.addText("收尾 · 数据落盘", { x: 0.3, y: 2.0, w: 2.6, h: 0.4, fontSize: 12, fontFace: "Microsoft YaHei", color: "FEB2B2" });

  s.addText("触发条件", { x: 3.6, y: 0.5, w: 2, h: 0.4, fontSize: 13, fontFace: "Microsoft YaHei", bold: true, color: C.text });
  const triggers = [
    { icon: "⏰", text: "任务计时结束" },
    { icon: "🔘", text: "孩子主动按键结束" },
  ];
  triggers.forEach((t, i) => {
    const tx = 3.6 + i * 2.2;
    s.addShape(pres.shapes.RECTANGLE, { x: tx, y: 0.95, w: 2.0, h: 0.5, fill: { color: "FFF5F5" }, line: { color: "FC8181", width: 1 } });
    s.addText(t.icon + "  " + t.text, { x: tx + 0.1, y: 0.95, w: 1.8, h: 0.5, fontSize: 11, fontFace: "Microsoft YaHei", color: C.text, valign: "middle" });
  });

  const endSteps = [
    { icon: "💬", title: "语音核对", desc: "AI 主动询问：\n数学卷子做完了吗？\n感觉难度怎么样？" },
    { icon: "💾", title: "数据落盘", desc: "任务全量数据\n保存至 SD 卡" },
    { icon: "🔄", title: "加时确认", desc: "询问是否加时\n需加时则新建任务记录" },
    { icon: "📊", title: "进入报告", desc: "触发数据分析\n生成亲子报告" },
  ];
  endSteps.forEach((st, i) => {
    const sx = 3.6 + i * 1.55;
    s.addShape(pres.shapes.RECTANGLE, { x: sx, y: 1.7, w: 1.45, h: 2.0, fill: { color: "FFF5F5" }, line: { color: "FC8181", width: 1 } });
    s.addText(st.icon, { x: sx, y: 1.8, w: 1.45, h: 0.5, fontSize: 24, align: "center" });
    s.addText(st.title, { x: sx + 0.1, y: 2.3, w: 1.25, h: 0.35, fontSize: 11, fontFace: "Microsoft YaHei", bold: true, color: "C53030", align: "center" });
    s.addText(st.desc, { x: sx + 0.05, y: 2.7, w: 1.35, h: 0.9, fontSize: 9.5, fontFace: "Microsoft YaHei", color: C.muted, align: "center" });
    if (i < endSteps.length - 1) s.addText("→", { x: sx + 1.35, y: 2.3, w: 0.3, h: 0.5, fontSize: 18, color: "FC8181", align: "center" });
  });

  s.addShape(pres.shapes.RECTANGLE, { x: 3.6, y: 3.9, w: 6.0, h: 1.4, fill: { color: "FFFAF0" } });
  s.addText("本次任务数据项", { x: 3.8, y: 4.0, w: 3, h: 0.35, fontSize: 12, fontFace: "Microsoft YaHei", bold: true, color: C.orange });
  s.addText("计划时长 · 实际时长 · 专注得分 · Yaw/Pitch/Roll 角度序列 · 分心次数 · 疲劳次数 · 任务类型 · 任务难度自评", {
    x: 3.8, y: 4.4, w: 5.7, h: 0.8, fontSize: 11, fontFace: "Microsoft YaHei", color: C.muted
  });
}

// ── Slide 7: 数据分析四大维度 ──────────────────────────────────────────────
{
  const s = pres.addSlide();
  s.background = { color: C.light };
  s.addText("数据分析 · 四大核心维度", { x: 0.5, y: 0.35, w: 9, h: 0.65, fontSize: 28, fontFace: "Microsoft YaHei", bold: true, color: C.text });
  s.addShape(pres.shapes.RECTANGLE, { x: 0.5, y: 0.95, w: 1.2, h: 0.06, fill: { color: C.purple } });

  const dims = [
    { icon: "⏱", color: C.blue,   title: "任务评估准确度",  formula: "|实际时长 - 计划时长| / 计划时长", content: "对比孩子自主声明时长\n与实际执行时长\n判断学科难度适应性" },
    { icon: "🧠", color: C.teal,   title: "专注状态稳定性",  formula: "Yaw + Roll 阈值内时长占比",     content: "统计头部姿态波动频率\n角度频繁小幅波动\n= 小动作多、注意力涣散" },
    { icon: "🪑", color: C.orange, title: "坐姿负荷统计",    formula: "Pitch 超标累计时长 + 触发频次",  content: "统计低头过深行为\n任务后半程频次激增\n= 学科体能消耗大" },
    { icon: "📚", color: C.purple, title: "学科效率分布",   formula: "各学科平均专注得分",              content: "横向对比各学科\n学习姿态表现\n客观定位短板学科" },
  ];
  dims.forEach((d, i) => {
    const row = Math.floor(i / 2), col = i % 2;
    const dx = 0.5 + col * 4.7, dy = 1.25 + row * 2.15;
    s.addShape(pres.shapes.RECTANGLE, { x: dx, y: dy, w: 4.4, h: 2.0, fill: { color: C.white }, shadow: SHADOW() });
    s.addShape(pres.shapes.RECTANGLE, { x: dx, y: dy, w: 0.1, h: 2.0, fill: { color: d.color } });
    s.addText(d.icon + "  " + d.title, { x: dx + 0.2, y: dy + 0.1, w: 4.0, h: 0.4, fontSize: 14, fontFace: "Microsoft YaHei", bold: true, color: d.color });
    s.addShape(pres.shapes.RECTANGLE, { x: dx + 0.2, y: dy + 0.55, w: 4.0, h: 0.35, fill: { color: "F7FAFC" } });
    s.addText(d.formula, { x: dx + 0.3, y: dy + 0.55, w: 3.8, h: 0.35, fontSize: 9.5, fontFace: "Consolas", color: C.muted, valign: "middle" });
    s.addText(d.content, { x: dx + 0.2, y: dy + 1.0, w: 4.0, h: 0.9, fontSize: 10.5, fontFace: "Microsoft YaHei", color: C.text });
  });
}

// ── Slide 8: 邮件报告推送 ───────────────────────────────────────────────────
{
  const s = pres.addSlide();
  s.background = { color: C.white };
  s.addText("邮件报告 · 亲子沟通锚点", { x: 0.5, y: 0.35, w: 9, h: 0.65, fontSize: 28, fontFace: "Microsoft YaHei", bold: true, color: C.text });
  s.addShape(pres.shapes.RECTANGLE, { x: 0.5, y: 0.95, w: 1.2, h: 0.06, fill: { color: C.green } });

  const reportParts = [
    { icon: "📋", color: C.blue,   title: "数据概览",      items: "今日总学习时长\n完成任务数\n整体预估偏差率" },
    { icon: "📈", color: C.teal,   title: "专注力折线图",  items: "横轴：时间\n纵轴：姿态稳定分\n直观展示专注度变化" },
    { icon: "💡", color: C.orange, title: "核心结论",      items: "文字总结学习情况\n例如：今日数学预估\n偏离15分钟" },
    { icon: "👨‍👩‍👧", color: C.purple, title: "亲子沟通锚点", items: "基于任务关键词\n提供专属亲子\n对话建议" },
  ];
  reportParts.forEach((r, i) => {
    const rx = 0.5 + i * 2.4;
    s.addShape(pres.shapes.RECTANGLE, { x: rx, y: 1.3, w: 2.2, h: 2.6, fill: { color: C.white }, line: { color: r.color, width: 1.5 }, shadow: SHADOW() });
    s.addShape(pres.shapes.OVAL, { x: rx + 0.7, y: 1.5, w: 0.8, h: 0.8, fill: { color: r.color, transparency: 15 } });
    s.addText(r.icon, { x: rx + 0.7, y: 1.55, w: 0.8, h: 0.7, fontSize: 24, align: "center", valign: "middle" });
    s.addText(r.title, { x: rx + 0.1, y: 2.4, w: 2.0, h: 0.4, fontSize: 13, fontFace: "Microsoft YaHei", bold: true, color: r.color, align: "center" });
    s.addText(r.items, { x: rx + 0.15, y: 2.85, w: 1.9, h: 0.95, fontSize: 10, fontFace: "Microsoft YaHei", color: C.muted, align: "center" });
  });

  s.addShape(pres.shapes.RECTANGLE, { x: 0.5, y: 4.15, w: 9.0, h: 1.2, fill: { color: "F0FFF4" } });
  s.addText("📧  报告推送流程", { x: 0.7, y: 4.25, w: 3, h: 0.35, fontSize: 12, fontFace: "Microsoft YaHei", bold: true, color: C.green });
  s.addText("任务结束 → 智能体分析（四大维度）→ 生成邮件正文 + 附件图表 → 定时推送至家长邮箱", {
    x: 0.7, y: 4.65, w: 8.5, h: 0.55, fontSize: 11, fontFace: "Microsoft YaHei", color: C.text
  });
}

// ── Slide 9: 专注力研发流程 ──────────────────────────────────────────────────
{
  const s = pres.addSlide();
  s.background = { color: C.light };
  s.addText("专注力研发 · 数据采集与标注", { x: 0.5, y: 0.35, w: 9, h: 0.65, fontSize: 28, fontFace: "Microsoft YaHei", bold: true, color: C.text });
  s.addShape(pres.shapes.RECTANGLE, { x: 0.5, y: 0.95, w: 1.2, h: 0.06, fill: { color: C.orange } });

  const steps9 = [
    { num: "Step 1", icon: "🎥", title: "数据录制", desc: "拍摄1小时孩子\n真实学习视频" },
    { num: "Step 2", icon: "📸", title: "数据采样", desc: "每分钟截取1张\n共60张样本图" },
    { num: "Step 3", icon: "📁", title: "人工标注", desc: "将样本分类至：\n专注 / 疲劳 / 走神" },
    { num: "Step 4", icon: "📐", title: "数据度量", desc: "MediaPipe测量\nPitch/Yaw/Roll\n三维角度" },
    { num: "Step 5", icon: "📊", title: "阈值确定", desc: "正常写字\nPitch = -15°\n疲劳阈值 Pitch = -40°" },
  ];
  steps9.forEach((st, i) => {
    const sx = 0.4 + i * 1.92;
    s.addShape(pres.shapes.RECTANGLE, { x: sx, y: 1.3, w: 1.8, h: 2.6, fill: { color: C.white }, shadow: SHADOW() });
    s.addText(st.num, { x: sx + 0.1, y: 1.4, w: 1.6, h: 0.3, fontSize: 9, fontFace: "Arial", bold: true, color: C.orange });
    s.addText(st.icon, { x: sx, y: 1.65, w: 1.8, h: 0.5, fontSize: 28, align: "center" });
    s.addText(st.title, { x: sx + 0.1, y: 2.2, w: 1.6, h: 0.35, fontSize: 12, fontFace: "Microsoft YaHei", bold: true, color: C.text, align: "center" });
    s.addText(st.desc, { x: sx + 0.1, y: 2.6, w: 1.6, h: 1.1, fontSize: 10, fontFace: "Microsoft YaHei", color: C.muted, align: "center" });
    if (i < steps9.length - 1) s.addText("→", { x: sx + 1.7, y: 2.1, w: 0.3, h: 0.5, fontSize: 20, color: C.orange, align: "center" });
  });

  s.addShape(pres.shapes.RECTANGLE, { x: 0.5, y: 4.15, w: 9.0, h: 1.15, fill: { color: "FFFAF0" } });
  s.addText("关键阈值标定", { x: 0.7, y: 4.25, w: 2, h: 0.35, fontSize: 12, fontFace: "Microsoft YaHei", bold: true, color: C.orange });
  const thresholds = [
    { label: "正常写字",  value: "Pitch = -15°",  color: C.green  },
    { label: "疲劳阈值",  value: "Pitch = -40°",  color: "C53030" },
    { label: "分心阈值",  value: "Yaw 偏离 >30°", color: C.orange },
    { label: "超时分心",  value: "偏离 >2分钟",   color: C.purple },
  ];
  thresholds.forEach((t, i) => {
    const tx = 0.7 + i * 2.3;
    s.addShape(pres.shapes.RECTANGLE, { x: tx, y: 4.65, w: 2.1, h: 0.55, fill: { color: t.color, transparency: 15 }, line: { color: t.color, width: 1 } });
    s.addText(t.label + "  " + t.value, { x: tx + 0.1, y: 4.65, w: 1.9, h: 0.55, fontSize: 10.5, fontFace: "Microsoft YaHei", bold: true, color: t.color, valign: "middle" });
  });
}

// ── Slide 10: 总结页 ────────────────────────────────────────────────────────
{
  const s = pres.addSlide();
  s.background = { color: C.darkBg };
  s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 2.5, w: 10, h: 3.125, fill: { color: C.accent, transparency: 60 } });
  s.addText("🌟", { x: 0, y: 0.6, w: 10, h: 0.8, fontSize: 40, align: "center" });
  s.addText("系统价值", { x: 0.5, y: 1.2, w: 9, h: 0.8, fontSize: 36, fontFace: "Microsoft YaHei", bold: true, color: C.white, align: "center" });

  const values = [
    { icon: "🧠", title: "AI 影子教练",    desc: "非侵入式督导\n不打扰孩子专注力\n实时姿态监测" },
    { icon: "💡", title: "数据驱动洞察",  desc: "客观量化学习状态\n发现学科短板\n精准亲子沟通" },
    { icon: "🔒", title: "隐私安全优先",  desc: "本地语音识别\n数据存储在本地\n树莓派自托管" },
  ];
  values.forEach((v, i) => {
    const vx = 0.7 + i * 3.1;
    s.addShape(pres.shapes.RECTANGLE, { x: vx, y: 2.2, w: 2.8, h: 2.6, fill: { color: C.white, transparency: 10 }, line: { color: "7FDBFF", width: 1 } });
    s.addText(v.icon, { x: vx, y: 2.35, w: 2.8, h: 0.6, fontSize: 30, align: "center" });
    s.addText(v.title, { x: vx + 0.1, y: 2.95, w: 2.6, h: 0.45, fontSize: 14, fontFace: "Microsoft YaHei", bold: true, color: C.white, align: "center" });
    s.addText(v.desc, { x: vx + 0.15, y: 3.45, w: 2.5, h: 1.2, fontSize: 11, fontFace: "Microsoft YaHei", color: "CBD5E0", align: "center" });
  });
  s.addText("基于 OpenClaw 架构 · 树莓派端部署 · 7×24小时在线", {
    x: 0, y: 5.0, w: 10, h: 0.4, fontSize: 11, fontFace: "Arial", color: C.muted, align: "center"
  });
}

// ── 保存 ────────────────────────────────────────────────────────────────────
const outPath = "/Users/liujing/Downloads/儿童智能学习陪伴督导系统.pptx";
pres.writeFile({ fileName: outPath }).then(() => {
  console.log("✅ PPT 已生成: " + outPath);
}).catch(console.error);
