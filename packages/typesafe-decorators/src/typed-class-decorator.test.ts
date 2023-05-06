import { describe, it } from "@jest/globals";
import { OK, testCode } from "@shared/src/test-helpers";

describe('TypedClassDecorator', () => {
  const ERROR_MSG = 'Type of constructor is not assignable to type of decorator.';
  it('decorating a class of correct type', () => {
    // language=typescript
    const code = `
      import { TypedClassDecorator } from '@src';

      interface IConstructor {
        new(a: number): { bar: 'hzdju' };
      }

      declare const decorator: TypedClassDecorator<IConstructor, 'get'>;

      @decorator
      class Service {
        bar!: 'hzdju';

        constructor(b: number) {
        }
      }
    `;
    testCode(code, OK);
  });

  it('decorating a constructor with fewer arguments', () => {
    // language=typescript
    const code = `
      import { TypedClassDecorator } from '@src';

      interface IConstructor {
        new(a: number, b: string): {};
      }

      declare const decorator: TypedClassDecorator<IConstructor, 'get'>;

      @decorator
      class Service {
        constructor(c: number) {
        }
      }
    `;
    testCode(code, OK);
  });

  it('decorating a constructor with more arguments', () => {
    // language=typescript
    const code = `
      import { TypedClassDecorator } from '@src';

      interface IConstructor {
        new(a: number, b: string): {};
      }

      declare const decorator: TypedClassDecorator<IConstructor, 'get'>;

      @decorator
      class Service {
        constructor(c: number, d: string, e: string) {
        }
      }
    `;
    testCode(code, ERROR_MSG);
  });

  it('decorating a constructor with wrong instance type', () => {
    // language=typescript
    const code = `
      import { TypedClassDecorator } from '@src';

      interface IConstructor {
        new(): { foo: string };
      }

      declare const decorator: TypedClassDecorator<IConstructor, 'get'>;

      @decorator
      class Service {
        foo!: number;
        constructor() {}
      }
    `;
    testCode(code, ERROR_MSG);
  });
});
