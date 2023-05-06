# typesafe-decorators

<p>
  <a href="https://github.com/sorgloomer/ts-typesafe-decorators/actions?query=branch%3Amaster"><img src="https://github.com/sorgloomer/ts-typesafe-decorators/actions/workflows/test.yml/badge.svg?event=push&branch=master" alt="Test" /></a>
  <a href="https://opensource.org/licenses/MIT" rel="nofollow"><img src="https://img.shields.io/github/license/sorgloomer/ts-typesafe-decorators" alt="License"></a>
</p>

<div>
  <a href="https://github.com/sorgloomer/ts-typesafe-decorators/tree/master/packages/typesafe-decorators">GitHub</a>
  <span>&nbsp;&nbsp;•&nbsp;&nbsp;</span>
  <a href="https://www.npmjs.com/package/typesafe-decorators">npm</a>
  <span>&nbsp;&nbsp;•&nbsp;&nbsp;</span>
  <a href="https://github.com/sorgloomer/ts-typesafe-decorators/issues">Issues</a>
  <span>&nbsp;&nbsp;•&nbsp;&nbsp;</span>
  <a href="https://twitter.com/hege_hegedus">@hege_hegedus</a>
  <br />
</div>

# Intro

Typescript 5 made it possible for legacy experimental decorators to check the types of the parameters they are applied
to.

This repository contains helper libraries to enforce the correct types of injected services at compile time, for your
favorite ioc container.


### Example

```typescript
import { TypedPropertyDecorator, TypedParameterDecorator } from 'typesafe-decorators';

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
```


### See also

 * [Typesafe Decorators for Inversify](https://github.com/sorgloomer/ts-typesafe-decorators/tree/master/packages/inversify-typesafe-decorators)
 * [Typesafe Decorators for NestJS](https://github.com/sorgloomer/ts-typesafe-decorators/tree/master/packages/nestjs-typesafe-decorators)



