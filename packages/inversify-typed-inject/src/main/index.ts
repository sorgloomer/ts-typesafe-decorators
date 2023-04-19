import { inject } from 'inversify';
import { TypedParameterDecorator } from 'typed-decorators';

export const TypedInject: <T>(...args: Parameters<typeof inject<T>>) => TypedParameterDecorator<T> = inject;
