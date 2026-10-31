import { translateCurrent } from "@/client/lib/i18n";

/**
 * Plural-aware toast copy for the saved-keyword bulk actions. English keeps
 * the 1-vs-many wording; Chinese uses the shared {count} phrasing.
 */
export function keywordsRemovedToast(count: number) {
  return count === 1
    ? translateCurrent("1 keyword removed")
    : translateCurrent("{count} keywords removed", { count });
}

export function tagsUpdatedToast(count: number) {
  return count === 1
    ? translateCurrent("Updated tags for 1 keyword")
    : translateCurrent("Updated tags for {count} keywords", { count });
}

export function statsUpdatedToast(count: number) {
  return count === 1
    ? translateCurrent("Updated stats for 1 keyword")
    : translateCurrent("Updated stats for {count} keywords", { count });
}

export function keywordsCopiedToast(count: number) {
  return count === 1
    ? translateCurrent("1 keyword copied")
    : translateCurrent("{count} keywords copied", { count });
}
