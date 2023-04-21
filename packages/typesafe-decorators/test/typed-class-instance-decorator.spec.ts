import { describe, expect, it } from '@jest/globals';
import { lazyCompileTsFile } from '@shared/src/test-helpers';

describe('TypedClassInstanceDecorator', () => {
  describe('decorating a class of correct type', () => {
    // language=typescript
    const setup = lazyCompileTsFile(`
      import { TypedClassInstanceDecorator } from '@lib';

      interface IService {
        foo(): number;
      }

      declare const decorator: TypedClassInstanceDecorator<IService>;

      @decorator
      class Service {
        foo(): number { return 8; };

        bar = "sdf";
      }
    `);
    it('is ok', () => {
      expect(setup()).toHaveLength(0);
    });
  });

  describe('decorating a class of wrong type', () => {
    // language=typescript
    const setup = lazyCompileTsFile(`
      import { TypedClassInstanceDecorator } from '@lib';

      interface IService {
        foo(): number;
      }

      declare const decorator: TypedClassInstanceDecorator<IService>;

      @decorator
      class Service {
        bar = "sdf";
      }
    `);
    it('is not ok', () => {
      expect(setup().length).toBeGreaterThan(0);
    });
    it('has descriptive error message', () => {
      expect(setup().join('\n')).toContain(
        `Argument of type 'typeof Service' is not assignable to parameter of type 'ConstructorFor<IService>'.`,
      );
    });
  });
});
