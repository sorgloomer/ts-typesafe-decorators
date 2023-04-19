import * as projectTsConfig from '@shared/tsconfigs/tsconfig.base.json';
import * as ts from 'typescript';
import { lazy, Producer } from './lazy';

const VIRTUAL_ENTRY = 'virtual/entry.ts';

type CompileTsFileOptions = { cwd?: string };
export const lazyCompileTsFile = (
  content: string,
  opts?: CompileTsFileOptions,
): Producer<string[]> => lazy(() => compileTsFile(content, opts));
export function compileTsFile(
  content: string,
  { cwd }: CompileTsFileOptions = {},
): string[] {
  const options: ts.CompilerOptions = {
    ...projectTsConfig.compilerOptions as any,
    noEmit: true,
  };

  const createdFiles = new Map<string, string>();
  const inputFiles = new Map<string, number | null>();
  const host = ts.createCompilerHost(options);
  if (cwd !== undefined) {
    host.getCurrentDirectory = () => cwd;
  }

  host.writeFile = (fileName: string, contents: string) => {
    createdFiles.set(fileName, contents);
  };

  const readFileReal = host.readFile;
  host.readFile = (fileName) => {
    switch (fileName) {
      case VIRTUAL_ENTRY:
        return content;
      default:
        const result = readFileReal.call(host, fileName);
        inputFiles.set(fileName, result?.length ?? null);
        if (result !== undefined) {
          return result;
        }
    }
    throw new Error('Could not load file: ' + fileName);
  };

  const program = ts.createProgram([VIRTUAL_ENTRY], options, host);

  const emitResult = program.emit();

  let allDiagnostics = ts
    .getPreEmitDiagnostics(program)
    .concat(emitResult.diagnostics);

  let result: string[] = [];
  allDiagnostics.forEach(diagnostic => {
    if (diagnostic.file) {
      let { line, character } = ts.getLineAndCharacterOfPosition(diagnostic.file, diagnostic.start!);
      let message = ts.flattenDiagnosticMessageText(diagnostic.messageText, "\n");
      result.push(`${diagnostic.file.fileName} (${line + 1},${character + 1}): ${message}`);
    } else {
      result.push(ts.flattenDiagnosticMessageText(diagnostic.messageText, "\n"));
    }
  });
  return result;
}

