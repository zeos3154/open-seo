import type { ReactNode } from "react";
import { CircleAlert } from "lucide-react";
import { EmptyState } from "@/client/components/EmptyState";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/client/components/ui/alert";
import { Button } from "@/client/components/ui/button";
import { useT } from "@/client/lib/i18n";

/**
 * A failure message with an optional retry.
 *
 * - `inline`: red text and a small button, inside a card or a table.
 * - `card`: a destructive Alert, above or in place of a section.
 * - `page`: a centered block that replaces the whole page content.
 */
export function ErrorState({
  title,
  message,
  onRetry,
  isRetrying = false,
  action,
  variant = "card",
}: {
  title?: string;
  message: string;
  onRetry?: () => void;
  /** Shows the retry button as pending, for example while `isFetching`. */
  isRetrying?: boolean;
  /** Replaces the retry button, for errors a retry cannot fix. */
  action?: ReactNode;
  variant?: "inline" | "card" | "page";
}) {
  const t = useT();
  const displayTitle = title === undefined ? undefined : t(title);
  const displayMessage = t(message);
  const button =
    action ??
    (onRetry ? (
      <Button
        variant="outline"
        size={variant === "page" ? "default" : "sm"}
        pending={isRetrying}
        onClick={onRetry}
      >
        {t("Try again")}
      </Button>
    ) : null);

  if (variant === "page") {
    return (
      <EmptyState
        kind="error"
        variant="plain"
        size="lg"
        title={displayTitle ?? t("Something went wrong")}
        description={displayMessage}
        action={button}
      />
    );
  }

  if (variant === "inline") {
    return (
      <div
        role="alert"
        className="flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-destructive"
      >
        <span>{displayMessage}</span>
        {button}
      </div>
    );
  }

  return (
    <Alert variant="destructive">
      <CircleAlert aria-hidden />
      <AlertTitle>{displayTitle ?? displayMessage}</AlertTitle>
      {title ? <AlertDescription>{displayMessage}</AlertDescription> : null}
      {button ? <div className="col-start-2 mt-2">{button}</div> : null}
    </Alert>
  );
}
