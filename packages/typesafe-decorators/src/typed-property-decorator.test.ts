import { describe, it } from "@jest/globals";
import { OK, testCode } from "@shared/src/test-helpers";

describe("TypedPropertyDecorator", () => {
  const ERROR_NOT_EQUAL = "Type of property is not equal to type of decorator.";
  const MATRIX = [
    ["'set'", "1", "Type of decorator is not assignable to type of property."],
    ["'set'", "1 | 2", OK],
    ["'set'", "1 | 2 | 3", OK],
    ["'get'", "1", OK],
    ["'get'", "1 | 2", OK],
    ["'get'", "1 | 2 | 3", "Type of property is not assignable to type of decorator."],
    ["'get' | 'set'", "1", ERROR_NOT_EQUAL],
    ["'get' | 'set'", "1 | 2", OK],
    ["'get' | 'set'", "1 | 2 | 3", ERROR_NOT_EQUAL],
  ] as const;
  for (const [direction, slot, expected] of MATRIX) {
    it(`decorator<1 | 2, ${direction}> on property: ${slot}`, () => {
      // language=typescript
      testCode(`
        import { TypedPropertyDecorator } from '@src';

        declare const dec: TypedPropertyDecorator<1 | 2, ${direction}>;

        class Foo {@dec foo!: ${slot};}
      `, expected);
    });
  }
  it("decorating a private property when ok", () => {
    // language=typescript
    testCode(`
      import { TypedPropertyDecorator } from '@src';
      declare const d: TypedPropertyDecorator<string, 'get' | 'set'>;
      class Bar { @d private bar!: string; }
    `, OK);
  });
  it("decorating a private property when not ok", () => {
    // language=typescript
    testCode(`
      import { TypedPropertyDecorator } from '@src';
      declare const d: TypedPropertyDecorator<number, 'get' | 'set'>;
      class Bar { @d private bar!: string; }
    `, ERROR_NOT_EQUAL);
  });

});
