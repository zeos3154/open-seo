/**
 * Site-audit issue descriptors, keyed by their English source text from
 * `src/shared/audit-issues.ts` (canonical for server, MCP and exports). The
 * audit UI translates these at display only; issue ids, severity values and
 * export payloads keep the canonical English.
 */
export const auditIssueMessages: Record<string, string> = {
  // blocked-page
  "Crawler was blocked": "爬虫被拦截",
  "The site returned a bot challenge or access denial (e.g. a Cloudflare challenge or a 403) instead of the page. We report this honestly rather than pretending the page is broken — but it means this page could not be audited, and other crawlers like search engines may face similar friction.":
    "网站返回了机器人质询或访问拒绝（例如 Cloudflare 质询或 403），而不是页面内容。我们如实报告，而不是假装页面已损坏——但这意味着该页面无法被审计，而且搜索引擎等其他爬虫也可能遇到同样的阻碍。",
  'If you own this site, allowlist the "OpenSEO-Audit" user agent in your WAF/bot-protection settings (on Cloudflare: a WAF custom rule that skips bot protection when the user agent contains "OpenSEO-Audit"; on some free tiers you may need to relax bot protection). Then re-run the audit. On Shopify, use Crawler access instead (Online Store → Preferences → Crawler access) and paste the signature into OpenSEO under Settings → Crawler access. How to allow and verify the crawler: https://openseo.so/docs/crawler':
    '如果你是这个网站的所有者，请在 WAF/机器人防护设置中将 "OpenSEO-Audit" User-Agent 加入白名单（在 Cloudflare 上：添加一条 WAF 自定义规则，当 User-Agent 包含 "OpenSEO-Audit" 时跳过机器人防护；某些免费套餐可能需要放宽机器人防护）。然后重新运行审计。在 Shopify 上，请改用 Crawler access（Online Store → Preferences → Crawler access），并将签名粘贴到 OpenSEO 的 Settings → Crawler access 中。如何允许并验证爬虫：https://openseo.so/docs/crawler',

  // javascript-rendering-suspected
  "Content may require JavaScript": "内容可能需要 JavaScript",
  "The page's HTML contains a JavaScript app container with very little readable content and no headings, links, or images. The page may load its content in the browser, or it was still loading when rendered. Content checks were skipped because this HTML may not represent the complete page.":
    "页面的 HTML 包含一个 JavaScript 应用容器，可读内容极少，且没有标题、链接或图片。页面可能在浏览器中加载内容，或者在渲染时仍在加载中。由于此 HTML 可能不代表完整页面，内容检查已被跳过。",
  'If this audit did not render JavaScript, start a new audit with "Render JavaScript" enabled to check the loaded content. For reliable crawling, serve important content and navigation in the initial HTML using server-side rendering or prerendering. This warning does not prove that search engines cannot index the page.':
    '如果本次审计没有渲染 JavaScript，请开启"渲染 JavaScript"重新运行一次审计，以检查加载后的内容。为了可靠抓取，请使用服务端渲染或预渲染，把重要内容和导航放进初始 HTML。此警告并不证明搜索引擎无法收录该页面。',

  // rate-limited-page
  "Rate limited (429)": "被限流（429）",
  "The server answered 429 Too Many Requests, so this page could not be audited. The crawler paused for the server's Retry-After and tried the page once more before moving on.":
    "服务器返回了 429 Too Many Requests，因此该页面无法被审计。爬虫按照服务器的 Retry-After 暂停后，又重试了一次该页面，然后继续。",
  'Raise the rate limit for crawlers, or allowlist the "OpenSEO-Audit" user agent in your rate-limiting rules (on Cloudflare: a rate-limiting rule exception matching that user agent). Then re-run the audit. Re-running with fewer pages also helps if the limit is strict. On Shopify, use Crawler access instead (Online Store → Preferences → Crawler access) and paste the signature into OpenSEO under Settings → Crawler access. How to allow and verify the crawler: https://openseo.so/docs/crawler':
    '提高爬虫的速率限制，或在限流规则中将 "OpenSEO-Audit" User-Agent 加入白名单（在 Cloudflare 上：添加一条匹配该 User-Agent 的限流规则例外）。然后重新运行审计。如果限制非常严格，减少页面数重新运行也有帮助。在 Shopify 上，请改用 Crawler access（Online Store → Preferences → Crawler access），并将签名粘贴到 OpenSEO 的 Settings → Crawler access 中。如何允许并验证爬虫：https://openseo.so/docs/crawler',

  // crawl-rate-limited
  "Crawl stopped early: rate limit": "抓取提前停止：达到速率限制",
  "The site refused several pages in a row with 429 Too Many Requests, or kept the crawler waiting for too long, so we stopped requesting pages. This report is incomplete; URLs we did not fetch are not recorded as broken or rate limited.":
    "网站连续多页返回 429 Too Many Requests 拒绝抓取，或让爬虫等待过久，因此我们停止了请求。这份报告不完整；未抓取的 URL 不会记为损坏或被限流。",
  "Re-run the audit after the site's rate limit resets, or ask the site owner to allow the OpenSEO-Audit crawler (https://openseo.so/docs/crawler). On Shopify, use Crawler access instead (Online Store → Preferences → Crawler access) and paste the signature into OpenSEO under Settings → Crawler access.":
    "等网站的速率限制重置后重新运行审计，或请网站所有者允许 OpenSEO-Audit 爬虫（https://openseo.so/docs/crawler）。在 Shopify 上，请改用 Crawler access（Online Store → Preferences → Crawler access），并将签名粘贴到 OpenSEO 的 Settings → Crawler access 中。",

  // crawl-time-limit
  "Crawl stopped early: time limit": "抓取提前停止：达到时间限制",
  "Audits that render JavaScript stop crawling after 22 hours, and this one reached that limit. This report is incomplete; URLs we did not fetch are not recorded as broken.":
    "渲染 JavaScript 的审计会在 22 小时后停止抓取，而这次审计达到了该限制。这份报告不完整；未抓取的 URL 不会记为损坏。",
  "Re-run the audit with a lower page limit, or without Render JavaScript if the site's content and links are in its HTML. Rendering is billed only for pages actually rendered.":
    "以更低的页面上限重新运行审计；如果网站的内容和链接都在 HTML 中，也可以关闭渲染 JavaScript。渲染只按实际渲染的页面计费。",

  // crawl-credits-exhausted
  "Crawl stopped early: cost limit reached": "抓取提前停止：达到费用上限",
  "Many pages on this site needed our advanced renderer, so the audit reached its cost limit and stopped. You were only charged for the pages we rendered.":
    "该网站的许多页面需要我们的高级渲染器，因此审计达到了费用上限并停止。我们只对实际渲染的页面收费。",
  "If the site doesn't need JavaScript to show its content, re-run with Render JavaScript off.":
    "如果网站不需要 JavaScript 就能展示内容，请关闭渲染 JavaScript 后重新运行。",

  // server-error
  "Server error (5xx)": "服务器错误（5xx）",
  "The page returned a 5xx server error. Search engines that repeatedly see server errors will crawl the site less and may drop the page from the index.":
    "页面返回了 5xx 服务器错误。反复出现服务器错误会让搜索引擎减少抓取，甚至可能把页面从索引中移除。",
  "Check the server logs for this URL and fix the underlying error. If the page is gone, return a 404/410 or redirect it to a relevant page instead of erroring.":
    "查看该 URL 的服务器日志并修复底层错误。如果页面已删除，请返回 404/410 或将其重定向到相关页面，而不是直接报错。",

  // broken-internal-link
  "Broken internal link": "内部链接损坏",
  "This page links to an internal URL that returns an error status (4xx/5xx). Broken links waste crawl budget, leak link equity, and frustrate users — they are among the most common and most damaging technical SEO issues.":
    "该页面链接到一个返回错误状态码（4xx/5xx）的内部 URL。损坏的链接浪费抓取预算、流失链接权重并让用户受挫——这是最常见、危害最大的技术 SEO 问题之一。",
  "Update the link to point at the correct live URL, or remove it. If the target was moved, prefer linking directly to the new URL rather than relying on a redirect.":
    "把链接更新为正确的有效 URL，或移除该链接。如果目标页面已迁移，尽量直接链接到新 URL，而不是依赖重定向。",

  // missing-title
  "Missing title tag": "缺少 title 标签",
  "The page has no <title>. The title is the strongest on-page relevance signal and the headline shown in search results; without it search engines generate one themselves, usually badly.":
    "页面没有 <title>。标题是最强的页面相关性信号，也是搜索结果中显示的标题；缺少时搜索引擎会自行生成一个，通常效果很差。",
  "Add a unique, descriptive <title> of roughly 50–60 characters that includes the page's primary topic.":
    "添加一个约 50–60 个字符、包含页面主要主题的唯一且描述性的 <title>。",

  // broken-page
  "Page returns an error (4xx)": "页面返回错误（4xx）",
  "This crawled URL returned a client error (e.g. 404). If it is referenced from your sitemap or other pages, crawlers keep wasting requests on it.":
    "这个被抓取的 URL 返回了客户端错误（如 404）。如果它出现在你的站点地图或其他页面中，爬虫会持续在它上面浪费请求。",
  "If the page should exist, restore it. If it is intentionally gone, remove it from the sitemap and internal links, and consider a 301 redirect to the closest live page.":
    "如果页面应该存在，请恢复它。如果是刻意删除的，请从站点地图和内部链接中移除它，并考虑 301 重定向到最接近的有效页面。",

  // duplicate-title
  "Duplicate title": "重复的标题",
  "Multiple pages share the same title tag. Search engines use titles to differentiate pages; duplicates make pages compete with each other and depress click-through rates.":
    "多个页面使用相同的 title 标签。搜索引擎靠标题区分页面；重复标题会让页面互相竞争，并拉低点击率。",
  "Write a unique title for each page describing its specific content. For templated pages, include the distinguishing attribute (name, category, location) in the template.":
    "为每个页面编写描述其具体内容的唯一标题。对于模板化页面，在模板中加入区分性属性（名称、类别、地区）。",

  // duplicate-meta-description
  "Duplicate meta description": "重复的 meta description",
  "Multiple pages share the same meta description, so search results show identical snippets and users cannot tell the pages apart.":
    "多个页面使用相同的 meta description，搜索结果会显示相同的摘要，用户无法区分这些页面。",
  "Write a unique meta description per page, or remove the duplicated one entirely — search engines will generate a snippet from page content, which beats a wrong duplicate.":
    "为每个页面编写唯一的 meta description，或完全删掉重复的那份——搜索引擎会根据页面内容生成摘要，这好过一个错误的重复。",

  // duplicate-content
  "Duplicate page content": "页面内容重复",
  "Two or more URLs serve byte-identical visible text. Search engines pick one version to index and ignore the rest, and ranking signals get split across the duplicates.":
    "两个或多个 URL 提供完全相同的可见文本。搜索引擎只会选择其中一个版本收录并忽略其余，排名信号也会被分散到各个重复页面上。",
  "Consolidate duplicates: pick the canonical URL, add rel=canonical from the others, and 301-redirect duplicate URLs where possible (common causes: trailing-slash variants, URL parameters, http/https or www variants).":
    "合并重复页面：选定规范 URL，在其他页面上添加 rel=canonical，并尽可能将重复 URL 301 重定向过去（常见原因：末尾斜杠变体、URL 参数、http/https 或 www 变体）。",

  // missing-meta-description
  "Missing meta description": "缺少 meta description",
  "The page has no meta description. Search engines will assemble a snippet from page text, which is often less compelling and hurts click-through rate.":
    "页面没有 meta description。搜索引擎会从页面文本拼凑摘要，通常不够吸引人，并损害点击率。",
  "Add a meta description of roughly 70–160 characters that summarizes the page and gives a reason to click.":
    "添加一段约 70–160 个字符的 meta description，概括页面内容并给用户一个点击的理由。",

  // missing-h1
  "Missing H1 heading": "缺少 H1 标题",
  "The page has no H1. The H1 tells users and search engines what the page is about; pages without one tend to have weaker topical clarity.":
    "页面没有 H1。H1 告诉用户和搜索引擎页面的主题；缺少 H1 的页面主题清晰度往往较弱。",
  "Add a single H1 that states the page's main topic, consistent with the title tag.":
    "添加一个与 title 标签一致、说明页面主要主题的 H1。",

  // multiple-h1
  "Multiple H1 headings": "多个 H1 标题",
  "The page has more than one H1, which dilutes the main-topic signal and usually indicates a templating mistake (e.g. a logo and a headline both marked up as H1).":
    "页面有多个 H1，这会稀释主主题信号，通常意味着模板错误（例如 logo 和标题都被标记成了 H1）。",
  "Keep one H1 for the page's main heading and demote the others to H2/H3 (or unstyled elements for non-headings like logos).":
    "保留一个 H1 作为页面主标题，把其余降级为 H2/H3（logo 等非标题内容则改用无样式的元素）。",

  // redirect-chain
  "Redirect chain": "重定向链",
  "Reaching the final page requires two or more consecutive redirects. Each hop adds latency, leaks link equity, and burns crawl budget; long chains may not be followed at all.":
    "到达最终页面需要连续两次或更多次重定向。每一跳都会增加延迟、流失链接权重并消耗抓取预算；过长的重定向链可能完全不会被跟随。",
  "Point the first URL (and any internal links) directly at the final destination so there is at most one redirect.":
    "让第一个 URL（以及所有内部链接）直接指向最终目标，使重定向最多只有一次。",

  // redirect-loop
  "Redirect loop": "重定向循环",
  "This redirect eventually points back to itself, so the URL never resolves. Browsers and crawlers give up with an error.":
    "这个重定向最终又指回自身，URL 永远无法解析。浏览器和爬虫最终会报错放弃。",
  "Trace the redirect rules for this URL and break the cycle so the chain terminates at a real 200 page.":
    "排查该 URL 的重定向规则并打破循环，让重定向链终止在一个真正的 200 页面上。",

  // canonical-conflict
  "Conflicting canonical signals": "canonical 信号冲突",
  "The page declares different canonical URLs in its HTML <link rel=canonical> and its HTTP Link header. When signals conflict, search engines ignore both and choose their own canonical.":
    "页面在 HTML <link rel=canonical> 和 HTTP Link 头中声明了不同的规范 URL。当信号冲突时，搜索引擎会忽略两者并自行选择规范页面。",
  "Pick one canonical URL and declare it in exactly one place (HTML head is the most common); remove or align the other declaration.":
    "选定一个规范 URL 并只在一处声明（最常见的是 HTML head）；移除或对齐另一处声明。",

  // thin-content
  "Thin content": "内容单薄",
  "The page has very little visible text. Thin pages rarely rank, can drag down sitewide quality assessments, and (if the site renders client-side) may indicate content invisible to plain-HTML crawlers.":
    "页面的可见文本很少。内容单薄的页面很难获得排名，还可能拖累整站的质量评估；如果网站在客户端渲染，这也可能意味着纯 HTML 爬虫看不到这些内容。",
  "Either expand the page with genuinely useful content, noindex it, or consolidate it into a stronger page. If the content exists but is rendered by JavaScript, ensure it is server-rendered or pre-rendered.":
    "要么用真正有用的内容扩充页面，要么设置 noindex，要么把它合并到更强的页面中。如果内容存在但由 JavaScript 渲染，请确保它是服务端渲染或预渲染的。",

  // images-missing-alt
  "Images missing alt text": "图片缺少 alt 文本",
  "One or more images on the page lack alt attributes. Alt text is an accessibility requirement and the main way search engines understand images.":
    "页面上有一张或多张图片缺少 alt 属性。alt 文本是可访问性要求，也是搜索引擎理解图片的主要途径。",
  'Add descriptive alt text to meaningful images; use an empty alt (alt="") only for purely decorative ones.':
    '为有实际意义的图片添加描述性 alt 文本；纯装饰性图片才使用空 alt（alt=""）。',

  // orphan-page
  "Orphan page": "孤立页面",
  "No crawled page links to this URL — it was only discoverable via the sitemap. Pages without internal links receive little crawl attention and no internal link equity, and users can't find them by browsing.":
    "没有任何被抓取的页面链接到该 URL——只能通过站点地图发现它。没有内部链接的页面几乎得不到抓取，也拿不到内部链接权重，用户也无法通过浏览找到它们。",
  "Link to this page from relevant pages (navigation, related content, hub pages), or remove it from the sitemap if it shouldn't be indexed.":
    "从相关页面（导航、相关内容、聚合页）链接到该页面；如果不希望它被收录，就把它从站点地图中移除。",

  // no-outgoing-links
  "Page has no outgoing links": "页面没有出站链接",
  "The page contains no links at all — a dead end. Link equity that flows into it stops there, crawlers have nowhere to go next, and users have to reach for the back button.":
    "页面完全没有任何链接——是一条死路。流入它的链接权重到此为止，爬虫也无路可走，用户只能点返回按钮。",
  "Add links to related pages, the parent category, or the homepage. If the page's navigation is rendered by JavaScript, make sure it also exists in the server-rendered HTML.":
    "添加指向相关页面、上级分类或首页的链接。如果页面导航由 JavaScript 渲染，请确保服务端渲染的 HTML 中也存在导航。",

  // title-too-long
  "Title too long": "标题过长",
  "The title exceeds ~60 characters, so search results will truncate it and the ending may be cut off mid-phrase.":
    "标题超过约 60 个字符，搜索结果会截断它，结尾可能在短语中间被切断。",
  "Shorten the title to roughly 50–60 characters, front-loading the most important words.":
    "把标题缩短到约 50–60 个字符，把最重要的词放在前面。",

  // title-too-short
  "Title too short": "标题过短",
  "The title is under ~10 characters, which is usually too generic to describe the page or attract clicks.":
    "标题不足约 10 个字符，通常过于笼统，既描述不了页面也吸引不了点击。",
  "Expand the title into a descriptive phrase (roughly 30–60 characters) that states what the page offers.":
    "把标题扩写成描述性短语（约 30–60 个字符），说明页面提供什么。",

  // meta-description-too-long
  "Meta description too long": "Meta description 过长",
  "The meta description exceeds ~160 characters, so search engines will truncate the snippet.":
    "meta description 超过约 160 个字符，搜索引擎会截断摘要。",
  "Trim the description to roughly 70–160 characters while keeping the core message and call to action.":
    "把描述精简到约 70–160 个字符，同时保留核心信息和行动号召。",

  // meta-description-too-short
  "Meta description too short": "Meta description 过短",
  "The meta description is under ~70 characters. Short descriptions waste the snippet space search results give you, and search engines often ignore them in favor of text pulled from the page.":
    "meta description 不足约 70 个字符。过短的描述浪费了搜索结果给你的摘要空间，搜索引擎往往也会忽略它，转而提取页面文本。",
  "Expand the description to roughly 70–160 characters that summarize the page and give a reason to click.":
    "把描述扩写到约 70–160 个字符，概括页面内容并给用户一个点击的理由。",

  // heading-order-skip
  "Heading levels skip": "标题层级跳跃",
  "The heading hierarchy skips levels (e.g. an H4 directly after an H2). This weakens document structure for accessibility tools and content parsing.":
    "标题层级出现跳跃（例如 H2 之后直接是 H4）。这会削弱文档结构，不利于无障碍工具和内容解析。",
  "Adjust heading levels so they descend one step at a time (H1 → H2 → H3) without skipping.":
    "调整标题层级，让它逐级下降（H1 → H2 → H3），不要跳级。",

  // slow-response
  "Slow server response": "服务器响应缓慢",
  "The HTML response took over 1.5 seconds. Slow time-to-first-byte drags down every downstream performance metric and reduces crawl rate on large sites.":
    "HTML 响应超过 1.5 秒。首字节时间过慢会拖累所有下游性能指标，并降低大站的抓取频率。",
  "Investigate server/database time and caching for this route; serving cached or statically generated HTML usually fixes it.":
    "排查该路由的服务器/数据库耗时与缓存；返回缓存或静态生成的 HTML 通常能解决问题。",

  // noindex-page
  "Page is noindex": "页面为 noindex",
  "The page asks search engines not to index it (via robots meta tag or X-Robots-Tag header). That's often intentional — this is a heads-up, not an error.":
    "页面要求搜索引擎不要收录它（通过 robots meta 标签或 X-Robots-Tag 头）。这通常是有意为之——这是提醒，不是错误。",
  "If this page should rank, remove the noindex directive. If it's intentional (admin, thank-you, filter pages), no action is needed.":
    "如果该页面需要参与排名，请移除 noindex 指令。如果是有意的（后台、感谢页、筛选页），则无需处理。",

  // canonicalized-page
  "Canonicalized to another URL": "canonical 指向了其他 URL",
  "The page declares a different URL as its canonical, telling search engines to index that URL instead. Fine when intentional (parameter pages, syndication) — a problem if this page was meant to rank.":
    "页面把另一个 URL 声明为规范页面，让搜索引擎改为收录那个 URL。有意为之时没问题（参数页、联合发布）——但如果这个页面本应参与排名，那就是问题。",
  "If this page should rank on its own, set its canonical to itself. Otherwise no action is needed.":
    "如果该页面应独立参与排名，请把它的 canonical 设为自己。否则无需处理。",

  // deep-page
  "Page is deep in the site structure": "页面位于网站结构深层",
  "The page is 5+ clicks from the homepage. Deep pages get crawled less often and receive less link equity.":
    "页面距离首页 5 次点击以上。深层页面被抓取的频率更低，获得的链接权重也更少。",
  "Add links from higher-level pages (hubs, category pages, navigation) to flatten the path to this page.":
    "从更高级的页面（聚合页、分类页、导航）添加链接，缩短到达该页面的路径。",
};
