// Brand Lookup + Prompt Explorer (src/client/features/ai-search/**).
// Keys are the exact English source text rendered by the app. Raw brand /
// domain / prompt / answer / citation / page-title data and export headers
// stay untranslated; platform and model names stay branded.

export const aiSearchMessages: Record<string, string> = {
  // Pages
  "Brand Lookup": "品牌查询",
  "See how AI search cites any brand name or domain.":
    "查看 AI 搜索如何引用任意品牌名称或域名。",
  "Prompt Explorer": "提示词探索",
  "Ask any prompt across ChatGPT, Claude, Gemini, and Perplexity side-by-side.":
    "在 ChatGPT、Claude、Gemini 和 Perplexity 上并排运行任意提示词。",

  // Paid-plan gate
  "See how ChatGPT and Google AI Overview cite any brand or domain — total mentions, sample prompts where it appears, and the pages cited alongside it.":
    "查看 ChatGPT 和 Google AI Overview 如何引用任意品牌或域名——总提及数、出现它的示例提示词，以及一同被引用的页面。",
  "Track AI visibility": "追踪 AI 可见度",
  "See estimated counts for ChatGPT and Google AI Overview answers that cite your brand, and watch the trend month over month.":
    "查看引用你品牌的 ChatGPT 和 Google AI Overview 回答的估算数量，并逐月观察趋势。",
  "See the prompts": "查看提示词",
  "View sample user questions where LLMs reference your brand or domain.":
    "查看 LLM 提及你的品牌或域名的示例用户问题。",
  "Map the competition": "摸清竞争格局",
  "Spot the pages LLMs cite alongside you so you know who's competing for attention in AI answers.":
    "找出 LLM 与你一同引用的页面，了解谁在 AI 回答中与你争夺注意力。",
  "Four models side-by-side": "四个模型并排对比",
  "Run one prompt across ChatGPT, Claude, Gemini, and Perplexity and compare answers in a single view.":
    "在 ChatGPT、Claude、Gemini 和 Perplexity 上运行同一提示词，并在单一视图中比较回答。",
  "See what the models cite": "查看模型引用了什么",
  "Every answer lists the sources it drew from, so you can audit where each model gets its information.":
    "每个回答都会列出其引用的来源，便于你审查各模型的信息来源。",
  "Check brand mentions": "检查品牌提及",
  "Highlight a brand to instantly see whether it shows up in the answer text or the cited sources.":
    "高亮一个品牌，即可立即查看它是否出现在回答正文或引用来源中。",
  "Ask one prompt across ChatGPT, Claude, Gemini, and Perplexity at the same time and compare their answers: including which sources each model cites.":
    "同时在 ChatGPT、Claude、Gemini 和 Perplexity 上运行同一提示词并比较它们的回答：包括各模型引用了哪些来源。",

  // Validation and error copy
  "Enter a brand name or domain": "请输入品牌名称或域名",
  "Keep it under {max} characters": "请控制在 {max} 个字符以内",
  "Keep each competitor under {max} characters":
    "每个竞争对手请控制在 {max} 个字符以内",
  '"{competitor}" matches the brand you\'re looking up — remove it from competitors':
    "“{competitor}”与你要查询的品牌一致——请将其从竞争对手中移除",
  "Scopes apply to domain lookups": "范围仅适用于域名查询",
  "Failed to load brand lookup": "加载品牌查询失败",
  "{message} Showing earlier results.": "{message}，当前显示之前的查询结果。",
  "Enter a prompt": "请输入提示词",
  "Keep prompts under {max} characters": "提示词请控制在 {max} 个字符以内",
  "Keep the brand under {max} characters": "品牌名称请控制在 {max} 个字符以内",
  "Select at least one model": "请至少选择一个模型",
  "Failed to load prompt results": "加载提示词结果失败",

  // Brand Lookup search card
  "Brand name or domain": "品牌名称或域名",
  "Add competitors (comma-separated)": "添加竞争对手（以逗号分隔）",
  Competitors: "竞争对手",
  "vs {list}": "对垒 {list}",
  and: "与",
  "Add up to 5 competitor brands or domains to see your Share of Voice.":
    "最多添加 5 个竞争对手品牌或域名，以查看你的声量份额。",
  "Est. {cost}": "预计 {cost}",
  "plus ~{cost} to compare competitors": "另需约 {cost} 用于对比竞争对手",

  // Recent searches
  "Search a brand name or domain to see how AI cites it":
    "搜索品牌名称或域名，查看 AI 如何引用它",
  "Enter a prompt to compare model answers": "输入提示词以比较各模型的回答",

  // Brand Lookup results
  "AI search providers report mentions per domain, not per page. This number covers the whole domain — the cited pages below are limited to your scope.":
    "AI 搜索提供方按域名（而非页面）统计提及。此数字覆盖整个域名——下方引用页面仅限你的查询范围。",
  "AI mention data is temporarily unavailable for": "AI 提及数据暂时不可用：",
  ". Please try again shortly.": "。请稍后重试。",
  "No AI mentions found for": "未找到 AI 提及：",
  Note: "注意：",
  "was unavailable — some mentions may be missing.":
    "不可用——部分提及可能缺失。",
  "were unavailable — some mentions may be missing.":
    "不可用——部分提及可能缺失。",
  Platform: "平台",
  Mentions: "提及",
  "AI search volume": "AI 搜索量",
  Total: "合计",
  "AI answers that mention your brand or cite your website.":
    "提及你的品牌或引用你网站的 AI 回答。",
  "Estimated monthly searches for prompts where your brand appears in AI answers.":
    "你的品牌出现在 AI 回答中的提示词的预估月搜索量。",
  "ChatGPT data covers US English only.": "ChatGPT 数据仅覆盖美式英语。",
  Unavailable: "不可用",
  "Mention trend (last 12 months)": "提及趋势（近 12 个月）",
  "More info": "更多信息",
  "Domain-level": "域名级",
  You: "你",
  "just now": "刚刚",
  "{count}m ago": "{count} 分钟前",
  "{count}h ago": "{count} 小时前",
  "{count}d ago": "{count} 天前",

  // Share of Voice
  "Share of Voice": "声量份额",
  "Share of Voice compares whole domains — it is not narrowed to the page or folder you searched.":
    "声量份额比较的是整个域名——不会缩小到你查询的页面或目录。",
  "· no comparable data": "· 无可对比数据",
  "Share of mentions on {platforms}": "以下平台的提及占比：{platforms}",
  "{label} share of the leader": "{label} 相对于领先者的份额",

  // Citation tabs
  Queries: "查询词",
  Query: "查询词",
  "Cited sources": "引用来源",
  "Cited sources ({count})": "引用来源（{count}）",
  "Cited pages within": "引用页面位于",
  "Pages cited alongside": "与以下目标一同被引用的页面：",
  "in AI answers.": "（AI 回答）。",
  "Prompt examples come from the fetched sample.":
    "提示词示例来自已抓取的样本。",
  "Fetched sample of prompts whose AI answer cited":
    "已抓取的提示词样本，其 AI 回答引用了",
  "a page within": "以下范围中的某个页面：",
  "in its text or sources.": "（出现在其正文或来源中）。",
  "None of this domain's top cited pages fall under {target}.":
    "该域名被引用最多的页面均不在 {target} 范围内。",
  "No cited sources to show.": "暂无可显示的引用来源。",
  "Broaden the scope to see domain-level citations.":
    "扩大范围以查看域名级引用。",
  "No sampled prompts cited a page under {target}.":
    "样本中没有提示词引用 {target} 下的页面。",
  "No matching queries found.": "未找到匹配的提示词。",
  "Broaden the scope to see domain-level prompts.":
    "扩大范围以查看域名级提示词。",

  // Citation tables
  "Which AI surface produced the answer — ChatGPT or Google AI Overview.":
    "产生该回答的 AI 平台——ChatGPT 或 Google AI Overview。",
  "A page cited as a source in AI answers where the searched brand or domain appears.":
    "在 AI 回答中被引用为来源、且其中出现所查品牌或域名的页面。",
  "Cited for": "引用提示词",
  "Example prompts from the fetched sample where this page was cited.":
    "已抓取样本中引用此页面的示例提示词。",
  "Source vol.": "来源搜索量",
  "Estimated monthly prompt demand DataForSEO reports for this cited source, across prompts where the searched brand or domain appears.":
    "DataForSEO 报告的此引用来源的预估月提示词需求量（基于出现所查品牌或域名的提示词）。",
  "A sampled user prompt whose AI answer cited the searched brand or domain in its text or sources. The prompt itself may not name the brand.":
    "样本中的用户提示词，其 AI 回答在正文或来源中引用了所查品牌或域名。提示词本身可能未提到该品牌。",
  "Brands: {list}": "品牌：{list}",
  "AI search vol.": "AI 搜索量",
  "Estimated monthly search demand for this prompt's topic. This is prompt demand, not the number of brand mentions.":
    "该提示词主题的预估月搜索需求。这是提示词需求量，而非品牌提及次数。",
  Actions: "操作",
  "Run this prompt in Prompt Explorer": "在提示词探索中运行此提示词",
  "Prompt volume in the fetched sample": "已抓取样本中的提示词搜索量",
  "{count} vol.": "{count} 搜索量",

  // Brand Lookup filters
  All: "全部",
  "Source mentions": "来源提及",

  // Prompt Explorer form
  Prompt: "提示词",
  tokens: "tokens",
  "{prompt} · {count} models": "{prompt} · {count} 个模型",
  "What your customers might ask AI.": "你的客户可能会问 AI 的问题。",
  "Highlight brand (optional)": "高亮品牌（可选）",
  "We'll flag whether each model mentions this brand.":
    "我们会标注每个模型是否提及该品牌。",
  Models: "模型",
  "Skipped for {country}": "{country} 不支持，已跳过",
  "Allow web search": "允许联网搜索",
  "Web search country": "联网搜索国家/地区",
  "Search countries": "搜索国家/地区",
  "No supported countries match.": "没有匹配的支持国家/地区。",
  "About country targeting": "关于国家/地区定向",
  "A country guides web search when a model supports it. Models may answer without searching. Leave it unset to run all selected models.":
    "国家/地区会在模型支持时引导联网搜索。模型也可能不搜索直接回答。留空则以所有所选模型运行。",
  "No country preference": "不指定国家/地区",
  "Run 1 model": "运行 1 个模型",
  "Run {count} models": "运行 {count} 个模型",

  // Prompt Explorer results
  "Country hint sent: {country}. This is not a verified search location.":
    "已发送国家/地区提示：{country}。这并非经核实的搜索位置。",
  "No country hint sent. Any search uses the provider's default location.":
    "未发送国家/地区提示。任何搜索都使用服务商的默认位置。",
  "Related queries the model considered": "模型考虑过的相关查询",
  Error: "错误",
  Skipped: "已跳过",
  "web search": "联网搜索",
  "no web search": "未联网搜索",
  "no {brand}": "未提及 {brand}",
  "Loading answers": "正在加载回答",
};
