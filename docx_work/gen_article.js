const {
  Document, Packer, Paragraph, TextRun, HeadingLevel,
  AlignmentType, PageOrientation
} = require('docx');
const fs = require('fs');

const title = "深度横评 | 10种OpenClaw龙虾究竟是什么？怎么选？";
const author = "小禾";
const source = "https://mp.weixin.qq.com/s/oWJ9WZu8xC5_YEXc6-YG7w";

const content = `我是小禾，养虾1个半月，上周开始又把市面上新出的龙虾们都实测了一遍。期间用了8天时间，纯人工撰写这篇文章，想将真实的龙虾全貌、经验和踩坑，全部分享给你，希望能对你有所帮助。

全文结构如下：
是什么
1、原生龙虾OpenClaw的「8大能力+2个痛点」
2、9种衍生龙虾的由来、分类和功能详解
横向对比
3、9种衍生龙虾的8大维度横评
选哪个
4、对10种龙虾的选择建议

全文万字，包含大量产品真实截图和对比表格。看完预计耗时30分钟，保证你会有所收获。

大家好，好久不见！先来看一张我总结的「龙虾🦞大全」吧——OpenClaw、ArkClaw、AutoClaw、QClaw...全是Claw...6个厂商，10多种龙虾。

深圳腾讯楼下，排队等待安装OpenClaw的人群。我相信你也很困惑，它们到底是什么？有什么区别？应该养哪只？今天我就来为你一文讲透。

我是从2月初开始养虾🦞的，河粉、大鹅、橙子...1个多月养了10多只，算是吃货中的养虾大户了。其实能干活的AI Agent早就有很多，但OpenClaw小龙虾🦞很特别。我第一次感受到它的特别，是在2月9日凌晨。当时我想让它帮我干个活，但后来我做其它事去了，把它忘了。谁知道，当天凌晨1点，它却自己突然问我，到底有什么活要找它干？要是没事，就早点睡。

那瞬间我真的被震惊到了。我给它交代工作，它居然一直记得，还主动来找我领活。人类员工中，也很少这么积极主动的吧？我当时就意识到，人类企业的组织形态，将发生变化。后来这1个多月，作为我的合作伙伴，它们真的帮我做了不少事。

我的这个AI日报小程序，从春节开始，就是全权交给小龙虾🦞来筛选和生产内容的：我花了很多时间来调教它、培养它，现在基本可以放心交给它了。

而在这1个月中，没想到小龙虾越来越火。各种Claw都出来了。但它们是真的小龙虾🦞吗？免费吗？还是背后要收钱？安装简单吗？好用吗？普通人想养虾，该选哪一个？

我的测评项，包括以下8个维度：

基础项
1 真假龙虾：谁与OpenClaw最接近？
2 费用：免费吗？大厂实际在卖什么给你？
3 安装便捷度：谁最简单？

进阶项
4 模型：各能选哪些？好模型才更聪明
5 IM聊天软件：各能对接哪些？
6 Coding Plan：各支持哪些？
7 操作本地文件：是否支持？
8 24小时在线：是否支持？

横评前，我会先带大家一起搞清楚，这10种龙虾，各自是什么？而最后，我也会给大家一些选择建议。

好，那我们就正式开始！

第一个问题，先解决「是什么」：先说原生龙虾OpenClaw，再说9种衍生龙虾🦞

1 原生龙虾

原装小龙虾🦞，本名OpenClaw，是一个开源、自托管、以Gateway网关为核心的AI agent运行系统。简单来说，它就是你完全自主掌控的、7X24小时在线、随时随地能沟通、能干活的私人AI助理。

你的直观感受，就是能用飞书等IM，和它沟通，指挥它做事。

经过1个多月的实践和观察，我把原装小龙虾的特征，总结为「8大能力+2个痛点」。

【8大能力】

我们来想象一下，今天你找了一个外包，让他全权替你干活，你纯躺着。从你的需求出发，你需要他有什么能力？一般来说，至少有8个：

1. 他要能用你的电脑，并有你的权限
你的工作文档和资料，都在你的电脑中，他要能打开和编辑它们，才能替你把活干了吧。同事会给你发邮件，那他要帮你读，就要有权限打开你的邮箱。这就对应着，OpenClaw的电脑本地运行和权限授权。

2. 你要被能遥控他
你在外面玩，他在家里干活。你要怎么指挥他，和他沟通呢？那肯定就是用微信、飞书、钉钉，对吧？对应OpenClaw的，就是连接聊天软件（后面简称为IM，Instant Messaging，即时通讯软件）。

3. 他要能主动干活
过了磨合期，你就不用每天早上给他列清单了。他要能自己看邮箱、查日程、处理常规事务，只有拿不准的才来问你。这对应OpenClaw的，就是定时任务和heartbeat（心跳）机制。

4. 他要智商高
对他这个人来说，你之所以找他，肯定是他聪明，能听懂你的话，能举一反三。这对应的，就是底层大模型，而且要可选。因为大模型的能力也是有差异的，越好的大模型，干活成功率越高。

5. 他要情商高
既然找他来的人是你，那他就要有一个你喜欢的性格，能用你喜欢的方式和你沟通，情商要高。对应OpenClaw的，就是用SOUL.md和AGENTS.md等文档，定义它的性格和工作准则等。

6. 他要记性好
千万别说了上句、忘了下句。如果你每天要重复告诉他，你们昨天做了什么，那你多半会崩溃。这对应的，就是记忆能力。包括它要有长期记忆（MEMORY.md），和要每天写日记（memory/日期.md）。

7. 他要有本事学会你的本领
比如我让他帮我做日报，那我是用什么步骤做，用什么标准筛选内容，我都得告诉他，他做出来的东西才能和我一样。这对应的，就是Skills（技能），我要把我的步骤、方法、经验教训，写成手册给它。

8. 他要能带团队
如果事情变多了，他一个人做不过来，那就需要给他招更多的人。他要有能力带领这些下属，一起把活干好。这就是Sub-Agent，子代理。

【2个痛点】

1. 痛点1：安全
它跑在你的电脑上，这就意味着，如果你给它足够多的权限，它就可以读取你电脑上的任何信息，也能像你一样，删除你的文件。

2. 痛点2：安装
原装小龙虾🦞，一开始是给开发者用的。对普通人来说，要安装在自己电脑上，很麻烦。不然也不会出现像本文开头，深圳市民排着队去腾讯楼下安装的画面了。

安装过程包括：安装Node.js → 安装OpenClaw → 配置API → 配置飞书机器人 → 启动Gateway → 配置AGENTS → 配置IM渠道 → 安装Skills → 配置定时任务 → 配置heartbeat...步骤多、专业术语多、命令行界面，就是小龙虾的安装痛点。

2 9种衍生龙虾

它们的名单如下：
• ArkClaw（字节）
• KimiClaw（月之暗面）
• MaxClaw（MiniMax）
• AutoClaw（智谱）
• QClaw（腾讯）
• WorkBuddy（腾讯）
• miclaw（小米）
• 阿里云轻量服务器
• 腾讯云Lighthouse轻量服务器

衍生龙虾的由来

【一切的基础：OpenClaw开源】

能有这么多龙虾🦞，短时间内快速涌现，和OpenClaw的开源分不开。开源，意味着它的代码是公开的。且它遵守的是MIT协议，意味着任何人都可以使用它的代码，并修改、包装，甚至商用。

就像安卓开源后，三星、小米等也都做了自己的手机系统。

【因为OpenClaw的安全痛点】

如果有人仅仅是考虑安全，不想用自己的电脑，就可以租一台云服务器，把它作为主机，资料全放它上面。于是，就有了腾讯云Lighthouse轻量服务器，和阿里云轻量服务器的快速部署方案。

云厂商租给你一台服务器，帮你搞定了运行环境，龙虾本体也给你预置了。但剩下的所有配置，包括服务器的维护，都要你自己完成。如果拿养虾来比喻，这种虾就属于「云端自养🦞」。

【因为OpenClaw的安装痛点】

命令行，普通人看不明白，我就改成可视化图形界面（GUI），让用户点点鼠标就行。你步骤多、专业术语多，我就缩短步骤，让用户不用管什么运行环境、网关配置，大模型也内置好。甚至内置部分技能，更极致的还内置了Soul性格，比如KimiClaw。

这种虾就属于「代养🦞」。只不过，它们有些是「云端代养🦞」——虾在云端，入口是网页，比如字节ArkClaw、Kimi的KimiClaw、MiniMax的MaxClaw；有些是「本地代养🦞」——虾被打包成了本地客户端软件，用户下载后装在自己电脑上，比如智谱的AutoClaw，和腾讯的QClaw。

【因为OpenClaw独有的8大能力】

传统AI Agent，早就能干活，比如御三家的Claude Code、CodeX，比如国内的Trae、CodeBuddy...OpenClaw和它们相比，只是多了8大能力。那它们，只要加上这些能力就可以了，比如和IM聊天软件直连，比如增加Skills。

鹅厂的WorkBuddy就是这么做的。它之前的CodeBuddy，是专为编程打造的；而WorkBuddy扩展到了更多白领的办公场景。现在，再加上了Claw的能力。这种就属于「自研龙虾」，算是龙虾近亲吧。

衍生龙虾们的分类和功能

衍生龙虾们的群像也就出来了，如果加上原装OpenClaw，现在市面上的龙虾🦞共有6类：

第1类：本地自养🦞
• 原装OpenClaw，跑在电脑上

第2类：云端自养🦞
• 腾讯云Lighthouse轻量服务器
• 阿里云轻量服务器

第3类：云端代养🦞
• ArkClaw（字节火山引擎）
• KimiClaw（月之暗面Kimi）
• MaxClaw（MiniMax）

第4类：本地代养🦞
• AutoClaw（智谱）
• QClaw（腾讯电脑管家）

第5类：自研近亲🦞
• WorkBuddy（腾讯）

第6类：自研远亲🦞
• miclaw（小米）

【1. 云端自养🦞：腾讯云+阿里云】

腾讯云Lighthouse轻量云服务器

它既然被养在服务器上，那得先有台服务器。腾讯云的网址是：https://buy.cloud.tencent.com/lighthouse

买完后，就能进入它的控制台，你的龙虾是以实例的形式存在在上面。配置界面就算不懂计算机知识，理解起来也很简单。都配置完，就可以通过IM和龙虾沟通（示例的是企业微信）。

如果想查看服务器上的文件，就远程登录它，左边就能看到文件夹目录，右边是终端，用鼠标点击一下，文件内容就会显示。

阿里云轻量服务器

阿里云也是类似的，先购买1台云服务器，网址是：https://swannext.console.aliyun.com/buy#/。

比较好的是，它能在这个网页上直接关闭公网访问，端口也从默认的18789变成了随机生成。简单来说，就是安全性提升了，能防止别人访问和攻击你。

另外，阿里云的终端中可以说"你好"，你也不用懂命令行，它会自己给你列出来，你点"执行"按钮就行，也算是充分照顾到非计算机专业的朋友们了。

可以看到，云服务器的方案，配置门槛降低了，不再需要命令行。但你如果想维护服务器、查看文件等，还是要以「终端」的形式。数据归你自己，自由度非常高。

【2. 云端代养🦞：ArkClaw、KimiClaw、MaxClaw】

ArkClaw（字节火山引擎）

ArkClaw界面是一个网页。入口在火山引擎体验中心，网址是：https://console.volcengine.com/ark/region:ark+cn-beijing/experience/claw

它与火山方舟的Coding Plan绑定了，买了才能养虾。预置了一些大模型、技能、工具、定时任务、人格等，也可以通过点击输入框上方的按钮来新增或修改，很适合普通用户。

整个网页的右侧，可以查看终端、修改大模型，和配置网盘。总之也是一只完整的龙虾，该有的都有。你要用到的，它也尽可能都做成按钮，让你「一点即用」了，且很容易理解。

KimiClaw & MaxClaw

作为Kimi和MiniMax的龙虾，把它俩放在一起讲，是因为它俩很像。它们都嵌在自己的AI主产品中。比如，Kimi网页端，左侧有多个产品功能，KimiClaw只是其中之一。连KimiClaw的网址是：kimi.com/bot

同时，它俩也都把Claw龙虾做成了一种会员权益，就是你要成为它们的会员，才能解锁养虾资格。

创建龙虾的过程，和ArkClaw是一样的，都是点击"创建"按钮，等1-2分钟即可。产品主界面很干净。输入框上没有ArkClaw那样的按钮，各种配置都主要通过对话完成。

龙虾🦞背后的模型、技能、人格，仍然是预置好的。但它们预置得更彻底一些。KimiClaw甚至把龙虾🦞的SOUL人格和IDENTITY工作规范写得非常详细，还有点中二。

留给用户可直观看到和配置的，KimiClaw只给了3个：工作空间、重启或修复、终端。工作空间的用处，就是你如果让龙虾🦞写了文档，它可以自己放到这个空间里，让你能下载。

而MaxClaw更简单，只留了重启和修复龙虾的按钮。

整体说来，你如果什么都不想管，那它们确实能让你少操一点心。如果你想灵活度更高、更自定义的话，要主动探索的东西就更多，需要自己知道OpenClaw有哪些能力。总之，一体两面，有利有弊。

【3. 本地代养🦞：AutoClaw】

因为QClaw还在内测，暂不剧透，所以本文重点讲AutoClaw。这只虾是智谱开发的桌面客户端软件，下载网址是：https://autoglm.zhipuai.cn/autoclaw/

它的左侧有3个tab，分别是分身、IM频道、定时任务。

分身tab，内置了4个分身。其中，叫AutoClaw的是主分身。"沉思小助手"对应深度研究功能，"监控"对应定时任务，Browser Agent就是具备操作浏览器的能力。后3个分身的输入框中，都内置了示例的提示词，方便初次上手。

IM频道，就是会把你在IM上的聊天记录，同步在AutoClaw里。

定时任务，就是前面提到的"监控"分身。

3 横向对比

以下内容请查看原文中的详细对比表格和截图。

4 选择建议

以下内容请查看原文中的最终选择建议部分。

本文来源：小禾说AI（微信公众号）
原文链接：https://mp.weixin.qq.com/s/oWJ9WZu8xC5_YEXc6-YG7w
本文作者：小禾
`;

async function createDoc() {
  const sections = [];
  
  // 标题
  sections.push(new Paragraph({
    heading: HeadingLevel.HEADING_1,
    children: [new TextRun({ text: title, bold: true, size: 36 })]
  }));
  
  // 元信息
  sections.push(new Paragraph({
    children: [new TextRun({ text: `作者：${author}`, italics: true, size: 22, color: "666666" })]
  }));
  sections.push(new Paragraph({
    children: [new TextRun({ text: `来源：${source}`, italics: true, size: 22, color: "666666" })]
  }));
  sections.push(new Paragraph({ children: [] })); // 空行
  
  // 按段落处理内容
  const lines = content.split('\n');
  
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) {
      sections.push(new Paragraph({ children: [] }));
      continue;
    }
    
    // 检测标题
    if (trimmed.startsWith('【') && trimmed.endsWith('】')) {
      sections.push(new Paragraph({
        heading: HeadingLevel.HEADING_2,
        children: [new TextRun({ text: trimmed, bold: true, size: 28 })]
      }));
    } else if (/^第[一二三四五六七八九十]+[章节条段]/.test(trimmed) || 
               /^[0-9]+[．.、][^a-zA-Z]/.test(trimmed) ||
               /^（[0-9]+）/.test(trimmed)) {
      sections.push(new Paragraph({
        heading: HeadingLevel.HEADING_2,
        children: [new TextRun({ text: trimmed, bold: true, size: 26 })]
      }));
    } else if (trimmed === trimmed.toUpperCase() && trimmed.length < 30 && /[A-Z]/.test(trimmed) && !/^https?:\/\//.test(trimmed)) {
      sections.push(new Paragraph({
        heading: HeadingLevel.HEADING_3,
        children: [new TextRun({ text: trimmed, bold: true, size: 24 })]
      }));
    } else if (trimmed.length < 40 && !trimmed.includes('。') && !trimmed.includes('，')) {
      // 可能是小标题
      sections.push(new Paragraph({
        heading: HeadingLevel.HEADING_3,
        children: [new TextRun({ text: trimmed, bold: true, size: 24 })]
      }));
    } else {
      sections.push(new Paragraph({
        children: [new TextRun({ text: trimmed, size: 24 })]
      }));
    }
  }
  
  const doc = new Document({
    styles: {
      default: {
        document: {
          run: { font: "Microsoft YaHei", size: 24 }
        }
      },
      paragraphStyles: [
        {
          id: "Heading1", name: "Heading 1", basedOn: "Normal", next: "Normal", quickFormat: true,
          run: { size: 40, bold: true, font: "Microsoft YaHei", color: "1a1a1a" },
          paragraph: { spacing: { before: 400, after: 200 }, outlineLevel: 0 }
        },
        {
          id: "Heading2", name: "Heading 2", basedOn: "Normal", next: "Normal", quickFormat: true,
          run: { size: 30, bold: true, font: "Microsoft YaHei", color: "1a1a1a" },
          paragraph: { spacing: { before: 300, after: 150 }, outlineLevel: 1 }
        },
        {
          id: "Heading3", name: "Heading 3", basedOn: "Normal", next: "Normal", quickFormat: true,
          run: { size: 26, bold: true, font: "Microsoft YaHei", color: "333333" },
          paragraph: { spacing: { before: 200, after: 100 }, outlineLevel: 2 }
        }
      ]
    },
    sections: [{
      properties: {
        page: {
          size: { width: 11906, height: 16838 }, // A4
          margin: { top: 1440, right: 1440, bottom: 1440, left: 1440 }
        }
      },
      children: sections
    }]
  });
  
  const buffer = await Packer.toBuffer(doc);
  const outPath = '/Users/liujing/Downloads/深度横评_10种OpenClaw龙虾究竟是什么？怎么选？.docx';
  fs.writeFileSync(outPath, buffer);
  console.log('✅ 文档已生成:', outPath);
}

createDoc().catch(console.error);
