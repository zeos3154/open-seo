// Backlinks page (src/client/features/backlinks/**).
// Keys are the exact English source text rendered by the app.

export const backlinksMessages: Record<string, string> = {
  // Page header
  "Understand who links to a site, what changed recently, and which pages attract links.":
    "了解谁链接到一个网站、近期有何变化，以及哪些页面吸引了链接。",

  // Error states
  "Could not load backlinks": "无法加载外链",
  "Could not load backlinks data.": "无法加载外链数据。",
  "Could not load this tab.": "无法加载此标签页。",
  "Please try again in a moment.": "请稍后重试。",

  // Overview panels
  "Showing backlinks for this exact page. Switch the scope to Domain or Subdomains for site-wide results — trend charts need one of those.":
    "当前显示指向此精确页面的外链。如需全站结果，请将范围切换为域名或子域名——趋势图需要其中一种范围。",
  "Showing backlinks pointing into this subfolder. Counts come from filtered backlink totals; rank, trends, and the referring-domains breakdown need Domain or Subdomains scope.":
    "当前显示指向此子目录的外链。计数来自筛选后的外链总数；排名、趋势和引荐域名细分需要域名或子域名范围。",
  "Updated {time}": "更新于 {time}",
  recently: "最近",
  "Backlink growth": "外链增长",
  "Last year · Includes subdomains": "过去一年 · 包含子域名",
  "Backlinks and referring domains over the last year":
    "过去一年的外链和引荐域名",
  "New vs lost": "新增与丢失",
  "Backlink acquisition and attrition": "外链的获取与流失",

  // Summary stats
  "Referring Domains": "引荐域名",
  "Referring Pages": "引荐页面",
  "Backlink Spam Score": "外链垃圾分",
  "Broken Backlinks": "失效外链",
  "Broken Pages": "失效页面",
  "Target Spam Score": "目标垃圾分",
  "Total links pointing to this site or page.": "指向此网站或页面的链接总数。",
  "Unique domains linking to this site or page.":
    "链接到此网站或页面的独立域名数。",
  "Unique pages linking to this site or page.":
    "链接到此网站或页面的独立页面数。",
  "DataForSEO's 0-100 authority score.": "DataForSEO 的 0-100 权威度评分。",
  "Estimated spam risk of links pointing here.": "指向此处链接的垃圾风险估计。",
  "Links pointing to broken pages here.": "指向此处失效页面的链接。",
  "Broken pages here that still have backlinks.": "此处仍有外链的失效页面。",
  "Estimated spam risk of this site or page.": "此网站或页面的垃圾风险估计。",

  // Tab descriptions
  "See the individual links pointing to your target, including source page, anchor text, and link quality signals.":
    "查看指向目标的所有单个链接，包括来源页面、锚文本和链接质量信号。",
  "View the unique domains linking to your target, grouped at the site level instead of by individual link.":
    "查看链接到目标的独立域名，按站点级别分组而非按单个链接。",
  "See which pages on the target site attract the most backlinks and referring domains.":
    "查看目标网站上哪些页面吸引了最多的外链和引荐域名。",

  // View toggles and menus
  "One per domain": "每个域名一条",
  "All links": "所有链接",
  "Best links: On": "优质外链：开",
  "Best links: Off": "优质外链：关",
  "Best links only": "仅优质外链",
  "Scores below {threshold} or unknown": "评分低于 {threshold} 或未知",
  "All links (spammy included)": "所有链接（含垃圾链接）",
  "Includes scores {threshold} or higher": "包含评分不低于 {threshold} 的链接",
  "Backlinks table actions": "外链表格操作",
  "Look up Ahrefs Domain Rating for each domain in the table":
    "查询表中每个域名的 Ahrefs 域名评分",
  "Could not load Ahrefs DR.": "无法加载 Ahrefs DR。",

  // Backlinks table
  Source: "来源",
  "Page linking to you": "链接到你的页面",
  Target: "目标",
  "Destination on your site": "你网站上的目标页面",
  Anchor: "锚文本",
  "Text or format of the link": "链接的文本或形式",
  "No anchor text": "无锚文本",
  Flags: "标记",
  "Special backlink attributes, such as lost, broken, nofollow, or multiple links from the same source.":
    "特殊外链属性，例如丢失、失效、nofollow，或来自同一来源的多个链接。",
  Lost: "丢失",
  Broken: "失效",
  "{count} links": "{count} 条链接",
  Link: "链接",
  "Authority of the linking page": "链接页面的权威度",
  "Authority of the linking domain": "链接域名的权威度",
  Spam: "垃圾分",
  "Estimated spam risk for this backlink. Higher scores are more likely to be manipulative or low quality.":
    "此外链的垃圾风险估计。评分越高，越可能是操纵性或低质量链接。",
  "Spam score unknown": "垃圾分未知",
  "First Seen": "首次发现",
  "When this link was first discovered by the crawler":
    "爬虫首次发现此链接的时间",
  "Last {date}": "最后更新 {date}",
  "Ahrefs Domain Rating (0-100) for the linking domain.":
    "链接域名的 Ahrefs 域名评分（0-100）。",
  "Ahrefs Domain Rating (0-100) for this referring domain.":
    "此引荐域名的 Ahrefs 域名评分（0-100）。",
  "Loading links…": "正在加载链接…",
  "Couldn't load this domain's links.": "无法加载此域名的链接。",
  "No other links from this domain.": "此域名没有其他链接。",
  "Hide all links from {domain}": "隐藏 {domain} 的所有链接",
  "Show all links from {domain}": "显示 {domain} 的所有链接",
  "No backlinks found for this target.": "未找到此目标的外链。",

  // Referring domains table
  "The referring site linking to your target.": "链接到你的目标的引荐网站。",
  "Total backlinks found from this domain.": "此域名的外链总数。",
  "Unique pages on this domain that link to your target.":
    "此域名上链接到你的目标的独立页面。",
  "Authority score for the referring domain.": "此引荐域名的权威度评分。",
  "Spam risk score for this referring domain.": "此引荐域名的垃圾风险评分。",
  "When this domain was first discovered linking to your target.":
    "首次发现此域名链接到你的目标的时间。",
  Issues: "问题",
  "Broken link and broken page counts tied to this domain.":
    "与此域名相关的失效链接和失效页面计数。",
  "Broken links: {count}": "失效链接：{count}",
  "Broken pages: {count}": "失效页面：{count}",
  "No referring domains found for this target.": "未找到此目标的引荐域名。",

  // Top pages table
  "Page on the target site receiving backlinks.": "目标网站上接收外链的页面。",
  "Total backlinks pointing to this page.": "指向此页面的外链总数。",
  "Unique domains linking to this page.": "链接到此页面的独立域名数。",
  "Authority score for this target page.": "此目标页面的权威度评分。",
  "Backlinks pointing here that are currently broken.":
    "指向此处且当前已失效的外链。",
  "No top pages found for this target.": "未找到此目标的热门页面。",

  // Charts (legend labels come from the chart configs)
  "Referring domains": "引荐域名",
  "Lost backlinks": "丢失外链",
  "New backlinks": "新增外链",
  "Backlink trend chart": "外链趋势图",
  "New and lost backlinks chart": "外链新增与丢失图",
  "Not enough historical data yet.": "暂无足够的历史数据。",

  // Filter panel
  "Source URL Contains": "来源网址包含",
  "Source URL Excludes": "来源网址排除",
  "Domain Contains": "域名包含",
  "Domain Excludes": "域名排除",
  "Page URL Contains": "页面网址包含",
  "Page URL Excludes": "页面网址排除",
  "Domain Authority": "域名权威度",
  "Link Authority": "链接权威度",
  "Spam Score": "垃圾分",
  "Link Type": "链接类型",
  All: "全部",
  Visibility: "可见性",
  "Hide lost": "隐藏丢失",
  "Hide broken": "隐藏失效",
};
