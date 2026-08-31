import {
  generateTestCases
} from '../ai/testCase/testCaseGenerator';

import {
  writePlaywrightTestFile
} from '../ai/testCase/playwrightTestFileWriter';


// ==========================================
// REQUIREMENT
// ==========================================

const requirement = `
A logged-in user should be able to add
an available product to the shopping cart.
`;


// ==========================================
// MAIN
// ==========================================

async function main() {

  console.log(
    '\n=========================================='
  );

  console.log(
    '🤖 AI TEST GENERATION'
  );

  console.log(
    '=========================================='
  );


  console.log(
    '\n📝 Requirement:'
  );

  console.log(
    requirement
  );


  // ----------------------------------------
  // Generate test cases
  // ----------------------------------------

  const testCases =
    await generateTestCases(
      requirement
    );


  console.log(
    `\n🤖 AI generated ${testCases.length} test cases`
  );


  // ----------------------------------------
  // Select supported positive test case
  // ----------------------------------------

  const testCase =
    testCases.find(
      tc =>
        tc.type === 'positive'
    );


  if (!testCase) {

    throw new Error(
      '❌ No suitable positive test case generated'
    );
  }


  console.log(
    '\n🎯 Selected Test Case:'
  );

  console.log(
    JSON.stringify(
      testCase,
      null,
      2
    )
  );


  // ----------------------------------------
  // Write Playwright file
  // ----------------------------------------

  const generatedFile =
    writePlaywrightTestFile(
      testCase
    );


  console.log(
    '\n📄 Generated Playwright test:'
  );

  console.log(
    generatedFile
  );


  console.log(
    '\n=========================================='
  );

  console.log(
    '✅ AI TEST GENERATION COMPLETE'
  );

  console.log(
    '==========================================\n'
  );
}


main().catch(error => {

  console.error(
    '\n❌ AI test generation failed:'
  );

  console.error(
    error
  );

  process.exit(1);
});