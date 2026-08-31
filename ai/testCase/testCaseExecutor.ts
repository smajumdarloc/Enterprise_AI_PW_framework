import { Page, expect } from '@playwright/test';

import { TestCase } from './testCaseSchema';

import { InventoryPage } from '../../pages/InventoryPage';
import { CartPage } from '../../pages/CartPage';
import { TestAction, mapAction } from './actionMapper';


export class TestCaseExecutor {

  private page: Page;

  private inventoryPage: InventoryPage;
  private cartPage: CartPage;


  constructor(page: Page) {

    this.page = page;

    this.inventoryPage =
      new InventoryPage(page);

    this.cartPage =
      new CartPage(page);
  }


  async execute(testCase: TestCase) {

  console.log(
    `🤖 Executing AI Test Case: ${testCase.id}`
  );

  console.log(
    `📋 Title: ${testCase.title}`
  );

  console.log(
    `🏷️ Type: ${testCase.type}`
  );

  console.log(
    `⭐ Priority: ${testCase.priority}`
  );


  // ------------------------------------------
  // Navigate to application page
  // ------------------------------------------

  await this.page.goto('/inventory.html');


  // ------------------------------------------
  // Preconditions
  // ------------------------------------------

  await this.validatePreconditions(
    testCase.preconditions
  );


  // ------------------------------------------
  // Execute steps
  // ------------------------------------------

  console.log(
    '▶️ Executing steps...'
  );

  for (const step of testCase.steps) {

    // Skip navigation because we already
    // navigated to the inventory page

    if (
      step.toLowerCase().includes(
        'navigate to the product page'
      )
    ) {

      console.log(
        '➡️ Navigation already completed'
      );

      continue;
    }

    console.log(
      `➡️ ${step}`
    );

    await this.executeStep(step);
  }


  // ------------------------------------------
  // Expected Result
  // ------------------------------------------

  await this.validateExpectedResult(
    testCase.expectedResult
  );
}


  // ==========================================
  // PRECONDITIONS
  // ==========================================

  private async validatePreconditions(
    preconditions: string[]
  ) {

    console.log(
      '🔐 Checking Preconditions...'
    );

    for (const condition of preconditions) {

      console.log(
        `   🔎 ${condition}`
      );

      const normalizedCondition =
        condition.toLowerCase();


      // ----------------------------------------
      // User is logged in
      // ----------------------------------------

      if (
        normalizedCondition.includes(
          'user is logged in'
        )
      ) {

        await expect(
          this.page.locator(
            '.shopping_cart_link'
          )
        ).toBeVisible();

        console.log(
          '   ✅ User is logged in'
        );

        continue;
      }


      // ----------------------------------------
      // Product is available
      // ----------------------------------------

      if (
        normalizedCondition.includes(
          'product is available'
        )
      ) {

        await expect(
          this.page.locator(
            '.inventory_item'
          ).first()
        ).toBeVisible();

        console.log(
          '   ✅ Product is available'
        );

        continue;
      }


      // ----------------------------------------
      // Unsupported precondition
      // ----------------------------------------

      console.log(
        `   ⚠️ Unsupported precondition: ${condition}`
      );
    }
  }


  // ==========================================
  // STEP EXECUTION
  // ==========================================

 private async executeStep(
  step: string
) {

  const action =
    mapAction(step);


  // ------------------------------------------
  // Unknown action
  // ------------------------------------------

  if (!action) {

    throw new Error(
      `❌ AI generated unsupported step: "${step}"`
    );
  }


  // ------------------------------------------
  // Navigate to product
  // ------------------------------------------

  if (
    action ===
    TestAction.NAVIGATE_TO_PRODUCT
  ) {

    await this.page.goto(
      '/inventory.html'
    );

    return;
  }


  // ------------------------------------------
  // Add product to cart
  // ------------------------------------------

  if (
    action ===
    TestAction.ADD_TO_CART
  ) {

    await this.inventoryPage
      .addFirstProductToCart();

    return;
  }
}




  // ==========================================
  // EXPECTED RESULT
  // ==========================================

 private async validateExpectedResult(
  expectedResult: string
) {

  console.log(
    `🎯 Expected Result: ${expectedResult}`
  );


  const normalizedResult =
    expectedResult
      .toLowerCase()
      .trim();


  // ------------------------------------------
  // Product added to cart
  // ------------------------------------------

  if (
    normalizedResult.includes(
      'product is added to the cart'
    ) ||
    normalizedResult.includes(
      'product is in the cart'
    ) ||
    normalizedResult.includes(
      'added to the cart'
    )
  ) {

    await this.cartPage
      .verifyProductAdded();

    console.log(
      '✅ Expected result validated: Product is in cart'
    );

    return;
  }


  // ------------------------------------------
  // Unsupported expected result
  // ------------------------------------------

  throw new Error(
    `❌ AI generated unsupported expected result: "${expectedResult}"`
  );
}

}