import { test, expect } from '../../../fixtures/baseFixture';

test('@smoke hybrid checkout with API-created customer',
  async ({
    page,
    inventoryPage,
    header,
    cartPage,
    checkoutPage,
    checkoutOverviewPage,
    checkoutCompletePage,
    testDataApi
  }) => {

    // ---------------- API SETUP ----------------
    const customer = await testDataApi.createCustomer();

    console.log('API created customer:', customer);

    // ---------------- UI FLOW ----------------
    await page.goto('/inventory.html');

    // Inventory page
    await inventoryPage.waitForPage();
    await inventoryPage.addFirstProductToCart();

    // Verify cart badge
    expect(await header.getCartCount()).toBe('1');

    // Open cart
    await header.openCart();

    // Cart page
    await cartPage.waitForPage();
    await cartPage.proceedToCheckout();

    // Checkout information using API-created data
    await checkoutPage.waitForPage();
    await checkoutPage.fillCheckoutInfo(
      customer.firstName,
      customer.lastName,
      customer.postalCode
    );

    await checkoutPage.continueCheckout();

    // Overview page
    await checkoutOverviewPage.waitForPage();
    await checkoutOverviewPage.finishOrder();

    // Complete page
    await checkoutCompletePage.waitForPage();

    expect(
      await checkoutCompletePage.getSuccessMessage()
    ).toBe('Thank you for your order!');
});