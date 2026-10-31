import { expect, test, type Page } from "@playwright/test";

// Marker proving no full reload happened between setting and reading it.
type WindowWithReloadMarker = Window &
  typeof globalThis & {
    e2eNoReload?: boolean;
  };

// The local no-auth environment has no DataForSEO key, so the "One quick
// setup step" modal opens over the app on each fresh load and blocks the UI
// behind it (modal content is hidden from role queries). Dismissing it is
// part of navigating this environment; no API key is needed here.
async function dismissSetupDialog(page: Page) {
  const dismiss = page.getByRole("button", { name: "Dismiss" });
  try {
    await dismiss.waitFor({ state: "visible", timeout: 5_000 });
  } catch {
    return; // The modal did not appear this load.
  }
  await dismiss.click();
  await expect(dismiss).toBeHidden();
}

// Opens the create-project dialog through the sidebar switcher so the test
// exercises the switcher's own translated labels on the way in. The
// switcher's trigger is a combobox, not a plain button.
async function openNewProjectDialog(page: Page) {
  await page.getByRole("combobox", { name: "切换项目" }).click();
  await page.getByRole("button", { name: "新建项目" }).click();
  await expect(page.getByRole("dialog", { name: "新建项目" })).toBeVisible();
}

test.describe("UI language switching", () => {
  test("switching to 简体中文 re-renders the shell, survives reload, and switches back", async ({
    page,
  }) => {
    // Same precondition as the other app specs: a local project exists, so
    // the sidebar renders the full project nav. Going to "/" first also
    // remembers the project, which /settings' sidebar uses.
    await page.goto("/");
    await page.waitForURL(/\/p\/([^/]+)\/?$/, { timeout: 30_000 });
    await dismissSetupDialog(page);

    await page.goto("/settings");
    await dismissSetupDialog(page);

    // English stays the default for users without a stored locale.
    await expect(
      page.getByRole("heading", { name: "Settings", exact: true }),
    ).toBeVisible();
    await expect(page.locator("html")).toHaveAttribute("lang", "en");

    // Mark the window: if a full reload happened, the marker is gone.
    await page.evaluate(() => {
      (window as WindowWithReloadMarker).e2eNoReload = true;
    });

    await page.getByRole("button", { name: "简体中文" }).click();

    // The shell translates in place: settings headings, sidebar nav, html lang.
    await expect(
      page.getByRole("heading", { name: "设置", exact: true }),
    ).toBeVisible();
    const nav = page.getByRole("navigation", { name: "主导航" });
    await expect(nav.getByText("仪表盘")).toBeVisible();
    await expect(nav.getByText("排名追踪")).toBeVisible();
    await expect(page.locator("html")).toHaveAttribute("lang", "zh-CN");
    expect(
      await page.evaluate(() => (window as WindowWithReloadMarker).e2eNoReload),
    ).toBe(true);

    // The choice persists across a reload.
    await page.reload();
    await dismissSetupDialog(page);
    await expect(
      page.getByRole("heading", { name: "设置", exact: true }),
    ).toBeVisible();
    await expect(page.locator("html")).toHaveAttribute("lang", "zh-CN");

    // Project management UI: switcher labels, create modal, market fields.
    await openNewProjectDialog(page);
    const dialog = page.getByRole("dialog", { name: "新建项目" });
    await expect(dialog.getByText("国家/地区", { exact: true })).toBeVisible();
    await expect(dialog.getByText("语言", { exact: true })).toBeVisible();
    await expect(
      dialog.getByRole("button", { name: "创建项目" }),
    ).toBeVisible();
    await dialog.getByRole("button", { name: "取消" }).click();
    await expect(dialog).toBeHidden();

    // Switching back to English restores the original UI.
    await dismissSetupDialog(page);
    await page.getByRole("button", { name: "English" }).click();
    await expect(
      page.getByRole("heading", { name: "Settings", exact: true }),
    ).toBeVisible();
    const englishNav = page.getByRole("navigation", {
      name: "Main navigation",
    });
    await expect(englishNav.getByText("Dashboard")).toBeVisible();
    await expect(page.locator("html")).toHaveAttribute("lang", "en");
  });
});
