import { test, expect } from '@playwright/test';
import { generateTestCases }
  from '../../ai/testCase/testCaseGenerator';

test(
  'AI generates test cases from requirement',
  async () => {

    const requirement =
      'A logged-in user should be able to add a product to the shopping cart.';

    const testCases =
      await generateTestCases(requirement);

    console.log('\n🤖 Generated Test Cases:\n');

    console.log(
      JSON.stringify(
        testCases,
        null,
        2
      )
    );

    expect(testCases.length).toBeGreaterThan(0);

  }
);