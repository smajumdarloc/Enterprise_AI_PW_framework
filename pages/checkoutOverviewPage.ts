import { Page, Locator, expect } from "@playwright/test";
export class CheckoutOverviewPage {
  readonly page: Page;
  readonly summaryContainer: Locator;
  readonly finishButton: Locator;
  constructor(page: Page) {
    this.page = page;
    this.summaryContainer = page.locator(".summary_info");
    this.finishButton = page.locator("#finish");
  }
  async waitForPage() {
    await expect(this.summaryContainer).toBeVisible();
  }
  async finishOrder() {
    await this.finishButton.click();
  }
}
