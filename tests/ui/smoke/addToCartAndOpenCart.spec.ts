import { test, expect } from "../../../fixtures/baseFixture";
test("@smoke user can add product and open cart", async ({
  page,
  inventoryPage,
  header,
  cartPage,
}) => {
  await page.goto("/inventory.html");
  await inventoryPage.waitForPage();
  await inventoryPage.addFirstProductToCart();
  
  expect(await header.getCartCount()).toBe("1");
  await header.openCart();
  await cartPage.waitForPage();
});
