import { Link } from "@tanstack/react-router";
import { ShieldAlert } from "lucide-react";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/client/components/ui/alert";
import { Button } from "@/client/components/ui/button";
import { useT } from "@/client/lib/i18n";

/**
 * Shown when Shopify rate limited an unrendered crawl that carried a crawler
 * signature. Shopify's edge can still throttle Cloudflare Workers then, and a
 * rendered audit reads throttled pages from outside Cloudflare.
 */
export function ShopifyRateLimitAlert({
  projectId,
  startUrl,
}: {
  projectId: string;
  startUrl: string;
}) {
  const t = useT();
  return (
    <Alert variant="warning">
      <ShieldAlert />
      <AlertTitle>
        {t("We ran into an error with your Shopify domain.")}
      </AlertTitle>
      <AlertDescription>
        {t(
          "Shopify is globally rate limiting, so this report is incomplete. To complete the audit, start a new one with Render JavaScript turned on.",
        )}
      </AlertDescription>
      <div className="col-start-2 mt-2">
        <Button
          variant="outline"
          size="sm"
          nativeButton={false}
          render={
            <Link
              to="/p/$projectId/audit"
              params={{ projectId }}
              search={{ url: startUrl }}
            />
          }
        >
          {t("Start a new audit")}
        </Button>
      </div>
    </Alert>
  );
}
