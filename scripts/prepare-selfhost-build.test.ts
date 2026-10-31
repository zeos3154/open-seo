import { spawnSync } from "node:child_process";
import {
  mkdtempSync,
  readFileSync,
  rmSync,
  statSync,
  writeFileSync,
  existsSync,
} from "node:fs";
import { tmpdir } from "node:os";
import { resolve, join } from "node:path";
import { afterEach, expect, it } from "vitest";

const script = resolve("scripts/prepare-selfhost-build.mjs");
const folders: string[] = [];
const config =
  "DATAFORSEO_API_KEY=private-test-value\nACCESS_ALLOWED_EMAILS=owner@example.com\nSELFHOST_DOMAIN=seo.example.com\n";

afterEach(() => {
  for (const folder of folders.splice(0)) {
    rmSync(folder, { recursive: true, force: true });
  }
});

function run(contents: string | undefined, existing?: string) {
  const folder = mkdtempSync(join(tmpdir(), "openseo-build-config-"));
  folders.push(folder);
  const file = join(folder, ".env.selfhost");
  if (existing !== undefined) writeFileSync(file, existing);
  const result = spawnSync(process.execPath, [script], {
    cwd: folder,
    env: {
      OPENSEO_SELFHOST_ENV_B64: contents,
      DATAFORSEO_API_KEY: "",
      PORT: "0",
    },
    encoding: "utf8",
  });
  return { ...result, file };
}

it("restores exact config bytes privately without logging their values", () => {
  const result = run(Buffer.from(config).toString("base64"));
  expect(result.status).toBe(0);
  expect(readFileSync(result.file, "utf8")).toBe(config);
  expect(statSync(result.file).mode & 0o777).toBe(0o600);
  expect(result.stdout + result.stderr).not.toContain("private-test-value");
  expect(result.stdout + result.stderr).not.toContain("owner@example.com");
});

it("leaves a different existing configuration untouched", () => {
  const result = run(
    Buffer.from(config).toString("base64"),
    "original config\n",
  );
  expect(result.status).toBe(1);
  expect(readFileSync(result.file, "utf8")).toBe("original config\n");
  expect(result.stderr).toContain("Refusing to replace");
});

it("accepts an identical existing configuration", () => {
  const result = run(Buffer.from(config).toString("base64"), config);
  expect(result.status).toBe(0);
  expect(readFileSync(result.file, "utf8")).toBe(config);
});

it.each([undefined, "not valid base64"])(
  "rejects a missing or malformed build secret (%s)",
  (contents) => {
    const result = run(contents);
    expect(result.status).toBe(1);
    expect(existsSync(result.file)).toBe(false);
  },
);

it.each(["local_noauth", "hosted"])(
  "rejects production configuration using %s",
  (mode) => {
    const result = run(
      Buffer.from(config + `AUTH_MODE=${mode}\n`).toString("base64"),
    );
    expect(result.status).toBe(1);
    expect(result.stderr).toContain("require cloudflare_access or password");
    expect(existsSync(result.file)).toBe(false);
  },
);
