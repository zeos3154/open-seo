import { toast } from "sonner";
import { translateCurrent } from "@/client/lib/i18n";
import { getStandardErrorMessage } from "@/client/lib/error-messages";

/** Tells the user whether saving a website started its first site scan. */
export function toastInitialAudit(
  initialAudit:
    | { status: "started" | "pending" }
    | { status: "unavailable"; code: string }
    | null,
) {
  if (initialAudit?.status === "unavailable")
    toast.warning(
      translateCurrent("Website saved. The first scan could not start."),
      {
        description: translateCurrent(
          getStandardErrorMessage(new Error(initialAudit.code)),
        ),
      },
    );
  else if (initialAudit?.status === "started")
    toast.success(translateCurrent("Your 50-page site scan is running"));
}
