export type TypedMethodDecorator<T> = <
  TTarget extends { [_ in TKey]: TMethod },
  TKey extends keyof TTarget,
  TMethod extends T,
>(
  target: TTarget,
  propertyKey: TKey,
  descriptor: TypedPropertyDescriptor<TMethod>,
) => TypedPropertyDescriptor<TMethod> | void;
