import * as Config from "effect/Config";
import * as Effect from "effect/Effect";

/**
 * Custom-domain decision for the self-host stage, extracted from
 * alchemy.run.ts's main generator (kept tiny there for the lint complexity
 * cap). Behavior must stay identical to the inline version it replaced:
 *
 * - SELFHOST_DOMAIN is read only for stage "selfhost" — any other stage never
 *   touches the variable;
 * - the value is trimmed, empty falling back to no custom domain
 *   (workers.dev only);
 * - with a hostname and AUTH_MODE=password, passwordAuthUrl is the
 *   https://hostname auth URL used for BETTER_AUTH_URL.
 */
export const resolveSelfHostDomain = (stage: string, authMode: string) =>
  Effect.gen(function* () {
    if (stage !== "selfhost") {
      return { hostname: undefined, passwordAuthUrl: undefined };
    }
    // Same read pattern as optionalVar in alchemy.run.ts: string-or-empty,
    // trimmed, so unset behaves exactly like an empty value.
    const hostname = (yield* Config.string("SELFHOST_DOMAIN").pipe(
      Config.withDefault(""),
    )).trim();
    if (!hostname) {
      return { hostname: undefined, passwordAuthUrl: undefined };
    }
    return {
      hostname,
      passwordAuthUrl:
        authMode === "password" ? `https://${hostname}` : undefined,
    };
  });
