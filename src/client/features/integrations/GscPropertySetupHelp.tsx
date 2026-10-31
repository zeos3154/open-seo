import { Button } from "@/client/components/ui/button";
import { translateCurrent, useT } from "@/client/lib/i18n";
import type { GooglePickerAccount } from "./GooglePropertyPicker";

export function GscPropertySetupHelp({
  accounts,
  loading,
  busy,
  linking,
  onRetry,
  onReconnect,
}: {
  accounts: GooglePickerAccount[];
  loading: boolean;
  busy: boolean;
  linking: boolean;
  onRetry: () => void;
  onReconnect: () => void;
}) {
  const t = useT();
  return (
    <>
      <div className="space-y-3 rounded-lg border border-border bg-muted/30 p-4 text-sm">
        <h2 className="font-semibold">{t("We couldn’t find your website")}</h2>
        <p className="break-words text-muted-foreground">
          {t("We checked {accounts}.", {
            accounts: accounts
              .map(
                (account) =>
                  account.email ??
                  translateCurrent("Google account · {id}", {
                    id: account.accountId.slice(-6),
                  }),
              )
              .join(", "),
          })}
        </p>
        <p className="text-muted-foreground">
          {accounts.length === 1
            ? t(
                "Add your site to Search Console, or ask whoever manages it to give this account access.",
              )
            : t(
                "Add your site to Search Console, or ask whoever manages it to give one of these accounts access.",
              )}
        </p>
        <div className="flex flex-wrap gap-x-4 gap-y-2">
          <a
            href="https://search.google.com/search-console"
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-4"
          >
            {t("Open Search Console ↗")}
          </a>
          <a
            href="https://openseo.so/blogs/google-search-console-setup"
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-4"
          >
            {t("Setup guide")}
          </a>
        </div>
      </div>
      <div className="flex flex-wrap gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={onRetry}
          disabled={loading || busy}
        >
          {loading ? t("Refreshing…") : t("Refresh")}
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={onReconnect}
          disabled={loading || busy}
          pending={linking}
        >
          {linking ? t("Opening Google…") : t("Use a different Google account")}
        </Button>
      </div>
    </>
  );
}

export function hasNoGscWebsites(
  accounts: GooglePickerAccount[],
  loading: boolean,
  error: boolean,
) {
  return (
    !loading &&
    !error &&
    accounts.length > 0 &&
    accounts.every(
      (account) =>
        !account.requiresReconnect &&
        !account.unavailable &&
        account.properties.length === 0,
    )
  );
}
