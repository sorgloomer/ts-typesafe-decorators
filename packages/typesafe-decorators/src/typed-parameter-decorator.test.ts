import { describe, it } from "@jest/globals";
import { OK, testCode } from "@shared/src/test-helpers";

describe('TypedParameterDecorator', () => {
  const ERROR_SET = 'Type of decorator is not assignable to type of parameter.';
  it('decorating a constructor parameter of right type', () => {
    // language=typescript
    testCode(`
      import { TypedParameterDecorator } from '@src';

      declare const decorator: TypedParameterDecorator<string, 'set'>;

      class Service {
        constructor(
          public readonly p1: number,
          @decorator
          public readonly p2: string,
          public readonly p3: boolean,
        ) {}
      }
    `, OK);
  });

  it('decorating a constructor parameter of wrong type', () => {
    // language=typescript
    testCode(`
      import { TypedParameterDecorator } from '@src';

      declare const decorator: TypedParameterDecorator<string, 'set'>;

      class Service {
        constructor(
          public readonly p1: number,
          @decorator
          public readonly p2: boolean,
          public readonly p3: boolean,
        ) {}
      }
    `, ERROR_SET);
  });

  it('decorating a method parameter of right type', () => {
    // language=typescript
    testCode(`
      import { TypedParameterDecorator } from '@src';

      declare const decorator: TypedParameterDecorator<string, 'set'>;

      class Service {
        foo(
          p1: number,
          @decorator
          p2: string,
          p3: boolean,
        ) {}
      }
    `, OK);
  });

  it('decorating a method parameter of super type', () => {
    // language=typescript
    testCode(`
      import { TypedParameterDecorator } from '@src';
      declare const decorator: TypedParameterDecorator<'jhqay', 'set'>;
      class Service { foo(@decorator p2: string) {} }
    `, OK);
  });

  it('decorating a method parameter of extended type', () => {
    // language=typescript
    const code = `
      import { TypedParameterDecorator } from '@src';
      declare const decorator: TypedParameterDecorator<string, 'set'>;
      class Service { foo(p1: number, @decorator p2: 'axasy') {} }
    `;
    testCode(code, ERROR_SET);
  });

  it('decorating a method parameter of unrelated type', () => {
    // language=typescript
    const code = `
      import { TypedParameterDecorator } from '@src';
      declare const decorator: TypedParameterDecorator<number, 'set'>;
      class Service { foo(p1: number, @decorator p2: string) {} }
    `;
    testCode(code, ERROR_SET);
  });

  it('decorating a method parameter of unrelated type', () => {
    // language=typescript
    const code = `
      import { TypedParameterDecorator } from '@src';
      declare const decorator: TypedParameterDecorator<number, 'set'>;
      class Service { foo(p1: number, @decorator p2: string) {} }
    `;
    testCode(code, ERROR_SET);
  });

  it('decorating a private method parameter when ok', () => {
    // language=typescript
    const code = `
      import { TypedParameterDecorator } from '@src';
      declare const decorator: TypedParameterDecorator<number, 'set'>;
      class Service { private foo(p1: number, @decorator p2: number) {} }
    `;
    testCode(code, OK);
  });

  it('decorating a private method parameter when not ok', () => {
    // language=typescript
    const code = `
      import { TypedParameterDecorator } from '@src';
      declare const decorator: TypedParameterDecorator<number, 'set'>;
      class Service { private foo(p1: number, @decorator p2: string) {} }
    `;
    testCode(code, ERROR_SET);
  });

});
