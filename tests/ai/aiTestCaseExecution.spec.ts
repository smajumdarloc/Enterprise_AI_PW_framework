import { test } from '@playwright/test';

import { generateTestCases }
  from '../../ai/testCase/testCaseGenerator';

import { TestCaseExecutor }
  from '../../ai/testCase/testCaseExecutor';

import {
  validateTestCaseCapability
} from '../../ai/testCase/testCaseCapability';

import {
  TestCaseExecutionResult
} from '../../ai/testCase/testCaseExecutionResult';

import {
  writeAiTestReport
} from '../../ai/testCase/aiTestReportWriter';

test(
  '@ai execute generated test suite',
  async ({ page }) => {

    // ------------------------------------------
    // Requirement
    // ------------------------------------------

    const requirement = `
    A logged-in user should be able to
    add an available product to the cart.
    `;


    // ------------------------------------------
    // Generate test cases
    // ------------------------------------------

    const testCases =
      await generateTestCases(
        requirement
      );


    console.log(
      `🤖 AI generated ${testCases.length} test cases`
    );


    // ------------------------------------------
    // Create executor
    // ------------------------------------------

    const executor =
      new TestCaseExecutor(page);


    // ------------------------------------------
    // Store execution results
    // ------------------------------------------

    const results:
      TestCaseExecutionResult[] = [];


    // ------------------------------------------
    // Execute every AI test case
    // ------------------------------------------

    for (const testCase of testCases) {

      console.log('\n');
      console.log(
        '=========================================='
      );

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
      // Skip unsupported scenario
      // ----------------------------------------

      if (!capability.supported) {

        console.log(
          `⏭️ Skipping ${testCase.id}`
        );


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
      // Execute supported scenario
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


        console.log(
          `✅ ${testCase.id} passed`
        );

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


        console.log(
          `❌ ${testCase.id} failed`
        );

      }
    }


    // ------------------------------------------
    // Execution summary
    // ------------------------------------------

    console.log('\n');
    console.log(
      '=========================================='
    );

    console.log(
      '🤖 AI TEST EXECUTION SUMMARY'
    );

    console.log(
      '=========================================='
    );


    for (const result of results) {

      const icon =
        result.status === 'passed'
          ? '✅'
          : result.status === 'failed'
            ? '❌'
            : '⏭️';


      console.log(
        `${icon} ${result.testCaseId} - ${result.title}`
      );


      if (result.reason) {

        console.log(
          `   Reason: ${result.reason}`
        );
      }
    }


    console.log(
      '=========================================='
    );

    // ------------------------------------------
// Write AI report
// ------------------------------------------

const reportPath =
  writeAiTestReport(
    requirement,
    results
  );


console.log(
  `📄 Report: ${reportPath}`
);

    // ------------------------------------------
// Fail Playwright test if AI test cases failed
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