import { Page } from '@playwright/test';

export interface ElementInfo {
  tag: string;
  text: string;
  role?: string;
  ariaLabel?: string;
  testId?: string;
  id?: string;
  name?: string;
  placeholder?: string;
}

export interface PageInfo {
  headings: ElementInfo[];
  buttons: ElementInfo[];
  links: ElementInfo[];
}

async function inspectElements(
  page: Page,
  selector: string
): Promise<ElementInfo[]> {

  const elements = await page.locator(selector).evaluateAll(
    elements =>
      elements.map(element => ({
        tag: element.tagName.toLowerCase(),

        text: (element.textContent ?? '').trim(),

        role: element.getAttribute('role') ?? undefined,

        ariaLabel:
          element.getAttribute('aria-label') ?? undefined,

        testId:
          element.getAttribute('data-testid') ?? undefined,

        id:
          element.getAttribute('id') ?? undefined,

        name:
          element.getAttribute('name') ?? undefined,

        placeholder:
          element.getAttribute('placeholder') ?? undefined
      }))
  );

  return elements;
}

export async function inspectPage(
  page: Page
): Promise<PageInfo> {

  const headings = await inspectElements(
    page,
    'h1, h2, h3'
  );

  const buttons = await inspectElements(
    page,
    'button'
  );

  const links = await inspectElements(
    page,
    'a'
  );

  return {
    headings,
    buttons,
    links
  };
}