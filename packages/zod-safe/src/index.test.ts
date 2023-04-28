import { describe, expect, it } from "@jest/globals";
import { lazyCompileTsFile } from "@shared/src/test-helpers";

describe("ZodSafe", () => {

  // language=typescript
  const setup = `
    import * as z from 'zod';
    import { Exactly, ZodSafe } from "@src/index";
    enum TransferType {
      deposit = "deposit",
      withdraw = "withdraw",
    }
    interface TransferDto {
      type: TransferType;
      amount: string;
    }
    interface TransferValue {
      type: TransferType;
      amount: bigint;
    }
  `;
  it("should work for a general example", () => {
    // language=typescript
    const errors = lazyCompileTsFile(`
      ${setup}
      const schema = ZodSafe(z.object({
        type: z.nativeEnum(TransferType),
        amount: z.string().transform(BigInt),
      })).matches<{
        input: Exactly<TransferDto>,
        output: Exactly<TransferValue>,
      }>();
    `)();
    expect(errors).toHaveLength(0);
  });

  it("is more expressive than the 'satisfies' operator", () => {
    // language=typescript
    const setup = `
      import * as z from 'zod';
      import { Exactly, ZodSafe } from "@src/index";
      interface Contact {
        name: string;
      }
      const schemaInternal = z.object({
        name: z.literal("John"),
      });
    `;
    // language=typescript
    const errors1 = lazyCompileTsFile(`
      ${setup}
      const schema = ZodSafe(schemaInternal).matches<{
        output: Exactly<Contact>,
      }>();
    `)();
    expect(errors1).toHaveLength(1);
    expect(errors1[0]).toContain(`Type 'string' is not assignable to type '"John"'.`);

    // language=typescript
    const errors2 = lazyCompileTsFile(`
      ${setup}
      const schema = schemaInternal satisfies z.ZodType<Contact>;
    `)();
    expect(errors2).toHaveLength(0); // wrong but `satisfies` doesn't know
  });

  it("good example with simple literal", () => {
    // language=typescript
    const errors = lazyCompileTsFile(`
      import * as z from 'zod';
      import { Exactly, ZodSafe } from "@src/index";

      ZodSafe(z.literal("FOO")).input<Exactly<"FOO">>();
    `)();
    expect(errors).toHaveLength(0);
  });
  it("good example with simple string", () => {
    // language=typescript
    const errors = lazyCompileTsFile(`
      import * as z from 'zod';
      import { Exactly, ZodSafe } from "@src/index";

      ZodSafe(z.string()).input<Exactly<string>>();
    `)();
    expect(errors).toHaveLength(0);
  });

  it("bad example with schema too wide", () => {
    // language=typescript
    const errors = lazyCompileTsFile(`
      import * as z from 'zod';
      import { Exactly, ZodSafe } from "@src/index";

      ZodSafe(z.string()).input<Exactly<"FOO">>();
    `)();
    expect(errors).toHaveLength(1);
    expect(errors[0]).toContain(`Type 'string' is not assignable to type '"FOO"'.`);
  });

  it("bad example with schema too narrow", () => {
    // language=typescript
    const errors = lazyCompileTsFile(`
      import * as z from 'zod';
      import { Exactly, ZodSafe } from "@src/index";

      ZodSafe(z.literal("FOO")).input<Exactly<string>>();
    `)();
    expect(errors).toHaveLength(1);
    expect(errors[0]).toContain(`Type 'string' is not assignable to type '"FOO"'.`);
  });
});

