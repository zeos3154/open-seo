// AI visibility (Prompt Tracking) UI strings: English source -> Simplified Chinese.
import { aiVisibilityDetailMessages } from "./ai-visibility-details";

export const aiVisibilityMessages: Record<string, string> = {
  ...aiVisibilityDetailMessages,
  // Page header and tabs (PromptTrackingPage / PromptTrackingTabs)
  "Prompt Tracking": "提示词追踪",
  "Track the prompts your customers use with AI. Inspect where your business is mentioned or cited.":
    "追踪客户在 AI 中使用的提示词，查看你的业务在哪里被提及或被引用。",
  "Start with the prompts that matter to your business":
    "从对你业务最重要的提示词开始",
  "Add a topic and its prompts using your saved project settings.":
    "使用已保存的项目设置添加主题及其提示词。",
  "Add prompts": "添加提示词",
  Prompts: "提示词",
  Competitors: "竞争对手",
  Citations: "引用",

  "Run now": "立即运行",
  "Run started": "运行已开始",
  "Prompt tracking saved": "提示词追踪已保存",
  "Tracking paused": "追踪已暂停",
  "Tracking schedule saved": "追踪计划已保存",
  "Tracking scheduled": "追踪计划已设置",
  "Tracking settings": "追踪设置",
  Paused: "已暂停",
  "Most recent scheduling notice: {reason}": "最近的调度提示：{reason}",
  "{schedule} tracking": "{schedule}追踪",

  // Run status (shared.tsx / RunStatusLine)
  "Could not load AI visibility. Please try again.":
    "无法加载 AI 可见度。请重试。",
  "Loading AI visibility…": "正在加载 AI 可见度…",
  Mentioned: "已提及",
  "Not mentioned": "未提及",
  Cited: "已引用",
  "Not cited": "未引用",
  Unavailable: "不可用",
  "One-off run": "单次运行",
  "First scheduled run": "首次定时运行",
  "Scheduled run": "定时运行",
  Queued: "排队中",
  Running: "运行中",
  Completed: "已完成",
  Failed: "失败",
  "{count} of {total} answers collected": "已收集 {count} / {total} 份回答",
  "{count} pending": "{count} 个排队中",
  "{count} failed": "{count} 个失败",
  "Collecting {count} of {total} answers…":
    "正在收集 {count} / {total} 份回答…",
  "Updated {time}": "更新于 {time}",
  "Next run {time}": "下次运行 {time}",
  "Use Prompt Tracking without upgrading": "不升级，直接使用提示词追踪",

  // Schedule (TrackingScheduleSummary)
  Schedule: "计划",
  Pause: "暂停",
  "Change schedule": "更改计划",
  "Schedule tracking": "设置追踪计划",

  // Prompt list (PromptList)
  "Search tracked prompts": "搜索已追踪的提示词",
  "Search prompts": "搜索提示词",
  "The export link was invalid.": "导出链接无效。",
  "Run prompts before interacting with results.":
    "请先运行提示词，再操作结果。",

  // Prompt inventory table (PromptInventory)
  "No matching prompts. Add prompts or adjust your search.":
    "没有匹配的提示词。请添加提示词或调整搜索。",
  "Prompts by topic": "按主题分组的提示词",
  Engines: "引擎",
  "Brand mentions": "品牌提及",
  "Owned citations": "自有引用",
  "Manage tracking": "管理追踪",
  "{count} prompts": "{count} 个提示词",
  " · Paused": " · 已暂停",
  "Actions for topic {name}": "主题 {name} 的操作",
  "Actions for {name}": "{name} 的操作",
  "Collecting answers": "正在收集回答",
  Active: "使用中",
  Branded: "含品牌",
  "Non-branded": "不含品牌",
  "Archive {kind}?": "归档{kind}？",
  'This stops tracking every prompt in "{name}".':
    "这将停止追踪“{name}”中的所有提示词。",
  'This stops tracking "{name}".': "这将停止追踪“{name}”。",
  "You can't view archived prompts yet. Their answer history is kept and returns if you add the same prompt again.":
    "暂时无法查看已归档的提示词。其回答历史会保留，重新添加相同提示词后即可恢复。",
  topic: "主题",
  prompt: "提示词",
  "{count} of {total} eligible answers": "{count} / {total} 份有效回答",
  "No results available": "暂无可用结果",
  "{count} of {total}": "{count} / {total}",
  "No result available": "暂无结果",
  "Answer unavailable": "回答不可用",
  Resume: "恢复",

  // Engine label wrappers
  "Google AI Overviews": "Google AI Overviews",

  // Brand summary (PromptSummary)
  "Brand comparison": "品牌对比",
  Brand: "品牌",
  You: "你",
  "{count} of {total} answers": "共 {total} 份回答中的 {count} 份",
  "No brand evidence is available for this period yet.":
    "该时间段内暂无品牌出现记录。",
  "Show {count} more": "显示另外 {count} 个",

  // Trend (VisibilityTrend / VisibilityTrendChart)
  "Visibility over time": "可见度随时间的变化",
  "7d": "7 天",
  "28d": "28 天",
  "All engines": "所有引擎",
  "Fewer than 90% of planned answers were collected in one period, so no change is shown. Failed collections never count as lost visibility.":
    "某个周期内成功收集的回答不到计划的 90%，因此不显示变化。收集失败永远不会算作可见度下降。",
  "No prompt and engine has answers for the same market and brand in both periods. The tracked scope changed, so the periods cannot be compared.":
    "两个周期内没有针对同一市场和品牌的回答记录。追踪范围发生了变化，因此无法比较。",
  "Collecting answers. Visibility appears here when the run finishes.":
    "正在收集回答。运行结束后此处会显示可见度。",
  "There are no finished runs in the last {days} days.":
    "最近 {days} 天内没有已完成的运行。",
  "Owned citation": "自有引用",
  "Brand mentioned": "品牌被提及",
  "Daily brand mention and owned citation rate": "每日品牌提及率和自有引用率",

  // Engine filter
  "{count} engines": "{count} 个引擎",
  "No engines": "没有引擎",
  "Filter sources by engine": "按引擎筛选来源",
  "Filter engine": "筛选引擎",

  // Date range (PromptDateRange)
  "Last 7 days": "最近 7 天",
  "Last 28 days": "最近 28 天",
  "Last 90 days": "最近 90 天",
  "All available history": "全部可用历史",
  "Custom range": "自定义范围",
  "Analysis date range": "分析时间范围",
  "Period start date": "周期开始日期",
  "Period end date": "周期结束日期",
  to: "至",
  "Choose a start date on or before the end date.":
    "开始日期不能晚于结束日期。",
  "Show all available history": "显示全部可用历史",

  // Executions (PromptExecutions)
  Executions: "运行记录",
  "{count} in this period": "该周期内 {count} 条",
  Date: "日期",
  Engine: "引擎",

  Analysis: "分析",

  // Answers (PromptAnswers / AnswerContent)
  "Selected execution answer": "所选运行的回答",
  Answer: "回答",
  "An answer is not available for this collection yet.":
    "本次采集还没有可用的回答。",
  "This collection is excluded from visibility rates.":
    "本次采集不计入可见度统计。",
  "Google showed no AI Overview for this search.":
    "Google 在这次搜索中没有展示 AI Overview。",
  "No substantive answer was returned.": "没有返回实质性回答。",
  "This response was truncated. The retained evidence may be incomplete.":
    "该响应被截断。保留的证据可能不完整。",
  "Answer view": "回答视图",
  "AI answer": "AI 回答",
  "Answer evidence": "回答证据",
  "No answer was captured. Status: {status}. This is not a negative brand result.":
    "未捕获到回答。状态：{status}。这并不是负面的品牌结果。",
  "In progress": "进行中",
  "No AI Overview shown": "未展示 AI Overview",
  "No substantive answer": "无实质性回答",

  // Citations tab (CitationsTab)
  Pages: "页面",
  Domains: "域名",
  "All ownership": "全部归属",
  "Your domains": "你的域名",
  "Competitor domains": "竞争对手的域名",
  "Third-party domains": "第三方域名",
  "Filter source ownership": "筛选来源归属",
  "prompt tracking": "提示词追踪",
  "to see which pages AI answers cite.": "，以查看 AI 回答引用了哪些页面。",
  "Collecting answers. Cited pages appear here as answers arrive.":
    "正在收集回答。回答到达后，被引用的页面会显示在这里。",
  "No citations match these filters.": "没有符合筛选条件的引用。",
  "First page": "第一页",
  "Next page": "下一页",
  Domain: "域名",
  "Cited page": "被引用页面",
  Ownership: "归属",
  Answers: "回答数",
  "Your domain": "你的域名",
  Competitor: "竞争对手",
  "Third party": "第三方",
  "Show prompts that cited {name}": "显示引用了 {name} 的提示词",

  // Competitors tab (CompetitorsTab)
  "Manage competitors": "管理竞争对手",
  "Collecting answers. Brands appear here as answers arrive.":
    "正在收集回答。回答到达后，品牌会显示在这里。",
  "No answers match these filters.": "没有符合筛选条件的回答。",
  "Mentioned in": "被提及于",
  "Cited in": "被引用于",
  "Avg. position": "平均位置",
  "No competitors saved yet. Use Manage competitors to add them.":
    "尚未保存竞争对手。请使用“管理竞争对手”添加。",
  "to see how often AI answers mention and cite your competitors.":
    "，以查看 AI 回答提及和引用你竞争对手的频率。",
  "No answers": "暂无回答",

  // Suggested competitors (SuggestedCompetitors)
  "Suggested competitors": "建议的竞争对手",
  "Other sites AI answers cite most for your prompts.":
    "AI 回答针对你的提示词最常引用的其他网站。",
  "cited in {count} answers": "在 {count} 份回答中被引用",

  // OpenRouter gate (OpenRouterKeyGate)
  "Add an OpenRouter API key": "添加 OpenRouter API 密钥",
  "Could not check the OpenRouter API key.": "无法检查 OpenRouter API 密钥。",
  "AI visibility uses OpenRouter to research your brand and suggest the prompts worth tracking, so you don't have to write them yourself. The tracking results, what ChatGPT and other AI engines actually answer, come from your DataForSEO account.":
    "AI 可见度使用 OpenRouter 研究你的品牌并推荐值得追踪的提示词，无需手动编写。追踪结果（ChatGPT 等其他 AI 引擎的实际回答）来自你的 DataForSEO 账户。",
  "Create a key on OpenRouter, set it as OPENROUTER_API_KEY (in code formatting), restart OpenSEO, then confirm here.":
    "在 OpenRouter 上创建密钥，设置为 OPENROUTER_API_KEY（代码格式），重启 OpenSEO，然后在此确认。",
  "OpenRouter API key setup guide": "OpenRouter API 密钥配置指南",
  "has the steps for each deployment.": "包含各种部署方式的操作步骤。",
  "Confirm API Key": "确认 API 密钥",
  "Open OpenRouter Keys": "打开 OpenRouter 密钥",

  // Setup gate (AiResearchSetupGate)
  "You can leave this page; setup keeps running.":
    "你可以离开此页面，设置会继续运行。",
  "Set up AI visibility": "设置 AI 可见度",
  "We’ll research your brand and find the most relevant topics to monitor.":
    "我们会研究你的品牌，并找到最值得监测的相关主题。",
  "We couldn’t set up AI visibility": "无法完成 AI 可见度设置",
  "We couldn’t read this website. Its bot protection may be blocking us. Describe your business below and try again, or check the URL in project settings.":
    "我们无法读取该网站。其反爬虫保护可能阻止了我们。请在下方描述你的业务后重试，或在项目设置中检查 URL。",
  "We couldn’t finish setting up AI visibility. Try again.":
    "无法完成 AI 可见度设置。请重试。",
  "What you sell, who buys it, and where": "你销售什么、谁在购买、在哪里经营",
  "We couldn’t save your description. Try again.": "无法保存你的描述。请重试。",
  "Start research": "开始调研",
  "Research and a first run of your prompts use the DataForSEO and OpenRouter keys on your Every App gateway.":
    "调研和首次提示词运行使用 Every App 网关上的 DataForSEO 与 OpenRouter 密钥。",
  "Research and a first run of your prompts use a small amount of usage credits.":
    "调研和首次提示词运行会消耗少量用量积分。",
  "We couldn’t finish setting up AI visibility. It needs DataForSEO and OpenRouter on your Every App gateway: if they aren’t set up yet, an owner or admin runs pnpm everyapp secret set DATAFORSEO_API_KEY OPENROUTER_API_KEY. Then try again.":
    "无法完成 AI 可见度设置。需要在 Every App 网关上配置 DataForSEO 和 OpenRouter：如果尚未配置，请由所有者或管理员运行 pnpm everyapp secret set DATAFORSEO_API_KEY OPENROUTER_API_KEY，然后重试。",
  "Research and setup unavailable": "调研与设置不可用",

  // Tracker editor (TrackerEditor)
  "Close setup": "关闭设置",
  "Brand details and competitors come from": "品牌详情和竞争对手来自",
  "project context": "项目背景信息",
  "An administrator needs to configure the DataForSEO API key before we can collect data.":
    "管理员需要先配置 DataForSEO API 密钥，我们才能收集数据。",
  "Manage the active AI engines and country in":
    "在使用中的 AI 引擎和国家/地区于",
  "Review prompts": "审阅提示词",
  "Review changes": "审阅更改",
  "About: engines": "关于：引擎",
  "About: api responses": "关于：API 回答",
  "About: scraped responses": "关于：抓取的回答",

  // Tracking fields (TrackerTrackingFields)
  "Scraped responses": "抓取的回答",
  "Answers as users see them in each AI app.":
    "用户在各 AI 应用中看到的原始回答。",
  "API responses": "API 回答",
  "Answers from each model's API, with web search.":
    "来自各模型 API 的回答，带网页搜索。",
  "{engine} can't collect answers in {country}.":
    "{engine} 无法在 {country} 收集回答。",

  // Prompt fields (TrackerPromptFields)
  "Added {count} prompts": "已添加 {count} 个提示词",
  "Every prompt in this topic is paused. Prompts you add here will still run.":
    "该主题中的所有提示词都已暂停。在此添加的提示词仍会运行。",
  "Prompts to track": "要追踪的提示词",
  "Generating…": "正在生成…",
  Generate: "生成",
  "Prompt {index}": "提示词 {index}",
  "Add prompt": "添加提示词",

  // Setup review (TrackerSetupReview)
  "Review your changes before saving.": "保存前请先审阅更改。",
  "These settings apply to your enabled schedule.":
    "这些设置会应用到已启用的计划。",
  "Tracking runs weekly. The first check is a week from now; use Run now for results sooner.":
    "追踪将每周运行。首次检查在一年之内的下一周进行；想更快看到结果可使用“立即运行”。",
  "Track weekly to collect fresh answers once a week. A tracker that has never run on a schedule also runs its first check now.":
    "每周追踪一次以收集新回答。从未按计划运行过的追踪器也会立即进行首次检查。",
  "New prompts": "新提示词",
  Market: "市场",
  "Prompts to add": "要添加的提示词",
  "Each run collects {count} {unit} for {cost}":
    "每次运行收集 {count} 条{unit}，费用 {cost}",
  answer: "份回答",
  answers: "份回答",
  "estimated per month if it runs {interval}":
    "按 {interval} 运行时每月预计费用",

  "Back to editing": "返回编辑",
  "Save reviewed changes": "保存已审阅的更改",
  "Save and track weekly": "保存并每周追踪",
  "Save as paused": "保存为暂停",

  // Cost review (TrackingCostReview)
  "Change tracking schedule": "更改追踪计划",
  "Save schedule": "保存计划",
  "Start tracking": "开始追踪",
  "Cost per run": "每次运行费用",
  Cost: "费用",
  "about {cost} a month ({count} runs)": "每月约 {cost}（{count} 次运行）",
  "live answers, ready in a few minutes": "实时回答，几分钟内就绪",

  // Patch review / Prompt editor (TrackerPatchReview)
  "Review tracking change": "审阅追踪更改",
  "Close review": "关闭审阅",
  "Save change": "保存更改",
  "Edit prompt": "编辑提示词",
  "Close prompt editor": "关闭提示词编辑器",
  "Exact prompt": "提示词原文",

  // Prompt research (PromptResearchPage / PromptResearchKeyword / Table)
  "Prompt Research": "提示词研究",
  "Find the questions people ask AI about your market, and the sites the answers cite.":
    "查找人们向 AI 提出的关于你所在市场的问题，以及回答引用的网站。",
  "Relevant keywords": "相关关键词",
  "Prompt research starts with a tracker": "提示词研究需要一个追踪器",
  "Set up prompt tracking to research prompts for your topics.":
    "设置提示词追踪，以研究你主题的相关提示词。",
  "Set up prompt tracking": "设置提示词追踪",
  "Select a keyword to see the prompts people ask AI about it.":
    "选择一个关键词，查看人们向 AI 提出的相关提示词。",
  "Add topics to your tracker, or search a keyword above.":
    "在追踪器中添加主题，或在上方搜索关键词。",
  Open: "打开",
  "Enter a keyword": "输入关键词",
  "Enter a keyword.": "请输入关键词。",
  "About $0.25 in credits per keyword.": "每个关键词约消耗 0.25 美元积分。",
  "Track prompts": "追踪提示词",
  "No prompts found for \u201c{keyword}\u201d":
    "未找到与“{keyword}”相关的提示词",
  "Try a shorter, broader term.": "请尝试更短、更宽泛的词条。",
  "Prompts about \u201c{keyword}\u201d": "关于“{keyword}”的提示词",
  Tracked: "已追踪",
  Sources: "来源",
  "No sources": "无来源",
  Details: "详情",
  "Show sources for {prompt}": "显示 {prompt} 的来源",
  "Select {prompt}": "选择 {prompt}",
  "Your brand is mentioned": "你的品牌被提及",
  "Your brand is not mentioned": "你的品牌未被提及",
  "The AI answered from memory and cited no sources.":
    "AI 凭记忆作答，未引用任何来源。",

  // Prompt history page (PromptHistoryPage)
  "All tracked prompts": "全部已追踪提示词",
  "Prompt analysis": "提示词分析",

  // Add-at-least-one validation (TrackerEditor)
  "Add at least one prompt.": "请至少添加一个提示词。",
  "Add topic": "添加主题",

  // Occasional one-word keys
  Rename: "重命名",
  "Rename topic": "重命名主题",
  "Topic name": "主题名称",
  Topic: "主题",
  "New topic": "新主题",
  "e.g. SEO tools": "例如：SEO 工具",

  Save: "保存",
};
