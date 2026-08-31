import fs from 'fs';
import path from 'path';

const AI_TEST_DIRECTORY =
  path.resolve(
    process.cwd(),
    'tests',
    'ui',
    'ai-generated'
  );


// ==========================================
// GET AI TEST DIRECTORY
// ==========================================

export function getAiTestDirectory(): string {

  fs.mkdirSync(
    AI_TEST_DIRECTORY,
    {
      recursive: true
    }
  );

  return AI_TEST_DIRECTORY;
}


// ==========================================
// CREATE SAFE FILE NAME
// ==========================================

export function createTestFileName(
  id: string,
  title: string
): string {

  const safeTitle =
    title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');

  return `${id}-${safeTitle}.spec.ts`;
}


// ==========================================
// CHECK IF TEST EXISTS
// ==========================================

export function testFileExists(
  id: string,
  title: string
): boolean {

  const fileName =
    createTestFileName(
      id,
      title
    );

  const filePath =
    path.join(
      getAiTestDirectory(),
      fileName
    );

  return fs.existsSync(
    filePath
  );
}