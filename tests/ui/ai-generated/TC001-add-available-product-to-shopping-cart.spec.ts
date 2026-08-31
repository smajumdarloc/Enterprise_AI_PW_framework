import { test } from '../../../fixtures/baseTest';

test(
  '@ai TC001 Add available product to shopping cart',
  async ({ inventoryPage, cartPage }) => {

    await inventoryPage.waitForPage();
    
    
    await inventoryPage.addFirstProductToCart();

    await cartPage.verifyProductAdded();

  }
);
