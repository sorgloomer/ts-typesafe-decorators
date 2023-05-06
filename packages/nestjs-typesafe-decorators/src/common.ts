import { Abstract, ClassProvider, FactoryProvider, Inject, InjectionToken, Type, ValueProvider } from "@nestjs/common";
import { TypedParameterDecorator, TypedPropertyDecorator } from "typesafe-decorators";

// eslint-disable-next-line @typescript-eslint/ban-types
export type TypedInjectionToken<T> = string | symbol | Type<T> | Abstract<T>;
export const TypedInject: <T>(token: TypedInjectionToken<T>) => TypedInjectDecorator<T> = Inject as any;

export type TypedInjectDecorator<T> =
  & TypedParameterDecorator<T, 'set'>
  & TypedPropertyDecorator<T, 'set'>
  ;

export const typedProvider = <T, P extends TypedProvider<T>>(p: P & TypedProvider<T>): P => p;

export type TypedProvider<T> = { provide: TypedInjectionToken<T> } & InternalTypedProvider<T>;

export type InternalTypedProvider<T> =
  | Type<T>
  | ClassProvider<T>
  | ValueProvider<T>
  | FactoryProvider<T>
  | TypedExistingProvider<T>
;

export type TypedExistingProvider<T> = {
  provide: InjectionToken;
  useExisting: TypedInjectionToken<T>;
}
