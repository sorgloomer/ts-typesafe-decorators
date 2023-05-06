import { describe, it } from "@jest/globals";
import { OK, testCode } from "@shared/src/test-helpers";

describe('TypedInject', () => {
  it('injecting into compatible field', () => {
    // language=typescript
    const code = `
      import { TypedInject } from '@src';
      import { injectable, interfaces } from 'inversify';

      interface IServiceA {
        foo(): void;
        bar(): void;
      }
      interface IServiceB {
        foo(): void;
      }

      declare const TOKEN: interfaces.ServiceIdentifier<IServiceA>;

      @injectable()
      class ServiceC {
        constructor(
          private readonly logger: {},
          @TypedInject(TOKEN)
          private readonly service: IServiceB,
        ) {}
      }
    `;
    testCode(code, OK);
  });

  it('injecting into incompatible field', () => {
    // language=typescript
    const code = `
      import { TypedInject } from '@src';
      import { injectable, interfaces } from 'inversify';

      interface IServiceA {
        bar(): void;
      }
      interface IServiceB {
        foo(): void;
      }

      declare const TOKEN: interfaces.ServiceIdentifier<IServiceA>;

      @injectable()
      class ServiceC {
        constructor(
          private readonly logger: {},
          @TypedInject(TOKEN)
          private readonly service: IServiceB,
        ) {}
      }
    `;
    testCode(code, 'Type of decorator is not assignable to type of parameter');
  });
});
