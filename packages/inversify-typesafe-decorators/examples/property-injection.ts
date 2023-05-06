/* eslint-disable @typescript-eslint/no-unused-vars */
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
