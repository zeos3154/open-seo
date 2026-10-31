import { useT } from "@/client/lib/i18n";
import { estimateRankCheckCredits } from "@/shared/rank-tracking";
import type { SaveConfigInput } from "./useSaveConfigMutations";

export function CostEstimate({
  devices,
  serpDepth,
  schedule,
}: {
  devices: SaveConfigInput["devices"];
  serpDepth: number;
  schedule: SaveConfigInput["schedule"];
}) {
  const t = useT();
  // Scheduled checks run through the cheaper task queue; manual configs only
  // ever pay the live price.
  const { costUsd: costPerKeyword } = estimateRankCheckCredits(
    ["plain keyword"],
    devices,
    serpDepth,
    schedule === "manual" ? "live" : "queued",
  );
  const checksPerMonth =
    schedule === "daily" ? 30 : schedule === "weekly" ? 4 : 1;
  return (
    <div className="space-y-0.5 rounded-lg bg-muted px-3 py-2.5 text-xs text-muted-foreground">
      <div>
        <span className="font-mono font-semibold text-foreground">
          {t("up to {cost}", { cost: `$${costPerKeyword.toFixed(4)}` })}
        </span>{" "}
        {t("per keyword per check")}
      </div>
      {schedule !== "manual" && (
        <div>
          {t("50 keywords would cost up to")}{" "}
          <span className="font-mono font-semibold text-foreground">
            {t("{cost}/month", {
              cost: `$${(costPerKeyword * 50 * checksPerMonth).toFixed(2)}`,
            })}
          </span>
        </div>
      )}
    </div>
  );
}
