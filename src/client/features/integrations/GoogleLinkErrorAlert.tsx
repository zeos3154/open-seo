import * as React from "react";
import { X } from "lucide-react";
import {
  Alert,
  AlertAction,
  AlertDescription,
  AlertTitle,
} from "@/client/components/ui/alert";
import { Button } from "@/client/components/ui/button";
import { useT } from "@/client/lib/i18n";
import {
  clearGoogleLinkError,
  getGoogleLinkError,
  reportGoogleLinkErrorOnce,
} from "./googleLinkError";
import type { GoogleLinkProvider } from "@/shared/google-link";

const PROVIDER_LABELS: Record<GoogleLinkProvider, string> = {
  gsc: "Search Console",
  ga4: "Google Analytics",
};

/** English title sources matching googleAuthErrorCopy, keyed by code. */
const TITLES: Record<string, string> = {
  access_denied: "{what} was canceled",
  scope_not_granted: "{what} is missing a permission",
};

/** English description sources matching googleAuthErrorCopy, keyed by code. */
const DESCRIPTIONS: Record<string, string> = {
  state_mismatch:
    "The attempt expired or was interrupted. Try again in a single browser tab and finish the Google steps within 10 minutes. If it keeps happening, make sure your browser allows cookies for this site.",
  access_denied:
    "Google's permission screen was closed or declined. Try again whenever you're ready.",
  scope_not_granted:
    "OpenSEO didn't get access to your {what} data because a box on Google's permission screen wasn't checked. Try again and check every box before you continue.",
  connection_save_failed:
    "We couldn't save the connection. Please try again — if it keeps failing, contact support.",
  default:
    "Something went wrong while talking to Google. Please try again — if it keeps failing, contact support.",
};

/**
 * Inline error shown on a connect surface after a failed Google link flow.
 * The OAuth callback sends failures back to the page that started the connect
 * (see googleOAuth.ts); googleLinkError.ts captures the params before the
 * router can redirect them away, and this renders the explanation next to the
 * Connect button that retries it. Persists until dismissed or the user
 * navigates.
 */
export function GoogleLinkErrorAlert({
  provider,
  className,
}: {
  provider: GoogleLinkProvider;
  className?: string;
}) {
  const [error] = React.useState(() => getGoogleLinkError(provider));
  const [dismissed, setDismissed] = React.useState(false);

  React.useEffect(() => {
    if (error) reportGoogleLinkErrorOnce();
  }, [error]);

  const t = useT();
  if (!error || dismissed) return null;
  // googleAuthErrorCopy stays canonical English (also used by /auth-error);
  // this alert rebuilds the same shape for translation, embedding the
  // provider label as {what}.
  const what = PROVIDER_LABELS[provider];
  const titleKey = TITLES[error.code] ?? "{what} didn't finish";
  const descriptionKey = DESCRIPTIONS[error.code] ?? DESCRIPTIONS.default;

  return (
    <Alert variant="destructive" className={className}>
      <AlertTitle>{t(titleKey, { what: t(what) })}</AlertTitle>
      <AlertDescription>
        {t(descriptionKey, { what: t(what) })}
      </AlertDescription>
      <AlertAction>
        <Button
          variant="ghost"
          size="icon-xs"
          aria-label={t("Dismiss")}
          onClick={() => {
            setDismissed(true);
            clearGoogleLinkError();
          }}
        >
          <X />
        </Button>
      </AlertAction>
    </Alert>
  );
}
