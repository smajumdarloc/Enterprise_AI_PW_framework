export interface TestCaseExecutionResult {

  testCaseId: string;

  title: string;

  status:
    | 'passed'
    | 'failed'
    | 'skipped';

  reason?: string;
}