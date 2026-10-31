/**
 * Search Console / Search Performance page strings. Filter option values
 * (last_28_days, DESKTOP…) and query/page data stay untouched; only labels
 * translate.
 */
export const searchPerformanceMessages: Record<string, string> = {
  "Search Performance": "搜索表现",
  "See your site's clicks, impressions, CTR, and position from Google Search Console.":
    "查看来自 Google Search Console 的点击次数、展示次数、点击率和排名。",
  "Change property": "更改资源",
  "Failed to load Search Console data": "加载 Search Console 数据失败",
  "Export failed": "导出失败",
  "Toggle table filters": "切换表格筛选",
  Filters: "筛选",
  "Loading matching results…": "正在加载匹配的结果…",
  "Striking distance": "临界排名",
  Queries: "查询词",
  "Striking distance ({count})": "临界排名（{count}）",

  // Totals table
  Metric: "指标",
  Value: "数值",
  Change: "变化",
  Clicks: "点击次数",
  Impressions: "展示次数",
  "Click-through rate": "点击率",
  "Average position": "平均排名",
  "Compared with {start} to {end}": "与 {start} 至 {end} 对比",

  // Dimension tables
  Page: "页面",
  Position: "排名",
  CTR: "点击率",
  "No rows on this page": "此页没有数据行",
  "This page is past the end of the results.": "此页已超出结果范围。",
  "Go to first page": "回到第一页",
  "No Search Console data yet": "还没有 Search Console 数据",
  "Search Console data can take a few days to appear.":
    "Search Console 数据可能需要几天才会出现。",

  // Striking distance
  "Queries ranking at positions 5 to 20, sorted by impressions. Improve the listed page to move them into the top results.":
    "排名在第 5 到第 20 位的查询词，按展示次数排序。改进对应页面即可让它们进入靠前结果。",
  "No striking-distance queries": "没有临界排名的查询词",
  "Queries ranking at positions 5 to 20 will appear here.":
    "排名在第 5 到第 20 位的查询词会显示在这里。",
  "Copied {count} keyword": "已复制 {count} 个关键词",
  "Copied {count} keywords": "已复制 {count} 个关键词",
  "Couldn't copy to clipboard": "无法复制到剪贴板",
  "Saved {count} keyword": "已保存 {count} 个关键词",
  "Saved {count} keywords": "已保存 {count} 个关键词",
  query: "个查询词",
  queries: "个查询词",
  "Copy keywords": "复制关键词",
  "Save as keywords": "保存为关键词",

  // Selects
  "Last 7 days": "最近 7 天",
  "Last 28 days": "最近 28 天",
  "Last 3 months": "最近 3 个月",
  "All devices": "全部设备",
  "All countries": "所有国家/地区",
  Tablet: "平板设备",
  Desktop: "桌面端",
  Mobile: "移动端",
  "Device filter": "设备筛选",
  "Country filter": "国家/地区筛选",
  "Date range": "日期范围",

  // Text filters
  "Refine table results": "细化表格结果",
  "{count} active": "{count} 个生效",
  "{count} unapplied": "{count} 项未应用",
  "Clear all": "全部清除",
  "Page URL": "页面 URL",
  Query: "查询词",
  Contains: "包含",
  "Exactly matches": "完全匹配",
  "Page match": "页面匹配方式",
  "Query match": "查询词匹配方式",
  "Page URL filter": "页面 URL 筛选",
  "Query filter": "查询词筛选",
  "URL or subfolder": "URL 或子目录",
  "Search term": "搜索词",
  "All filters must match. Contains ignores case and matches text anywhere, including a subfolder. Exactly matches compares the full URL or query, including case.":
    "所有筛选条件必须同时满足。“包含”不区分大小写，可匹配任意位置的文本（包括子目录）。“完全匹配”会比较完整的 URL 或查询词，区分大小写。",
  Cancel: "取消",
  "Apply filters": "应用筛选",
};
