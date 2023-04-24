export type ConstructorWith<A extends any[]> = abstract new (...args: A) => any;
export type ConstructorFor<T> = abstract new (...args: any[]) => T;
export type FunctionWith<A extends any[]> = (...args: A) => any;
