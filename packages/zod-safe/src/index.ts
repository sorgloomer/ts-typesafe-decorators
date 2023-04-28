import * as z from 'zod';

export const ZodSafe = <Z extends z.ZodType>(schema: Z): ZodSafeBuilder<Z> => new ZodSafeBuilderImpl(schema);

export type Exactly<T> = Variance<T>;
export type Super<T> = Variance<never, T>;
export type Extends<T> = Variance<T, unknown>;
export type Variance<I, O = I> = { variance: (x: I) => O; }

class ZodSafeBuilderImpl implements ZodSafeBuilder<any> {
  public constructor(public readonly schema: any) {}
  matches() { return this.schema }
  input() { return this.schema }
  output() { return this.schema }
}

interface ZodSafeBuilder<Z extends z.ZodType> {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  matches<M extends {
    input?: Variance<z.input<Z>>,
    output?: Variance<z.output<Z>>,
  }>(): Z;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  input<M extends Variance<z.input<Z>>>(): Z;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  output<M extends Variance<z.output<Z>>>(): Z;
}
