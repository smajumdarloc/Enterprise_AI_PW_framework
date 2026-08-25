import { test, expect } from '../../../fixtures/baseTest';
import { generateTestUser } from '../../../ai/testDataGenerator';

test('@regression AI valid user', async ({ page }) => {

  const user = await generateTestUser('valid');

  console.log('🤖 Valid user:');
  console.log(JSON.stringify(user, null, 2));

  await page.goto('/inventory.html');
});

test('@regression AI invalid email', async ({ page }) => {

  const user = await generateTestUser('invalid-email');

  console.log('🤖 Invalid email user:');
  console.log(JSON.stringify(user, null, 2));

  await page.goto('/inventory.html');
});