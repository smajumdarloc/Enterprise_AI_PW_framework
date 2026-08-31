export enum TestAction {
  NAVIGATE_TO_PRODUCT = 'NAVIGATE_TO_PRODUCT',
  ADD_TO_CART = 'ADD_TO_CART',
  NAVIGATE_TO_CART = 'NAVIGATE_TO_CART'
}


export function mapAction(
  step: string
): TestAction | null {

  const normalizedStep =
    step
      .toLowerCase()
      .trim();


  // ------------------------------------------
  // Navigate to product page
  // ------------------------------------------

  if (
    normalizedStep.includes('navigate to the product page') ||
    normalizedStep.includes('go to the product page') ||
    normalizedStep.includes('open the product page') ||
    normalizedStep.includes('navigate to inventory')
  ) {

    return TestAction.NAVIGATE_TO_PRODUCT;
  }


  // ------------------------------------------
  // Add product to cart
  // ------------------------------------------

  if (
    normalizedStep.includes('add to cart') ||
    normalizedStep.includes('add the product to the cart') ||
    normalizedStep.includes('click add to cart') ||
    normalizedStep.includes('click the add to cart button') ||
    normalizedStep.includes('press the add to cart button') ||
    normalizedStep.includes('select add to cart')
  ) {

    return TestAction.ADD_TO_CART;
  }

  if (
  normalizedStep.includes('navigate to the shopping cart') ||
  normalizedStep.includes('go to the shopping cart') ||
  normalizedStep.includes('open the shopping cart')
) {
  return TestAction.NAVIGATE_TO_CART;
}


  // ------------------------------------------
  // Unknown action
  // ------------------------------------------

  return null;
}