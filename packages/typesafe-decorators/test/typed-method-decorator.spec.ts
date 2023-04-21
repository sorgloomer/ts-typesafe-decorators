import { describe, expect, it } from '@jest/globals';
import { lazyCompileTsFile } from '@shared/src/test-helpers';

describe('TypedMethodDecorator', () => {
  describe('decorating a method of exact type', () => {
    // language=typescript
    const setup = lazyCompileTsFile(`
      import { TypedPropertyDecorator } from '@lib';

      declare const decorator: TypedPropertyDecorator<(p1: number) => string>;

      class Service {
        @decorator
        bar(p1: number): string { return ''; };
      }
    `);
    it('is ok', () => {
      expect(setup()).toHaveLength(0);
    });
  });

  describe('decorating a method with more arguments', () => {
    // language=typescript
    const setup = lazyCompileTsFile(`
      import { TypedPropertyDecorator } from '@lib';

      declare const decorator: TypedPropertyDecorator<(p1: number) => string>;

      class Service {
        @decorator
        bar(p1: number, p2: number): string { return ''; };
      }
    `);
    it('is not ok', () => {
      expect(setup()).toHaveLength(1);
    });
    it('has descriptive error message', () => {
      expect(setup()[0]).toContain(`Types of property 'bar' are incompatible.`);
      expect(setup()[0]).toContain(
        `Type '(p1: number, p2: number) => string' is not assignable to type '(p1: number) => string'.`
      );
    });
  });

  describe('decorating a method with fewer arguments', () => {
    // language=typescript
    const setup = lazyCompileTsFile(`
      import { TypedPropertyDecorator } from '@lib';

      declare const decorator: TypedPropertyDecorator<(p1: number) => string>;

      class Service {
        @decorator
        bar(): string { return ''; };
      }
    `);
    it('is ok', () => {
      expect(setup()).toHaveLength(0);
    });
  });

  describe('decorating a method with super return type', () => {
    // language=typescript
    const setup = lazyCompileTsFile(`
      import { TypedPropertyDecorator } from '@lib';

      declare const decorator: TypedPropertyDecorator<(p1: number) => string>;

      class Service {
        @decorator
        bar(): unknown { return ''; };
      }
    `);
    it('is not ok', () => {
      expect(setup()).toHaveLength(1);
    });
    it('has descriptive error message', () => {
      expect(setup()[0]).toContain(`The types returned by 'bar(...)' are incompatible between these types.`);
      expect(setup()[0]).toContain(`Type 'unknown' is not assignable to type 'string'.`);
    });
  });

    describe('decorating a method with extended return type', () => {
    // language=typescript
    const setup = lazyCompileTsFile(`
      import { TypedPropertyDecorator } from '@lib';

      declare const decorator: TypedPropertyDecorator<(p1: number) => string>;

      class Service {
        @decorator
        bar(): 'unzou' { return 'unzou'; };
      }
    `);
    it('is ok', () => {
      expect(setup()).toHaveLength(0);
    });
  });

  describe('decorating a method with unrelated return type', () => {
    // language=typescript
    const setup = lazyCompileTsFile(`
      import { TypedPropertyDecorator } from '@lib';

      declare const decorator: TypedPropertyDecorator<(p1: number) => 3 | 4>;

      class Service {
        @decorator
        bar(): 4 | 5 { return 5; };
      }
    `);
    it('is not ok', () => {
      expect(setup()).toHaveLength(1);
    });
    it('has descriptive error message', () => {
      expect(setup()[0]).toContain(`The types returned by 'bar(...)' are incompatible between these types.`);
      expect(setup()[0]).toContain(`Type '4 | 5' is not assignable to type '3 | 4'.`);
    });
  });

});
