import { test, expect } from '@playwright/test';

import {
  validateTestCaseCapability
} from '../../ai/testCase/testCaseCapability';

import {
  TestCase
} from '../../ai/testCase/testCaseSchema';


test(
  'validate AI test case capabilities',
  () => {

    const supportedTestCase: TestCase = {

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
        'Click Add to Cart'
      ],

      expectedResult:
        'Product is added to the cart'
    };


    const result =
      validateTestCaseCapability(
        supportedTestCase
      );


    expect(
      result.supported
    ).toBe(true);


    console.log(
      '✅ Supported scenario validated'
    );
  }
);


test(
  'reject unsupported AI scenario',
  () => {

    const unsupportedTestCase: TestCase = {

      id: 'TC002',

      title:
        'Add unavailable product to cart',

      type:
        'negative',

      priority:
        'medium',

      preconditions: [
        'User is logged in',
        'Product is not available'
      ],

      steps: [
        'Navigate to the product page',
        'Click Add to Cart'
      ],

      expectedResult:
        'Error message is displayed'
    };


    const result =
      validateTestCaseCapability(
        unsupportedTestCase
      );


    expect(
      result.supported
    ).toBe(false);


    console.log(
      '✅ Unsupported scenario correctly rejected'
    );

  }
);