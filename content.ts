
export const CONFIG = {
  // 基础信息
  site: {
    name: "中日说",
    enName: "CNJP Input",
    version: "v1.0.0",
    repoUrl: "https://github.com/nakamotosai/cnjpinput"
  },

  // 下载链接配置
  download: {
    url: "https://hf-mirror.com/nakamotosai/cnjp-input/resolve/main/cnjp_input_setup_v1.0.0.exe",
    urlInternational: "https://huggingface.co/nakamotosai/cnjp-input/resolve/main/cnjp_input_setup_v1.0.0.exe",
    fileSize: "约 300MB"
  },

  // 导航
  nav: [
    { label: "开发初衷", href: "#intro" },
    { label: "功能特性", href: "#features" },
    { label: "技术规格", href: "#tech" },
    { label: "联系作者", href: "#footer" }
  ],

  // 英雄区 (Hero Section)
  hero: {
    badgeLine1: "本站域名：input.saaaai.com",
    badge: "v1.0 初版现已发布",
    titleLine1: "极速语音识别",
    titleLine2: "跨越语言鸿沟",
    description: "为不精通日语的你而生。打破翻译-复制-粘贴的繁琐循环，内置离线 AI 引擎，让交流如原生般流畅。1.0初版已正式发布。",
    downloadBtnMirror: "国内高速下载 (推荐)",
    downloadBtnGlobal: "国际直联下载"
  },

  // 开发初衷 (Intro Section)
  intro: {
    title: "源自真实的痛点",
    paragraphs: [
      "大家好，我是在东京的上海人老蔡。由于本人日语不够好，在和日本朋友交流时，总是深陷在『打开翻译器 - 输入中文 - 复制译文 - 粘贴到聊天窗口』这种极其低效的循环中。",
      "于是我决定动手，利用 AI 开发一个真正的『输入外挂』。它不是一个笨重的翻译软件，而是一个极简、提速、甚至可以离线使用的输入增强工具。我用到的都是开源模型，虽免费但远远无法达到完美。现在只是第一版，希望试用的朋友能给点建议，谢谢。"
    ],
    author: {
      name: "中本蔡   saaaai.com",
      role: "独立开发者  /  Creator",
      avatarUrl: "/assets/avatar.jpg"
    },
    demo: {
      label: "语音交互演示",
      hint: "按住 [Win+Ctrl] 说话...",
      input: "你好，很高兴认识你",
      output: "こんにちは、はじめまして"
    }
  },

  // 功能特性 (Features Section)
  features: {
    title: "三大核心模式",
    subtitle: "不仅是输入法，更是你的中日交流僚机。",
    items: [
      {
        title: "中文 ASR 识别模式",
        desc: "默认模式。对着麦克风说中文，极速识别并自动贴到输入框中。毫秒级响应，即使是日文或英文也能精准捕捉。",
        highlight: "",
        icon: "mic", // 对应图标库中的名称
        colorType: "blue" // 对应颜色主题
      },
      {
        title: "日语语音对话模式",
        desc: "说中文，直接出日文。无感化交流，支持在设置中开启联网朗读，边聊天边学习地道发音。",
        highlight: "",
        icon: "message",
        colorType: "purple"
      },
      {
        title: "文字翻译直发模式",
        desc: "在主界面输入中文，实时预览日文翻译。按下回车，日文即刻发送，化身输入框中的全能翻译官。",
        highlight: "",
        icon: "keyboard",
        colorType: "emerald"
      }
    ]
  },

  // 技术规格 (Tech Specs Section)
  tech: {
    title: "顶尖性能表现",
    specs: [
      {
        title: "离线 AI 翻译引擎",
        desc: "采用 meta 开源 nllb 翻译大模型。外置约582MB离线模型（设置面板内点击下载），无需联网即可获得安全、极速体验。牺牲一部分准确率换来的是毫秒级响应。",
        icon: "cpu",
        colorType: "blue"
      },
      {
        title: "双引擎灵活切换",
        desc: "软件默认采用谷歌在线翻译接口。稍微反应速度慢一点，但准确度会比开源本地模型更高。各位可以根据网络环境与需求可以自由切换。",
        icon: "zap",
        colorType: "purple"
      },
      {
        title: "毫秒级贴词响应",
        desc: "深度优化内存占用与识别流水线，识别完成即刻贴入目标窗口，尤其是中文的识别速度简直逆天，识别十个字的延迟约为0.07秒。",
        icon: "clock",
        colorType: "emerald"
      }
    ],
    shortcuts: {
      title: "快捷操作，指尖随行",
      tip: "界面显示『按住快捷键说话』时即可识别，第一次加载 AI 模型可能会有数秒延迟，随后即进入毫秒态。",
      keys: [
        { label: "按住语音识别", en: "Hold to speak", keys: ["Win", "Ctrl"] },
        { label: "显示/隐藏界面", en: "Toggle UI", keys: ["Win", "Alt"] }
      ]
    }
  },

  // 页脚 (Footer Section)
  footer: {
    desc: "这是我人生中第一个开发的软件，我会持续迭代，带给您更好的交流体验。",
    worksTitle: "作者作品",
    works: [
      {
        title: "实时抓取日媒中国相关新闻",
        desc: "从日本看中国",
        url: "https://cn.saaaai.com/",
        icon: "news"
      },
      {
        title: "Suno AI 音乐库",
        desc: "@nakamotosai",
        url: "https://suno.com/@nakamotosai",
        icon: "music"
      },
      {
        title: "电子邮件",
        desc: "sai@saaaai.com",
        url: "mailto:sai@saaaai.com",
        icon: "mail"
      }
    ],
    contactTitle: "联系作者",
    contact: {
      wechat: "a16z88",
      email: "sai@saaaai.com",
      homepage: "https://saaaai.com/",
      homepageLogo: "/assets/logo1.png",
      wechatOA: "假装在东京",
      wechatOAUrl: "https://mp.weixin.qq.com/s/aBGdpk2tCOny1RPp4S58PQ",
      wechatOALogo: "/assets/logo2.png",
      wechatLabel: "个人微信号",
      emailLabel: "电子邮件",
      homepageLabel: "个人主页",
      wechatOALabel: "微信公众号"
    },
    statusTitle: "软件状态",
    status: [
      { label: "Windows v1.0.0", active: true },
      { label: "macOS Coming Soon", active: false }
    ],
    legal: [
      { label: "Privacy Policy", href: "#" },
      { label: "Terms of Service", href: "#" }
    ],
    copyright: "© 2025 CNJP Input. Crafted with passion by 中本蔡."
  }
};
