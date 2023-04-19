import { describe, expect, it } from '@jest/globals';
import { lazyCompileTsFile } from '@shared/src/test-helpers';

describe('TypedInject', () => {
  describe('injecting into compatible field', () => {
    // language=typescript
    const setup = lazyCompileTsFile(`
      import { TypedInject } from '@main';
      import { Logger } from '@nestjs/common';

      class ServiceA {
        foo(): void {};
        bar(): void {};
      }

      interface IServiceB {
        foo(): void;
      }

      class ServiceC {
        constructor(
          private readonly logger: Logger,
          @TypedInject(ServiceA)
          private readonly service: IServiceB
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
      import { TypedInject } from '@main';
      import { Logger } from '@nestjs/common';

      class ServiceA {
        bar(): void {};
      }

      interface IServiceB {
        foo(): void;
      }

      class ServiceC {
        constructor(
          private readonly logger: Logger,
          @TypedInject(ServiceA)
          private readonly service: IServiceB
        ) {}
      }
    `);
    it('is not ok', () => {
      expect(setup()).toHaveLength(1);
    });
    it('has descriptive error message', () => {
      expect(setup()[0]).toContain(`Types of parameters 'service' and 'service' are incompatible.`);
      expect(setup()[0]).toContain(
        `Property 'foo' is missing in type 'ServiceA' but required in type 'IServiceB'.`
      );
    });
  });
});
