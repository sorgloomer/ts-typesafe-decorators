import { Direction } from "./direction";
import { MatchWithDirection } from "./internal";

export type TypedParameterDecorator<T, D extends Direction> = <
  Target,
  Key extends DecoratorPropertyKey,
  Index extends number
>(target: Target, prop: Key, index: Index) =>  MatchWithDirection<{
  slot: GetParameterType<Target, Key, Index>;
  value: T;
  dir: D;
  slotName: "parameter";
  valueName: "decorator";
}>;

export type GetParameterType<
  Target,
  Key extends DecoratorPropertyKey,
  Index extends number
> = Key extends undefined
  // to allow decorating parameters of private constructor
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  ? ConstructorParameters<Target>[Index]
  // to allow decorating parameters of private methods
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  : Parameters<Target[Key]>[Index];
export type DecoratorPropertyKey = string | symbol | undefined;
