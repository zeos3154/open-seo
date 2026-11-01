import { execFileSync } from "node:child_process";
import { mkdtemp, mkdir, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

// Exercise the script as a CLI so the tests cover the same parse/report
// boundary maintainers run; a temporary repository lets one fixture contain
// deliberately broken translations without changing this checkout.
const script = join(dirname(fileURLToPath(import.meta.url)), "i18n-audit.mjs");
let workspace: string;
let run: { status: number; output: string };

beforeAll(async () => {
  workspace = await mkdtemp(join(tmpdir(), "open-seo-i18n-audit-"));
  await mkdir(join(workspace, "src/client/features/dashboard"), {
    recursive: true,
  });
  await mkdir(join(workspace, "src/client/lib"), { recursive: true });
  await writeFile(
    join(workspace, "src/client/Broken.tsx"),
    `
      import { useT } from "@/client/lib/i18n";
      export function Broken() {
        const t = useT();
        return <p>{t("Hello {name}")}{t("Repeated")}</p>;
      }
    `,
  );
  await writeFile(
    join(workspace, "src/client/features/dashboard/dashboardSteps.ts"),
    `export const setupSteps = [{ label: "Dashboard item" }];`,
  );
  await writeFile(
    join(workspace, "src/client/lib/i18n-messages.ts"),
    `
      export const zhCN = {
        "Hello {name}": "你好",
        "Hello {name}": "你好 {other}",
        Repeated: "重复",
        Repeated: "另一种",
      };
    `,
  );

  try {
    const output = execFileSync(process.execPath, [script, "check"], {
      cwd: workspace,
      encoding: "utf8",
    });
    run = { status: 0, output };
  } catch (error) {
    const failure = error as { status?: number; stdout?: string };
    run = { status: failure.status ?? 1, output: failure.stdout ?? "" };
  }
});

afterAll(async () => {
  await rm(workspace, { recursive: true, force: true });
});

describe("i18n audit CLI", () => {
  it("fails when static and explicit dynamic-source copy lack zh-CN", () => {
    expect(run.status).toBe(1);
    expect(run.output).toContain("Missing zh-CN (1)");
    expect(run.output).toContain("Dashboard item");
  });

  it("fails when a translation omits a source placeholder", () => {
    expect(run.output).toContain("Placeholder mismatches (2)");
    expect(run.output).toContain("missing: name; extra: other");
  });

  it("fails when the same key has conflicting translations", () => {
    expect(run.output).toContain("Conflicting translations (2)");
    expect(run.output).toContain("Repeated");
  });
});
