import { test, expect } from '../../../fixtures/baseTest';

test('@regression intentional failure for AI',
  async ({ page }) => {

  await page.goto('/inventory.html');

  await expect(page.locator('.wrong-title'))
  .toHaveText('Products');
});