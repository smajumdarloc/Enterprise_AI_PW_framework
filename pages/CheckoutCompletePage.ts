import { Page, Locator, expect } from "@playwright/test";
export class CheckoutCompletePage {
  readonly page: Page;
  readonly completeHeader: Locator;
  constructor(page: Page) {
    this.page = page;
    this.completeHeader = page.locator(".complete-header");
  }
  async waitForPage() {
    await expect(this.completeHeader).toBeVisible();
  }
  async getSuccessMessage() {
    return await this.completeHeader.textContent();
  }
}
