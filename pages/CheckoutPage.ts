import { Page, Locator, expect } from '@playwright/test';

export class CheckoutPage {
  readonly page: Page;
  readonly firstName: Locator;
  readonly lastName: Locator;
  readonly postalCode: Locator;
  readonly continueButton: Locator;
  readonly errorMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.firstName = page.locator('[data-test="firstName"]');
    this.lastName = page.locator('[data-test="lastName"]');
    this.postalCode = page.locator('[data-test="postalCode"]');
    this.continueButton = page.locator('[data-test="continue"]');
    this.errorMessage = page.locator('//h3[@data-test="error"]');
  }

  async waitForPage() {
    await expect(this.firstName).toBeVisible();
  }

  async fillCheckoutInfo(first: string, last: string, zip: string) {
    await this.firstName.fill(first);
    await this.lastName.fill(last);
    await this.postalCode.fill(zip);
  }

  async continueCheckout() {
    await this.continueButton.click();
  }

  async getErrorMessage() {
    
    await expect(this.errorMessage).toBeVisible();
    console.log('Error message locator =', await this.errorMessage.textContent());
    return await this.errorMessage.textContent();
  }
}