import fs from 'fs';
import path from 'path';

import {
  TestCaseExecutionResult
} from './testCaseExecutionResult';


export function writeAiTestReport(
  requirement: string,
  results: TestCaseExecutionResult[]
): string {

  const reportDirectory =
    path.resolve('reports/ai');

  fs.mkdirSync(
    reportDirectory,
    { recursive: true }
  );


  const passed =
    results.filter(
      result => result.status === 'passed'
    ).length;


  const failed =
    results.filter(
      result => result.status === 'failed'
    ).length;


  const skipped =
    results.filter(
      result => result.status === 'skipped'
    ).length;


  const total =
    results.length;


  const report = `
# AI Test Execution Report

## Requirement

${requirement}

---

## Summary

| Metric | Count |
|---|---:|
| Generated | ${total} |
| Passed | ${passed} |
| Failed | ${failed} |
| Skipped | ${skipped} |

---

## Test Cases

${results.map(result => {

  const icon =
    result.status === 'passed'
      ? '✅'
      : result.status === 'failed'
        ? '❌'
        : '⏭️';


  return `
### ${icon} ${result.testCaseId}

**Title:** ${result.title}

**Status:** ${result.status}

${result.reason
    ? `**Reason:** ${result.reason}`
    : ''}
`;
}).join('\n')}

---

## Generated At

${new Date().toISOString()}
`;


  const fileName =
    `ai-test-report-${Date.now()}.md`;


  const reportPath =
    path.join(
      reportDirectory,
      fileName
    );


  fs.writeFileSync(
    reportPath,
    report.trim(),
    'utf-8'
  );


  console.log(
    `📄 AI test report written: ${reportPath}`
  );


  return reportPath;
}