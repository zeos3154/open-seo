/**
 * Shared workbench controls: table frames, filters, pagination, export menus
 * and Sheets modal, copy buttons, confirm/error states, metrics tables, row
 * counts. These render across many features, so English keys stay generic.
 */
export const sharedControlMessages: Record<string, string> = {
  // Export menu
  Export: "导出",
  "Export to Sheets": "导出到 Google Sheets",
  "Export CSV": "导出 CSV",
  "Export Excel": "导出 Excel",
  "Download JSON": "下载 JSON",
  "Copy JSON": "复制 JSON",
  "Copy list": "复制列表",

  // Export flows / toasts
  "No data to export": "没有可导出的数据",
  "Copied data": "已复制数据",
  "Could not copy to clipboard": "无法复制到剪贴板",
  "Copied {count} row to your clipboard": "已复制 {count} 行到剪贴板",
  "Copied {count} rows to your clipboard": "已复制 {count} 行到剪贴板",
  "Open a new Google Sheet and paste to fill it.":
    "打开一个新的 Google 表格并粘贴即可填充。",
  "Open new Google Sheet": "打开新的 Google 表格",

  // Table frame / filters
  "No rows match these filters": "没有符合这些筛选条件的数据行",
  "Change or clear the filters to see more rows.":
    "更改或清除筛选条件以查看更多数据行。",
  "Clear filters": "清除筛选",
  "Refine results": "细化结果",
  "Clear all": "全部清除",
  Min: "最小值",
  Max: "最大值",
  "{label} min": "{label}最小值",
  "{label} max": "{label}最大值",
  "Select all rows": "选择所有行",
  "Select row": "选择行",

  // Pagination
  "Rows per page": "每页行数",
  "Page {page}": "第 {page} 页",
  "Page {page} of {total}": "第 {page} 页，共 {total} 页",
  "Previous page": "上一页",
  "Next page": "下一页",
  "{start}–{end} of {total}": "第 {start}–{end} 行，共 {total} 行",
  "{start}–{end}": "{start}–{end}",
  "{count} of {total}": "{count} / {total}",

  // Bulk action bar
  "Bulk actions": "批量操作",
  "Clear selection": "清除选择",
  selected: "已选中",

  // Empty/error/confirm states
  "Something went wrong": "出了点问题",
  "Try again": "重试",
  "Try Again": "重试",
  Home: "首页",
  "Go Back": "返回",
  "The page you are looking for does not exist.": "你访问的页面不存在。",
  "Something went wrong. Please try again.": "出了点问题，请重试。",
  Cancel: "取消",
  Save: "保存",
  "Save changes": "保存更改",

  // Sortable headers
  "Sort by {label}": "按{label}排序",

  // Copy button
  Copy: "复制",
  Copied: "已复制",

  // Relative time
  "just now": "刚刚",

  // Research controls and history (option values and user text stay raw)
  "Research scope": "查询范围",
  "1 recent search": "1 条最近搜索",
  "{count} recent searches": "{count} 条最近搜索",
  "Remove from recent searches": "从最近搜索中移除",
  "Select country": "选择国家/地区",
  "Search countries": "搜索国家/地区",
  "No countries match.": "没有匹配的国家/地区。",
  Devices: "设备",
  "Search cities...": "搜索城市…",
  "Type a city, county, or region": "输入城市、县或地区",
  "Searching...": "正在搜索…",
  "Unable to load locations": "无法加载地点",
  'No locations found for "{query}"': "未找到与“{query}”匹配的地点",
  "Bring your real clicks, impressions, and rankings into OpenSEO and query them from Claude or Codex over MCP. It never uses credits.":
    "将真实的点击、展示和排名数据接入 OpenSEO，通过 MCP 在 Claude 或 Codex 中查询，不消耗积分。",

  // Shared accessible labels
  Close: "关闭",
  Loading: "加载中",
  Sidebar: "侧边栏",
  "Displays the mobile sidebar.": "显示移动端侧边栏。",
  "Toggle Sidebar": "切换侧边栏",

  // Self-host authentication error cards; configuration names remain code.
  "Authentication setup required": "需要配置身份验证",
  "Authentication required": "需要身份验证",
  "Open Setup Guide": "打开配置指南",
  "Cloudflare Access mode requires": "Cloudflare Access 模式需要设置",
  " (a full https URL) and ": "（完整的 HTTPS 网址）和",
  " set on the deployment, with an Access application protecting this hostname.":
    "，并使用 Access 应用保护此主机名。",
  "This deployment uses external authentication. Refresh your access session, then try again.":
    "此部署使用外部身份验证。请刷新访问会话后重试。",

  // Report confirmations and setup instructions (names and paths stay raw).
  "Delete “{title}”?": "删除“{title}”吗？",
  " Link created {time}.": " 链接创建于 {time}。",
  "Site built from code: put the file in the folder your site serves as-is, often called":
    "代码构建的网站：将文件放入静态资源目录，通常名为",
  "WordPress: upload it with your host's file manager or SFTP to the folder that holds":
    "WordPress：使用主机的文件管理器或 SFTP，将文件上传到存放",
  ". SEO plugins like Rank Math can also submit to IndexNow for you.":
    " 的目录。Rank Math 等 SEO 插件也能帮你提交到 IndexNow。",

  // Misc shared
  "No results yet": "还没有结果",
  "Contains…": "包含…",
  "All links": "所有链接",
  Follow: "Follow",
  Nofollow: "Nofollow",
};
