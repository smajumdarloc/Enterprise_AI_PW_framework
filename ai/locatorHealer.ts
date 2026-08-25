import { PageInfo, ElementInfo } from './pageInspector';

export interface LocatorSuggestion {
  locator: string;
  confidence: number;
  reason: string;
}

export function suggestLocators(
  errorText: string,
  pageInfo: PageInfo
): LocatorSuggestion[] {

  const suggestions: LocatorSuggestion[] = [];

  // -----------------------------------------
// Clean Playwright error
// -----------------------------------------

const cleanErrorText = errorText.replace(
  /\u001b\[[0-9;]*m/g,
  ''
);

console.log('🧹 Cleaned error:', cleanErrorText);

  // -----------------------------------------
  // 1. Extract failed locator
  // -----------------------------------------

  const locatorMatch = cleanErrorText.match(
    /Locator:\s*locator\(['"]([^'"]+)['"]\)/
  );

  const failedLocator = locatorMatch?.[1] ?? null;

  // -----------------------------------------
// 2. Extract expected text
// -----------------------------------------

const expectedMatch = cleanErrorText.match(
  /Expected:\s*(.+)/
);

const expectedText =
  expectedMatch?.[1]
    ?.trim()
    .replace(/^["']|["']$/g, '') ?? null;

console.log('🧪 EXPECTED MATCH:', expectedMatch);
console.log('🧪 EXPECTED TEXT:', expectedText);
  // -----------------------------------------
  // 3. Failed locator information
  // -----------------------------------------

  if (failedLocator) {

    suggestions.push({
      locator: failedLocator,
      confidence: 0,
      reason: 'Original locator failed.'
    });

  }

  // -----------------------------------------
  // 4. Search buttons
  // -----------------------------------------

  if (expectedText) {

    const matchingButton = pageInfo.buttons.find(
      button =>
        button.text.toLowerCase() ===
        expectedText.toLowerCase()
    );

    if (matchingButton) {

      suggestions.push({
        locator:
          `page.getByRole('button', { name: '${matchingButton.text}' })`,

        confidence: 95,

        reason:
          `Button text matches expected text "${expectedText}".`
      });

      // Test ID
      if (matchingButton.testId) {

        suggestions.push({
          locator:
            `page.getByTestId('${matchingButton.testId}')`,

          confidence: 98,

          reason:
            'A stable data-testid was found on the matching button.'
        });

      }

      // ID
      if (matchingButton.id) {

        suggestions.push({
          locator:
            `page.locator('#${matchingButton.id}')`,

          confidence: 85,

          reason:
            'The matching button has a unique ID.'
        });

      }

      // Name
      if (matchingButton.name) {

        suggestions.push({
          locator:
            `page.locator('[name="${matchingButton.name}"]')`,

          confidence: 80,

          reason:
            'The matching button has a name attribute.'
        });

      }

    }

  }

  // -----------------------------------------
  // 5. Search headings
  // -----------------------------------------

  if (expectedText) {

    const matchingHeading = pageInfo.headings.find(
      heading =>
        heading.text.toLowerCase() ===
        expectedText.toLowerCase()
    );

    if (matchingHeading) {

      suggestions.push({
        locator:
          `page.getByRole('heading', { name: '${matchingHeading.text}' })`,

        confidence: 95,

        reason:
          `Heading text matches expected text "${expectedText}".`
      });

    }

  }

  // -----------------------------------------
  // 6. Search links
  // -----------------------------------------

  if (expectedText) {

    const matchingLink = pageInfo.links.find(
      link =>
        link.text.toLowerCase() ===
        expectedText.toLowerCase()
    );

    if (matchingLink) {

      suggestions.push({
        locator:
          `page.getByRole('link', { name: '${matchingLink.text}' })`,

        confidence: 95,

        reason:
          `Link text matches expected text "${expectedText}".`
      });

      if (matchingLink.testId) {

        suggestions.push({
          locator:
            `page.getByTestId('${matchingLink.testId}')`,

          confidence: 98,

          reason:
            'A stable data-testid was found on the matching link.'
        });

      }

    }

  }

  // -----------------------------------------
  // 7. No match found
  // -----------------------------------------

  if (suggestions.length === 0) {

    suggestions.push({

      locator: 'No locator suggestion',

      confidence: 0,

      reason:
        `No element matched expected text "${expectedText}".`

    });

  }

  // -----------------------------------------
  // 8. Rank suggestions
  // -----------------------------------------

  suggestions.sort(
    (a, b) => b.confidence - a.confidence
  );

  return suggestions;
}