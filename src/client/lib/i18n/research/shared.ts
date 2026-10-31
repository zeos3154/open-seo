// Strings shared across the research slices (keyword research, saved
// keywords, domain overview, backlinks). Keys are the exact English source
// text rendered by the app; missing entries fall back to English.

export const researchSharedMessages: Record<string, string> = {
  // Search history / recent searches
  "Recent searches": "最近搜索",
  "Enter a keyword to get started": "输入关键词即可开始",
  "Search for any keyword to see volume, difficulty, CPC, and related keyword ideas.":
    "搜索任意关键词，查看搜索量、难度、CPC 和相关关键词建议。",
  "Enter a domain to get started": "输入域名即可开始",
  "Enter a domain or URL to get started": "输入域名或网址即可开始",

  // Empty-state sentence fragments (Keyword Research "no results" state)
  "We could not find keyword opportunities for": "未能找到关键词机会，查询词为",
  in: "，位于",
  "this location": "该地区",

  // Research scope labels (values come from shared/researchScope)
  "Exact URL": "精确网址",
  Subfolder: "子目录",
  Subdomains: "子域名",
  // Scope option descriptions shown in the shared scope select
  "One page only": "仅单个页面",
  "The path and everything under it": "该路径及其下的所有内容",
  "The hostname, without subdomains": "仅主机名，不含子域名",
  "The domain plus all its subdomains": "该域名及其所有子域名",

  // Domain/URL validation copy (shared/researchScope + slice validators)
  "Enter a domain or URL": "请输入域名或网址",
  "Domain or URL": "域名或网址",
  "Enter a valid domain like example.com": "请输入有效域名，例如 example.com",
  "URLs with embedded credentials are not supported": "不支持包含凭据的网址",
  "Add a path to use Subfolder (e.g. example.com/blog)":
    "使用子目录需要添加路径（例如 example.com/blog）",
  "Please enter a domain": "请输入域名",
  "Enter a valid domain or page URL.": "请输入有效的域名或页面网址。",
  "Enter a domain or URL to analyze.": "请输入要分析的域名或网址。",

  // Search tab strip
  "Search tabs": "搜索标签页",
  "Close {label} tab": "关闭 {label} 标签页",

  // Export menu entries used by research tables
  "Export to Sheets": "导出到 Google Sheets",
  "Export CSV": "导出 CSV",
  "Download CSV": "下载 CSV",
  "Copy keywords": "复制关键词",
  "Current page · selected view": "当前页 · 当前视图",

  // Clipboard
  "Could not copy to clipboard": "无法复制到剪贴板",

  // Toolbar count suffixes ("1,234 keywords" / "1,234 pages")
  keywords: "个关键词",
  pages: "个页面",

  // Month short labels (trend charts)
  "Search volume": "搜索量",
  Jan: "1月",
  Feb: "2月",
  Mar: "3月",
  Apr: "4月",
  May: "5月",
  Jun: "6月",
  Jul: "7月",
  Aug: "8月",
  Sep: "9月",
  Oct: "10月",
  Nov: "11月",
  Dec: "12月",
  "Last 12 available months": "最近 12 个有数据的月份",
};
