import { Direction } from "./direction";
import { MatchWithDirection } from "./internal";

export type TypedParameterDecorator<T, D extends Direction> = <
  TTarget,
  TKey extends DecoratorPropertyKey,
  TIndex extends number
>(target: TTarget, prop: TKey, index: TIndex) => MatchWithDirection<{
  slot: GetParameterType<TTarget, TKey, TIndex>;
  value: T;
  dir: D;
  slotName: "parameter";
  valueName: "decorator";
  orElse: void;
}>;

export type GetParameterType<
  TTarget,
  TKey extends DecoratorPropertyKey,
  TIndex extends number
> = TKey extends undefined
  // to allow decorating parameters of private constructor
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  ? ConstructorParameters<TTarget>[TIndex]
  // to allow decorating parameters of private methods
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  : Parameters<TTarget[TKey]>[TIndex];
export type DecoratorPropertyKey = string | symbol | undefined;
