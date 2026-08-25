import fs from 'fs';
import path from 'path';

export function writeAiReport(
  testName: string,
  analysis: string
) {
  const dir = path.join('reports', 'ai');

  fs.mkdirSync(dir, { recursive: true });

  const safeName = testName.replace(/[^a-zA-Z0-9]/g, '_');

  const filePath = path.join(dir, `${safeName}.md`);

  const content = `# AI Failure Analysis

## Test
${testName}

## Analysis

${analysis}
`;

  fs.writeFileSync(filePath, content);

  return filePath;
}