import OpenAI from 'openai';
import dotenv from 'dotenv';

dotenv.config();

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export async function analyzeFailure(
  testName: string,
  error: string
): Promise<string> {

  const prompt = `
You are a senior QA Automation Architect.

Analyze this Playwright test failure.

Test Name:
${testName}

Error:
${error}

Provide:
1. Probable root cause
2. Whether it is likely a locator issue, timing issue, test data issue, or application issue
3. Recommended fix
4. Suggested Playwright improvement
5. Risk if ignored

Keep the response concise but actionable.
`;

  const response = await client.chat.completions.create({
    model: 'gpt-4.1-mini',
    messages: [
      {
        role: 'system',
        content: 'You are an expert in Playwright, TypeScript, CI/CD, and QA architecture.'
      },
      {
        role: 'user',
        content: prompt
      }
    ],
    temperature: 0.2
  });

  return response.choices[0].message.content ?? 'No analysis generated.';
}