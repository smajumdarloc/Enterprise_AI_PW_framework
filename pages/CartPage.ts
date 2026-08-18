import { Page, Locator, expect } from '@playwright/test';

export class CartPage {
  readonly page: Page;
  readonly cartList: Locator;
  readonly checkoutButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.cartList = page.locator('.cart_list');
    this.checkoutButton = page.locator('#checkout');
  }

  async waitForPage() {
    await expect(this.cartList).toBeVisible();
  }

  async proceedToCheckout() {
    await this.checkoutButton.click();
  }
}