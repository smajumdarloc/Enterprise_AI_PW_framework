import { test } from '@playwright/test';

import {
  readRequirement
} from '../../ai/requirement/requirementReader';

import {
  generateTestCases
} from '../../ai/testCase/testCaseGenerator';

import {
  validateTestCaseCapability
} from '../../ai/testCase/testCaseCapability';

import {
  TestCaseExecutor
} from '../../ai/testCase/testCaseExecutor';

import {
  TestCaseExecutionResult
} from '../../ai/testCase/testCaseExecutionResult';

import {
  writeAiTestReport
} from '../../ai/testCase/aiTestReportWriter';

import {
  validateRequirement
} from '../../ai/requirement/requirementValidator';


test(
  '@ai requirement driven test execution',
  async ({ page }) => {

    // ------------------------------------------
    // 1. Read requirement
    // ------------------------------------------

    const requirement =
      readRequirement(
        'add-to-cart.md'
      );

    // ------------------------------------------
   // 2. Validate requirement
  // ------------------------------------------

    const validation =
      validateRequirement(
        requirement
        );


if (!validation.valid) {

  throw new Error(
    `Invalid requirement: ${validation.reason}`
  );
}


console.log(
  '✅ Requirement validation passed'
);
    // ------------------------------------------
    // 3. Generate test cases
    // ------------------------------------------

    const testCases =
      await generateTestCases(
        requirement
      );


    console.log(
      `🤖 AI generated ${testCases.length} test cases`
    );


    // ------------------------------------------
    // 4. Create executor
    // ------------------------------------------

    const executor =
      new TestCaseExecutor(page);


    const results:
      TestCaseExecutionResult[] = [];


    // ------------------------------------------
    // 5. Process complete AI suite
    // ------------------------------------------

    for (const testCase of testCases) {

      console.log('\n');

      console.log(
        `🧪 Processing ${testCase.id}: ${testCase.title}`
      );


      // ----------------------------------------
      // Capability validation
      // ----------------------------------------

      const capability =
        validateTestCaseCapability(
          testCase
        );


      console.log(
        `🧠 Supported: ${capability.supported}`
      );


      console.log(
        `📝 Reason: ${capability.reason}`
      );


      // ----------------------------------------
      // Unsupported
      // ----------------------------------------

      if (!capability.supported) {

        results.push({

          testCaseId:
            testCase.id,

          title:
            testCase.title,

          status:
            'skipped',

          reason:
            capability.reason

        });

        continue;
      }


      // ----------------------------------------
      // Execute
      // ----------------------------------------

      try {

        await executor.execute(
          testCase
        );


        results.push({

          testCaseId:
            testCase.id,

          title:
            testCase.title,

          status:
            'passed'

        });

      } catch (error: any) {

        results.push({

          testCaseId:
            testCase.id,

          title:
            testCase.title,

          status:
            'failed',

          reason:
            error?.message ??
            'Unknown error'

        });

      }
    }


    // ------------------------------------------
    // 5. Generate AI execution report
    // ------------------------------------------

    writeAiTestReport(
      requirement,
      results
    );


    // ------------------------------------------
    // 6. Fail Playwright if execution failed
    // ------------------------------------------

    const failedTests =
      results.filter(
        result =>
          result.status === 'failed'
      );


    if (failedTests.length > 0) {

      throw new Error(
        `${failedTests.length} AI generated test case(s) failed`
      );
    }
  }
);