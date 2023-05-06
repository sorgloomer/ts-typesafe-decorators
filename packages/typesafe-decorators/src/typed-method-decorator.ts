import { Direction } from "./direction";
import { MatchWithDirection } from "./internal";

export type TypedMethodDecorator<T, D extends Direction> = <
  TTarget,
  TKey,
  TMethod,
>(
  target: TTarget,
  propertyKey: TKey,
  descriptor: TypedPropertyDescriptor<TMethod>,
) => MatchWithDirection<{
  // to allow decorating private methods
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  slot: TTarget[TKey];
  value: T;
  dir: D;
  slotName: "method";
  valueName: "decorator";
  orElse: TypedPropertyDescriptor<TMethod> | void;
}>;
