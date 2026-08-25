import fs from 'fs';
import path from 'path';

export function readRequirement(
  fileName: string
): string {

  const requirementPath =
    path.resolve(
      'requirements',
      fileName
    );

  if (!fs.existsSync(requirementPath)) {

    throw new Error(
      `Requirement file not found: ${requirementPath}`
    );
  }

  const requirement =
    fs.readFileSync(
      requirementPath,
      'utf-8'
    );

  if (!requirement.trim()) {

    throw new Error(
      `Requirement file is empty: ${requirementPath}`
    );
  }

  console.log(
    `📄 Requirement loaded: ${requirementPath}`
  );

  return requirement;
}