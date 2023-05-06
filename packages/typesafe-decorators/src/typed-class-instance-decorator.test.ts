import { describe, it } from "@jest/globals";
import { OK, testCode } from "@shared/src/test-helpers";

describe('TypedClassInstanceDecorator', () => {
  it('decorating a class of correct type', () => {
    // language=typescript
    const code = `
      import { TypedClassInstanceDecorator } from '@src';

      interface IService {
        foo(): number;
      }

      declare const decorator: TypedClassInstanceDecorator<IService, 'get'>;

      @decorator
      class Service {
        foo(): number { return 8; };

        bar = "sdf";
      }
    `;
    testCode(code, OK);
  });

  it('decorating a class of wrong type', () => {
    // language=typescript
    const code = `
      import { TypedClassInstanceDecorator } from '@src';

      interface IService {
        foo(): number;
      }

      declare const decorator: TypedClassInstanceDecorator<IService, 'get'>;

      @decorator
      class Service {
        bar = "sdf";
      }
    `;
    testCode(code, 'Type of instance is not assignable to type of decorator.');
  });
});
