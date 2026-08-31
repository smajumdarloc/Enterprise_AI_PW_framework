import fs from 'fs';
import path from 'path';


function readKnowledgeFile(
  fileName: string
): string {

  const filePath =
    path.resolve(
      'ai',
      'knowledge',
      fileName
    );


  if (!fs.existsSync(filePath)) {

    throw new Error(
      `Knowledge file not found: ${filePath}`
    );
  }


  const content =
    fs.readFileSync(
      filePath,
      'utf-8'
    );


  if (!content.trim()) {

    throw new Error(
      `Knowledge file is empty: ${filePath}`
    );
  }


  return content;
}


export function readRules(): string {

  return readKnowledgeFile(
    'rules.md'
  );
}


export function readSkills(): string {

  return readKnowledgeFile(
    'skills.md'
  );
}