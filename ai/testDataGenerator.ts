import { openai } from './openaiClient';
import {
  TestCase,
  TestCaseSchema
} from './testCase/testCaseSchema';
import { z } from 'zod';

const TestCaseArraySchema = z.array(
  TestCaseSchema
);

export interface TestUser {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  postalCode: string;
}

export async function generateTestUser(
  scenario: 'valid' | 'invalid-email'
): Promise<TestUser> {

  const response =
    await openai.chat.completions.create({

      model: 'gpt-4o-mini',

      messages: [

        {
          role: 'system',

          content: `
You are an expert QA test data generator.

Generate test user data for the requested scenario.

Rules:

- Return ONLY valid JSON.
- Do not return Markdown.
- Do not return explanations.

The JSON MUST contain:

{
  "firstName": "string",
  "lastName": "string",
  "email": "string",
  "password": "string",
  "postalCode": "string"
}

For "valid":
- Generate a valid email address.

For "invalid-email":
- Generate an invalid email address.
- The email must NOT contain a valid @domain structure.
`
        },

        {
          role: 'user',

          content: `
Generate test data for this scenario:

${scenario}

Return ONLY JSON.
`
        }

      ]
    });

  const content =
    response.choices[0]?.message?.content;

  if (!content) {

    throw new Error(
      'AI returned an empty test user response'
    );
  }

  console.log(
    '🤖 Raw AI user response:'
  );

  console.log(content);

  let rawData: unknown;

  try {

    rawData =
      JSON.parse(content);

  } catch {

    throw new Error(
      `AI returned invalid JSON:\n${content}`
    );
  }

  const TestUserSchema =
    z.object({

      firstName: z.string(),

      lastName: z.string(),

      email: z.string(),

      password: z.string(),

      postalCode: z.string()

    });

  const result =
    TestUserSchema.safeParse(rawData);

  if (!result.success) {

    throw new Error(
      `AI generated invalid test user:\n${result.error.message}`
    );
  }

  return result.data;
}

export async function generateTestCases(
  requirement: string
): Promise<TestCase[]> {

  const response =
    await openai.chat.completions.create({

      model: 'gpt-4o-mini',

      messages: [

        // ------------------------------------------
        // SYSTEM PROMPT
        // ------------------------------------------

        {
          role: 'system',

          content: `
You are an expert QA test engineer.

Your job is to analyze a software requirement
and generate comprehensive test cases.

Generate:

1. Positive test cases
2. Negative test cases
3. Boundary test cases when applicable

Rules:

- Return ONLY valid JSON.
- Return a JSON ARRAY of test cases.
- Do not return Markdown.
- Do not return explanations.
- Do not add comments.
- Do not invent application behavior that is
  unrelated to the requirement.

Each test case MUST contain these fields:

{
  "id": "string",
  "title": "string",
  "type": "positive | negative | boundary",
  "priority": "low | medium | high | critical",
  "preconditions": ["string"],
  "steps": ["string"],
  "expectedResult": "string"
}

IMPORTANT RULES:

1. "id" MUST be a string.

2. "title" MUST be a string.

3. "type" MUST be exactly one of:
   "positive"
   "negative"
   "boundary"

4. "priority" MUST be exactly one of:
   "low"
   "medium"
   "high"
   "critical"

5. "preconditions" MUST ALWAYS be
   an ARRAY of strings.

6. "steps" MUST ALWAYS be
   an ARRAY of strings.

7. "expectedResult" MUST be a string.

8. NEVER return "preconditions" as a single string.

9. NEVER return "steps" as a single string.

10. Return ONLY the JSON array.

Example:

[
  {
    "id": "TC001",
    "title": "Add product to cart",
    "type": "positive",
    "priority": "high",
    "preconditions": [
      "User is logged in",
      "Product is available"
    ],
    "steps": [
      "Navigate to the product page",
      "Click Add to Cart"
    ],
    "expectedResult": "Product is added to the cart"
  }
]
`
        },

        // ------------------------------------------
        // USER PROMPT
        // ------------------------------------------

        {
          role: 'user',

          content: `
Generate test cases for this requirement:

${requirement}

Return the test cases as JSON.
`
        }
      ]
    });

  // ----------------------------------------------
  // Get AI response
  // ----------------------------------------------

  const content =
    response.choices[0]?.message?.content;

  if (!content) {

    throw new Error(
      'AI returned an empty response'
    );
  }

  console.log('🤖 Raw AI test case response:');
  console.log(content);

  // ----------------------------------------------
  // Parse JSON
  // ----------------------------------------------

  let rawData: unknown;

  try {

    rawData = JSON.parse(content);

  } catch {

    throw new Error(
      `AI returned invalid JSON:\n${content}`
    );
  }

  // ----------------------------------------------
  // Validate using Zod
  // ----------------------------------------------

  const result =
    TestCaseArraySchema.safeParse(rawData);

  if (!result.success) {

    console.error(
      '❌ Zod validation failed:'
    );

    console.error(
      result.error.format()
    );

    throw new Error(
      `AI generated invalid test cases:\n${result.error.message}`
    );
  }

  console.log(
    `✅ ${result.data.length} AI test cases validated`
  );

  return result.data;
}