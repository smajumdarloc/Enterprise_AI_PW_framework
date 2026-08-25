import { test as base, expect } from '@playwright/test';
//import {processFailure} from '../utils/testHooks';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import { CheckoutOverviewPage } from '../pages/checkoutOverviewPage';
import { CheckoutCompletePage } from '../pages/CheckoutCompletePage';
import {LoginPage} from '../pages/Loginpage';
import { Header } from '../components/Header';

import { TestDataApi } from '../tests/api/client/testDataApi';

// ---------- Type definitions ----------
type AppFixtures = {
  inventoryPage: InventoryPage;
  cartPage: CartPage;
  checkoutPage: CheckoutPage;
  checkoutOverviewPage: CheckoutOverviewPage;
  checkoutCompletePage: CheckoutCompletePage;
  loginPage: LoginPage;
  header: Header;
  testDataApi: TestDataApi;
};

// ---------- Extend Playwright test ----------
export const test = base.extend<AppFixtures>({

  // Inventory Page
  inventoryPage: async ({ page }, use) => {
    await use(new InventoryPage(page));
  },

  // Login Page
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },

  // Cart Page
  cartPage: async ({ page }, use) => {
    await use(new CartPage(page));
  },

  // Checkout Information Page
  checkoutPage: async ({ page }, use) => {
    await use(new CheckoutPage(page));
  },

  // Checkout Overview Page
  checkoutOverviewPage: async ({ page }, use) => {
    await use(new CheckoutOverviewPage(page));
  },

  // Checkout Complete Page
  checkoutCompletePage: async ({ page }, use) => {
    await use(new CheckoutCompletePage(page));
  },

  // Reusable Header Component
  header: async ({ page }, use) => {
    await use(new Header(page));
  },

  // API Test Data Client
  testDataApi: async ({ request }, use) => {
    await use(new TestDataApi(request));
  },
  
});

// Re-export expect
export { expect };