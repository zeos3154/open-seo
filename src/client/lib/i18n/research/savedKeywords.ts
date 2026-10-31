// Saved Keywords page (src/client/features/saved-keywords/** and the saved
// route). Keys are the exact English source text rendered by the app.

export const savedKeywordsMessages: Record<string, string> = {
  // Header
  "Save keyword ideas from research, organize them with tags, and revisit when you're ready to act.":
    "保存研究中的关键词创意，用标签整理，待你准备行动时再回访。",
  "Fetch new volume, difficulty, and CPC": "获取新的搜索量、难度和 CPC 数据",
  "Update keyword stats": "更新关键词数据",
  "Updating...": "更新中…",
  "Update keyword stats?": "更新关键词数据？",
  "Update stats": "更新数据",
  "This fetches new volume, difficulty, and CPC for every saved keyword in this project. Each keyword uses credits.":
    "这会为此项目中的每个已保存关键词获取新的搜索量、难度和 CPC 数据。每个关键词都会消耗积分。",

  // Filters
  Include: "包含",
  Exclude: "排除",
  "Must contain… e.g. audit": "必须包含… 例如 audit",
  "Must not contain… e.g. jobs": "不得包含… 例如 jobs",
  "Remove {term}": "移除 {term}",

  // Table
  Competition: "竞争度",
  "Last Fetched": "上次获取时间",
  Tags: "标签",
  "No saved keywords yet": "还没有已保存的关键词",
  "Use the Keyword Research page to find and save keywords.":
    "使用“关键词研究”页面查找并保存关键词。",

  // Tag filter and manager
  "Filter by tag": "按标签筛选",
  "Filter by tag…": "按标签筛选…",
  "No tags yet. Add tags from a selection of keywords.":
    "还没有标签。请先选中一些关键词再添加标签。",
  "No tags match that search.": "没有匹配该搜索的标签。",
  "Manage tags": "管理标签",
  "Rename, recolor, or delete the tags in this project.":
    "重命名、重新着色或删除此项目中的标签。",
  "Edit {name}": "编辑 {name}",
  Color: "颜色",
  Delete: "删除",

  // Tag color swatch accessible names (shared/tag-colors keys)
  slate: "石板灰",
  rose: "玫瑰红",
  amber: "琥珀",
  lime: "青柠",
  emerald: "翡翠绿",
  sky: "天蓝",
  violet: "紫罗兰",
  fuchsia: "紫红",

  // Bulk action bar
  Tag: "打标签",

  // Bulk tags modal
  "Update tags": "更新标签",
  "Apply or remove tags across {count} selected keywords.":
    "为选中的 {count} 个关键词应用或移除标签。",
  "Apply or remove tags across 1 selected keyword.":
    "为选中的 1 个关键词应用或移除标签。",
  "Add tags": "添加标签",
  "Remove tags": "移除标签",
  "Search or create a tag": "搜索或创建标签",
  "Search or create…": "搜索或创建…",
  Create: "创建",
  "No tags yet. Type a name above to create one.":
    "还没有标签。在上方输入名称即可创建。",
  "Remove from selection": "从选择中移除",
  "Will be removed": "将被移除",
  "Click to remove": "点击移除",
  "{count} tags will be detached from the selected keywords.":
    "{count} 个标签将与所选关键词解除关联。",
  "1 tag will be detached from the selected keywords.":
    "1 个标签将与所选关键词解除关联。",
  Apply: "应用",

  // Delete modal
  "Delete keywords?": "删除关键词？",
  "Delete {count} keywords": "删除 {count} 个关键词",
  "Delete 1 keyword": "删除 1 个关键词",
  "This will permanently delete {count} saved keywords.":
    "这将永久删除 {count} 个已保存关键词。",
  "This will permanently delete 1 saved keyword.":
    "这将永久删除 1 个已保存关键词。",

  // Toasts (non-React, translateCurrent)
  "{count} keywords removed": "已移除 {count} 个关键词",
  "1 keyword removed": "已移除 1 个关键词",
  "Updated tags for {count} keywords": "已更新 {count} 个关键词的标签",
  "Updated tags for 1 keyword": "已更新 1 个关键词的标签",
  "Updated stats for {count} keywords": "已更新 {count} 个关键词的数据",
  "Updated stats for 1 keyword": "已更新 1 个关键词的数据",
  "{count} keywords copied": "已复制 {count} 个关键词",
  "1 keyword copied": "已复制 1 个关键词",
  "Failed to load saved keywords.": "加载已保存关键词失败。",
  "Remove failed.": "移除失败。",
  "Tag updated": "标签已更新",
  "Could not update tag": "无法更新标签",
  "Tag deleted": "标签已删除",
  "Could not delete tag. Detach it from all keywords and try again.":
    "无法删除标签。请先将其与所有关键词解除关联后重试。",
  "Could not export": "导出失败",
};
