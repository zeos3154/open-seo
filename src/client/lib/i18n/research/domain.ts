// Domain Overview page (src/client/features/domain/**).
// Keys are the exact English source text rendered by the app.

export const domainOverviewMessages: Record<string, string> = {
  // Page header, tabs, and overview
  "Analyze any domain's SEO profile: traffic, keywords, and backlinks.":
    "分析任意域名的 SEO 概况：流量、关键词和外链。",
  "Top Keywords": "热门关键词",
  "Top Pages": "热门页面",
  "Lookup failed.": "查询失败。",
  "Not enough data for this scope yet. Try another domain or a broader scope.":
    "该范围暂无足够数据。请尝试其他域名或更大的范围。",
  "Whole domain incl. subdomains": "整个域名（含子域名）",
  "Estimated organic traffic": "预计自然流量",
  "Organic keywords": "自然关键词",

  // Search card
  "By Rank": "按排名",
  "By Traffic": "按流量",
  "By Volume": "按搜索量",
  "By Score": "按难度分",
  "By CPC": "按 CPC",
  "Sort keywords": "关键词排序",

  // Keyword tab
  "Failed to load keywords.": "加载关键词失败。",
  "Failed to load pages.": "加载页面失败。",
  "Select keywords to save": "选择要保存的关键词",
  "Save Keywords": "保存关键词",
  "No keywords match this search.": "没有符合此搜索的关键词。",
  "No pages match this search.": "没有符合此搜索的页面。",

  // Tables
  Rank: "排名",
  Traffic: "流量",
  "Organic Traffic": "自然流量",
  URL: "URL",

  // Filter panel
  "Include Page Terms": "包含页面词",
  "Exclude Page Terms": "排除页面词",
  "Score (KD)": "难度分（KD）",
  "Too many filter conditions ({count} of {max} max). Remove some terms or ranges before applying.":
    "筛选条件过多（最多 {max} 个，当前 {count} 个）。请先删除一些词或数值范围再应用。",
  "{count} / {max} conditions": "{count} / {max} 个条件",
  "{count} unapplied": "{count} 项未应用",
  "Apply filters": "应用筛选",
  "This scope leaves room for at most {max} filter conditions per request":
    "此范围每次请求最多支持 {max} 个筛选条件",
  "Saved filters exceed this scope's {max}-condition limit and were not applied. Open Filters to trim them.":
    "已保存的筛选超出此范围 {max} 个条件的上限，未被应用。请打开筛选进行精简。",
};
