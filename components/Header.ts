import { Page, Locator } from "@playwright/test";
export class Header {
  readonly page: Page;
  readonly cartLink: Locator;
  readonly cartBadge: Locator;
  readonly menuButton: Locator;
  readonly logoutLink: Locator;
  constructor(page: Page) {
    this.page = page;
    this.cartLink = page.locator(".shopping_cart_link");
    this.cartBadge = page.locator(".shopping_cart_badge");
    this.menuButton = page.locator("#react-burger-menu-btn");
    this.logoutLink = page.locator("#logout_sidebar_link");
  }
  
  async openCart() {
    await this.cartLink.click();
  }

  async getCartCount() {
    return await this.cartBadge.textContent();
  }
  
  async logout() {
    await this.menuButton.click();
    await this.logoutLink.click();
  }
}
