import { Archive, Pause, Pencil, Play } from "lucide-react";
import { RowActionsMenu } from "@/client/components/RowActionsMenu";
import { DropdownMenuItem } from "@/client/components/ui/dropdown-menu";
import { useT } from "@/client/lib/i18n";

/** The dots menu of a prompt or topic row in the tracked prompts table. */
export function PromptActionsMenu({
  label,
  kind,
  paused,
  scheduled,
  pending,
  onEdit,
  onTogglePause,
  onArchive,
}: {
  label: string;
  kind: "prompt" | "topic";
  paused: boolean;
  /** Pausing only skips scheduled runs, so it needs a schedule. */
  scheduled: boolean;
  pending: boolean;
  onEdit?: () => void;
  onTogglePause: () => void;
  onArchive: () => void;
}) {
  const t = useT();
  return (
    <RowActionsMenu label={label}>
      {onEdit && (
        <DropdownMenuItem onClick={onEdit}>
          <Pencil />
          {kind === "topic" ? t("Rename topic") : t("Edit prompt")}
        </DropdownMenuItem>
      )}
      <DropdownMenuItem
        disabled={pending || (!paused && !scheduled)}
        onClick={onTogglePause}
      >
        {paused ? <Play /> : <Pause />}
        {paused
          ? t("Resume {kind}", { kind: kindName(kind, t) })
          : t("Pause {kind}", { kind: kindName(kind, t) })}
      </DropdownMenuItem>
      <DropdownMenuItem
        variant="destructive"
        disabled={pending}
        onClick={onArchive}
      >
        <Archive />
        {t("Archive {kind}", { kind: kindName(kind, t) })}
      </DropdownMenuItem>
    </RowActionsMenu>
  );
}

/** Translate the row kind at display; the stored values stay "prompt"/"topic". */
function kindName(
  kind: "prompt" | "topic",
  t: (key: string, vars?: Record<string, string | number>) => string,
): string {
  return kind === "topic" ? t("topic") : t("prompt");
}
