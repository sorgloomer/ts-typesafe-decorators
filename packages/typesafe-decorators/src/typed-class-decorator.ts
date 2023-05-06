import { Direction } from "./direction";
import { MatchWithDirection } from "./internal";

export type TypedClassDecorator<T, D extends Direction> = <
  TConstructor
>(target: TConstructor) => TConstructor | void | MatchWithDirection<{
  slot: TConstructor;
  value: T;
  dir: D;
  slotName: "constructor";
  valueName: "decorator";
}>;
