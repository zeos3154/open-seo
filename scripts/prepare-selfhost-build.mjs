// Restore the operator's existing self-host configuration on a fresh build
// machine. The base64 value belongs in an encrypted build secret, not Git.
import { existsSync, lstatSync, readFileSync, writeFileSync } from "node:fs";

try {
  const encoded = process.env.OPENSEO_SELFHOST_ENV_B64?.replace(/\s/g, "");
  if (!encoded) {
    throw new Error("Set the encrypted build secret OPENSEO_SELFHOST_ENV_B64.");
  }
  const contents = Buffer.from(encoded, "base64");
  if (!contents.length || contents.toString("base64") !== encoded) {
    throw new Error("OPENSEO_SELFHOST_ENV_B64 is not valid base64.");
  }
  const text = contents.toString("utf8");
  if (text.includes("\0") || !Buffer.from(text, "utf8").equals(contents)) {
    throw new Error("The self-host configuration must be UTF-8 text.");
  }

  const values = {};
  for (const line of text.split("\n")) {
    const match = /^\s*([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*?)\s*$/.exec(line);
    if (match) values[match[1]] = match[2].replace(/^(["'])(.*)\1$/, "$2");
  }
  // Reject hosted/local-noauth builds. An original config without AUTH_MODE
  // retains the same cloudflare_access default as the deployment preflight.
  const authMode = values.AUTH_MODE || "cloudflare_access";
  if (!["cloudflare_access", "password"].includes(authMode)) {
    throw new Error("Self-host builds require cloudflare_access or password.");
  }
  if (!values.DATAFORSEO_API_KEY) {
    throw new Error(
      "The restored configuration is missing DATAFORSEO_API_KEY.",
    );
  }
  if (
    authMode === "cloudflare_access" &&
    !(values.TEAM_DOMAIN && values.POLICY_AUD) &&
    !values.ACCESS_ALLOWED_EMAILS
  ) {
    throw new Error("The restored Access configuration has no allowed emails.");
  }

  const file = ".env.selfhost";
  if (existsSync(file)) {
    if (!lstatSync(file).isFile() || !readFileSync(file).equals(contents)) {
      throw new Error(
        "Refusing to replace a different existing .env.selfhost.",
      );
    }
  } else {
    writeFileSync(file, contents, { flag: "wx", mode: 0o600 });
  }
  console.log("Prepared private self-host configuration for the build.");
} catch (error) {
  console.error(error instanceof Error ? error.message : "Preparation failed.");
  process.exitCode = 1;
}
