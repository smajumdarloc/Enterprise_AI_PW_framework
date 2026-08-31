import { McpServer } from '@modelcontextprotocol/server';
import { serveStdio } from '@modelcontextprotocol/server/stdio';
import * as z from 'zod/v4';
import { generateTestCases } from '../ai/testCase/testCaseGenerator';
import {writePlaywrightTestFile} from '../ai/testCase/playwrightTestFileWriter';
import {executePlaywrightTest} from '../ai/testCase/playwrightTestExecutor';
import {analyzeFailure} from '../ai/failureAnalyzer';

const server = new McpServer({
  name: 'enterprise-qa-mcp',
  version: '1.0.0'
});

// ==========================================
// TOOL 1
// ==========================================
server.registerTool(
  'qa_framework_info',
  {
    title: 'QA Framework Information',
    description:
      'Returns information about the Enterprise AI Playwright QA framework',
    inputSchema: z.object({}),
  },
  async () => {

    const result = {
      framework:
        'Enterprise AI Playwright Framework',

      capabilities: [
        'AI test case generation',
        'AI test case validation',
        'AI test case execution',
        'AI failure analysis',
        'AI locator healing',
        'Playwright spec generation'
      ]
    };

    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify(
            result,
            null,
            2
          )
        }
      ]
    };
  }
  
);
// ==========================================
// TOOL 2
// ==========================================
server.registerTool(
  'generate_test_cases',
  {
    title: 'Generate AI Test Cases',

    description:
      'Generate positive, negative, and boundary test cases from a software requirement using the existing AI QA test case generator.',

    inputSchema: z.object({
      requirement: z
        .string()
        .min(1)
        .describe(
          'Software requirement for which test cases should be generated'
        )
    })
  },

  async ({ requirement }) => {

    console.error(
      `🧠 MCP generating test cases for: ${requirement}`
    );

    try {

      const testCases =
        await generateTestCases(requirement);

      console.error(
        `✅ MCP generated ${testCases.length} test cases`
      );

      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(
              testCases,
              null,
              2
            )
          }
        ]
      };

    } catch (error) {

      console.error(
        '❌ MCP test case generation failed:',
        error
      );

      throw error;
    }
  }
);

serveStdio(() => server);

// ==========================================
// TOOL 3
// ==========================================
server.registerTool(
  'generate_playwright_test',
  {
    title: 'Generate Playwright Test',

    description:
      'Generate AI test cases from a requirement and create Playwright .spec.ts files in the AI-generated test directory.',

    inputSchema: z.object({
      requirement: z
        .string()
        .min(1)
        .describe(
          'Software requirement for which Playwright tests should be generated'
        )
    })
  },

  async ({ requirement }) => {

    console.error(
      `🧠 MCP generating Playwright tests for: ${requirement}`
    );

    try {

      // ----------------------------------------
      // Generate AI test cases
      // ----------------------------------------

      const testCases =
        await generateTestCases(
          requirement
        );

      console.error(
        `✅ Generated ${testCases.length} test cases`
      );


      // ----------------------------------------
      // Create Playwright files
      // ----------------------------------------

      const generatedFiles: string[] = [];

      for (const testCase of testCases) {

        const filePath =
          writePlaywrightTestFile(
            testCase
          );

        generatedFiles.push(
          filePath
        );
      }


      // ----------------------------------------
      // Return result to MCP client
      // ----------------------------------------

      return {
        content: [
          {
            type: 'text',

            text: JSON.stringify(
              {
                requirement,
                testCasesGenerated:
                  testCases.length,

                filesGenerated:
                  generatedFiles
              },
              null,
              2
            )
          }
        ]
      };

    } catch (error) {

      console.error(
        '❌ MCP Playwright test generation failed:',
        error
      );

      throw error;
    }
  }
);

// ==========================================
// TOOL 4
// ==========================================

server.registerTool(
  'execute_playwright_test',
  {
    title: 'Execute Playwright Test',

    description:
      'Execute a generated Playwright test from the tests/ui/ai-generated directory.',

    inputSchema: z.object({
      testFile: z
        .string()
        .min(1)
        .describe(
          'Path of the generated Playwright test file'
        )
    })
  },

  async ({ testFile }) => {

    console.error(
      `▶️ MCP executing Playwright test: ${testFile}`
    );

    try {

      const result =
        await executePlaywrightTest(
          testFile
        );


      console.error(
        result.passed
          ? '✅ MCP Playwright test passed'
          : '❌ MCP Playwright test failed'
      );


      return {

        content: [

          {
            type: 'text',

            text: JSON.stringify(
              {
                testFile,

                status:
                  result.passed
                    ? 'passed'
                    : 'failed',

                output:
                  result.output
              },

              null,

              2
            )

          }

        ]

      };

    } catch (error) {

      console.error(
        '❌ MCP test execution failed:',
        error
      );

      throw error;
    }
  }
);

// ==========================================
// TOOL 5
// ==========================================

server.registerTool(
  'analyze_test_failure',
  {
    title: 'Analyze Playwright Test Failure',

    description:
      'Analyze a Playwright test failure using the existing AI failure analyzer and provide the probable root cause and recommended fix.',

    inputSchema: z.object({
      testName: z
        .string()
        .min(1)
        .describe(
          'Name of the failed Playwright test'
        ),

      error: z
        .string()
        .min(1)
        .describe(
          'Playwright error message or failure output'
        )
    })
  },

  async ({ testName, error }) => {

    console.error(
      `🔍 MCP analyzing failure: ${testName}`
    );

    try {

      const analysis =
        await analyzeFailure(
          testName,
          error
        );

      console.error(
        '✅ MCP failure analysis generated'
      );

      return {
        content: [
          {
            type: 'text',

            text: analysis
          }
        ]
      };

    } catch (error) {

      console.error(
        '❌ MCP failure analysis failed:',
        error
      );

      throw error;
    }
  }
);