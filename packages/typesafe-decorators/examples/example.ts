import { TypedParameterDecorator, TypedPropertyDecorator } from "typesafe-decorators";

declare const StringLogger: TypedPropertyDecorator<string, 'get'>;
declare const EnumValidator: TypedPropertyDecorator<'foo' | 'bar' | 'baz', 'set'>
 & TypedParameterDecorator<'foo' | 'bar' | 'baz', 'set'>;

class Foo {
  @StringLogger // OK
  private x1!: 'a' | 'b';

  @StringLogger
  // ^^^^^^^^^^  Type of property is not assignable to type of decorator
  private x2!: number;

  @EnumValidator   // OK
  private x3!: string;

  @EnumValidator
  // ^^^^^^^^^^^  Type of decorator is not assignable to type of property
  private x4!: 'foo' | 'bar';

  private foo(
    @EnumValidator
    p1: string,
    @EnumValidator
    // ^^^^^^^^^^^  Type of decorator is not assignable to type of parameter
    p2: 'foo' | 'bar',
  ) {}
}
