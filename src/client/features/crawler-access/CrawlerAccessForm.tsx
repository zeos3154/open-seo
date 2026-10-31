import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { z } from "zod";
import { revalidateLogic } from "@tanstack/react-form";
import { useAppForm } from "@/client/components/form/useAppForm";
import { translateCurrent, useT } from "@/client/lib/i18n";
import { useAuditCapabilities } from "@/client/features/audit/shared";
import { isEveryAppClientAuthMode } from "@/lib/auth-mode";
import { saveCrawlerCredential } from "@/serverFunctions/crawlerAccess";
import {
  isCrawlerAccessExpired,
  parseSignatureExpiry,
} from "@/shared/crawler-access";

export const crawlerCredentialsQueryKey = ["crawler-credentials"];
export const saveCrawlerCredentialMutationKey = ["save-crawler-credential"];

/**
 * On Every App, CRAWLER_ACCESS_SECRET is optional, so the form and the Shopify
 * crawl warning say how to set it instead of failing on save.
 */
export function CrawlerAccessSetupHint() {
  const t = useT();
  return (
    <>
      {t("An admin sets {code} with {command}.", {
        code: "CRAWLER_ACCESS_SECRET",
        command: "pnpm everyapp secret set CRAWLER_ACCESS_SECRET --app openseo",
      })}
    </>
  );
}

/** Whether to show the setup hint: only behind Every App, once known. */
export function useCrawlerAccessNeedsSetup(projectId: string) {
  const canStore = useAuditCapabilities(projectId).data?.canStoreCrawlerAccess;
  return isEveryAppClientAuthMode() && canStore === false;
}

const signatureSchema = z.object({
  host: z.string().trim().min(1, "Enter a domain."),
  signatureInput: z
    .string()
    .trim()
    .min(1, "Enter Signature-Input.")
    .refine(
      (value) => !isCrawlerAccessExpired(parseSignatureExpiry(value)),
      "This signature has already expired. Create a new one in Shopify admin.",
    ),
  signature: z.string().trim().min(1, "Enter Signature."),
});

/**
 * The two values a merchant copies out of Shopify admin. `Signature-Agent` is
 * a constant we add ourselves, so it is not asked for here.
 */
export function CrawlerAccessForm({
  projectId,
  initialHost,
  lockHost = false,
  onSaved,
}: {
  /** The project (website) the signature is stored on. */
  projectId: string;
  initialHost: string;
  lockHost?: boolean;
  onSaved?: () => void;
}) {
  const queryClient = useQueryClient();
  const t = useT();

  const saveMutation = useMutation({
    mutationKey: saveCrawlerCredentialMutationKey,
    mutationFn: (values: z.infer<typeof signatureSchema>) =>
      saveCrawlerCredential({
        data: { projectId, ...values },
      }),
    onSuccess: async (result) => {
      if ("problem" in result) return;
      await queryClient.invalidateQueries({
        queryKey: crawlerCredentialsQueryKey,
      });
      toast.success(
        translateCurrent("Crawler access saved for {host}", {
          host: result.credential.host,
        }),
      );
      onSaved?.();
    },
  });

  const form = useAppForm({
    defaultValues: { host: initialHost, signatureInput: "", signature: "" },
    validationLogic: revalidateLogic(),
    validators: { onDynamic: signatureSchema },
    onSubmit: async ({ value, formApi }) => {
      const result = await saveMutation.mutateAsync(value);
      if ("problem" in result) {
        const { problem } = result;
        formApi.setErrorMap({
          onSubmit: {
            fields: {
              signatureInput:
                problem.reason === "wrong_domain"
                  ? translateCurrent(
                      "This signature was created for {signedHost}, not {host}. In Shopify admin, create a signature for {host}.",
                      { signedHost: problem.signedHost, host: problem.host },
                    )
                  : translateCurrent(
                      "Shopify won't accept this signature for {host}. Check that you created it for {host} and copied both values in full.",
                      { host: problem.host },
                    ),
            },
          },
        });
        return;
      }
      formApi.reset({ ...value, signatureInput: "", signature: "" });
    },
  });

  if (useCrawlerAccessNeedsSetup(projectId)) {
    return (
      <p className="text-sm text-muted-foreground">
        {t("Crawler access isn't set up yet.")} <CrawlerAccessSetupHint />
      </p>
    );
  }

  return (
    <form.AppForm>
      <form.Form className="space-y-3">
        {!lockHost ? (
          <form.AppField name="host">
            {(field) => (
              <field.TextField
                label={t("Domain")}
                placeholder="store.example.com"
                className="font-mono"
                required
              />
            )}
          </form.AppField>
        ) : null}
        <form.AppField name="signatureInput">
          {(field) => (
            <field.TextField
              label={t("Signature-Input")}
              type="password"
              autoComplete="off"
              data-ph-mask
              className="font-mono"
              placeholder="sig1=(...);expires=..."
              required
            />
          )}
        </form.AppField>
        <form.AppField name="signature">
          {(field) => (
            <field.TextField
              label={t("Signature")}
              description={<SignatureDescription />}
              type="password"
              autoComplete="off"
              data-ph-mask
              className="font-mono"
              placeholder="sig1=:...:"
              required
            />
          )}
        </form.AppField>
        <form.SubmitButton disabled={!projectId}>
          {t("Save signature")}
        </form.SubmitButton>
      </form.Form>
    </form.AppForm>
  );
}

function SignatureDescription() {
  const t = useT();
  return t(
    "Shopify also shows a Signature-Agent value. You don't need to paste it: OpenSEO sends it with every request.",
  );
}
