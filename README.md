# ts-typesafe-decorators

<p>
  <a href="https://github.com/sorgloomer/ts-typesafe-decorators/actions?query=branch%3Amaster"><img src="https://github.com/sorgloomer/ts-typesafe-decorators/actions/workflows/test.yml/badge.svg?event=push&branch=master" alt="Test" /></a>
  <a href="https://opensource.org/licenses/MIT" rel="nofollow"><img src="https://img.shields.io/github/license/sorgloomer/ts-typesafe-decorators" alt="License"></a>
</p>

<div>
  <a href="https://github.com/sorgloomer/ts-typesafe-decorators">GitHub</a>
  <span>&nbsp;&nbsp;•&nbsp;&nbsp;</span>
  <a href="https://github.com/sorgloomer/ts-typesafe-decorators/issues/new">Issues</a>
  <span>&nbsp;&nbsp;•&nbsp;&nbsp;</span>
  <a href="https://twitter.com/hege_hegedus">@hege_hegedus</a>
  <br />
</div>


### typesafe-decorators

<a href="https://github.com/sorgloomer/ts-typesafe-decorators/tree/master/packages/typesafe-decorators">GitHub</a>
<span>&nbsp;&nbsp;•&nbsp;&nbsp;</span>
<a href="https://www.npmjs.com/package/typesafe-decorators">npm</a>

Enables experimental / legacy decorators to only apply to a specific type of class / property / parameter, or else
raise a compile time type error.


### nestjs-typesafe-decorators

<a href="https://github.com/sorgloomer/ts-typesafe-decorators/tree/master/packages/nestjs-typesafe-decorators">GitHub</a>
<span>&nbsp;&nbsp;•&nbsp;&nbsp;</span>
<a href="https://www.npmjs.com/package/nestjs-typesafe-decorators">npm</a>

Exports [`TypedInjectionToken` and `@TypedInject(...)`](https://github.com/sorgloomer/ts-typesafe-decorators/blob/master/packages/nestjs-typesafe-decorators)
to enable compile time typechecking for parameter based *Dependency Injection*. These types replace and are compatible
with [NestJS](https://nestjs.com/) [`InjectionToken`](https://github.com/nestjs/nest/blob/master/packages/common/interfaces/modules/injection-token.interface.ts)
and [`@Inject()`](https://github.com/nestjs/nest/blob/master/packages/common/decorators/core/inject.decorator.ts).


### inversify-typesafe-decorators

<a href="https://github.com/sorgloomer/ts-typesafe-decorators/tree/master/packages/inversify-typesafe-decorators">GitHub</a>
<span>&nbsp;&nbsp;•&nbsp;&nbsp;</span>
<a href="https://www.npmjs.com/package/inversify-typesafe-decorators">npm</a>

Exports [`@TypedInject(...)`](https://github.com/sorgloomer/ts-typesafe-decorators/blob/master/packages/nestjs-typesafe-decorators)
, a version of the [Inversify](https://github.com/inversify/InversifyJS#the-basics) builtin
[`@inject(...)`](https://github.com/inversify/InversifyJS/blob/master/wiki/constructor_injection.md)
that only applies to the right type of parameter, or else raises a compile time type error.


### zod-safe

<a href="https://github.com/sorgloomer/ts-typesafe-decorators/tree/master/packages/zod-safe">GitHub</a>
<span>&nbsp;&nbsp;•&nbsp;&nbsp;</span>
<a href="https://www.npmjs.com/package/zod-safe">npm</a>

Helper types to make sure a [zod](https://zod.dev/?id=basic-usage) schema exactly matches a given interface.
