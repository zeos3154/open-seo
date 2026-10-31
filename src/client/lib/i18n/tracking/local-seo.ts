// Local SEO UI strings: English source -> Simplified Chinese.
export const localSeoMessages: Record<string, string> = {
  // Layout header (routes/_app/p/$projectId/local-seo.tsx)
  "Local SEO": "本地 SEO",
  "Track Google Maps rankings across your local area":
    "追踪你的业务在周边地区的 Google Maps 排名",
  "Tracked businesses": "已追踪商户",

  // Tracker list (LocalTrackerList.tsx)
  "Tracked Businesses": "已追踪商户",
  "Add Business": "添加商户",
  "Failed to load tracked businesses": "加载已追踪商户失败",
  "No tracked businesses yet": "暂无已追踪商户",
  "Add a Google Maps listing to check keyword rankings across the surrounding area.":
    "添加一个 Google Maps 商户，检查其在周边地区的关键词排名。",
  "{count} points across {km} km": "{count} 个采集点，覆盖 {km} 公里",

  // Lookup dialog (LocalTrackerDialog.tsx)
  "Enter the business name.": "请输入商户名称。",
  "Pick the city the business is in.": "请选择商户所在的城市。",
  "Add business": "添加商户",
  "Search again": "重新搜索",
  "Use this listing": "使用该商户",
  "Find listing": "查找商户",
  "Business name": "商户名称",
  "e.g. Joe's Pizza": "例如：Joe's Pizza",
  City: "城市",
  "Searching Google Maps. This usually takes a few seconds.":
    "正在搜索 Google Maps。这通常只需要几秒钟。",
  "Could not look up this business": "无法查询该商户",
  "Please try again in a moment.": "请稍后重试。",
  "No Google Maps listing found. Check the name matches the listing and the city is right.":
    "未找到对应的 Google Maps 商户。请检查名称与商户一致，且城市正确。",

  // Tracker settings (LocalTrackerDialog.tsx)
  "Neighborhood · 2 km wide · 9 points": "街区 · 宽 2 公里 · 9 个采集点",
  "Town · 4 km wide · 9 points": "城镇 · 宽 4 公里 · 9 个采集点",
  "City · 8 km wide · 25 points": "城市 · 宽 8 公里 · 25 个采集点",
  "Metro area · 20 km wide · 25 points": "都会区 · 宽 20 公里 · 25 个采集点",
  "Set up local tracking": "设置本地追踪",
  "Save business": "保存商户",
  "Area to check": "检查区域",
  "We search Google Maps from points spread across this area, centered on your listing.":
    "我们会以你的商户为中心，在该区域内多点搜索 Google Maps。",
  "Could not save this business.": "无法保存该商户。",

  // Tracker detail (LocalTrackerDetail.tsx)
  "Failed to load local tracking": "加载本地追踪失败",
  "Manage keywords": "管理关键词",
  "Checking rankings…": "正在检查排名…",
  "Checking {count} keywords across {points} points":
    "正在检查 {count} 个关键词在 {points} 个采集点的排名",
  searches: "次搜索",
  "Ranking check progress": "排名检查进度",
  "Usually takes {duration}": "通常需要 {duration}",
  "under a minute": "不到一分钟",
  "about 1 minute": "约 1 分钟",
  "about {count} minutes": "约 {count} 分钟",
  "The last check returned no rankings. Earlier results are shown below.":
    "上次检查未返回排名。下方显示更早的结果。",
  "Average rank where found": "有排名处的平均排名",
  "1 keyword × {points} grid points = {total} Google Maps searches on mobile, taking {duration}. Costs up to {cost}.":
    "1 个关键词 × {points} 个采集点 = {total} 次 Google Maps 移动端搜索，约需 {duration}。费用最多 {cost}。",
  "{count} keywords × {points} grid points = {total} Google Maps searches on mobile, taking {duration}. Costs up to {cost}.":
    "{count} 个关键词 × {points} 个采集点 = {total} 次 Google Maps 移动端搜索，约需 {duration}。费用最多 {cost}。",

  // Keyword fields (LocalKeywordFields.tsx)
  "Keywords to track": "要追踪的关键词",
  "Keyword {index}": "关键词 {index}",
  "e.g. pizza delivery": "例如：pizza delivery",
  "Remove keyword {index}": "移除关键词 {index}",
  "Add keyword": "添加关键词",

  // Keywords dialog (LocalKeywordsDialog.tsx)
  "Save keywords": "保存关键词",
  "Each check searches every keyword at every point. Results for removed keywords are kept.":
    "每次检查都会在每个采集点搜索每个关键词。已移除关键词的历史结果会保留。",
  "Could not save these keywords.": "无法保存这些关键词。",

  // Keyword map (LocalKeywordMap.tsx)
  "Saved check": "已保存的检查",
  "Latest check": "最新检查",
  "Not checked yet": "尚未检查",
  "Back to latest": "返回最新结果",
  "Failed to load ranking results.": "加载排名结果失败。",
  "Run a check to see where this business ranks across the area.":
    "运行一次检查，查看该商户在整个区域内的排名。",

  // Keywords table (LocalKeywordsTable.tsx)
  "View ranking map": "查看排名地图",
  "View map for {keyword}, {time}": "查看 {keyword} 的地图（{time}）",
  Failed: "失败",
  "Avg. rank": "平均排名",
  "Top-3 coverage": "前 3 覆盖率",
  "Points found": "有结果的采集点",
  "Last checked": "上次检查",
  "Add keywords to start tracking": "添加关键词以开始追踪",
  "Enter the searches customers use to find this business. Then check its rankings across the map.":
    "输入客户用来找到该商户的搜索词，然后检查其在地图各处的排名。",
  "Add keywords": "添加关键词",
  Checking: "检查中",
  Queued: "排队中",
  Partial: "部分完成",

  // Point results (LocalPointResults.tsx)
  Results: "结果",
  "Search pending": "搜索排队中",
  "Search failed": "搜索失败",
  "The saved scan will update when results arrive.":
    "结果到达后，已保存的扫描会自动更新。",
  "This point has no ranking result. Other points remain available.":
    "该采集点没有排名结果。其他采集点仍可查看。",
  "No listings returned": "没有返回商户",
  "Google Maps returned no businesses at this coordinate.":
    "Google Maps 在此坐标未返回任何商户。",
  Rank: "排名",
  Business: "商户",
  Reviews: "评价数",
  north: "北",
  south: "南",
  east: "东",
  west: "西",
  "Searched {parts} of your listing": "在你的商户{parts}方向搜索",
  "Searched from your listing": "从你的商户位置搜索",

  // Rank grid (LocalRankGrid.tsx)
  "Grid preview": "网格预览",
  "Maps rankings": "地图排名",

  // Listing choices (LocalListingChoices.tsx)
  "{count} listings match your search.": "有 {count} 个商户符合你的搜索。",
  "Google Maps listings": "Google Maps 商户",
  "No public address": "无公开地址",
  reviews: "条评价",

  // Maps tiles (GoogleMapsTiles.tsx)
  "Google Maps unavailable": "Google Maps 不可用",
  "Map tiles could not load. Check the map key's access and quota, or view rankings in Points.":
    "地图图块无法加载。请检查地图密钥的访问权限和配额，或在“采集点”中查看排名。",

  // Map aria labels
  "Matching listings on a Google Maps basemap": "Google Maps 底图上的匹配商户",
  "Local search ranking grid on a Google Maps basemap":
    "Google Maps 底图上的本地搜索排名网格",
};
