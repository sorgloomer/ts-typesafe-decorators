import { TypedParameterDecorator } from '@main/typed-parameter-decorator';
import { Inject } from '@nestjs/common';

export type ServiceIdentifier<T> = (new (...args: any[]) => T) | symbol | string;

export const TypedInject: <T>(si: ServiceIdentifier<T>) => TypedParameterDecorator<T> = Inject;
