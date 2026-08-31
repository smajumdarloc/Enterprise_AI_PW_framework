import { execFile } from 'child_process';
import path from 'path';

export function executePlaywrightTest(
  testFile: string
): Promise<{
  passed: boolean;
  output: string;
}> {

  return new Promise((resolve, reject) => {

    // ------------------------------------------
    // Security check
    // ------------------------------------------

    const generatedDirectory =
      path.resolve(
        'tests/ui/ai-generated'
      );

    const absoluteTestFile =
      path.resolve(testFile);

    if (
      !absoluteTestFile.startsWith(
        generatedDirectory + path.sep
      )
    ) {

      return reject(
        new Error(
          'Test file must be inside tests/ui/ai-generated'
        )
      );
    }


    // ------------------------------------------
    // Execute Playwright
    // ------------------------------------------

    execFile(
      'npx',
      [
        'playwright',
        'test',
        absoluteTestFile
      ],
      {
        cwd: process.cwd()
      },

      (error, stdout, stderr) => {

        const output =
          `${stdout}\n${stderr}`.trim();


        if (error) {

          resolve({
            passed: false,
            output
          });

          return;
        }


        resolve({
          passed: true,
          output
        });

      }
    );

  });
}