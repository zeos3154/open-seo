import { cn } from "cn";
import { useT } from "@/client/lib/i18n";

/** Shown where a missing permission would otherwise leave a card or step empty. */
export function PermissionHint({
  action,
  className,
}: {
  action: string;
  className?: string;
}) {
  const t = useT();
  return (
    <p className={cn("text-sm text-muted-foreground", className)}>
      {t("Ask an organization owner or admin to {action}.", {
        action: t(action),
      })}
    </p>
  );
}
