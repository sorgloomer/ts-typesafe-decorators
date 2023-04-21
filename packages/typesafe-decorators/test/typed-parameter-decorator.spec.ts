import { describe, expect, it } from '@jest/globals';
import { lazyCompileTsFile } from '@shared/src/test-helpers';

describe('TypedParameterDecorator', () => {
  describe('decorating a constructor parameter of right type', () => {
    // language=typescript
    const setup = lazyCompileTsFile(`
      import { TypedParameterDecorator } from '@lib';

      declare const decorator: TypedParameterDecorator<string>;

      class Service {
        constructor(
          public readonly p1: number,
          @decorator
          public readonly p2: string,
          public readonly p3: boolean,
        ) {}
      }
    `);
    it('is ok', () => {
      expect(setup()).toHaveLength(0);
    });
  });

  describe('decorating a method parameter of right type', () => {
    // language=typescript
    const setup = lazyCompileTsFile(`
      import { TypedParameterDecorator } from '@lib';

      declare const decorator: TypedParameterDecorator<string>;

      class Service {
        foo(
          p1: number,
          @decorator
          p2: string,
          p3: boolean,
        ) {}
      }
    `);
    it('is ok', () => {
      expect(setup()).toHaveLength(0);
    });
  });

  describe('decorating a method parameter of super type', () => {
    // language=typescript
    const setup = lazyCompileTsFile(`
      import { TypedParameterDecorator } from '@lib';
      declare const decorator: TypedParameterDecorator<'jhqay'>;
      class Service { foo(@decorator p2: string) {} }
    `);
    it('is ok', () => {
      expect(setup()).toHaveLength(0);
    });
  });

  describe('decorating a method parameter of extended type', () => {
    // language=typescript
    const setup = lazyCompileTsFile(`
      import { TypedParameterDecorator } from '@lib';
      declare const decorator: TypedParameterDecorator<string>;
      class Service { foo(p1: number, @decorator p2: 'axasy') {} }
    `);
    it('is not ok', () => {
      expect(setup()).toHaveLength(1);
    });
    it('has correct error message', () => {
      expect(setup()[0]).toContain(`Types of parameters 'p2' and 'p2' are incompatible.`);
      expect(setup()[0]).toContain(`Type 'string' is not assignable to type '"axasy"'.`);
    });
  });

  describe('decorating a method parameter of unrelated type', () => {
    // language=typescript
    const setup = lazyCompileTsFile(`
      import { TypedParameterDecorator } from '@lib';
      declare const decorator: TypedParameterDecorator<number>;
      class Service { foo(p1: number, @decorator p2: string) {} }
    `);
    it('is not ok', () => {
      expect(setup().length).toEqual(1);
    });
    it('has correct error message', () => {
      expect(setup()[0]).toContain(`Types of parameters 'p2' and 'p2' are incompatible.`);
      expect(setup()[0]).toContain(`Type 'number' is not assignable to type 'string'.`);
    });
  });

});
