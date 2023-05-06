import { describe, expect, it } from '@jest/globals';
import { lazyCompileTsFile, testCode } from "@shared/src/test-helpers";

describe('TypedInject', () => {
  describe('injecting into compatible field', () => {
    // language=typescript
    const setup = lazyCompileTsFile(`
      import { TypedInjectRepository } from '@src/typeorm';
      import { Repository } from 'typeorm';
      import { Logger } from '@nestjs/common';

      class FooEntity {
        id!: number;
        foo!: string;
      }

      class Service {
        constructor(
          private readonly logger: Logger,
          @TypedInjectRepository(FooEntity)
          private readonly repo: Repository<FooEntity>
        ) {}
      }
    `);
    it('is ok', () => {
      expect(setup()).toHaveLength(0);
    });
  });

  describe('injecting into incompatible field', () => {
    // language=typescript
    const code = `
      import { TypedInjectRepository } from '@src/typeorm';
      import { Repository } from 'typeorm';
      import { Logger } from '@nestjs/common';

      class FooEntity {
        id!: number;
        foo!: string;
      }
      class BarEntity {
        id!: number;
        bar!: string;
      }

      class Service {
        constructor(
          private readonly logger: Logger,
          @TypedInjectRepository(FooEntity)
          private readonly repo: Repository<BarEntity>
        ) {}
      }
    `;
    testCode(code, 'Type of decorator is not assignable to type of parameter.');
  });
});
