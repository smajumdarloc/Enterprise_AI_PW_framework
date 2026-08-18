import { test, expect } from "../../../fixtures/baseFixture";
test("@smoke user can logout", async ({ page, header }) => {

  await page.goto("/inventory.html");
  await header.logout();
  await expect(page).toHaveURL("/");
});
