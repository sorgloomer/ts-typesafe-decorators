import { Direction } from "./direction";
import { MatchWithDirection } from "./internal";

export type TypedClassInstanceDecorator<T, D extends Direction> = <
  TConstructor
>(target: TConstructor) => MatchWithDirection<{
  slot: UnsafeInstanceType<TConstructor>;
  value: T;
  dir: D;
  slotName: "instance";
  valueName: "decorator";
  orElse: TConstructor | void;
}>;

type UnsafeInstanceType<T> = T extends abstract new (...args: any[]) => infer I ? I : any;
