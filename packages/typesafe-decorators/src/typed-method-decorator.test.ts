import { describe, it } from "@jest/globals";
import { OK, testCode } from "@shared/src/test-helpers";

describe('TypedMethodDecorator', () => {
  const ERROR_MSG = 'Type of method is not assignable to type of decorator.';
  it('decorating a method of exact type', () => {
    // language=typescript
    const code = `
      import { TypedMethodDecorator } from '@src';

      declare const decorator: TypedMethodDecorator<(p1: number) => string, 'get'>;

      class Service {
        @decorator
        bar(p1: number): string { return ''; };
      }
    `;
    testCode(code, OK);
  });

  it('decorating a method with more arguments', () => {
    // language=typescript
    const code = `
      import { TypedMethodDecorator } from '@src';

      declare const decorator: TypedMethodDecorator<(p1: number) => string, 'get'>;

      class Service {
        @decorator
        bar(p1: number, p2: number): string { return ''; };
      }
    `;
    testCode(code, ERROR_MSG);
  });

  it('decorating a method with fewer arguments', () => {
    // language=typescript
    const code = `
      import { TypedMethodDecorator } from '@src';

      declare const decorator: TypedMethodDecorator<(p1: number) => string, 'get'>;

      class Service {
        @decorator
        bar(): string { return ''; };
      }
    `;
    testCode(code, OK);
  });

  it('decorating a method with super return type', () => {
    // language=typescript
    const code = `
      import { TypedMethodDecorator } from '@src';

      declare const decorator: TypedMethodDecorator<(p1: number) => string, 'get'>;

      class Service {
        @decorator
        bar(): unknown { return ''; };
      }
    `;
    testCode(code, ERROR_MSG);
  });

  it('decorating a method with extended return type', () => {
    // language=typescript
    const code = `
      import { TypedMethodDecorator } from '@src';

      declare const decorator: TypedMethodDecorator<(p1: number) => string, 'get'>;

      class Service {
        @decorator
        bar(): 'unzou' { return 'unzou'; };
      }
    `;
    testCode(code, OK);
  });

  it('decorating a method with unrelated return type', () => {
    // language=typescript
    const code = `
      import { TypedMethodDecorator } from '@src';

      declare const decorator: TypedMethodDecorator<(p1: number) => 3 | 4, 'get'>;

      class Service {
        @decorator
        bar(): 4 | 5 { return 5; };
      }
    `;
    testCode(code, ERROR_MSG);
  });
});
