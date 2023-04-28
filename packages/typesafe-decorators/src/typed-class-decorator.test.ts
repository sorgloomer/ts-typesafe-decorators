import { describe, expect, it } from '@jest/globals';
import { lazyCompileTsFile } from '@shared/src/test-helpers';

describe('TypedClassDecorator', () => {
  describe('decorating a class of correct type', () => {
    // language=typescript
    const setup = lazyCompileTsFile(`
      import { TypedClassDecorator } from '@src';

      interface IConstructor {
        new(a: number): { bar: 'hzdju' };
      }

      declare const decorator: TypedClassDecorator<IConstructor>;

      @decorator
      class Service {
        bar!: 'hzdju';

        constructor(b: number) {
        }
      }
    `);
    it('is ok', () => {
      expect(setup()).toHaveLength(0);
    });
  });

  describe('decorating a constructor with fewer arguments', () => {
    // language=typescript
    const setup = lazyCompileTsFile(`
      import { TypedClassDecorator } from '@src';

      interface IConstructor {
        new(a: number, b: string): {};
      }

      declare const decorator: TypedClassDecorator<IConstructor>;

      @decorator
      class Service {
        constructor(c: number) {
        }
      }
    `);
    it('is ok', () => {
      expect(setup().length).toEqual(0);
    });
  });

  describe('decorating a constructor with more arguments', () => {
    // language=typescript
    const setup = lazyCompileTsFile(`
      import { TypedClassDecorator } from '@src';

      interface IConstructor {
        new(a: number, b: string): {};
      }

      declare const decorator: TypedClassDecorator<IConstructor>;

      @decorator
      class Service {
        constructor(c: number, d: string, e: string) {
        }
      }
    `);
    it('is not ok', () => {
      expect(setup().length).toBeGreaterThan(0);
    });
    it('has descriptive error message', () => {
      expect(setup().join('\n')).toContain(
        `Argument of type 'typeof Service' is not assignable to parameter of type 'IConstructor'.`,
      );
    });
  });

  describe('decorating a constructor with wrong instance type', () => {
    // language=typescript
    const setup = lazyCompileTsFile(`
      import { TypedClassDecorator } from '@src';

      interface IConstructor {
        new(): { foo: string };
      }

      declare const decorator: TypedClassDecorator<IConstructor>;

      @decorator
      class Service {
        foo!: number;
        constructor() {}
      }
    `);
    it('is not ok', () => {
      expect(setup().length).toBeGreaterThan(0);
    });
    it('has descriptive error message', () => {
      expect(setup().join('\n')).toContain(
        `Argument of type 'typeof Service' is not assignable to parameter of type 'IConstructor'.`,
      );
    });
  });
});
