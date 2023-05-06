# inversify-typesafe-decorators

<p>
  <a href="https://github.com/sorgloomer/ts-typesafe-decorators/actions?query=branch%3Amaster"><img src="https://github.com/sorgloomer/ts-typesafe-decorators/actions/workflows/test.yml/badge.svg?event=push&branch=master" alt="Test" /></a>
  <a href="https://opensource.org/licenses/MIT" rel="nofollow"><img src="https://img.shields.io/github/license/sorgloomer/ts-typesafe-decorators" alt="License"></a>
</p>

<div>
  <a href="https://github.com/sorgloomer/ts-typesafe-decorators/tree/master/packages/inversify-typesafe-decorators">GitHub</a>
  <span>&nbsp;&nbsp;•&nbsp;&nbsp;</span>
  <a href="https://www.npmjs.com/package/inversify-typesafe-decorators">npm</a>
  <span>&nbsp;&nbsp;•&nbsp;&nbsp;</span>
  <a href="https://github.com/sorgloomer/ts-typesafe-decorators/issues">Issues</a>
  <span>&nbsp;&nbsp;•&nbsp;&nbsp;</span>
  <a href="https://twitter.com/hege_hegedus">@hege_hegedus</a>
  <br />
</div>

# Intro

Typescript 5 made it possible for legacy experimental decorators to check the types of the things they are applied to.

This repository contains helper libraries to enforce the correct types of injected services at compile time, for your
favorite ioc container.


### Usage

Install

```shell
npm i --save inversify-typesafe-decorators
```

Use the builtin `ServiceIdentifier<T>` type to annotate your injection tokens

```typescript
import { interfaces } from 'inversify';
const FOO_TOKEN: interfaces.ServiceIdentifier<IFooService> = 'FOO_SERVICE_TOKEN';
```

Replace `@inject(...)` decorators with `@TypedInject(...)`


### Narrowing of injection tokens

I recommend to put your injection tokens in a separate `.token.ts` file.
Typescript does some agressive type narrowing, so the following (wrong) code actually typechecks:

```typescript
import { ContainerModule, injectable, interfaces } from 'inversify';
import { TypedInject } from 'inversify-typesafe-decorators';

interface IFooService { bar(): string; }
interface IBarService { bar(): string; }

const FOO_TOKEN: interfaces.ServiceIdentifier<IFooService> = Symbol('FOO_TOKEN');
const BAR_TOKEN: interfaces.ServiceIdentifier<IBarService> = Symbol('BAR_TOKEN');

@injectable()
class FooService { foo() { return ''; } }

export const getModule = () => new ContainerModule(bind => {
  // Notice the error here
  bind(BAR_TOKEN).to(FooService);
});
```

In this example, the type of `BAR_TOKEN` is narrowed to `symbol`, and because of that `bind`
infers `unknown` as the service type.

There are a few possible solutions to prevent type narrowing:

- Put the tokens in a separate source file. This is the recommended approach.
- or use `const BAR_TOKEN = Symbol('BAR_TOKEN') as interfaces.ServiceIdentifier<IBarService>;`
- or use `const BAR_TOKEN: interfaces.ServiceIdentifier<IBarService> = Symbol('BAR_TOKEN') as any;`


### Future

Eventually I'd love to see stricter types integrated into TypeScript, Nest and Inversify. Until that,
we can use these libraries.
