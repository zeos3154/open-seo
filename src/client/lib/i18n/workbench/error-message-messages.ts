import { FREE_MAX_AUDIT_PAGES } from "@/shared/audit-limits";

/**
 * Error catalog copy, keyed by the exact English messages produced by
 * `src/client/lib/error-messages.ts` (both hosted and self-hosted variants).
 * Unknown server-provided strings fall back to themselves (English).
 */
const auditPageLimitMessage = `Free plan audits are limited to ${FREE_MAX_AUDIT_PAGES} pages. Upgrade to run larger audits.`;

export const errorMessageMessages: Record<string, string> = {
  [auditPageLimitMessage]: `免费套餐的审计最多 ${FREE_MAX_AUDIT_PAGES} 个页面。升级后可以运行更大规模的审计。`,

  "Something went wrong on our end. Please try again, and contact support if it keeps happening.":
    "我们这边出了点问题。请重试；如果反复出现，请联系支持团队。",
  "Something went wrong. Please try again, or check the server logs for details.":
    "出了点问题。请重试，或查看服务器日志了解详情。",

  "Please sign in and try again.": "请登录后重试。",
  "OpenSEO can't reach your Every App gateway for this right now. An owner or admin can check its setup with pnpm everyapp status.":
    "OpenSEO 目前无法连接你的 Every App 网关来完成此操作。所有者或管理员可以使用 pnpm everyapp status 检查其配置。",
  "OpenSEO auth is not configured. Follow the README setup steps for Cloudflare Access.":
    "OpenSEO 的身份验证尚未配置。请按照 README 中的 Cloudflare Access 设置步骤操作。",
  "An active hosted subscription is required before you can use OpenSEO.":
    "需要有效的托管订阅才能使用 OpenSEO。",
  "You don't have enough credits for this. Upgrade your plan or buy more credits to keep going.":
    "你的积分不足。请升级套餐或购买更多积分以继续。",
  "We couldn't charge a card on file. Add or update your card in the billing portal, then try again.":
    "我们无法从你保存的银行卡扣款。请在账单门户中添加或更新银行卡，然后重试。",
  "Your bank needs more time or a confirmation for this charge. Check your balance in a minute; if nothing arrived, buy your first top-up with the Buy credits button, then turn on auto-reload.":
    "你的银行需要更多时间或确认这笔扣款。请稍后查看余额；如果扣款未到账，请先用“购买积分”按钮完成首次充值，然后开启自动充值。",
  "JavaScript rendering isn't set up on your Every App gateway yet. An owner or admin sets it with pnpm everyapp secret set CONTEXT_API_KEY.":
    "你的 Every App 网关尚未配置 JavaScript 渲染。所有者或管理员可以使用 pnpm everyapp secret set CONTEXT_API_KEY 完成设置。",
  "JavaScript rendering is not configured on this deployment. Ask your administrator to enable a renderer.":
    "此部署尚未配置 JavaScript 渲染。请让你的管理员启用渲染器。",
  "You do not have access to this resource.": "你没有访问此资源的权限。",
  "The requested resource was not found.": "未找到所请求的资源。",
  "You've reached audit capacity for your account. Delete old audits from your projects to start a new one.":
    "你的账户已达到审计容量上限。请从项目中删除旧审计后再开始新的审计。",
  "You've reached the limit of audits running at once. Wait for one to finish or delete it before starting another.":
    "同时运行的审计数量已达上限。请等待其中一个完成，或删除一个后再开始新的。",
  "Please check your input and try again.": "请检查你的输入后重试。",
  "We couldn't find that city, county, or region. Pick a location from the list, or clear the field to search the whole country.":
    "找不到该城市、县或地区。请从列表中选择一个位置，或清空输入框以搜索整个国家。",
  "This crawl target is blocked by security policy.":
    "此抓取目标被安全策略拦截。",
  "The connected DataForSEO account has a billing or balance issue.":
    "已连接的 DataForSEO 账户存在账单或余额问题。",
  "The AI visibility request could not be completed. Review the tracking settings and try again.":
    "AI 可见度请求未能完成。请检查追踪设置后重试。",
  "DataForSEO isn't set up on your Every App gateway yet, or rejected the key it holds. An owner or admin sets it with pnpm everyapp secret set DATAFORSEO_API_KEY.":
    "你的 Every App 网关尚未配置 DataForSEO，或它保存的密钥被拒绝。所有者或管理员可以使用 pnpm everyapp secret set DATAFORSEO_API_KEY 完成设置。",
  "DataForSEO rejected the credentials. Check that DATAFORSEO_API_KEY is the base64 of your DataForSEO login:password, and that the DataForSEO account is verified and has API access.":
    "DataForSEO 拒绝了凭据。请检查 DATAFORSEO_API_KEY 是否为 DataForSEO 登录名:密码的 base64 编码，并确认 DataForSEO 账户已通过验证且具有 API 访问权限。",
  "Too many requests. Please wait and try again.": "请求过于频繁。请稍候再试。",
  "The data provider is temporarily unavailable. Please retry in a moment.":
    "数据提供商暂时不可用。请稍后重试。",
  "This request conflicts with existing data.": "此请求与现有数据冲突。",
};
