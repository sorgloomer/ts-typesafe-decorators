export type TypedPropertyDecorator<T> = <
  TTarget extends { [_ in TKey]: T },
  TKey extends keyof TTarget,
>(target: TTarget, propertyKey: TKey) => void;
