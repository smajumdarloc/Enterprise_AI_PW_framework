# AI Test Generation Rules

## Framework

- Use Playwright with TypeScript.
- Tests are executed using Playwright Test.
- Use Page Object Model for UI interactions.
- Do not directly manipulate application internals.
- Prefer existing Page Objects and framework capabilities.

## Application

- The application under test is SauceDemo.
- The framework uses authenticated browser state for UI tests.
- Product and cart flows are supported.

## Test Case Rules

Every generated test case must contain:

- id
- title
- type
- priority
- preconditions
- steps
- expectedResult

Allowed test case types:

- positive
- negative
- boundary

Allowed priorities:

- low
- medium
- high
- critical

## Supported Scenarios

The framework currently supports:

- Login using the existing authenticated flow.
- Viewing available products.
- Adding an available product to the cart.
- Viewing the shopping cart.
- Checkout flows implemented by existing Page Objects.

## Unsupported Scenarios

The framework currently does not support:

- Simulating an unavailable product.
- Creating an empty inventory.
- Changing application backend data.
- Testing database state directly.
- Testing scenarios requiring unsupported Page Objects.
- Testing scenarios requiring unsupported Playwright actions.

## Locator Rules

- Prefer accessible Playwright locators.
- Prefer getByRole when appropriate.
- Use getByText when appropriate.
- Use CSS selectors only when necessary.
- Do not invent locators.
- Use locators that correspond to the actual application.

## AI Behavior

- Do not invent application behavior.
- Do not assume unsupported functionality exists.
- If a requirement describes unsupported behavior, generate the test case but allow the capability layer to reject it.
- Never execute an unsupported scenario.