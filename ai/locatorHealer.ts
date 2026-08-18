export function suggestLocators(errorText: string): string[] {

  const suggestions: string[] = [];

  // Extract locator from Playwright error
  const locatorMatch = errorText.match(/locator\\('(.+?)'\\)/);

  if (!locatorMatch) {
    return ['No locator found in error message'];
  }

  const failedLocator = locatorMatch[1];

  suggestions.push(`Failed locator: ${failedLocator}`);

  // Heuristic suggestions
  if (failedLocator.startsWith('#')) {
    const id = failedLocator.replace('#', '');
    suggestions.push(`page.getByTestId('${id}')`);
    suggestions.push(`page.locator('[id="${id}"]')`);
  }

  if (failedLocator.startsWith('.')) {
    suggestions.push('Prefer role or test id instead of CSS class');
  }

  if (failedLocator === 'h1') {
    suggestions.push(`page.getByRole('heading')`);
    suggestions.push(`page.locator('.title')`);
    suggestions.push(`page.getByText('Products')`);
  }

  if (failedLocator.includes('button')) {
    suggestions.push(`page.getByRole('button')`);
  }

  return suggestions;
}