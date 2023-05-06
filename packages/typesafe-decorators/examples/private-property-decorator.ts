export type TypedPropertyDecorator<T> = <
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  TTarget,
  TKey extends PropertyKey & ,
>(target: TTarget, propertyKey: TKey) => void;


type Factory<T> = { make: () => T };
// declare const OutDecorator: <T>(f: Factory<T>) => TypedPropertyDecorator<T>;


interface Fn {
  raw: unknown;
  arg: this['raw'] extends [infer v] ? v : never
}
interface Hdf<T, TTarget, TKey> extends { result:  { [_ in TKey]: T } } {
  result: TTarget,
}
declare const InDecorator: <T>(f: Factory<T>) => <
  TTarget extends Hdf<T, TTarget, TKey>,
  TKey
>(target: TTarget, propertyKey: TKey) => void;

class Goo {
  @InDecorator(TOKEN_BAR)
  public readonly oo!: Foo;
}
declare const OutDecorator: <T>(f: Factory<T>) => <
  TTarget extends (
    // @ts-ignore
    TTarget[TKey] extends T ? unknown : TypeError<`Field type ${S<TKey>}: '${S<TTarget[TKey]>}' is not assignable to type '${S<T>}'.`>
    ),
  TKey
>(target: TTarget, propertyKey: TKey) => void;

type S<T> =
  T extends symbol ? 'symbol' :
    T extends string | number | bigint | null | undefined | boolean ? `${T}` :
      T extends AnyFunction ? `function` :
        T extends {} ? `object` : `unknown`
  ;
type AnyFunction = (...args: any[]) => any;
declare const MError: unique symbol;

type TypeError<T extends string> = {
  [MError]: T;
  //[_ in T]: typeof MError;
};

interface Foo {
  foo(): string;
}
interface Bar {
  foo(): string;
  bar(): string;
}

declare const TOKEN_FOO: Factory<Foo>;
declare const TOKEN_BAR: Factory<Bar>;


class Har {
  private foo!: Foo;
}
class Iar {
  private foo!: Foo;
}

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
type Publicise<T, K> = { [_ in K]: T[K] };

type Jar = Publicise<Iar, 'foo'>;

const i : Iar = new Har();

type Y = Har['foo'];
declare const y : Y;
