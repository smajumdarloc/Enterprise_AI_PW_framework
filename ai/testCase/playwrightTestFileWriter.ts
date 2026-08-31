import fs from 'fs';
import path from 'path';

import { TestCase } from './testCaseSchema';

import {
  generatePlaywrightTest
} from './playwrightTestGenerator';

import {
  getAiTestDirectory,
  createTestFileName,
  testFileExists
} from './testFileManager';


// ==========================================
// WRITE PLAYWRIGHT TEST FILE
// ==========================================

export function writePlaywrightTestFile(
  testCase: TestCase
): string {

  const outputDirectory =
    getAiTestDirectory();


  const fileName =
    createTestFileName(
      testCase.id,
      testCase.title
    );


  const filePath =
    path.join(
      outputDirectory,
      fileName
    );


  // ========================================
  // DUPLICATE CHECK
  // ========================================

  if (
    testFileExists(
      testCase.id,
      testCase.title
    )
  ) {

    console.log(
      `⚠️ AI test already exists: ${fileName}`
    );

    console.log(
      '⏭️ Skipping duplicate test generation'
    );

    return filePath;
  }


  // ========================================
  // GENERATE PLAYWRIGHT CODE
  // ========================================

  const testCode =
    generatePlaywrightTest(
      testCase
    );


  // ========================================
  // WRITE FILE
  // ========================================

  fs.writeFileSync(
    filePath,
    testCode,
    'utf-8'
  );


  console.log(
    `📄 AI Playwright test generated: ${filePath}`
  );


  return filePath;
}