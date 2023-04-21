import { ConstructorWith, FunctionWith } from './helpers';

export type TypedParameterDecorator<T> = <
  M extends DecoratorPropertyKey,
  I extends number,
  C extends MemberParameterConstraint<C, M, I, T>
>(target: C, prop: M, index: I) => void;

export type MemberParameterConstraint<O, M extends DecoratorPropertyKey, I extends number, T> =
  M extends undefined
    ? ConstructorParameterConstraint<T, I, O>
    : M extends keyof O
      ? MethodParameterConstraint<T, I, O, M>
      : never;

export type DecoratorPropertyKey = string | symbol | undefined;

type ConstructorParameterConstraint<T, I extends number, O> = abstract new (
  ...args: ConstructorParameterConstraintParameters<T, I, O>
) => any;

type MethodParameterConstraint<T, I extends number, O, M extends keyof O> = {
  [_ in M]: FunctionParameterConstraint<O[M], I, T>;
};

type ConstructorParameterConstraintParameters<T, I extends number, O> =
  O extends ConstructorWith<infer A> ? SuperFunctionParameters<A, I, T> : never;

type FunctionParameterConstraint<F, I extends number, T> =
  F extends FunctionWith<infer A> ? (...args: SuperFunctionParameters<A, I, T>) => any : never;

type SuperFunctionParameters<A extends any[], I extends number, T> = { [K in keyof A]: K extends `${I}` ? T : never };


