import { openai } from '../openaiClient';
import {
    TestCase,
    TestCaseSchema
} from './testCaseSchema';
import { z } from 'zod';
import {
    readRules,
    readSkills
} from '../knowledge/knowledgeReader';


const TestCaseArraySchema = z.array(
    TestCaseSchema
);

export async function generateTestCases(
    requirement: string
): Promise<TestCase[]> {

    const rules =
        readRules();

    const skills =
        readSkills();

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

You are generating test cases for an
existing Playwright TypeScript framework.

Follow the framework rules and skills below.

========================================
FRAMEWORK RULES
========================================

${rules}

========================================
FRAMEWORK SKILLS
========================================

${skills}

========================================
TEST GENERATION RULES
========================================

Generate:

1. Positive test cases
2. Negative test cases
3. Boundary test cases when applicable

Do not invent application behavior.

Do not invent framework capabilities.

Return ONLY valid JSON.

Return a JSON object with this structure:

{
  "testCases": [
    {
      "id": "TC001",
      "title": "...",
      "type": "positive",
      "priority": "high",
      "preconditions": [],
      "steps": [],
      "expectedResult": "..."
    }
  ]
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

10. Return ONLY a JSON array.

The response must:
- Start with [
- End with ]
- Contain only test case objects
- Never contain Markdown
- Never contain explanations
- Never contain comments

If the requirement does not contain enough information
to generate meaningful test cases, return an empty array [].

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
            Generate test cases for this requirement.

            Requirement:

            ${requirement}

            Remember:

            - Follow the framework rules.
            - Only generate scenarios relevant to the requirement.
            - Do not assume unsupported framework capabilities.
            - Return the required JSON structure.
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

    if (result.data.length === 0) {

        throw new Error(
            'AI generated zero test cases for the requirement'
        );
    }

    console.log(
        `✅ ${result.data.length} AI test cases validated`
    );

    return result.data;
}