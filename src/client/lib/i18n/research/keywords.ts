// Keyword Research page (src/client/features/keywords/**).
// Keys are the exact English source text rendered by the app.

export const keywordResearchMessages: Record<string, string> = {
  // Page header and search bar
  "Discover keyword ideas, search demand, and ranking opportunities.":
    "发现关键词创意、搜索需求和排名机会。",
  "Enter a keyword": "输入关键词",
  Keywords: "关键词",
  Search: "搜索",
  "Keyword data for this country comes from Google Ads — search volume, CPC, and trends are available, but difficulty and intent are not.":
    "该国家/地区的关键词数据来自 Google Ads——提供搜索量、CPC 和趋势，但不提供难度和搜索意图。",
  "Local volume adds ~{cost} per search.":
    "本地搜索量每次查询约额外消耗 {cost}。",
  "City (optional)": "城市（可选）",
  "Get search volume for one city, county, or region. Leave empty for the whole country.":
    "查询单个城市、县或地区的搜索量。留空则查询整个国家。",

  // Search options dialog
  Options: "选项",
  "Search options": "搜索选项",
  Done: "完成",
  Results: "结果",
  "{count} results": "{count} 条结果",
  "Keyword source": "关键词来源",
  Auto: "自动",
  "Phrase match": "短语匹配",
  "Category ideas": "类目创意",
  "People also search for": "他人还搜索",
  "Not available for countries served from Google Ads data.":
    "由 Google Ads 数据提供服务的国家/地区不可用。",
  "Clickstream-refined volumes": "点击流修正的搜索量",
  "Not available for local results. Clickstream data covers whole countries only.":
    "本地结果不可用。点击流数据仅覆盖整个国家/地区。",
  "Google reports one combined volume for similar keywords. This estimates each keyword's own volume. Costs 2x the credits.":
    "Google 会为相似关键词报告一个合并搜索量。此项会估算每个关键词各自的搜索量。消耗 2 倍积分。",
  "Group keywords": "关键词分组",

  // Validation copy (stored English in the form, translated at render)
  "Please enter at least one keyword.": "请至少输入一个关键词。",
  "Please enter no more than 5 keywords (one per line).":
    "请最多输入 5 个关键词（每行一个）。",

  // Filters
  "Include Terms": "包含词",
  "Exclude Terms": "排除词",
  "Search Volume": "搜索量",
  "CPC (USD)": "CPC（美元）",
  Difficulty: "难度",
  Intent: "搜索意图",

  // Results table
  Keyword: "关键词",
  Volume: "搜索量",
  "Cost per click in USD.": "每次点击费用（美元）。",
  "Comp.": "竞争度",
  "Paid-search competition from Google Ads (0-1): higher means more advertisers bidding.":
    "来自 Google Ads 的付费搜索竞争度（0-1）：数值越高，参与竞价的广告主越多。",
  Score: "得分",
  "Organic ranking difficulty (0-100): higher means harder to reach Google's top 10.":
    "自然排名难度（0-100）：数值越高，进入 Google 前 10 位越难。",
  "{keyword}: matching reported volume with {parent}. Shared volumes may overlap.":
    "{keyword}：与 {parent} 的报告搜索量一致，搜索量可能存在重叠。",
  "No keywords": "暂无关键词",

  // Overview stats chips
  Vol: "搜索量",
  Comp: "竞争度",

  // Results toolbar and mobile tabs
  "Keywords ({count})": "关键词（{count}）",
  "SERP Analysis": "SERP 分析",
  'No exact match for "{keyword}". Showing closest related keywords instead.':
    "没有与“{keyword}”完全匹配的结果，改为显示最接近的相关关键词。",
  "{count} selected": "已选择 {count} 个",
  "Showing {count} of {total} keywords": "显示 {total} 个关键词中的 {count} 个",
  "Showing {count} keywords": "显示 {count} 个关键词",
  Save: "保存",
  "Search Trends": "搜索趋势",
  "{label} trend chart": "{label}趋势图",

  // Save dialog and save toast
  "Save {count} Keywords": "保存 {count} 个关键词",
  "These keywords will be saved to your current project.":
    "这些关键词将保存到当前项目。",
  "Saved keywords show national metrics. The local volume for {location} is not saved.":
    "已保存关键词显示全国范围指标，{location} 的本地搜索量不会被保存。",
  "Saved {count} keywords": "已保存 {count} 个关键词",

  // SERP analysis card
  Page: "页面",
  "{count} organic results": "{count} 条自然结果",
  Retry: "重试",
  "Show top 20": "显示前 20 条",
  "Load top 100": "加载前 100 条",
  "No SERP details available for this keyword yet.": "该关键词暂无 SERP 详情。",
  "Try clicking another keyword to load data.":
    "请尝试点击其他关键词以加载数据。",
  "Failed to load SERP data.": "加载 SERP 数据失败。",
  "Research failed.": "查询失败。",

  // Search intent labels, short labels, and tooltip explanations
  Informational: "信息型",
  Commercial: "商业型",
  Transactional: "交易型",
  Navigational: "导航型",
  Unknown: "未知",
  "{label} search intent": "{label}搜索意图",
  "The searcher wants information or answers. Use this for educational content, guides, and comparison-light explainers.":
    "搜索者想了解信息或寻找答案。适合教育类内容、指南和轻对比型解读文章。",
  "The searcher is researching options before a purchase. Treat this as buying intent for comparisons, alternatives, and product-led pages.":
    "搜索者在购买前调研各种选择。应视为购买意图，适合对比、替代方案和以产品为主的页面。",
  "The searcher is ready to complete an action, often a purchase. Prioritize clear offers, pricing, trials, or conversion paths.":
    "搜索者准备完成某个动作，通常是购买。应优先提供清晰的优惠、价格、试用或转化路径。",
  "The searcher is looking for a specific site, brand, or page. These queries usually reward matching the expected destination.":
    "搜索者在寻找特定的网站、品牌或页面。这类查询通常需要与预期目标页面匹配。",
  "Intent was not available for this keyword, so avoid making content strategy decisions from this badge alone.":
    "该关键词的搜索意图未知，请勿仅凭此标签制定内容策略。",

  // Empty state
  "Not enough keyword data for this query yet": "该查询暂无足够的关键词数据",
};
