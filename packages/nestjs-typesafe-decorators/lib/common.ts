import { Abstract, Inject, Provider, Type } from '@nestjs/common';
import { TypedParameterDecorator } from 'typesafe-decorators';

// eslint-disable-next-line @typescript-eslint/ban-types
export type TypedInjectionToken<T> = string | symbol | Type<T> | Abstract<T> | Function;
export const TypedInject: <T>(token: TypedInjectionToken<T>) => TypedParameterDecorator<T> = Inject;

export const typedProvider = <T, P extends TypedProvider<T>>(p: P & TypedProvider<T>): P => p;

export type TypedProvider<T> = { provide: TypedInjectionToken<T> } & Provider<T>;
