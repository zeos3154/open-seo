/**
 * Simplified Chinese UI strings, keyed by their English source text. Keys are
 * the exact English strings rendered by the app, so an entry missing here (or
 * a string never added to this file) falls back to English automatically.
 *
 * Only presentation copy belongs here: labels, headings, buttons, messages
 * touched by the shell/project flows. Project names, domains, keywords, API
 * payloads, enum values and market/language codes are user or API data and
 * must never be translated.
 */
export const zhCN: Record<string, string> = {
  // Sidebar navigation (src/client/navigation/items.ts)
  Dashboard: "仪表盘",
  "Keyword Research": "关键词研究",
  "Saved Keywords": "已保存关键词",
  "Rank Tracking": "排名追踪",
  "Local SEO": "本地 SEO",
  "GSC Insights": "GSC 洞察",
  "Domain Overview": "域名概览",
  Backlinks: "外链",
  "Site Audit": "网站审计",
  "Prompt Tracking": "提示词追踪",
  "Prompt Research": "提示词研究",
  "Prompt Explorer": "提示词探索",
  Reports: "报告",
  Context: "背景信息",
  "Agent setup": "智能体设置",
  Overview: "概览",
  Research: "调研",
  "AI Visibility": "AI 可见度",
  "My Site": "我的网站",
  "AI Tools": "AI 工具",
  "Help & Community": "帮助与社区",
  "Main navigation": "主导航",
  "Open account menu": "打开账户菜单",
  Organization: "组织",
  Billing: "账单",
  Theme: "主题",
  "Sign out": "退出登录",
  "Back to Every App": "返回 Every App",

  // Project switcher
  "Switch project": "切换项目",
  "Select project": "选择项目",
  "Project settings": "项目设置",
  "Find project…": "查找项目…",
  "Filter projects": "筛选项目",
  "No projects match.": "没有匹配的项目。",
  "New project": "新建项目",
  "Manage projects": "管理项目",

  // Create project modal
  Name: "名称",
  Domain: "域名",
  "(optional)": "（可选）",
  "You can connect Search Console and set up rank tracking after creating the project.":
    "创建项目后，你可以再连接 Search Console 并设置排名追踪。",
  "Adding your website starts a 50-page site audit.":
    "添加网站后将启动一次 50 页的网站审计。",
  "Adding your website starts a 50-page scan with JavaScript rendering. Rendering uses your credits.":
    "添加网站后将启动一次包含 JavaScript 渲染的 50 页扫描。渲染会消耗你的积分。",
  "Keyword, SERP, and domain data uses this country and language unless a call asks for a different one. Change it later in project settings.":
    "关键词、SERP 和域名数据默认使用此国家/地区和语言，除非调用时指定了其他值。之后可以在项目设置中修改。",
  "Keyword, SERP, and domain data uses this country and language unless a call asks for a different one.":
    "关键词、SERP 和域名数据默认使用此国家/地区和语言，除非调用时指定了其他值。",
  Cancel: "取消",
  "Create project": "创建项目",
  "Project created": "项目已创建",
  "Project name is required": "请输入项目名称",
  "Enter a valid domain, like acme.com.": "请输入有效的域名，例如 acme.com。",
  'A project named "Default" with no domain already exists. Pick a different name or add a domain.':
    "已存在一个名为“Default”且未设置域名的项目。请换一个名称，或添加一个域名。",

  // Site scan toasts (initialAuditToast.ts)
  "Website saved. The first scan could not start.":
    "网站已保存，但首次扫描未能启动。",
  "Your 50-page site scan is running": "你的 50 页网站扫描正在进行中",

  // Project general settings
  "Failed to load the project": "加载项目失败",
  "This project was not found.": "未找到该项目。",
  "Enter a project name.": "请输入项目名称。",
  "Project updated": "项目已更新",
  General: "常规",
  "Save changes": "保存更改",
  "Archive project": "归档项目",
  "Archive {name}": "归档 {name}",
  "Yes, archive project": "是，归档项目",
  "Project archived": "项目已归档",
  "Archiving removes the project from your workspace and stops its scheduled rank tracking. You can restore it later from the Projects page.":
    "归档会将项目从你的工作区移除，并停止其定时排名追踪。之后可以在“项目”页面恢复。",
  "You can't archive your only project.": "无法归档你唯一的项目。",

  // Market fields (labels only; country/language options are API data)
  Country: "国家/地区",
  Language: "语言",

  // Project pages
  Projects: "项目",
  "Project settings sections": "项目设置分区",
  Integrations: "集成",
  "Each project has its own Search Console, rank tracking, and audits.":
    "每个项目都有独立的 Search Console、排名追踪和审计。",
  "Failed to load projects": "加载项目失败",
  Current: "当前",
  "No domain set": "未设置域名",
  Archived: "已归档",
  Restore: "恢复",
  "Project restored": "项目已恢复",

  // Personal settings
  Settings: "设置",
  "Settings sections": "设置分区",
  Personal: "个人",
  Appearance: "外观",
  "Interface language": "界面语言",
  About: "关于",
  Version: "版本",

  // Theme options
  System: "跟随系统",
  Light: "浅色",
  Dark: "深色",
};
