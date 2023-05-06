import * as fs from "node:fs/promises";

await main();

async function main() {
  await generateEmptyFile('lib/index.js');
  await hackBackTsignoreComments('lib/index.d.ts');
}

async function hackBackTsignoreComments(filePath) {
  const code = await fs.readFile(filePath, 'utf-8');
  const lines = code.split("\n");
  const newLines = [];

  for (const line of lines) {
    if (line.includes('TTarget[TKey]')) {
      newLines.push(sameIndent('// @ts-ignore', line));
    }
    newLines.push(line);
  }
  const newCode = newLines.join('\n');
  await fs.writeFile(filePath, newCode, 'utf-8');
}

function sameIndent(subject, example) {
  const indent = example.match(/^ */);
  return indent[0] + subject;
}

async function generateEmptyFile(filePath) {
  await fs.writeFile(filePath, '', 'utf-8');
}
