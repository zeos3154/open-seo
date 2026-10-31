/**
 * Site Audit UI strings: launch, history, detail/progress, results tables,
 * filters and crawl warnings. Keys are the exact English source text.
 */
export const auditMessages: Record<string, string> = {
  // Launch page
  "Site Audit": "网站审计",
  "Start New Audit": "开始新审计",
  "Site URL": "网站 URL",
  "Starting...": "启动中…",
  "Start Audit": "开始审计",
  "Max pages": "最大页数",
  "Enter any value from {min} to {max}.":
    "请输入 {min} 到 {max} 之间的任意值。",
  Upgrade: "升级",
  "to crawl up to {max} pages.": "以抓取最多 {max} 个页面。",
  "Include Lighthouse": "包含 Lighthouse",
  "Lighthouse measures the performance of your pages and identifies issues.":
    "Lighthouse 会测量页面性能并发现问题。",
  "We choose a sample of 20 pages to audit, removing pages from duplicate templates.":
    "我们会选取 20 个页面作为样本进行审计，并去除重复模板中的页面。",
  "Render JavaScript": "渲染 JavaScript",
  "Loads each page in a browser before auditing it. Slower.":
    "审计前先在浏览器中加载每个页面。速度较慢。",
  "Please enter a URL.": "请输入 URL。",
  "Failed to start audit": "启动审计失败",
  "Audit started!": "审计已启动！",
  "Audit deleted": "审计已删除",
  "Start a large audit?": "开始一次大规模审计？",
  "Render up to {count} pages?": "渲染最多 {count} 个页面？",
  "Start audit": "开始审计",
  Continue: "继续",
  " Rendered audits can take longer than regular audits.":
    " 渲染审计可能比普通审计耗时更长。",
  "You are about to crawl {count} pages. This is okay, but it may take a while. Continue?":
    "你即将抓取 {count} 个页面。这样做没问题，但可能需要一些时间。要继续吗？",

  // History
  "Failed to load audit history": "加载审计历史失败",
  "No audits yet": "还没有审计",
  "Previous Audits": "历史审计",
  Date: "日期",
  Status: "状态",
  Pages: "页面",
  Lighthouse: "Lighthouse",
  Yes: "是",
  Delete: "删除",
  "This removes the audit's results and history. This cannot be undone.":
    "这会移除该审计的结果和历史记录，且无法撤销。",

  // Detail page
  "All audits": "所有审计",
  "We could not load this audit. It may have been deleted.":
    "无法加载这次审计，它可能已被删除。",
  "Site audit · Started {time}": "网站审计 · 开始时间 {time}",
  Running: "运行中",
  Done: "完成",
  Failed: "失败",
  "This audit stopped before it crawled any pages.":
    "这次审计在抓取任何页面之前就停止了。",
  "Run a new audit to try again, or email {email} if this keeps happening.":
    "请运行一次新审计重试；如果问题持续出现，请发邮件到 {email}。",
  "Code: {code}": "代码：{code}",
  "This site's bot protection blocked our crawler.":
    "该网站的机器人防护拦截了我们的爬虫。",
  "This audit stopped early after {count} pages.":
    "这次审计在抓取 {count} 个页面后提前停止。",
  "The results below cover everything crawled before it stopped. Run a new audit to try again, or email {email} if this keeps happening.":
    "以下结果覆盖了停止前抓到的所有页面。请运行一次新审计重试；如果问题持续出现，请发邮件到 {email}。",
  "Failed to load the audit results": "加载审计结果失败",

  // Progress card
  Discovery: "发现页面",
  Crawling: "抓取中",
  Finalizing: "收尾中",
  "Running Lighthouse checks": "正在运行 Lighthouse 检查",
  "Crawling pages": "正在抓取页面",
  "{done} / {total} checks": "{done} / {total} 项检查",
  " ({failed} failed)": "（{failed} 项失败）",
  "{done} / {total} pages": "{done} / {total} 个页面",
  "Crawled Pages ({count})": "已抓取页面（{count}）",
  "Updated {time}": "更新于 {time}",

  // Results: tabs, stats, alerts
  Issues: "问题",
  "Issues ({count})": "问题（{count}）",
  "Pages ({count})": "页面（{count}）",
  "Performance ({count})": "性能（{count}）",
  "Pages crawled": "已抓取页面",
  "Issues found": "发现问题",
  Critical: "严重",
  Warning: "警告",
  Info: "提示",
  "Average response time": "平均响应时间",
  "Lighthouse tests": "Lighthouse 测试",
  "Lighthouse performance": "Lighthouse 性能",
  "Lighthouse SEO": "Lighthouse SEO",
  "Lighthouse accessibility": "Lighthouse 可访问性",
  "Lighthouse failures": "Lighthouse 失败",
  "Bot protection blocked our crawler on {count} pages.":
    "机器人防护在 {count} 个页面上拦截了我们的爬虫。",
  "Bot protection blocked our crawler on 1 page.":
    "机器人防护在 1 个页面上拦截了我们的爬虫。",
  "The crawl stopped early because of the site’s rate limit.":
    "由于网站的速率限制，抓取提前停止了。",
  "The site rate limited us on {count} pages.":
    "网站在 {count} 个页面上对我们进行了限流。",
  "The site rate limited us on 1 page.": "网站在 1 个页面上对我们进行了限流。",
  "The site kept refusing pages, so some URLs were left unvisited. This report is incomplete. ":
    "网站持续拒绝抓取页面，因此部分 URL 未被访问。这份报告不完整。",
  "Pages that returned 429 Too Many Requests could not be audited. ":
    "返回 429 Too Many Requests 的页面无法被审计。",
  "OpenSEO-Audit crawler": "OpenSEO-Audit 爬虫",

  // Rendering warnings
  "Some pages may need JavaScript to show their content.":
    "部分页面可能需要 JavaScript 才能显示内容。",
  "They were still loading after rendering, so we couldn't check them.":
    "渲染后它们仍在加载中，因此我们无法检查它们。",
  "Turn on Render JavaScript and run the audit again to check them.":
    "请开启渲染 JavaScript 并重新运行审计来检查它们。",
  "We couldn't read {count} pages.": "我们无法读取 {count} 个页面。",
  "We couldn't read 1 page.": "我们无法读取 1 个页面。",
  "To see them, open Pages and filter Crawl result by Failed.":
    "要查看它们，请打开“页面”标签并将“抓取结果”筛选为“失败”。",
  "JavaScript rendering was enabled for this audit.":
    "本次审计启用了 JavaScript 渲染。",

  // Bot protection advice
  "Turn on Render JavaScript and run the audit again.":
    "请开启渲染 JavaScript 并重新运行审计。",
  "To avoid the extra cost, use a free desktop crawler like":
    "。为避免额外费用，可以使用",
  "Rendering couldn't get past it. ": "渲染也无法绕过它。",
  "Try a free desktop crawler like": "可以试试",
  or: "或",

  // Issues view
  "No issues found.": "未发现问题。",
  "Every crawled page passed the issue checks.":
    "所有抓取的页面都通过了问题检查。",
  "How to fix: ": "修复方法：",
  "{count} pages": "{count} 个页面",
  "1 page": "1 个页面",
  "…and {count} more — export the issues CSV for the full list.":
    "…还有 {count} 条——导出问题 CSV 可查看完整列表。",

  // Pages table
  URL: "URL",
  Title: "标题",
  Words: "字数",
  Images: "图片",
  Speed: "速度",
  "Fetching or rendering failed, so this page was not checked for content issues.":
    "抓取或渲染失败，因此未对该页面进行内容问题检查。",
  missing: "缺失",
  redirect: "重定向",
  "No pages crawled": "未抓取到任何页面",

  // Pages/performance filter bar
  Search: "搜索",
  "URL, title, meta": "URL、标题、meta",
  All: "全部",
  Missing: "缺失",
  "Crawl result": "抓取结果",
  Read: "正常读取",
  Blocked: "被拦截",
  "Rate limited": "被限流",
  "Alt text": "Alt 文本",
  "Missing alt": "缺少 alt",
  "No missing alt": "不缺少 alt",
  "Speed ms": "速度（毫秒）",
  "Max LCP s": "最大 LCP（秒）",
  Device: "设备",
  Desktop: "桌面端",
  Mobile: "移动端",
  OK: "正常",
  Perf: "性能",
  "No Lighthouse results": "没有 Lighthouse 结果",

  // Performance table
  "Lighthouse returned no category scores": "Lighthouse 未返回任何类目得分",
  failed: "失败",
  ok: "正常",
  "View issues": "查看问题",

  // Shopify warnings
  "We ran into an error with your Shopify domain.":
    "你的 Shopify 域名遇到了错误。",
  "Shopify is globally rate limiting, so this report is incomplete. To complete the audit, start a new one with Render JavaScript turned on.":
    "Shopify 正在进行全局限流，因此这份报告不完整。要完成审计，请在开启渲染 JavaScript 的情况下重新开始一次。",
  "Start a new audit": "开始新审计",
  "A signature can't be saved here until crawler access is set up.":
    "在设置好爬虫访问权限之前，无法在这里保存签名。",
  "An admin sets {code} with {command}.":
    "管理员可以使用 {command} 设置 {code}。",
  "Starting…": "启动中…",
  "Re-run audit": "重新运行审计",
  "Shopify limited this crawl despite your signature. To check that it was created for {host}, paste it again in":
    "尽管有你的签名，Shopify 仍然限制了这次抓取。要确认签名是否是为 {host} 创建的，请到",
  ". If it was, Shopify is still throttling this store: re-run the audit later or with fewer pages.":
    "重新粘贴一次。如果是，说明 Shopify 仍在限制该店铺：稍后重新运行审计，或减少页面数。",
  "Project settings": "项目设置",
  "Crawler access is saved for {host}.": "{host} 的爬虫访问权限已保存。",
  "Re-run the audit to crawl with it.": "重新运行审计即可使用它抓取。",
  "Your Shopify signature for this store has expired.":
    "你在这个店铺的 Shopify 签名已过期。",
  "It ran out on {date}, so requests after that went out unsigned and Shopify limited them.":
    "签名于 {date} 过期，此后的请求未携带签名发出，被 Shopify 限制了。",
  " Signatures can't be renewed: create a fresh one in Shopify admin and paste it below to replace the stored values.":
    " 签名无法续期：请在 Shopify 后台创建一个新签名，并粘贴到下方以替换已保存的值。",
  "Shopify limited this crawl.": "Shopify 限制了这次抓取。",
  "Shopify rate-limits crawlers it hasn't authorized, so parts of this report are missing.":
    "Shopify 会对未经授权的爬虫进行限流，因此这份报告缺少部分内容。",
  " If you own this store, authorizing OpenSEO takes about a minute.":
    " 如果你拥有这家店铺，授权 OpenSEO 大约只需一分钟。",
  "In Shopify admin, go to Online Store → Preferences → Crawler access and click Create signature.":
    "在 Shopify 后台，进入 Online Store → Preferences → Crawler access，点击 Create signature。",
  "Pick the domain {host} and an expiry (up to 3 months).":
    "选择域名 {host} 和有效期（最长 3 个月）。",
  "Paste the two values below.": "把两个值粘贴到下方。",
  "Shopify's crawler access guide": "Shopify 爬虫访问指南",

  // Added during component wiring
  "This audit stopped early after 1 page.":
    "这次审计在抓取 1 个页面后提前停止。",
  "Run a new audit to try again, or email":
    "请运行一次新审计重试；如果问题持续出现，请发邮件至",
  "if this keeps happening.": "。",
  "The results below cover everything crawled before it stopped. Run a new audit to try again, or email":
    "以下结果覆盖了停止前抓到的所有页面。请运行一次新审计重试；如果问题持续出现，请发邮件至",
  "Re-run the audit after the rate limit resets, or ask the site owner to allow the":
    "等速率限制重置后重新运行审计，或请网站所有者允许",
  ".": "。",
  "Sites that block our browser need an advanced renderer. If the cost is higher than expected, it will stop.":
    "拦截我们浏览器的网站需要高级渲染器。如果费用高于预期，它会自动停止。",
  "JavaScript rendering isn't set up on your Every App gateway yet. An owner or admin sets it with {command}.":
    "你的 Every App 网关尚未配置 JavaScript 渲染。所有者或管理员可以使用 {command} 完成设置。",
  "This deployment has no browser, so rendering needs a Context.dev API key. Set CONTEXT_API_KEY, restart OpenSEO, then reload this page.":
    "此部署没有浏览器，渲染需要 Context.dev API 密钥。设置 CONTEXT_API_KEY，重启 OpenSEO，然后重新加载此页面。",
  View: "查看",
  "Audit actions": "审计操作",
  "Delete audit": "删除审计",
  "Delete this audit?": "删除这次审计？",
};
