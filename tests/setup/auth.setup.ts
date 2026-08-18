import { test as setup, expect } from "@playwright/test";
setup("authenticate", async ({ page }) => {
  await page.goto("/");
  await page.locator('[data-test="username"]').fill("standard_user");
  await page.locator('[data-test="password"]').fill("secret_sauce");
  await page.locator('[data-test="login-button"]').click();
  await expect(page).toHaveURL(/inventory/);
  await page.context().storageState({ path: "playwright/.auth/user.json" });
});