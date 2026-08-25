import { test, expect } from '@playwright/test';
import {
  TestCaseSchema
} from '../../ai/testCase/testCaseSchema';

test('validate AI test case schema', async () => {

  const testCase = {

    id: 'TC001',

    title: 'Add a product to cart',

    type: 'positive',

    priority: 'high',

    preconditions: [
      'User is logged in',
      'Inventory page is displayed'
    ],

    steps: [
      'Select a product',
      'Click Add to Cart',
      'Open the cart'
    ],

    expectedResult:
      'The selected product is displayed in the cart'
  };

  const result = TestCaseSchema.safeParse(testCase);

  expect(result.success).toBeTruthy();

  console.log('✅ Test case schema validation passed');

});