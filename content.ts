
export const CONFIG = {
  // 基础信息
  site: {
    name: "中日说",
    enName: "CNJP Input",
    version: "v1.0",
    repoUrl: "https://github.com/nakamotosai/cnjpinput"
  },
  
  // 导航
  nav: [
    { label: "开发初衷", href: "#intro" },
    { label: "功能特性", href: "#features" },
    { label: "技术规格", href: "#tech" },
    { label: "联系作者", href: "#footer" }
  ],

  // 英雄区
  hero: {
    badge: "v1.0 版本现已发布",
    titleLine1: "极速语音识别",
    titleLine2: "跨越语言鸿沟",
    description: "为不精通日语的你而生。打破翻译-复制-粘贴的繁琐循环，内置离线 AI 引擎，让交流如原生般流畅。",
    downloadBtn: "下载 Windows 版 v1.0"
  },

  // 开发初衷
  intro: {
    title: "源自真实的痛点",
    paragraphs: [
      "“我本人日语不够好，在和日本朋友交流时，总是深陷在『打开翻译器 - 输入中文 - 复制译文 - 粘贴到聊天窗口』这种极其低效的循环中。”",
      "于是我决定动手，利用AI开发一个真正的“输入外挂”。它不是一个笨重的翻译软件，而是一个极简、提速、甚至可以离线使用的输入增强工具。"
    ],
    author: {
      name: "中本蔡",
      role: "独立开发者 / Creator of CNJP Input",
      avatarUrl: "https://images.unsplash.com/photo-1542252267-9517f03ad213?q=80&w=600&auto=format&fit=crop"
    },
    demo: {
      label: "语音交互演示",
      hint: "按住 [Win+Ctrl] 说话...",
      input: "你好，很高兴认识你",
      output: "こんにちは、はじめまして"
    }
  },

  // 功能特性
  features: {
    title: "三大核心模式",
    subtitle: "不仅是输入法，更是你的中日交流僚机。",
    items: [
      {
        title: "中文 ASR 识别模式",
        desc: "默认模式。对着麦克风说中文，极速识别并自动贴到输入框中。毫秒级响应，即使是日文或英文也能精准捕捉。",
        highlight: "速度极致",
        type: "mic"
      },
      {
        title: "日语语音对话模式",
        desc: "说中文，直接出日文。无感化交流，支持在设置中开启联网朗读，边聊天边学习地道发音。",
        highlight: "跨语对话",
        type: "message"
      },
      {
        title: "文字翻译直发模式",
        desc: "在主界面输入中文，实时预览日文翻译。按下回车，日文即刻发送，化身输入框中的全能翻译官。",
        highlight: "即输即译",
        type: "keyboard"
      }
    ]
  },

  // 技术规格
  tech: {
    title: "顶尖性能表现",
    specs: [
      {
        title: "离线 AI 翻译引擎",
        desc: "支持 nllb 智能 AI 翻译。下载约 600MB 本地模型后，无需联网即可享受私人、安全、极速的体验。",
        type: "cpu"
      },
      {
        title: "双引擎灵活切换",
        desc: "谷歌在线翻译（精准度高） vs nllb 离线翻译（速度快）。根据网络环境与需求自由切换。",
        type: "zap"
      },
      {
        title: "毫秒级贴词响应",
        desc: "深度优化内存占用与识别流水线，识别完成即刻贴入目标窗口，延迟几乎为零。",
        type: "clock"
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

  // 页脚
  footer: {
    desc: "这是我人生中第一个开发的软件，我会持续迭代，带给您更好的交流体验。",
    works: [
      {
        title: "从日本看中国",
        desc: "每小时自动抓取日媒中国相关新闻聚合网",
        url: "https://cn.saaaai.com/",
        type: "news"
      },
      {
        title: "Suno AI 音乐库",
        desc: "@nakamotosai",
        url: "https://suno.com/@nakamotosai",
        type: "music"
      },
      {
        title: "微信公众号",
        desc: "假装在东京",
        url: "#",
        type: "wechat"
      }
    ],
    contact: {
      wechat: "a16z88",
      email: "sai@saaaai.com"
    },
    status: [
      { label: "Windows v1.0", active: true },
      { label: "macOS Coming Soon", active: false }
    ],
    legal: [
      { label: "Privacy Policy", href: "#" },
      { label: "Terms of Service", href: "#" }
    ],
    copyright: "© 2025 CNJP Input. Crafted with passion by 中本蔡."
  }
};
