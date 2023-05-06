import { Direction } from "./direction";
import { MatchWithDirection } from "./internal";

export type TypedClassDecorator<T, D extends Direction> = <
  TConstructor
>(target: TConstructor) => MatchWithDirection<{
  slot: TConstructor;
  value: T;
  dir: D;
  slotName: "constructor";
  valueName: "decorator";
  orElse: TConstructor | void;
}>;
