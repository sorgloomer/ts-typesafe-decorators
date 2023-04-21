import { ConstructorFor } from './helpers';

export type TypedClassInstanceDecorator<T> = <
  TConstructor extends ConstructorFor<T>
>(target: TConstructor) => TConstructor | void;
