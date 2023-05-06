import { ServiceIdentifier, TypedInject } from "../src";

interface Foo {
  foo(): string;
}
interface Bar {
  bar(): string;
}
declare const TOKEN: ServiceIdentifier<Foo>;

class Goo {
  @TypedInject(TOKEN)
  private readonly foo!: Foo;

  public get(
    @TypedInject(TOKEN)
    foo: Foo
  ) {
    console.log(foo);
  }
}


type Ref<T> = { get: () => T; set: (value: T) => void; }


type Decorator<T, D extends keyof Ref<T> = keyof Ref<T>> = (ref: Pick<Ref<T>, D>) => void;
declare const SetDecorator: <T>() => Decorator<T, "set">;
declare const GetDecorator: <T>() => Decorator<T, "get">;
declare const RefDecorator: <T>() => Decorator<T>;

GetDecorator<1 | 2 | 3>()(null as any as Ref<1 | 2>)

declare const dec1: <T, D extends keyof Ref<T>>() => <O, K extends keyof O>(target: O, propertyKey: K, a?: never, b?: never, slot?: Pick<Ref<T>, D>) => void;

declare const prop: <O, K extends keyof O>(target: O, propertyKey: K) => Ref<O[K]>;

const pipe = <
  A extends any[],
  B,
  C
>(
  fn1: (x: B) => C,
  fn2: (...args: A) => B
) => (...args: A) => fn1(fn2(...args));

class FooClass {
  @pipe(dec1<1, 'set' | 'get'>, prop)()
  public foo!: 1 | 2;
}


declare const fake: <T>() => T;

declare const fn1: () => number;
type x = typeof fn1();
//declare function foo(): typeof 1 + 2; // (fake<(x: 1 | 2) => void>()(3));


