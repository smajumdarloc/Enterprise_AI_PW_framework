import { TestCase } from './testCaseSchema';


// ==========================================
// GENERATE PLAYWRIGHT TEST SOURCE
// ==========================================

export function generatePlaywrightTest(
  testCase: TestCase
): string {

  const testName =
    `@ai ${testCase.id} ${testCase.title}`;


  // ------------------------------------------
  // Convert AI steps to Playwright code
  // ------------------------------------------

  const stepCode =
    testCase.steps
      .map(step => mapStepToCode(step))
      .join('\n');


  // ------------------------------------------
  // Convert expected result
  // ------------------------------------------

  const expectedResultCode =
    mapExpectedResultToCode(
      testCase.expectedResult
    );


  // ------------------------------------------
  // Build complete spec
  // ------------------------------------------

  return `import { test } from '../../../fixtures/baseTest';

test(
  '${escapeString(testName)}',
  async ({ inventoryPage, cartPage }) => {

${indent(stepCode, 4)}

${indent(expectedResultCode, 4)}

  }
);
`;
}


// ==========================================
// STEP MAPPING
// ==========================================

function mapStepToCode(
  step: string
): string {

  const normalized =
    step.toLowerCase().trim();


  // ----------------------------------------
  // Navigate to product page
  // ----------------------------------------

  if (
    normalized.includes(
      'navigate to the product page'
    )
  ) {

    return `
await inventoryPage.waitForPage();
`;
  }


  // ----------------------------------------
  // Add product to cart
  // ----------------------------------------

  if (
    normalized.includes(
      'click add to cart'
    )
  ) {

    return `
await inventoryPage.addFirstProductToCart();
`;
  }


  // ----------------------------------------
  // Navigate to shopping cart
  // ----------------------------------------

  if (
    normalized.includes(
      'navigate to the shopping cart'
    )
  ) {

    return `
await cartPage.waitForPage();
`;
  }


  // ----------------------------------------
  // Unsupported step
  // ----------------------------------------

  throw new Error(
    `❌ Unsupported AI step: "${step}"`
  );
}


// ==========================================
// EXPECTED RESULT MAPPING
// ==========================================

function mapExpectedResultToCode(
  expectedResult: string
): string {

  const normalized =
    expectedResult
      .toLowerCase()
      .trim();


  // ----------------------------------------
  // Product added to cart
  // ----------------------------------------

  if (
    normalized.includes(
      'product is added to the cart'
    ) ||
    normalized.includes(
      'product is in the cart'
    ) ||
    normalized.includes(
      'added to the cart'
    )
  ) {

    return `
await cartPage.verifyProductAdded();
`;
  }


  // ----------------------------------------
  // Unsupported expected result
  // ----------------------------------------

  throw new Error(
    `❌ Unsupported AI expected result: "${expectedResult}"`
  );
}


// ==========================================
// HELPERS
// ==========================================

function escapeString(
  value: string
): string {

  return value
    .replace(/\\/g, '\\\\')
    .replace(/'/g, "\\'");
}


function indent(
  text: string,
  spaces: number
): string {

  const padding =
    ' '.repeat(spaces);

  return text
    .trim()
    .split('\n')
    .map(line => padding + line)
    .join('\n');
}