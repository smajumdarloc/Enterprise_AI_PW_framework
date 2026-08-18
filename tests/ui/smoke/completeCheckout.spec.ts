import { test, expect } from "../../../fixtures/baseFixture";

test("@smoke user can complete checkout successfully", async ({
  page,
  inventoryPage,
  header,
  cartPage,
  checkoutPage,
  checkoutOverviewPage,
  checkoutCompletePage,
}) => {
  // Open inventory
  await page.goto("/inventory.html");

  // Add product
  await inventoryPage.waitForPage();
  await inventoryPage.addFirstProductToCart();

  // Verify cart badge
  expect(await header.getCartCount()).toBe("1");

  // Open cart
  await header.openCart();

  // Cart page
  await cartPage.waitForPage();
  await cartPage.proceedToCheckout();

  // Checkout information
  await checkoutPage.waitForPage();
  await checkoutPage.fillCheckoutInfo("Hanna", "Montana", "700001");
  await checkoutPage.continueCheckout();

  // Overview page
  await checkoutOverviewPage.waitForPage();
  await checkoutOverviewPage.finishOrder();

  // Complete page
  await checkoutCompletePage.waitForPage();

  expect(await checkoutCompletePage.getSuccessMessage()).toBe(
    "Thank you for your order!"
  );
});
