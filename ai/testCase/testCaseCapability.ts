import { TestCase } from './testCaseSchema';

export interface CapabilityResult {
  supported: boolean;
  reason: string;
}


export function validateTestCaseCapability(
  testCase: TestCase
): CapabilityResult {

  const text = [
    testCase.title,
    ...testCase.preconditions,
    ...testCase.steps,
    testCase.expectedResult
  ]
    .join(' ')
    .toLowerCase();


  // ------------------------------------------
  // Unsupported: unavailable product
  // ------------------------------------------

  if (
    text.includes('unavailable product') ||
    text.includes('product is not available')
  ) {

    return {
      supported: false,
      reason:
        'Framework does not currently support unavailable-product simulation'
    };
  }


  // ------------------------------------------
  // Unsupported: user not logged in
  // ------------------------------------------

  if (
    text.includes('without being logged in') ||
    text.includes('user is not logged in') ||
    text.includes('without login')
  ) {

    return {
      supported: false,
      reason:
        'Framework currently uses authenticated storage state'
    };
  }


  // ------------------------------------------
  // Unsupported: quantity scenarios
  // ------------------------------------------

  if (
    text.includes('maximum quantity') ||
    text.includes('quantity of zero') ||
    text.includes('quantity must be greater than zero')
  ) {

    return {
      supported: false,
      reason:
        'Quantity-based cart scenarios are not currently implemented'
    };
  }

  // ------------------------------------------
// Unsupported: no products available
// ------------------------------------------

if (
  text.includes('no products are available') ||
  text.includes('no product is available') ||
  text.includes('no available products')
) {

  return {
    supported: false,
    reason:
      'Framework does not currently support empty-product inventory scenarios'
  };
}

  // ------------------------------------------
  // Supported: product/cart flow
  // ------------------------------------------

  if (
    text.includes('add') &&
    text.includes('product') &&
    text.includes('cart')
  ) {

    return {
      supported: true,
      reason:
        'Product/cart flow is supported'
    };
  }


  // ------------------------------------------
  // Unknown scenario
  // ------------------------------------------

  return {
    supported: false,
    reason:
      'No framework capability exists for this scenario'
  };
}