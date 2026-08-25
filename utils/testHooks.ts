import { Page, TestInfo } from '@playwright/test';
import { inspectPage } from '../ai/pageInspector';
import { analyzeFailure } from '../ai/failureAnalyzer';
import { writeAiReport } from '../ai/reportWriter';
import { suggestLocators } from '../ai/locatorHealer';


export async function processFailure(
  page: Page,
  testInfo: TestInfo
) {

  // Run only for unexpected failures
  if (testInfo.status !== testInfo.expectedStatus) {

    // Capture Playwright error
    const errorText =
      testInfo.error?.message ?? 'Unknown error';
      console.log('🔴 RAW ERROR START'); 
      console.log(errorText); 
      console.log('🔴 RAW ERROR END');
      
    const pageInfo = await inspectPage(page);

        console.log('🌐 PAGE INFORMATION');
        console.log('Headings:', pageInfo.headings);
        console.log('Buttons:', pageInfo.buttons);
        console.log('Links:', pageInfo.links);

    // ---------------- Locator Healer ----------------
    const locatorSuggestions = suggestLocators(
    errorText,
    pageInfo
    );

    console.log('🩹 Locator suggestions:');
    locatorSuggestions.forEach(s => console.log('  -', s));

    console.log('🔍 Processing failure...');

    let analysis = '';

    // ---------------- AI Analysis ----------------
    try {

      if (!process.env.OPENAI_API_KEY) {
        throw new Error('OPENAI_API_KEY not configured');
      }

      analysis = await analyzeFailure(
        testInfo.title,
        errorText
      );

      console.log('🧠 AI analysis generated');

    } catch (err: any) {

      console.log('⚠️ AI analysis unavailable');

      // Fallback report when AI is not available
      analysis = `
## AI analysis unavailable

Reason: ${err.message}

### Captured Playwright error

\`\`\`
${errorText}
\`\`\`

### Suggested manual investigation

- Verify the locator exists on the page
- Check whether the page is fully loaded
- Open the Playwright trace
- Inspect screenshot and video artifacts
`;
    }

    // ---------------- Add Locator Suggestions ----------------
    analysis += `

## Locator suggestions

${locatorSuggestions.map(s => `- ${s}`).join('\n')}
`;

    // ---------------- Save Report ----------------
    const reportPath = writeAiReport(
      testInfo.title,
      analysis
    );

    console.log('📄 Report saved:', reportPath);
  }
}