import { test, expect } from "../../../fixtures/baseFixture";
async function navigateToCheckout(
  page: any,
  inventoryPage: any,
  header: any,
  cartPage: any
) {
  await page.goto("/inventory.html");
  await inventoryPage.waitForPage();
  await inventoryPage.addFirstProductToCart();
  await header.openCart();
  await cartPage.waitForPage();
  await cartPage.proceedToCheckout();
}

const validationCases = [
  {
    name: "first name",
    first: "",
    last: "Majumdar",
    zip: "700001",
    expected: "First Name is required",
  },
  {
    name: "last name",
    first: "Shipra",
    last: "",
    zip: "700001",
    expected: "Last Name is required",
  },
  {
    name: "postal code",
    first: "Shipra",
    last: "Majumdar",
    zip: "",
    expected: "Postal Code is required",
  },
];

for (const tc of validationCases) {
  test(`@regression checkout requires ${tc.name}`, async ({
    page,
    inventoryPage,
    header,
    cartPage,
    checkoutPage,
  }) => {
    await navigateToCheckout(page, inventoryPage, header, cartPage);
    await checkoutPage.waitForPage();
    await checkoutPage.fillCheckoutInfo(tc.first, tc.last, tc.zip);
    await checkoutPage.continueCheckout();
    expect(await checkoutPage.getErrorMessage()).toContain(tc.expected);
  });
}

test("@regression checkout accepts long values", async ({
  page,
  inventoryPage,
  header,
  cartPage,
  checkoutPage,
}) => {
  const longText = "A".repeat(100);
  await navigateToCheckout(page, inventoryPage, header, cartPage);
  await checkoutPage.fillCheckoutInfo(longText, longText, "700001");
  await checkoutPage.continueCheckout();
});


