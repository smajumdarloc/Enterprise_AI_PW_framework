import { test, expect } from '@playwright/test';

import {
  generateTestCases
} from '../../ai/testCase/testCaseGenerator';

import {
  generatePlaywrightTest
} from '../../ai/testCase/playwrightTestGenerator';

import {
  writePlaywrightTestFile
} from '../../ai/testCase/playwrightTestFileWriter';


test(
  'AI requirement to Playwright spec generation',
  async () => {

    // ==========================================
    // REQUIREMENT
    // ==========================================

    const requirement = `
A logged-in user should be able to add
an available product to the shopping cart.
`;


    console.log(
      '\n📝 Requirement:'
    );

    console.log(
      requirement
    );


    // ==========================================
    // STEP 1
    // GENERATE AI TEST CASES
    // ==========================================

    const testCases =
      await generateTestCases(
        requirement
      );


    console.log(
      `🤖 AI generated ${testCases.length} test cases`
    );


    expect(
      testCases.length
    ).toBeGreaterThan(0);


    // ==========================================
    // STEP 2
    // SELECT POSITIVE TEST CASE
    // ==========================================

    const testCase =
      testCases.find(
        tc =>
          tc.type === 'positive'
      );


    expect(
      testCase
    ).toBeDefined();


    if (!testCase) {

      throw new Error(
        '❌ No positive AI test case generated'
      );
    }


    console.log(
      '\n🎯 Selected AI Test Case:'
    );

    console.log(
      JSON.stringify(
        testCase,
        null,
        2
      )
    );


    // ==========================================
    // STEP 3
    // GENERATE PLAYWRIGHT CODE
    // ==========================================

    const playwrightCode =
      generatePlaywrightTest(
        testCase
      );


    console.log(
      '\n🎭 Generated Playwright Test:'
    );

    console.log(
      playwrightCode
    );


    // ==========================================
    // STEP 4
    // VALIDATE GENERATED CODE
    // ==========================================

    expect(
      playwrightCode
    ).toContain(
      'inventoryPage.addFirstProductToCart()'
    );


    expect(
      playwrightCode
    ).toContain(
      'cartPage.verifyProductAdded()'
    );


    // ==========================================
    // STEP 5
    // WRITE .SPEC.TS FILE
    // ==========================================

    const generatedFile =
      writePlaywrightTestFile(
        testCase
      );


    // ==========================================
    // VERIFY FILE PATH
    // ==========================================

    expect(
      generatedFile
    ).toContain(
      'tests/ui/ai-generated'
    );


    expect(
      generatedFile
    ).toContain(
      `${testCase.id}-`
    );


    expect(
      generatedFile
    ).toMatch(
      /\.spec\.ts$/
    );


    console.log(
      '\n📄 AI Playwright .spec.ts generated:'
    );

    console.log(
      generatedFile
    );


    console.log(
      '\n✅ Requirement → TestCase → Playwright .spec.ts successful'
    );
  }
);