import { expect } from '@jest/globals';
import * as projectTsConfig from '@shared/tsconfigs/base.tsconfig.json';
import * as ts from 'typescript';

import { lazy, Producer } from './lazy';

const VIRTUAL_ENTRY = 'virtual/entry.ts';

export function expectOk(code: string) {
  const errors = compileTsFile(code);
  expect(errors).toHaveLength(0);
}
export function expectError(
  code: string,
  expectedErrors: [string, ...string[]],
) {
  const errors = (compileTsFile(code) ?? []).join('\n\n');
  expect(expectedErrors.length).toBeGreaterThan(0);
  for (const expectedError of expectedErrors) {
    expect(errors).toContain(expectedError);
  }
}

export const OK = Symbol('OK');

export function testCode(
  code: string,
  expected: typeof OK | string | [string, ...string[]],
) {
  const errors = (compileTsFile(code) ?? []).join('\n\n');
  if (expected === OK) {
    expect(errors).toEqual('');
  } else if (typeof expected === 'string') {
    expect(errors).toContain(expected);
  } else if (Array.isArray(expected)) {
    expect(expected.length).toBeGreaterThan(0);
    for (const expectedError of expected) {
      expect(errors).toContain(expectedError);
    }
  } else {
    throw new Error('unknown argument');
  }
}

export const lazyCompileTsFile = (
  content: string,
): Producer<string[]> => lazy(() => compileTsFile(content));

export function compileTsFile(
  content: string,
): string[] {
  const options: ts.CompilerOptions = {
    ...projectTsConfig.compilerOptions as any,
    noEmit: true,
  };

  const createdFiles = new Map<string, string>();
  const inputFiles = new Map<string, number | null>();
  const host = ts.createCompilerHost(options);

  host.writeFile = (fileName: string, contents: string) => {
    createdFiles.set(fileName, contents);
  };

  const readFileReal = host.readFile;
  host.readFile = (fileName) => {
    switch (fileName) {
      case VIRTUAL_ENTRY:
        return content;
      default: {
        const result = readFileReal.call(host, fileName);
        inputFiles.set(fileName, result?.length ?? null);
        if (result !== undefined) {
          return result;
        }
      }
    }
    throw new Error('Could not load file: ' + fileName);
  };

  const program = ts.createProgram([VIRTUAL_ENTRY], options, host);

  const emitResult = program.emit();

  const allDiagnostics = ts
    .getPreEmitDiagnostics(program)
    .concat(emitResult.diagnostics);

  const result: string[] = [];
  allDiagnostics.forEach(diagnostic => {
    if (diagnostic.file) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const { line, character } = ts.getLineAndCharacterOfPosition(diagnostic.file, diagnostic.start!);
      const message = ts.flattenDiagnosticMessageText(diagnostic.messageText, "\n");
      result.push(`${diagnostic.file.fileName} (${line + 1},${character + 1}): ${message}`);
    } else {
      result.push(ts.flattenDiagnosticMessageText(diagnostic.messageText, "\n"));
    }
  });
  return result;
}

