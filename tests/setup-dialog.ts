import { expect, type Page } from "@playwright/test";

// A local fixture run has no provider credentials. Close the setup prompt
// through its UI before querying the page hidden behind the modal.
export async function dismissSetupDialog(page: Page) {
  const dialog = page.getByRole("dialog").filter({
    has: page.locator('a[href="/help/dataforseo-api-key"]'),
  });
  try {
    await dialog.waitFor({ state: "visible", timeout: 5_000 });
  } catch {
    return;
  }
  await dialog.locator('[data-slot="dialog-close"]').click();
  await expect(dialog).toBeHidden();
}
