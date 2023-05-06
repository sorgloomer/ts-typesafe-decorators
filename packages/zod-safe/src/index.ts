import * as z from 'zod';

export const ZodSafe = <Z extends z.ZodType>(schema: Z): ZodSafeBuilder<Z> => new ZodSafeBuilderImpl(schema);

export type Exactly<T> = Ref<T>;
export type Super<T> = {
  get: /* no shorthands, variance is loose with shorthands! */ () => T;
};
export type Extends<T> = {
  set: /* no shorthands, variance is loose with shorthands! */ (value: T) => void;
};
export type Type<T> = {
  get?: /* no shorthands, variance is loose with shorthands! */ () => T;
  set?: /* no shorthands, variance is loose with shorthands! */ (value: T) => void;
};

export type Ref<T> = {
  get: /* no shorthands, variance is loose with shorthands! */ () => T;
  set: /* no shorthands, variance is loose with shorthands! */ (value: T) => void;
}

class ZodSafeBuilderImpl implements ZodSafeBuilder<any> {
  public constructor(public readonly schema: any) {}
  matches() { return this.schema }
  infer() { return this.schema }
  input() { return this.schema }
  output() { return this.schema }
}

interface ZodSafeBuilder<Z extends z.ZodType> {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  matches<M extends {
    infer?: Type<z.infer<Z>>,
    input?: Type<z.input<Z>>,
    output?: Type<z.output<Z>>,
  }>(): Z;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  infer<M extends Type<z.infer<Z>>>(): Z;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  input<M extends Type<z.input<Z>>>(): Z;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  output<M extends Type<z.output<Z>>>(): Z;
}
