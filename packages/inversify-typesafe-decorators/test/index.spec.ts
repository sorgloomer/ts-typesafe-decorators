import { describe, expect, it } from '@jest/globals';
import { lazyCompileTsFile } from '@shared/src/test-helpers';

describe('TypedInject', () => {
  describe('injecting into compatible field', () => {
    // language=typescript
    const setup = lazyCompileTsFile(`
      import { TypedInject } from '@lib';
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
    `);
    it('is ok', () => {
      expect(setup()).toHaveLength(0);
    });
  });

  describe('injecting into incompatible field', () => {
    // language=typescript
    const setup = lazyCompileTsFile(`
      import { TypedInject } from '@lib';
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
    `);
    it('is not ok', () => {
      expect(setup()).toHaveLength(1);
    });
    it('has descriptive error message', () => {
      expect(setup()[0]).toContain(`Types of parameters 'service' and 'service' are incompatible.`);
      expect(setup()[0]).toContain(
        `Property 'foo' is missing in type 'IServiceA' but required in type 'IServiceB'.`
      );
    });
  });
});
