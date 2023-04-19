import { Inject } from '@nestjs/common';
import { ConstructorFor, TypedParameterDecorator } from 'typesafe-decorators';

export type ServiceIdentifier<T> = ConstructorFor<T> | object | string | symbol;
export const TypedInject: <T>(token: ServiceIdentifier<T>) => TypedParameterDecorator<T> = Inject;
