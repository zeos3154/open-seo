import { expect, test, type Page } from "@playwright/test";
import { dismissSetupDialog } from "./setup-dialog";

// Marker proving no full reload happened between setting and reading it.
type WindowWithReloadMarker = Window &
  typeof globalThis & {
    e2eNoReload?: boolean;
  };

// Opens the create-project dialog through the sidebar switcher so the test
// exercises the switcher's own translated labels on the way in. The
// switcher's trigger is a combobox, not a plain button.
async function openNewProjectDialog(page: Page) {
  await page.getByRole("combobox", { name: "切换项目" }).click();
  await page.getByRole("button", { name: "新建项目" }).click();
  await expect(page.getByRole("dialog", { name: "新建项目" })).toBeVisible();
}

test.describe("UI language switching", () => {
  test("an existing rank configuration validation error follows both languages", async ({
    page,
    context,
  }) => {
    await page.goto("/");
    await page.waitForURL(/\/p\/([^/]+)\/?$/, { timeout: 30_000 });
    const projectId = new URL(page.url()).pathname.split("/")[2];
    if (!projectId) throw new Error("The local project was not resolved");

    const settings = await context.newPage();
    await settings.goto("/settings");
    await dismissSetupDialog(settings);
    await settings.getByRole("button", { name: "简体中文" }).click();

    await page.goto(`/p/${projectId}/rank-tracking`);
    await dismissSetupDialog(page);
    await page.getByRole("button", { name: "添加域名", exact: true }).click();
    const dialog = page.getByRole("dialog");
    await dialog
      .getByRole("textbox", { name: "目标域名", exact: true })
      .fill("");
    await dialog.getByRole("button", { name: "添加域名", exact: true }).click();
    await expect(dialog.getByText("请输入域名", { exact: true })).toBeVisible();

    // The invalid value and the existing error stay in the same open form.
    // Translation happens at display, so Chinese error text is not frozen in state.
    await settings.getByRole("button", { name: "English" }).click();
    await expect(
      dialog.getByText("Enter a domain", { exact: true }),
    ).toBeVisible();
    await expect(
      dialog.getByRole("textbox", { name: "Target Domain", exact: true }),
    ).toHaveValue("");
    await settings.getByRole("button", { name: "简体中文" }).click();
    await expect(dialog.getByText("请输入域名", { exact: true })).toBeVisible();
    await dialog.getByRole("button", { name: "取消", exact: true }).click();
    await settings.getByRole("button", { name: "English" }).click();
  });

  test("keyword columns follow another tab's locale while preserving the search and selection", async ({
    page,
    context,
  }) => {
    await page.goto("/");
    await page.waitForURL(/\/p\/([^/]+)\/?$/, { timeout: 30_000 });
    const projectId = new URL(page.url()).pathname.split("/")[2];
    if (!projectId) throw new Error("The local project was not resolved");

    await page.goto(
      `/p/${projectId}/keywords?q=keyword%20research&loc=2840&kLimit=150&mode=auto`,
    );
    await dismissSetupDialog(page);
    await expect(
      page.getByRole("row", { name: /keyword research/i }).first(),
    ).toBeVisible({ timeout: 30_000 });
    await expect(
      page.getByRole("columnheader", { name: /Volume/ }),
    ).toBeVisible();
    const selectedRow = page
      .getByRole("row", { name: /keyword research/i })
      .first();
    const checkbox = selectedRow.getByRole("checkbox");
    await checkbox.click();
    await expect(checkbox).toBeChecked();

    const settings = await context.newPage();
    await settings.goto("/settings");
    await dismissSetupDialog(settings);
    await settings.getByRole("button", { name: "简体中文" }).click();

    await expect(
      page.getByRole("columnheader", { name: /搜索量/ }),
    ).toBeVisible();
    await expect(
      page.getByRole("row", { name: /keyword research/i }).first(),
    ).toBeVisible();
    await expect(checkbox).toBeChecked();
    expect(new URL(page.url()).searchParams.get("q")).toBe("keyword research");
    expect(new URL(page.url()).searchParams.get("loc")).toBe("2840");

    await settings.getByRole("button", { name: "English" }).click();
    await expect(
      page.getByRole("columnheader", { name: /Volume/ }),
    ).toBeVisible();
    await expect(checkbox).toBeChecked();
    expect(new URL(page.url()).searchParams.get("q")).toBe("keyword research");
    expect(new URL(page.url()).searchParams.get("loc")).toBe("2840");
  });

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
