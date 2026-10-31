/**
 * Google integrations (Search Console / Analytics connection UI), Shopify
 * crawler access and IndexNow settings. Property names, emails, domains and
 * API identifiers never translate.
 */
export const integrationMessages: Record<string, string> = {
  // Connection states & picker
  Name: "名称",
  Domain: "域名",
  "Or ask your agent:": "或者问你的智能体：",
  "change this project's connection": "更改此项目的连接",
  "Target topic": "目标主题",
  "Edit {name}": "编辑 {name}",
  "Delete {name}": "删除 {name}",
  "Signature-Input": "Signature-Input",
  Signature: "Signature",
  "{name} connected": "{name} 已连接",
  "{name} disconnected from this project": "已从此项目断开 {name}",
  Dismiss: "关闭",
  "Loading connection": "正在加载连接状态",
  "Couldn't check this project's connection.": "无法检查此项目的连接状态。",
  Connected: "已连接",
  "Setup required": "需要完成设置",
  "Not connected": "未连接",
  "Manage Google accounts": "管理 Google 账号",
  "Choose property": "选择资源",
  "Loading properties…": "正在加载资源…",
  "Couldn't load properties.": "无法加载资源。",
  "Couldn't load properties": "无法加载资源",
  "Select a property…": "选择一个资源…",
  "Search properties": "搜索资源",
  "No matching properties.": "没有匹配的资源。",
  "No properties available. Check the Google accounts below.":
    "没有可用的资源。请检查下方的 Google 账号。",
  "Ask the property owner for Full access, or verify ownership in Search Console.":
    "请向资源所有者申请完整权限，或在 Search Console 中验证所有权。",
  "No verified access": "没有已验证的访问权限",
  "Google accounts": "Google 账号",
  "Connection expired": "连接已过期",
  "Search Console API isn't enabled": "Search Console API 未启用",
  "No websites found": "未找到网站",
  "No properties found": "未找到资源",
  "How to enable it ↗": "如何启用 ↗",
  "Opening Google…": "正在打开 Google…",
  Reconnect: "重新连接",
  "Try again": "重试",
  Remove: "移除",
  "Add Google account": "添加 Google 账号",
  "Having trouble?": "遇到问题？",
  "Setup guide ↗": "设置指南 ↗",
  "Saving…": "保存中…",
  "Save property": "保存资源",
  "Google account · {id}": "Google 账号 · {id}",
  "Refreshing…": "刷新中…",
  Refresh: "刷新",
  "Use a different Google account": "使用其他 Google 账号",

  // GSC property setup help
  "We couldn’t find your website": "没有找到你的网站",
  "We checked {accounts}.": "我们检查了 {accounts}。",
  "Add your site to Search Console, or ask whoever manages it to give this account access.":
    "请把你的网站添加到 Search Console，或请网站管理者为该账号授权。",
  "Add your site to Search Console, or ask whoever manages it to give one of these accounts access.":
    "请把你的网站添加到 Search Console，或请网站管理者为其中任一账号授权。",
  "Open Search Console ↗": "打开 Search Console ↗",
  "Setup guide": "设置指南",

  // Empty / connected states
  "Choose a {name} property to finish connecting this project.":
    "选择一个 {name} 资源，完成此项目的连接。",
  "Connect {name} to see this project’s data.":
    "连接 {name} 以查看此项目的数据。",
  Connect: "连接",
  "Change property or account": "更改资源或账号",
  "Disconnect project": "断开项目连接",
  "Disconnecting…": "断开连接中…",

  // OAuth setup warnings
  "Add Google to Every App first": "请先在 Every App 中添加 Google",
  "An owner or admin does this once: create a Google OAuth client with the redirect URI":
    "所有者或管理员只需做一次：使用重定向 URI",
  ", then paste its client ID and secret in Every App under Manage workspace → Providers, or run":
    " 创建 Google OAuth 客户端，然后在 Every App 的 Manage workspace → Providers 中粘贴其客户端 ID 和密钥，或运行",
  ". Then connect": "。然后在这里连接",
  "here.": "。",
  "How to add a provider": "如何添加提供商",
  "Google OAuth client not configured": "Google OAuth 客户端未配置",
  "Add your Google client ID and secret to this OpenSEO deployment before connecting {name}.":
    "在连接 {name} 之前，请先把你的 Google 客户端 ID 和密钥添加到这个 OpenSEO 部署。",
  "Open setup guide": "打开设置指南",

  // Account removal dialog
  "Remove Google account?": "移除 Google 账号？",
  "This removes the account's {name} connection from OpenSEO. You can reconnect it anytime.":
    "这会移除该账号在 OpenSEO 中的 {name} 连接。你随时可以重新连接。",
  "Google account removed": "Google 账号已移除",
  "Checking connected projects…": "正在检查已连接的项目…",
  "Couldn't check connected projects.": "无法检查已连接的项目。",
  "This will also disconnect {name} from {count} projects.":
    "这也会在 {count} 个项目中断开 {name}。",
  "This will also disconnect {name} from 1 project.":
    "这也会在 1 个项目中断开 {name}。",
  "No projects will be affected.": "不会影响任何项目。",
  "Removing…": "移除中…",
  "Remove account": "移除账号",

  // Google link errors
  "{what} didn't finish": "{what}未完成",
  "{what} was canceled": "{what}已取消",
  "{what} is missing a permission": "{what}缺少一项权限",
  "The attempt expired or was interrupted. Try again in a single browser tab and finish the Google steps within 10 minutes. If it keeps happening, make sure your browser allows cookies for this site.":
    "该尝试已过期或被中断。请在单个浏览器标签页中重试，并在 10 分钟内完成 Google 的步骤。如果反复出现，请确保浏览器允许此网站使用 Cookie。",
  "Google's permission screen was closed or declined. Try again whenever you're ready.":
    "Google 的授权页面被关闭或拒绝了。准备好后随时可以重试。",
  "OpenSEO didn't get access to your {what} data because a box on Google's permission screen wasn't checked. Try again and check every box before you continue.":
    "OpenSEO 没有获得你的 {what} 数据访问权限，因为 Google 授权页面上有一个选项未勾选。请重试，并确保勾选所有选项后再继续。",
  "We couldn't save the connection. Please try again — if it keeps failing, contact support.":
    "无法保存连接。请重试——如果反复失败，请联系支持团队。",
  "Something went wrong while talking to Google. Please try again — if it keeps failing, contact support.":
    "与 Google 通信时出了问题。请重试——如果反复失败，请联系支持团队。",

  // Crawler access form & settings
  "Enter a domain.": "请输入域名。",
  "Enter Signature-Input.": "请输入 Signature-Input。",
  "This signature has already expired. Create a new one in Shopify admin.":
    "此签名已过期。请在 Shopify 后台创建一个新签名。",
  "Enter Signature.": "请输入 Signature。",
  "Crawler access saved for {host}": "已为 {host} 保存爬虫访问权限",
  "This signature was created for {signedHost}, not {host}. In Shopify admin, create a signature for {host}.":
    "此签名是为 {signedHost} 创建的，而不是 {host}。请在 Shopify 后台为 {host} 创建签名。",
  "Shopify won't accept this signature for {host}. Check that you created it for {host} and copied both values in full.":
    "Shopify 不接受 {host} 的此签名。请确认你为 {host} 创建了签名，并完整复制了两个值。",
  "Crawler access isn't set up yet.": "爬虫访问权限尚未设置。",
  "An admin sets {code} with {command}.":
    "管理员可以使用 {command} 设置 {code}。",
  "Shopify also shows a Signature-Agent value. You don't need to paste it: OpenSEO sends it with every request.":
    "Shopify 还会显示一个 Signature-Agent 值。你不需要粘贴它：OpenSEO 会在每次请求中自动发送。",
  "Save signature": "保存签名",
  Type: "类型",
  Added: "添加时间",
  Expires: "过期时间",
  "Shopify signature": "Shopify 签名",
  Unknown: "未知",
  Expired: "已过期",
  "Remove crawler access for {host}": "移除 {host} 的爬虫访问权限",
  "Crawler access removed": "爬虫访问权限已移除",
  "Let the audit crawler through Shopify. Paste the signature you created in Shopify admin under Online Store → Preferences → Crawler access. Every audit of that domain in your organization sends it with each request.":
    "让审计爬虫通过 Shopify。把你是在 Shopify 后台 Online Store → Preferences → Crawler access 中创建的签名粘贴到这里。组织中对该域名的每次审计都会随每个请求发送它。",
  "We couldn't load your crawler access.": "无法加载你的爬虫访问权限。",

  // IndexNow
  "Enter at least one URL.": "请至少输入一个 URL。",
  Found: "已找到",
  "Not found": "未找到",
  "Should contain only the key": "应只包含密钥本身",
  "Redirects. The file must load at this address itself":
    "存在重定向。文件必须能在此地址直接访问",
  "Redirects to another address": "重定向到了其他地址",
  "Couldn't reach this address": "无法访问此地址",
  "Couldn't check right now": "暂时无法检查",
  "1 URL": "1 个 URL",
  "{count} URLs": "{count} 个 URL",
  "Submitted {count} URLs": "已提交 {count} 个 URL",
  "Skipped {count} URLs not on {domain}":
    "已跳过 {count} 个不属于 {domain} 的 URL",
  "Couldn't submit to IndexNow": "无法提交到 IndexNow",
  "Couldn't load IndexNow.": "无法加载 IndexNow。",
  "Tell Bing about new and updated pages as soon as you publish them, instead of waiting for it to crawl your site. Bing also powers DuckDuckGo and Yahoo results. Google doesn't use IndexNow.":
    "发布新页面或更新页面后立即告知 Bing，而不用等它来抓取你的网站。Bing 也为 DuckDuckGo 和 Yahoo 提供搜索结果。Google 不使用 IndexNow。",
  "Add your website in General settings to use IndexNow.":
    "请在“常规”设置中添加你的网站以使用 IndexNow。",
  "Set up IndexNow": "设置 IndexNow",
  "Submit pages when you publish or update them": "发布或更新页面时提交它们",
  "Paste just the pages that changed, not your whole site.":
    "只粘贴有变化的页面，而不是整个网站。",
  "URLs (one per line)": "URL（每行一个）",
  "Submit to IndexNow": "提交到 IndexNow",
  "Or ask your agent: ": "或者问你的智能体：",
  "Copy prompt": "复制提示词",
  "Prompt copied": "提示词已复制",
  "If it can edit your site's code, it can add the key file too.":
    "如果它能修改你网站的代码，它也能添加密钥文件。",
  "Your key file is set up": "你的密钥文件已设置完成",
  "Add this key file to your site": "把这个密钥文件添加到你的网站",
  "Download key file": "下载密钥文件",
  "Put it at the root of your site, so it opens at:":
    "把它放在网站的根目录，使其可以在以下地址打开：",
  "Check again": "再次检查",
  "How do I add a file to my site?": "如何把文件添加到我的网站？",
  "Site built from code: put the file in the folder your site serves as-is, often called <code>public</code> or <code>static</code>.":
    "代码构建的网站：把文件放到网站原样提供的目录中，通常叫 <code>public</code> 或 <code>static</code>。",
  "WordPress: upload it with your host's file manager or SFTP to the folder that holds <code>wp-config.php</code>. SEO plugins like Rank Math can also submit to IndexNow for you.":
    "WordPress：通过主机的文件管理器或 SFTP 把文件上传到 <code>wp-config.php</code> 所在的目录。Rank Math 等 SEO 插件也可以代你提交到 IndexNow。",
  "On Cloudflare: turn on Crawler Hints in Cloudflare's caching settings and it submits changed pages to IndexNow for you.":
    "在 Cloudflare 上：在 Cloudflare 的缓存设置中开启 Crawler Hints，它会代你把变化的页面提交到 IndexNow。",
  "Website builders like Webflow, Shopify, Squarespace and Wix usually don't let you add files at the root. Check whether yours already supports IndexNow.":
    "Webflow、Shopify、Squarespace 和 Wix 等建站工具通常不允许在根目录添加文件。请检查你使用的平台是否已支持 IndexNow。",
};
