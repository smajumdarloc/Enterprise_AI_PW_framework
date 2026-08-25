import { z } from 'zod';

// --------------------------------------------------
// Test case types
// --------------------------------------------------

export const TestCaseTypeSchema = z.enum([
  'positive',
  'negative',
  'boundary'
]);

export const TestCasePrioritySchema = z.enum([
  'low',
  'medium',
  'high',
  'critical'
]);

// --------------------------------------------------
// Test case schema
// --------------------------------------------------

export const TestCaseSchema = z.object({

  id: z.string(),

  title: z.string(),

  type: TestCaseTypeSchema,

  priority: TestCasePrioritySchema,

  preconditions: z.array(
    z.string()
  ),

  steps: z.array(
    z.string()
  ).min(1),

  expectedResult: z.string()

});

// --------------------------------------------------
// TypeScript type
// --------------------------------------------------

export type TestCase = z.infer<typeof TestCaseSchema>;