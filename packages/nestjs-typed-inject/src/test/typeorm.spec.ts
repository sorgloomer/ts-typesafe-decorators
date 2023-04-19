import { describe, expect, it } from '@jest/globals';
import { lazyCompileTsFile } from '@shared/src/test-helpers';

describe('TypedInject', () => {
  describe('injecting into compatible field', () => {
    // language=typescript
    const setup = lazyCompileTsFile(`
      import { TypedInjectRepository } from '@main';
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
    const setup = lazyCompileTsFile(`
      import { TypedInjectRepository } from '@main';
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
    `);
    it('is not ok', () => {
      expect(setup()).toHaveLength(1);
    });
    it('has descriptive error message', () => {
      expect(setup()[0]).toContain(`Types of parameters 'repo' and 'repo' are incompatible.`);
      expect(setup()[0]).toContain(
        `Type 'Repository<FooEntity>' is not assignable to type 'Repository<BarEntity>'.`
      );
      expect(setup()[0]).toContain(`Type 'FooEntity' is not assignable to type 'BarEntity'.`);
    });
  });
});
