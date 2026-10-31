import { Badge } from "@/client/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/client/components/ui/tooltip";
import { useT } from "@/client/lib/i18n";

/**
 * Marks a number that covers the whole domain under a URL scope, so a
 * page-scoped lookup never reads as if the number belonged to that page.
 */
export function DomainLevelBadge({ tooltip }: { tooltip: string }) {
  const t = useT();
  return (
    <Tooltip>
      <TooltipTrigger
        delay={150}
        render={
          <Badge
            variant="outline"
            size="sm"
            className="font-normal tracking-normal normal-case"
          />
        }
      >
        {t("Domain-level")}
      </TooltipTrigger>
      <TooltipContent>{tooltip}</TooltipContent>
    </Tooltip>
  );
}
