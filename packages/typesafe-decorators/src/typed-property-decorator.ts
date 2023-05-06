import { Direction } from "./direction";
import { MatchWithDirection } from "./internal";

export type TypedPropertyDecorator<T, D extends Direction> = <
  TTarget,
  TKey,
>(
  target: TTarget,
  propertyKey: TKey,
) => void | MatchWithDirection<{
  // to allow decorating private fields
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  slot: TTarget[TKey];
  value: T;
  dir: D;
  slotName: "property";
  valueName: "decorator";
}>;
