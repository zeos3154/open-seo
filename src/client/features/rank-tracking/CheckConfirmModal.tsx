import { ConfirmDialog } from "@/client/components/ConfirmDialog";
import { useT } from "@/client/lib/i18n";
import type { RankTrackingConfig } from "@/types/schemas/rank-tracking";
import {
  devicesCount,
  KEYWORDS_PER_BATCH,
  SECONDS_PER_BATCH,
} from "@/shared/rank-tracking";

export function CheckConfirmModal({
  keywordCount,
  devices,
  costUsd,
  isPending,
  onRunNow,
  onCancel,
}: {
  keywordCount: number;
  devices: RankTrackingConfig["devices"];
  /** Server estimate; it prices each keyword's text (operators cost 5x). */
  costUsd: number | undefined;
  isPending: boolean;
  onRunNow: () => void;
  onCancel: () => void;
}) {
  const t = useT();
  const dc = devicesCount(devices);
  const totalChecks = keywordCount * dc;
  const liveTime =
    Math.ceil(totalChecks / KEYWORDS_PER_BATCH) * SECONDS_PER_BATCH;

  const eta =
    liveTime < 60 ? `${liveTime}s` : `${Math.ceil(liveTime / 60)} min`;

  return (
    <ConfirmDialog
      title={
        keywordCount === 1
          ? t("Check 1 keyword?")
          : t("Check {count} keywords?", { count: keywordCount })
      }
      confirmLabel={t("Run now")}
      pending={isPending}
      onConfirm={onRunNow}
      onClose={onCancel}
    >
      {keywordCount === 1
        ? t("1 keyword × {devices} = {total} SERP checks. Results in ~{eta}.", {
            devices: deviceText(dc, t),
            total: totalChecks,
            eta,
          })
        : t(
            "{count} keywords × {devices} = {total} SERP checks. Results in ~{eta}.",
            {
              count: keywordCount,
              devices: deviceText(dc, t),
              total: totalChecks,
              eta,
            },
          )}
      {costUsd != null ? (
        <>
          {" "}
          {t("Costs up to")}{" "}
          <span className="font-mono font-semibold text-foreground">
            ${costUsd.toFixed(2)}
          </span>
          .
        </>
      ) : null}
    </ConfirmDialog>
  );
}

/** "1 device" / "{count} devices" so both plural forms stay correct. */
function deviceText(
  dc: number,
  t: (key: string, vars?: Record<string, string | number>) => string,
): string {
  return dc === 1 ? t("1 device") : t("{count} devices", { count: dc });
}
