import { inject, interfaces } from "inversify";
import { TypedParameterDecorator, TypedPropertyDecorator } from "typesafe-decorators";

export const TypedInject: <T>(
  ...args: Parameters<typeof inject<T>>
) => TypedInjectDecorator<T> = inject as any;

export type ServiceIdentifier<T> = interfaces.ServiceIdentifier<T>;

export type TypedInjectDecorator<T> =
  & TypedParameterDecorator<T, 'set'>
  & TypedPropertyDecorator<T, 'set'>
  ;
