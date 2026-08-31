import { Page, Locator, expect } from '@playwright/test';

export class CartPage {
  readonly page: Page;
  readonly cartList: Locator;
  readonly checkoutButton: Locator;
  readonly cartBadge: Locator;

  constructor(page: Page) {
    this.page = page;
    this.cartList = page.locator('.cart_list');
    this.checkoutButton = page.locator('#checkout');
    this.cartBadge = page.locator('.shopping_cart_badge');
  }

  async waitForPage() {
    await expect(this.cartList).toBeVisible();
  }

  async openCart() {

    await this.page
      .locator('.shopping_cart_link')
      .click();

  }

  async proceedToCheckout() {
    await this.checkoutButton.click();
  }

   // ==========================================
  // AI TEST CASE VALIDATION
  // ==========================================

  async verifyProductAdded() {

    await expect(
      this.cartBadge
    ).toHaveText('1');

  }

}