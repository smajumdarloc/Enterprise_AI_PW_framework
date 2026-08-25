import { test, expect } from '@playwright/test';

import {
  mapAction,
  TestAction
} from '../../ai/testCase/actionMapper';


test(
  'AI natural language actions should map correctly',
  () => {

    expect(
      mapAction('Click Add to Cart')
    ).toBe(TestAction.ADD_TO_CART);


    expect(
      mapAction('Click the Add to Cart button')
    ).toBe(TestAction.ADD_TO_CART);


    expect(
      mapAction('Press the Add to Cart button')
    ).toBe(TestAction.ADD_TO_CART);


    expect(
      mapAction('Select Add to Cart')
    ).toBe(TestAction.ADD_TO_CART);


    expect(
      mapAction('Navigate to the product page')
    ).toBe(TestAction.NAVIGATE_TO_PRODUCT);


    expect(
      mapAction('Go to the product page')
    ).toBe(TestAction.NAVIGATE_TO_PRODUCT);


    expect(
      mapAction('Do something completely unknown')
    ).toBeNull();


    console.log(
      '✅ AI action mapping validation passed'
    );
  }
);