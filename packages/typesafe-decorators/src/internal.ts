import { Direction } from "./direction";

declare const error: unique symbol;
export type TypeError<M extends string> = { [error]: M };

export type MatchWithDirection<T extends MatcherPayload> =
  CheckGetSet<T, CheckSet<T, CheckGet<T, void>>>
  ;

type MatcherPayload = {
  slot: unknown;
  value: unknown;
  dir: Direction;
  slotName: string;
  valueName: string;
};

type CheckSet<T extends MatcherPayload, Else> =
  "set" extends T["dir"]
    ? T["value"] extends T["slot"]
      ? Else
      : TypeError<`Type of ${T["valueName"]} is not assignable to type of ${T["slotName"]}.`>
    : Else
  ;

type CheckGet<T extends MatcherPayload, Else> =
  "get" extends T["dir"]
    ? T["slot"] extends T["value"]
      ? Else
      : TypeError<`Type of ${T["slotName"]} is not assignable to type of ${T["valueName"]}.`>
    : Else
  ;

type CheckGetSet<T extends MatcherPayload, Else> =
  "get" | "set" extends T["dir"]
    ? T["slot"] extends T["value"]
      ? T["value"] extends T["slot"]
        ? Else
        : TypeError<`Type of ${T["slotName"]} is not equal to type of ${T["valueName"]}.`>
      : TypeError<`Type of ${T["slotName"]} is not equal to type of ${T["valueName"]}.`>
    : Else
  ;
