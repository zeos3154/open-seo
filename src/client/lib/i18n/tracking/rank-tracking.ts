// Rank tracking UI strings: English source -> Simplified Chinese.
export const rankTrackingMessages: Record<string, string> = {
  // Layout header (routes/_app/p/$projectId/rank-tracking.tsx)
  "Track keyword positions across domains": "追踪关键词在各域名中的排名",
  "Tracked domains": "已追踪域名",

  // Domain detail route ($configId.tsx)
  "Failed to load domain configuration": "加载域名配置失败",
  "Domain configuration not found": "未找到域名配置",
  "This domain was archived or does not exist in this project.":
    "该域名已归档或在此项目中不存在。",
  "Back to domains": "返回域名列表",

  // Table (RankTrackingTable.tsx)
  Remove: "移除",
  "Export to Sheets": "导出到 Google Sheets",
  "Export CSV": "导出 CSV",
  "Remove keywords?": "移除关键词？",
  "Remove 1 keyword": "移除 1 个关键词",
  "Remove {count} keywords": "移除 {count} 个关键词",
  "1 keyword removed": "已移除 1 个关键词",
  "{count} keywords removed": "已移除 {count} 个关键词",
  "This will stop tracking 1 keyword. Historical ranking data is preserved but won't appear in the table.":
    "将停止追踪该关键词。历史排名数据会保留，但不会再显示在表格中。",
  "This will stop tracking {count} keywords. Historical ranking data is preserved but won't appear in the table.":
    "将停止追踪 {count} 个关键词。历史排名数据会保留，但不会再显示在表格中。",
  "No keywords yet": "暂无关键词",
  "Add the keywords you want to track for this domain.":
    "添加想要为该域名追踪的关键词。",
  "Add Keywords": "添加关键词",
  "{count} of {total} keywords": "{count} / {total} 个关键词",

  // Table columns and tooltips (RankTrackingColumns.tsx)
  "The search term being tracked in Google": "在 Google 中追踪的搜索词",
  "Estimated monthly search volume from Google": "来自 Google 的预估月搜索量",
  "Keyword difficulty score (0-100) — higher means harder to rank":
    "关键词难度分数（0-100）——数值越高越难获得排名",
  "Average cost per click in Google Ads (USD)":
    "Google Ads 的平均单次点击费用（美元）",
  "Current Google ranking position, showing change from the comparison period":
    "当前 Google 排名位置，并显示与对比期的变化",
  "The page on your site that ranks for this keyword":
    "你的网站上为该关键词带来排名的页面",
  "Special result features appearing on the search results page (e.g. AI Overview, People Also Ask)":
    "搜索结果页上出现的特殊结果特征（例如 AI Overview、People Also Ask）",
  "Local volume": "本地搜索量",
  Volume: "搜索量",
  "Estimated monthly searches in {location} from Google Ads":
    "Google Ads 在 {location} 的预估月搜索量",
  Keyword: "关键词",
  Position: "排名",
  "View position history": "查看排名历史",
  "Tracked exactly as typed, not lowercased": "按输入原样追踪，不转为小写",
  "Unpin keyword": "取消置顶关键词",
  "Pin keyword to top": "将关键词置顶",
  "SERP Features": "SERP 特征",

  // SERP feature cells (RankTrackingTableParts.tsx)
  "Featured Snippet — highlighted answer box at top of results":
    "精选摘要 — 显示在结果顶部的突出答案框",
  "People Also Ask — expandable related questions":
    "People Also Ask — 可展开的相关问题",
  "AI Overview — AI-generated summary at top of search":
    "AI Overview — 搜索结果顶部的 AI 生成摘要",
  "Local Pack — map with local business listings":
    "本地商户包 — 包含本地商户列表的地图",
  "Knowledge Panel — info box about an entity":
    "知识面板 — 关于某个实体的信息框",
  "Video — video results shown in the SERP": "视频 — SERP 中显示的视频结果",
  "Images — image results shown in the SERP": "图片 — SERP 中显示的图片结果",
  "Shopping — product listings with prices": "购物 — 带价格的商品列表",
  "Top Stories — news articles carousel": "焦点新闻 — 新闻文章轮播",
  lost: "丢失",

  // Toolbar (RankTrackingTableToolbar.tsx)
  Latest: "最新",
  History: "历史",
  "Toggle table filters": "切换表格筛选",
  Filters: "筛选",
  "Double-checking some results. This can take up to an hour.":
    "正在复核部分结果。最长可能需要一个小时。",
  "Preparing...": "准备中...",
  "Getting rankings for 1 keyword...": "正在获取 1 个关键词的排名...",
  "Getting rankings for {count} keywords...":
    "正在获取 {count} 个关键词的排名...",
  "Rank check progress": "排名检查进度",
  "{count} keywords": "{count} 个关键词",
  "Copy keywords": "复制关键词",

  // More actions menu (ToolbarMenus.tsx)
  "More actions": "更多操作",
  "Running...": "运行中...",
  "Check rankings": "检查排名",
  "Fetch current Google positions": "获取当前 Google 排名",
  "Refreshing...": "刷新中...",
  "Update keyword stats": "更新关键词数据",
  "Volume, difficulty & CPC — not rankings": "搜索量、难度和 CPC — 不含排名",
  "Update keyword stats?": "更新关键词数据？",
  "Update stats": "更新数据",
  "This fetches new volume, difficulty, and CPC for all 1 tracked keyword. Each keyword uses credits. Rankings do not change.":
    "这会为全部 1 个已追踪关键词获取新的搜索量、难度和 CPC。每个关键词都会消耗积分。排名不会变化。",
  "This fetches new volume, difficulty, and CPC for all {count} tracked keywords. Each keyword uses credits. Rankings do not change.":
    "这会为全部 {count} 个已追踪关键词获取新的搜索量、难度和 CPC。每个关键词都会消耗积分。排名不会变化。",

  // Filter panel and domain filter bar (RankTrackingFilters.tsx)
  "Refine results": "细化结果",
  "{count} active": "{count} 个生效",
  "Clear all": "全部清除",
  Include: "包含",
  Exclude: "排除",
  "e.g. seo, tool": "例如：seo、tool",
  "e.g. free, cheap": "例如：free、cheap",
  "Desktop position": "桌面端排名",
  "Mobile position": "移动端排名",
  "Keyword difficulty": "关键词难度",
  Min: "最小值",
  Max: "最大值",
  "{title} min": "{title} 最小值",
  "{title} max": "{title} 最大值",
  Search: "搜索",
  "Domain or website": "域名或网站",
  Device: "设备",
  "All devices": "全部设备",
  "All countries": "所有国家/地区",
  Clear: "清除",

  // Domain list (RankTrackingDomainList.tsx)
  "Desktop + Mobile": "桌面端 + 移动端",
  "Desktop only": "仅桌面端",
  "Mobile only": "仅移动端",
  Desktop: "桌面端",
  Mobile: "移动端",
  Daily: "每天",
  Weekly: "每周",
  Monthly: "每月",
  Manual: "手动",
  "Domain archived": "域名已归档",
  "Tracked Domains": "已追踪域名",
  "Add Domain": "添加域名",
  "Failed to load tracked domains": "加载已追踪域名失败",
  "No tracked domains yet": "暂无已追踪域名",
  "Add a domain to start monitoring keyword rankings over time.":
    "添加域名，开始持续监测关键词排名变化。",
  "No matching tracked domains": "没有匹配的已追踪域名",
  "Try clearing search or adjusting filters.": "请尝试清除搜索或调整筛选条件。",
  "Clear filters": "清除筛选",
  Archive: "归档",
  "Scheduled checks will stop and this domain will be hidden from the list. Ranking history is preserved.":
    "定时检查将停止，该域名将从列表中隐藏。排名历史会保留。",
  "Open {domain}": "打开 {domain}",
  "Next: {time}": "下次：{time}",
  "Last: {time}": "上次：{time}",
  "Scheduled check skipped: out of credits": "定时检查已跳过：积分不足",
  "Scheduled check skipped — paid plan required": "定时检查已跳过 — 需要付费版",
  "Archive domain": "归档域名",

  // Detail header (RankTrackingDetailHeader.tsx)
  "vs yesterday": "与昨天对比",
  "vs last week": "与上周对比",
  "vs last month": "与上月对比",
  "vs 90 days ago": "与 90 天前对比",
  "Comparison period": "对比周期",
  "Mobile results often differ from desktop. Search Console averages both, so its positions may not match.":
    "移动端结果通常与桌面端不同。Search Console 对两者取平均，因此位置可能不一致。",
  Configure: "配置",
  "up to {cost}/check": "每次检查最多 {cost}",

  // Position distribution chart (RankTrackingOverview.tsx)
  "Top 3": "前 3 名",
  "Not in top 20": "未进前 20",
  "Not checked": "未检查",
  "Check failed, no position recorded.": "检查失败，未记录排名。",
  "Position distribution": "排名分布",
  "Failed to load position history": "加载排名历史失败",

  // Trend chart (RankTrackingTrendChart.tsx)
  "Google position (1 = best)": "Google 排名（1 = 最佳）",
  Better: "更好",
  "30d": "30 天",
  "90d": "90 天",
  All: "全部",
  "No history yet": "暂无历史",
  "Only 1 check so far": "目前仅有 1 次检查",
  "Run a check to start tracking positions over time.":
    "运行一次检查，开始追踪排名随时间的变化。",
  "The trend fills in after the next check.": "下次检查后趋势图会逐步填充。",

  // History matrix (RankTrackingHistoryMatrix.tsx)
  "No keywords match these filters": "没有符合筛选条件的关键词",
  "Change or clear the filters to see more keywords.":
    "更改或清除筛选条件以查看更多关键词。",
  "Not checked: check failed, no position recorded.":
    "未检查：检查失败，未记录排名。",

  // Keyword trend modal (KeywordTrendModal.tsx)
  "Position over time": "排名随时间变化",
  "Search this keyword on Google with the tracked language, country, and city":
    "使用所追踪的语言、国家/地区和城市在 Google 上搜索该关键词",
  "Open on Google": "在 Google 上打开",
  "Failed to load keyword history": "加载关键词历史失败",
  "Not found": "未找到",
  "Not ranking, or incomplete results": "未排名或结果不完整",
  "Copied to clipboard": "已复制到剪贴板",
  Date: "日期",
  "Δ vs previous check": "与上次检查相比",

  // Config modal (RankTrackingConfigModal.tsx)
  "Edit Domain Config": "编辑域名配置",
  "Failed to load the project.": "加载项目失败。",
  "Target Domain": "目标域名",
  "Defaults to the country's language. Any language can be tracked in any country — pick the one your customers search in.":
    "默认为该国家/地区的语言。任何语言都可以在任何国家/地区追踪 — 请选择你的客户使用的搜索语言。",
  "Most Google searches come from mobile, but select this based on your customer.":
    "大多数 Google 搜索来自移动端，但请根据你的客户来选择。",
  "Tracking both devices uses 2x credits per keyword check":
    "同时追踪两种设备时，每次关键词检查消耗 2 倍积分",
  Schedule: "计划",
  "Monthly (end of month)": "每月（月末）",
  "Manual only": "仅手动",
  change: "更改",
  "Day of week": "星期",
  "Time of day": "时间",
  "In your local timezone: {tz}": "你所在的时区：{tz}",
  "Daily checks use 7x more credits than weekly":
    "每天检查消耗的积分是每周的 7 倍",
  "Search Depth": "搜索深度",
  "{pages} page (top {top} results)": "{pages} 页（前 {top} 条结果）",
  "{pages} pages (top {top} results)": "{pages} 页（前 {top} 条结果）",
  "10 pages is ~8x more expensive than 1 page": "10 页的成本约为 1 页的 8 倍",
  "up to {cost}": "最多 {cost}",
  "per keyword per check": "/每个关键词/每次检查",
  "50 keywords would cost up to": "50 个关键词每月最多花费",
  "{cost}/month": "{cost}/月",
  "Save Changes": "保存更改",
  "Enter a domain": "请输入域名",
  "Enter a valid domain, like example.com": "请输入有效域名，例如 example.com",
  "Select a city or region for local targeting":
    "请选择本地定向的目标城市或区域",

  // Keyword suggestion step (KeywordSuggestionStep.tsx)
  "The search term this domain ranks for": "该域名当前有排名的搜索词",
  "Current Google ranking position": "当前 Google 排名位置",
  "Monthly search volume": "月搜索量",
  "Estimated monthly organic traffic": "预估月自然流量",
  Traffic: "流量",
  "Added {count} keywords for tracking": "已添加 {count} 个关键词进行追踪",
  "Add keywords manually": "手动添加关键词",
  "Ranked-keyword suggestions aren't available for this country. Continue and add the keywords you want to track manually.":
    "该国家/地区暂无排名关键词建议。请继续并手动添加想要追踪的关键词。",
  Continue: "继续",
  "Finding your top keywords...": "正在查找你的热门关键词...",
  "This usually takes a few seconds": "这通常只需要几秒钟",
  "Couldn't fetch keywords": "无法获取关键词",
  "You can skip this step and add keywords manually later.":
    "你可以跳过这一步，稍后手动添加关键词。",
  Skip: "跳过",
  "No rankings found": "未找到排名",
  "We couldn't find any keywords {domain} currently ranks for. You can add keywords manually.":
    "未找到 {domain} 当前有排名的关键词。你可以手动添加关键词。",
  "Choose keywords to track": "选择要追踪的关键词",
  "We found {count} keywords {domain} ranks for.":
    "我们找到了 {count} 个 {domain} 有排名的关键词。",
  "No keywords": "暂无关键词",
  "{count} of {total} selected": "已选 {count} / {total} 个",
  "Save Keyword": "保存关键词",
  "Save Keywords": "保存关键词",

  // Add keywords panel (AddKeywordsPanel.tsx)
  "Keywords to add": "要添加的关键词",
  "Enter keywords, one per line": "输入关键词，每行一个",
  "Track these keywords exactly as typed instead of lowercasing them. Google can return different results for a capitalized brand name.":
    "按输入原样追踪这些关键词，而不是转为小写。对于包含大写字母的品牌名，Google 可能返回不同的结果。",
  "Match case": "区分大小写",
  "Keywords must be {limit} characters or fewer.":
    "关键词长度不能超过 {limit} 个字符。",
  Add: "添加",

  // Check confirmation (CheckConfirmModal.tsx)
  "Check 1 keyword?": "检查 1 个关键词？",
  "Check {count} keywords?": "检查 {count} 个关键词？",
  "Run now": "立即运行",
  "1 device": "1 种设备",
  "{count} devices": "{count} 种设备",
  "1 keyword × {devices} = {total} SERP checks. Results in ~{eta}.":
    "1 个关键词 × {devices} = {total} 次 SERP 检查。约 {eta} 后出结果。",
  "{count} keywords × {devices} = {total} SERP checks. Results in ~{eta}.":
    "{count} 个关键词 × {devices} = {total} 次 SERP 检查。约 {eta} 后出结果。",
  "Costs up to": "费用最多",

  // Alerts (RankRunAlerts.tsx / RankTrackingChangesAlert.tsx / FreePlanAlert.tsx)
  "This run may be unresponsive and will be cleaned up automatically.":
    "本次检查可能已无响应，将被自动清理。",
  "Your last rank check didn't run": "上次的排名检查未能运行",
  "Last check failed.": "上次检查失败。",
  "Your last check was incomplete.": "你上次的结果不完整。",
  "We couldn't confirm a result for some keywords, so they show their previous position.":
    "我们无法为部分关键词确认结果，因此它们显示上次的排名。",
  "Rank tracking now retries some results.": "排名追踪现在会重试部分结果。",
  "Since September, Google has been serving incomplete results to all rank trackers.":
    "自九月以来，Google 向所有排名追踪工具返回不完整的结果。",
  "Read what changed": "了解变化详情",
  "We only start to track keyword positions once you": "只有",
  "upgrade to the paid plan": "升级到付费版后，我们才会开始追踪关键词排名",

  // Toasts and misc (hooks / DomainDetail)
  "A rank check is already running": "已有排名检查正在运行",
  "Rank check started": "排名检查已启动",
  "Domain added for rank tracking": "域名已添加到排名追踪",
  "Configuration updated": "配置已更新",
  "Metrics updated for {count} keywords": "已更新 {count} 个关键词的数据",
  "1 keyword added": "已添加 1 个关键词",
  "{count} keywords added": "已添加 {count} 个关键词",
  "The scheduled check within the hour covers these keywords":
    "一小时内的定时检查会包含这些关键词",
  "Use 'Check rankings' to check these keywords":
    "使用“检查排名”来检查这些关键词",
  "Keywords copied to clipboard": "关键词已复制到剪贴板",
  "Failed to load rank data": "加载排名数据失败",

  // Search targeting (SearchTargetingField.tsx)
  "Search Targeting": "搜索定向",
  National: "全国",
  Local: "本地",
  "Best for:": "最适合：",
  '"near me" queries, city/county keywords, service-area pages.':
    "“附近”类查询、城市/县关键词、服务区域页面。",
  "Local targeting can understate rankings for non-geo-modified terms.":
    "对于非地域修饰词，本地定向可能低估排名。",
  "City or region": "城市或区域",
  "Search cities...": "搜索城市…",

  // Schedule description (scheduleTime.ts)
  "Runs daily at {time} ({utc} UTC)": "每天 {time}（{utc} UTC）运行",
  "Runs weekly on Mondays at {time} ({utc} UTC)":
    "每周一 {time}（{utc} UTC）运行",
  "Runs weekly on Tuesdays at {time} ({utc} UTC)":
    "每周二 {time}（{utc} UTC）运行",
  "Runs weekly on Wednesdays at {time} ({utc} UTC)":
    "每周三 {time}（{utc} UTC）运行",
  "Runs weekly on Thursdays at {time} ({utc} UTC)":
    "每周四 {time}（{utc} UTC）运行",
  "Runs weekly on Fridays at {time} ({utc} UTC)":
    "每周五 {time}（{utc} UTC）运行",
  "Runs weekly on Saturdays at {time} ({utc} UTC)":
    "每周六 {time}（{utc} UTC）运行",
  "Runs weekly on Sundays at {time} ({utc} UTC)":
    "每周日 {time}（{utc} UTC）运行",
  "Runs on the last day of each month at {time} ({utc} UTC)":
    "每月最后一天 {time}（{utc} UTC）运行",
  Sunday: "周日",
  Monday: "周一",
  Tuesday: "周二",
  Wednesday: "周三",
  Thursday: "周四",
  Friday: "周五",
  Saturday: "周六",
};
