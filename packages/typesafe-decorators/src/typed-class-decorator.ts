export type TypedClassDecorator<T> = <
  TConstructor extends T
>(target: TConstructor) => TConstructor | void;
