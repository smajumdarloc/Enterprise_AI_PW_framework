import { test, expect } from '@playwright/test';

import {
  validateRequirement
} from '../../ai/requirement/requirementValidator';


test(
  'reject empty requirement',
  () => {

    const result =
      validateRequirement('');

    expect(result.valid)
      .toBe(false);

    expect(result.reason)
      .toBe('Requirement is empty');
  }
);


test(
  'reject very short requirement',
  () => {

    const result =
      validateRequirement('Login');

    expect(result.valid)
      .toBe(false);
  }
);


test(
  'accept valid requirement',
  () => {

    const result =
      validateRequirement(
        `
        A logged-in user should be able
        to add an available product
        to the shopping cart.
        `
      );

    expect(result.valid)
      .toBe(true);
  }
);