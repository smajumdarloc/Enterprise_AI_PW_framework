import { test, expect } from '@playwright/test';

import {
  generatePlaywrightTest
} from '../../ai/testCase/playwrightTestGenerator';

import {
  writePlaywrightTestFile
} from '../../ai/testCase/playwrightTestFileWriter';

import {
  TestCase
} from '../../ai/testCase/testCaseSchema';


test(
  'generate Playwright test from AI test case',
  () => {

    const testCase: TestCase = {

      id: 'TC001',

      title:
        'Add available product to cart',

      type:
        'positive',

      priority:
        'high',

      preconditions: [
        'User is logged in',
        'Product is available'
      ],

      steps: [
        'Navigate to the product page',
        'Click Add to Cart',
        'Navigate to the shopping cart'
      ],

      expectedResult:
        'Product is added to the cart'
    };


    // ----------------------------------------
    // Generate Playwright source
    // ----------------------------------------

    const generatedCode =
      generatePlaywrightTest(testCase);


    console.log(
      '\n🤖 Generated Playwright Test:\n'
    );

    console.log(
      generatedCode
    );


    // ----------------------------------------
    // Validate generated code
    // ----------------------------------------

    expect(
      generatedCode
    ).toContain(
      'inventoryPage.addFirstProductToCart()'
    );


    expect(
      generatedCode
    ).toContain(
      'cartPage.verifyProductAdded()'
    );


    // ----------------------------------------
    // WRITE .spec.ts FILE
    // ----------------------------------------

    const generatedFile =
      writePlaywrightTestFile(
        testCase
      );


    // ----------------------------------------
    // Verify file path
    // ----------------------------------------

    expect(
      generatedFile
    ).toContain(
      'tests/ui/ai-generated'
    );


    expect(
      generatedFile
    ).toContain(
      'TC001-add-available-product-to-cart.spec.ts'
    );


    console.log(
      '✅ Playwright test file generated successfully'
    );
  }
);