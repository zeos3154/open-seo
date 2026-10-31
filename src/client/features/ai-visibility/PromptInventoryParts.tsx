import { useT } from "@/client/lib/i18n";
import { Skeleton } from "@/client/components/ui/skeleton";
import { type AiObservationRow, type AiPrompt } from "@/shared/ai-visibility";
import { aiRate } from "./shared";

/**
 * The tracker state knows earlier runs; answers arriving in the current run
 * unlock a prompt before the state refreshes.
 */
export function promptHasResults(
  prompt: AiPrompt,
  rows: AiObservationRow[] | undefined,
) {
  return (
    prompt.hasResults ||
    !!rows?.some(
      (row) => row.promptId === prompt.id && row.answerStatus === "answered",
    )
  );
}

export function PromptRate({
  rows,
  kind,
  loading,
}: {
  rows: AiObservationRow[] | undefined;
  kind: "mentioned" | "cited";
  loading: boolean;
}) {
  const t = useT();
  if (loading) return <Skeleton className="h-4 w-10" />;
  const eligible =
    rows?.filter(
      (row) =>
        row.answerStatus === "answered" &&
        row.brands.some((brand) => brand.own),
    ) ?? [];
  const count = eligible.filter((row) =>
    row.brands.some((brand) => brand.own && brand[kind]),
  ).length;
  return (
    <span
      className="flex flex-col text-sm tabular-nums"
      title={
        rows
          ? t("{count} of {total} eligible answers", {
              count,
              total: eligible.length,
            })
          : t("No results available")
      }
    >
      {aiRate(count, eligible.length)}
      {eligible.length > 0 && (
        <span className="text-xs text-muted-foreground">
          {t("{count} of {total}", { count, total: eligible.length })}
        </span>
      )}
    </span>
  );
}
