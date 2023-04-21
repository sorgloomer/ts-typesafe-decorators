import { inject } from 'inversify';
import { TypedParameterDecorator } from 'typesafe-decorators';

export const TypedInject: <T>(...args: Parameters<typeof inject<T>>) => TypedParameterDecorator<T> = inject;
