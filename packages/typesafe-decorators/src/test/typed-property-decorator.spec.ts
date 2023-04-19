import { describe, expect, it } from '@jest/globals';
import { lazyCompileTsFile } from '@shared/src/test-helpers';

describe('TypedPropertyDecorator', () => {
  describe('decorating a property of exact type', () => {
    // language=typescript
    const setup = lazyCompileTsFile(`
      import { TypedPropertyDecorator } from '@main';

      declare const decorator: TypedPropertyDecorator<string>;

      class Service {
        @decorator
        bar!: string;
      }
    `);
    it('is ok', () => {
      expect(setup()).toHaveLength(0);
    });
  });

  describe('decorating a property of super type', () => {
    // language=typescript
    const setup = lazyCompileTsFile(`
      import { TypedPropertyDecorator } from '@main';

      declare const decorator: TypedPropertyDecorator<'gfkil'>;

      class Service {
        @decorator
        bar!: string;
      }
    `);
    it('is not ok', () => {
      expect(setup().length).toEqual(1);
    });
    it('has descriptive error message', () => {
      expect(setup()[0]).toContain(
        `Type 'string' is not assignable to type '"gfkil"'.`,
      );
    });
  });

  describe('decorating a property of extended type', () => {
    // language=typescript
    const setup = lazyCompileTsFile(`
      import { TypedPropertyDecorator } from '@main';

      declare const decorator: TypedPropertyDecorator<number>;

      class Service {
        @decorator
        bar!: 62343;
      }
    `);
    it('is ok', () => {
      expect(setup().length).toEqual(0);
    });
  });
});
