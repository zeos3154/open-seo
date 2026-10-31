/**
 * Lighthouse issues screen strings (categories, summary, toolbar, export
 * scopes). Category tab values stay English; only the rendered label
 * translates.
 */
export const lighthouseMessages: Record<string, string> = {
  "Site Audit": "网站审计",
  "Scanned {time}": "扫描于 {time}",
  "Reading latest issues...": "正在读取最新问题…",
  "Lighthouse Issues": "Lighthouse 问题",
  "Loading URL...": "正在加载 URL…",
  "Failed to load Lighthouse issues.": "加载 Lighthouse 问题失败。",
  "This Lighthouse run was saved without issue details. Re-run the audit to see them.":
    "这次 Lighthouse 运行保存时未包含问题详情。重新运行审计即可查看。",
  "Download started": "下载已开始",
  "Failed to export payload": "导出数据失败",
  "Failed to copy payload": "复制数据失败",

  // Category labels (categoryLabel())
  "Best practices": "最佳实践",
  All: "全部",
  Performance: "性能",
  Accessibility: "可访问性",
  SEO: "SEO",

  // Export scopes
  "{category} issues": "{category}问题",
  "All actionable issues": "所有可操作的问题",
  "Saved Lighthouse payload": "已保存的 Lighthouse 数据",
  "Copied {category} issues": "已复制{category}问题",
  "Copied all actionable issues": "已复制所有可操作的问题",
  "Copied saved Lighthouse payload": "已复制已保存的 Lighthouse 数据",

  // Table
  Severity: "严重程度",
  Issue: "问题",
  Category: "类目",
  Impact: "影响",
  Score: "得分",
  "Affected items ({count})": "受影响项（{count}）",
  "No actionable issues for this category.": "该类目下没有可操作的问题。",
  Critical: "严重",
  Warning: "警告",
  Info: "提示",
};
