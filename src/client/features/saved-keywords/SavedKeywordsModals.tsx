import { AlertCircle } from "lucide-react";
import { ConfirmDialog } from "@/client/components/ConfirmDialog";
import { Alert, AlertDescription } from "@/client/components/ui/alert";
import { useT } from "@/client/lib/i18n";

export function RemoveSavedKeywordsError({ message }: { message: string }) {
  const t = useT();
  return (
    <Alert variant="destructive">
      <AlertCircle />
      <AlertDescription>{t(message)}</AlertDescription>
    </Alert>
  );
}

export function DeleteSavedKeywordsModal({
  selectedCount,
  isPending,
  onClose,
  onConfirm,
}: {
  selectedCount: number;
  isPending: boolean;
  onClose: () => void;
  onConfirm: () => void;
}) {
  const t = useT();
  return (
    <ConfirmDialog
      title={t("Delete keywords?")}
      confirmLabel={
        selectedCount === 1
          ? t("Delete 1 keyword")
          : t("Delete {count} keywords", { count: selectedCount })
      }
      destructive
      pending={isPending}
      onClose={onClose}
      onConfirm={onConfirm}
    >
      {t(
        selectedCount === 1
          ? "This will permanently delete 1 saved keyword."
          : "This will permanently delete {count} saved keywords.",
        selectedCount === 1 ? undefined : { count: selectedCount },
      )}
    </ConfirmDialog>
  );
}
