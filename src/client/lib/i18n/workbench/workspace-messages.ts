/**
 * Self-host workspace surfaces owned by this slice: settings pages, reports
 * management, project context, Agent setup pages, app-shell banners and the
 * root redirect. Copied agent commands, MCP URLs and skill names stay
 * byte-equivalent.
 */
export const workspaceMessages: Record<string, string> = {
  // App shell
  "Toggle sidebar": "切换侧边栏",
  "DataForSEO isn't set up on your Every App gateway yet. An owner or admin sets it with":
    "你的 Every App 网关尚未配置 DataForSEO。所有者或管理员可以使用以下命令设置：",
  ". Steps on the": "。具体步骤见",
  "help page": "帮助页面",
  "Setup needed: add your DataForSEO API key to use OpenSEO features. See the quick steps on the":
    "需要完成设置：添加你的 DataForSEO API 密钥才能使用 OpenSEO 功能。快速步骤见",
  "We could not verify your DataForSEO setup. If features are not working, check the setup steps on the":
    "无法验证你的 DataForSEO 设置。如果功能无法使用，请查看",
  "A new OpenSEO Docker setup starts in seconds and supports accounts. This image keeps getting updates, and moving keeps your data.":
    "新的 OpenSEO Docker 设置几秒即可启动并支持账号。此镜像会持续更新，迁移可以保留你的数据。",
  "How to move": "如何迁移",
  "DataForSEO isn't set up yet": "DataForSEO 尚未设置",
  "One quick setup step": "只需一步快速设置",
  "Keyword, domain, backlink and rank data comes from DataForSEO through your Every App gateway. An owner or admin sets it once for every app with":
    "关键词、域名、外链和排名数据通过你的 Every App 网关来自 DataForSEO。所有者或管理员只需用以下命令为每个应用设置一次：",
  "; the setup guide has the steps.": " ；设置指南中有具体步骤。",
  "Add your DataForSEO API key to start using OpenSEO.":
    "添加你的 DataForSEO API 密钥即可开始使用 OpenSEO。",

  // Root redirect
  "Redirecting you to billing so you can start a hosted subscription.":
    "正在跳转到账单页面，以便你开通托管订阅。",

  // Agent setup
  "Paste this prompt into your agent to automatically configure OpenSEO for you.":
    "把这段提示词粘贴到你的智能体中，即可自动完成 OpenSEO 配置。",
  "OpenSEO plugin": "OpenSEO 插件",
  "MCP connection + SEO skills": "MCP 连接 + SEO 技能",
  "Copy setup prompt": "复制设置提示词",
  "Setup prompt copied": "设置提示词已复制",
  "Manual setup": "手动设置",
  "Set up your agent": "设置你的智能体",
  Skills: "技能",
  Connected: "已连接",
  "Paste it into your agent and approve the connection.":
    "把它粘贴到你的智能体中并批准连接。",
  "Go to dashboard": "前往仪表盘",
  "The most powerful way to use OpenSEO is through the AI agent you already use. Set it up once, then ask it anything.":
    "使用 OpenSEO 最强大的方式，是通过你已经在用的 AI 智能体。只需设置一次，之后什么都可以问它。",
  "Paste the setup prompt into your agent to connect OpenSEO and install its SEO skills. It will guide you through any manual steps.":
    "把设置提示词粘贴到你的智能体中，即可连接 OpenSEO 并安装其 SEO 技能。它会引导你完成所有手动步骤。",
  "Setup instructions": "设置说明",
  "Once connected, ask your agent to use": "连接完成后，可以让你的智能体使用",
  "to help you choose what to do next.": "来帮你决定下一步做什么。",
  "Update your skills": "更新你的技能",
  "Already connected? Paste the update prompt into your agent to get the latest OpenSEO skills while preserving your connection settings and personal edits.":
    "已经连接了？把更新提示词粘贴到你的智能体中，即可获取最新的 OpenSEO 技能，同时保留连接设置和个人修改。",
  "Copy update prompt": "复制更新提示词",
  "Update prompt copied": "更新提示词已复制",
  "Update instructions": "更新说明",
  "This instance is behind Cloudflare Access. MCP clients cannot connect until Managed OAuth is enabled on your Access application.":
    "此实例位于 Cloudflare Access 之后。在你的 Access 应用启用 Managed OAuth 之前，MCP 客户端无法连接。",
  "MCP server URL for this instance: ": "此实例的 MCP 服务器 URL：",
  "MCP URL copied": "MCP URL 已复制",
  "Install them with npx skills add every-app/open-seo.":
    "使用 npx skills add every-app/open-seo 安装这些技能。",
  "The setup prompt installs these.": "设置提示词会安装这些技能。",
  "Run one by name when you want a full report instead of a quick answer.":
    "想要完整报告而不是快速回答时，按名称运行其中一项。",
  "or any MCP client": "或任何 MCP 客户端",
  "Install the SEO skills": "安装 SEO 技能",
  "Run this in a terminal to add OpenSEO's skills to your agent. They use OpenSEO through your Every App connection.":
    "在终端中运行此命令，把 OpenSEO 的技能添加到你的智能体。它们通过你的 Every App 连接使用 OpenSEO。",
  "Command copied": "命令已复制",

  // Skill blurbs (skill names stay English)
  "Explains where you stand and picks your next step.":
    "说明你目前的处境，并选出你的下一步。",
  "Saves your goals, competitors, and key pages as shared context.":
    "把你的目标、竞争对手和关键页面保存为共享背景信息。",
  "One-page site audit built around a single do-this-week action.":
    "一页式网站审计，围绕一个“本周就做”的行动展开。",
  "Finds the few changes most likely to get you cited in AI answers.":
    "找出最可能让你在 AI 回答中被引用的少数改动。",
  "Finds what people ask ChatGPT about your market and who gets cited.":
    "发现人们在 ChatGPT 中关于你所在市场的问题，以及谁被引用。",
  "Finds keyword opportunities from a few seed topics.":
    "从几个种子主题中发现关键词机会。",
  "Groups keywords by intent and maps them to pages.":
    "按搜索意图分组关键词，并映射到页面。",
  "Maps who wins in your market and why.": "梳理你的市场中谁在赢，以及为什么。",
  "Studies one competitor's keywords, content, and backlinks.":
    "研究一个竞争对手的关键词、内容和外链。",
  "Finds link prospects and drafts outreach.":
    "寻找外链 prospect 并起草外联内容。",
  "Audits a Google Business Profile and Maps visibility.":
    "审计 Google 商家资料与地图可见度。",
  "Saves any of the above as a report on your Reports page.":
    "把以上任意结果保存为“报告”页面中的报告。",

  // Settings: MCP connections / API keys / privacy
  "Connected agents": "已连接的智能体",
  "AI clients signed in to OpenSEO with OAuth.":
    "通过 OAuth 登录 OpenSEO 的 AI 客户端。",
  "We couldn't load your connected agents.": "无法加载你已连接的智能体。",
  "No agents connected yet.": "还没有连接任何智能体。",
  Client: "客户端",
  Organization: "组织",
  "Actions for {name}": "{name} 的操作",
  Disconnect: "断开连接",
  "Agent disconnected": "智能体已断开连接",
  "Disconnect “{name}”?": "断开“{name}”的连接？",
  "It will have to sign in to OpenSEO again.": "它将需要重新登录 OpenSEO。",
  "API keys": "API 密钥",
  "Authenticate MCP clients when OAuth doesn't work":
    "在 OAuth 不可用时为 MCP 客户端做身份验证",
  "Use this for remote agents like Hermes where the normal login flow doesn't work.":
    "适用于 Hermes 等远程智能体——普通的登录流程对它们无效。",
  "Create API key": "创建 API 密钥",
  "We couldn't load your API keys.": "无法加载你的 API 密钥。",
  "No API keys yet.": "还没有 API 密钥。",
  Key: "密钥",
  Created: "创建时间",
  "Last used": "最近使用",
  "Unnamed key": "未命名的密钥",
  Never: "从未使用",
  "Revoke key": "吊销密钥",
  "API key revoked": "API 密钥已吊销",
  "Failed to load API keys": "加载 API 密钥失败",
  "Failed to create the key": "创建密钥失败",
  "Failed to revoke the key": "吊销密钥失败",
  "Revoke “{name}”?": "吊销“{name}”？",
  "Clients using it will stop working.": "使用该密钥的客户端将无法继续工作。",
  "Copy your new API key": "复制你的新 API 密钥",
  "It won't be shown again. Send it as": "它不会再次显示。以",
  "to {url}": "发送至 {url}",
  "API key copied": "API 密钥已复制",
  "Copy API key": "复制 API 密钥",
  Done: "完成",
  Create: "创建",
  "Name is required": "请输入名称",
  "This key works in {org}.": "此密钥在 {org} 中有效。",
  "Privacy and emails": "隐私与邮件",
  "Usage analytics": "使用情况分析",
  "Share usage analytics and session replays to help improve OpenSEO.":
    "分享使用情况分析和会话回放，帮助改进 OpenSEO。",
  "Share usage analytics": "分享使用情况分析",
  "Product updates": "产品更新",
  "Occasional emails about new features and tips. Unsubscribe anytime.":
    "偶尔发送关于新功能和使用技巧的邮件。随时可以退订。",
  "Get product update emails": "接收产品更新邮件",
  "We couldn't save your email choice.": "无法保存你的邮件偏好。",

  // Reports
  "No reports yet": "还没有报告",
  "Run an OpenSEO skill such as seo-audit from Claude Code or Codex and the report will appear here.":
    "在 Claude Code 或 Codex 中运行 seo-audit 等 OpenSEO 技能，报告就会出现在这里。",
  "Created by": "创建者",
  Type: "类型",
  Updated: "更新时间",
  "Showing the {count} most recent reports.": "仅显示最近 {count} 份报告。",
  "Report deleted": "报告已删除",
  "Failed to load reports": "加载报告失败",
  "HTML reports your agents saved to this project.":
    "你的智能体保存到此项目的 HTML 报告。",
  Templates: "模板",
  "Report templates": "报告模板",
  "Reusable briefs your agents follow when they write a report: who it is for, which sections it has, and how it should sound.":
    "你的智能体撰写报告时遵循的可复用大纲：写给谁看、包含哪些部分、以怎样的语气。",
  "Failed to load templates": "加载模板失败",
  "No templates yet": "还没有模板",
  "A template is a reusable brief for a kind of report: who it is for, which sections it has, how it sounds.":
    "模板是某一类报告的可复用大纲：写给谁看、包含哪些部分、以怎样的语气。",
  Description: "描述",
  Edit: "编辑",
  "New template": "新建模板",
  "Edit template": "编辑模板",
  "Template created": "模板已创建",
  "Template saved": "模板已保存",
  "Template deleted": "模板已删除",
  "Delete template": "删除模板",
  "Delete “{name}”?": "删除“{name}”？",
  "Reports already written from it are not affected.":
    "已经用它写好的报告不受影响。",
  "Give the template a name.": "请给模板起一个名称。",
  "Say in one line when to use this template.": "请用一行说明何时使用此模板。",
  "Say who the report is for and which sections it has.":
    "请说明报告的读者以及它包含哪些部分。",
  Instructions: "指令",
  "One line saying when to use it. This is what an agent reads to decide.":
    "用一行说明何时使用它。智能体会根据这句话来判断。",
  "Brand voice for the whole project lives in Context › Writing preferences.":
    "整个项目的品牌语气存放在“背景信息 › 写作偏好”中。",
  "Create template": "创建模板",
  "Report not found": "未找到报告",
  "This report does not exist or you do not have access to it.":
    "该报告不存在，或者你没有访问权限。",
  "Couldn't load the report": "无法加载报告",
  "Failed to load the report": "加载报告失败",
  "Report actions": "报告操作",
  "Full screen": "全屏",
  "Open in new tab": "在新标签页打开",
  Exit: "退出",
  Share: "分享",
  "Public link": "公开链接",
  "Anyone with the link can view. No sign-in needed.":
    "任何持有链接的人都可以查看，无需登录。",
  "Only members of your organization can open it. A link that was open can keep loading for up to a minute.":
    "只有你组织的成员可以打开。之前公开过的链接可能还会继续加载一分钟。",
  "Share link": "分享链接",
  "Open link": "打开链接",
  Open: "打开",
  "Copy link": "复制链接",
  "Link copied": "链接已复制",
  "Clipboard not available": "剪贴板不可用",
  "Shows the latest saved version. Hidden from search engines.":
    "显示最近保存的版本。对搜索引擎隐藏。",
  "Link created {time}": "链接创建于 {time}",
  "Failed to update sharing": "更新分享状态失败",
  "Delete report": "删除报告",
  "This cannot be undone.": "此操作无法撤销。",

  // Project context
  "What Claude Code and any other connected MCP client know about this project. They read it before they work and write back what they learn, so correct anything that looks wrong.":
    "Claude Code 和其他已连接的 MCP 客户端对该项目的了解。它们工作前会先阅读这些内容，并把学到的东西写回来，所以发现不对的地方请随时修正。",
  "Business overview": "业务概览",
  "Current goal": "当前目标",
  Positioning: "市场定位",
  "Writing preferences": "写作偏好",
  "What you sell, who buys it, and where.": "你卖什么、谁在买、在哪里。",
  "What you're pushing for right now, and by when.":
    "你现在在争取什么，以及要在什么时候达成。",
  "Why someone picks you over the alternatives.":
    "别人为什么选你而不是其他选择。",
  "Voice, words to avoid, topics that are off-limits.":
    "语气、要避免的用词、不能碰的话题。",
  "e.g. Booking software for independent restaurants in the US and Canada. Buyers are owner-operators, not marketers.":
    "例如：面向美国和加拿大独立餐厅的预订软件。买家是店主本人，而不是营销人员。",
  "e.g. Double organic signups by Q4. Comparison pages are the current bet.":
    "例如：在第四季度前让自然注册量翻倍。当前押注对比页面。",
  "e.g. The only booking tool that sets up in an afternoon. Cheaper than the incumbents, simpler than the DIY stack.":
    "例如：唯一一个一个下午就能部署完成的预订工具。比现有厂商便宜，比 DIY 方案简单。",
  "e.g. Plain and direct, no hype. Never say 'seamless' or 'game-changing'. Don't write about competitor pricing.":
    "例如：平实直接，不夸张。绝不说“无缝”或“颠覆性”。不写竞争对手的价格。",
  Empty: "空",
  "Nothing written down yet": "还没有写下任何内容",
  "Fill in what you can — or ask your agent to draft it from your site and confirm what it got right.":
    "先填上你知道的——或者让智能体根据你的网站起草，再确认它写得对不对。",
  "Custom sections": "自定义部分",
  "Anything an agent wrote down that didn't fit the sections above.":
    "智能体记录下的、不适合放在上面各部分的内容。",
  "Nothing here yet": "这里还没有内容",
  "Agents add a section when they learn something important that has nowhere else to live.":
    "当智能体学到重要信息而又无处安放时，会在这里添加一个部分。",
  "Section title": "部分标题",
  "Section content": "部分内容",
  "Research log": "调研日志",
  "What's already been looked up, so nobody buys the same data twice.":
    "已经查过的数据，避免有人重复购买同样的数据。",
  "Nothing logged yet": "还没有记录",
  "Agents record paid research here as they run it.":
    "智能体会在运行付费调研时在这里记录。",
  "Delete log entry from {date}": "删除 {date} 的日志条目",
  "Project context updated": "项目背景信息已更新",
  Competitors: "竞争对手",
  "The sites you measure yourself against.": "你用来对照自身表现的网站。",
  "Add competitor": "添加竞争对手",
  "No competitors yet": "还没有竞争对手",
  "Add the sites you compete with, or ask your agent to find them from your rankings and save them here.":
    "添加与你竞争的网站，或让智能体从你的排名中发现它们并保存在这里。",
  "Name (optional)": "名称（可选）",
  "Competitor domain": "竞争对手域名",
  "Competitor name": "竞争对手名称",
  "Competitor notes": "竞争对手备注",
  "Why they matter — e.g. wins every comparison keyword (optional)":
    "为什么重要——例如：赢得了所有对比类关键词（可选）",
  "Key pages": "关键页面",
  "A shortlist of the pages that carry the site — not an inventory.":
    "支撑整个网站的少数核心页面清单——不是全量清单。",
  "Add page": "添加页面",
  "No key pages yet": "还没有关键页面",
  "Add the handful that has to rank, or let an agent propose them from your last site audit.":
    "添加那几个必须参与排名的页面，或让智能体根据上次网站审计提出建议。",
  "Page URL": "页面 URL",
  "Page role": "页面角色",
  "Target topic (optional)": "目标主题（可选）",
  "Notes (optional)": "备注（可选）",
  "Page notes": "页面备注",
  "Hub page": "聚合页",
  "Supporting page": "支撑页",
  "Money page": "转化页",
  Other: "其他",
  "Target: {topic}": "目标主题：{topic}",
  "Updated by {who} · {time}": "由 {who} 更新 · {time}",
  "Added by {who}": "由 {who} 添加",
  you: "你",
  "your AI client": "你的 AI 客户端",

  // GSC re-engagement modal
  "Maybe later": "稍后再说",
  "Connect with Google": "用 Google 连接",
  "Connect Google Search Console": "连接 Google Search Console",

  // Routes
  Reports: "报告",
  "Agent setup": "智能体设置",
  "MCP server URL for this instance:": "此实例的 MCP 服务器 URL：",
};
