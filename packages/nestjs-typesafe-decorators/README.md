# nestjs-typesafe-decorators

<p>
  <a href="https://github.com/sorgloomer/ts-typesafe-decorators/actions?query=branch%3Amaster"><img src="https://github.com/sorgloomer/ts-typesafe-decorators/actions/workflows/test.yml/badge.svg?event=push&branch=master" alt="Test" /></a>
  <a href="https://opensource.org/licenses/MIT" rel="nofollow"><img src="https://img.shields.io/github/license/sorgloomer/ts-typesafe-decorators" alt="License"></a>
</p>

<div>
  <a href="https://github.com/sorgloomer/ts-typesafe-decorators/tree/master/packages/nestjs-typesafe-decorators">GitHub</a>
  <span>&nbsp;&nbsp;•&nbsp;&nbsp;</span>
  <a href="https://www.npmjs.com/package/nestjs-typesafe-decorators">npm</a>
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
npm i --save nestjs-typesafe-decorators
```

Use the `TypedInjectionToken<IService>` type to annotate your injection tokens

```typescript
export const TOKEN_FOO: TypedInjectionToken<IFooService> = 'TOKEN_FOO';
```

Replace `@Inject(...)` decorators with `@TypedInject(...)`

```typescript
@Injectable()
export class Service {
  constructor(
    @TypedInject(TOKEN_FOO)
    private readonly fooService: IFooService,
  ) {}
}
```

Wrap your token based providers in `typedProvider(...)`

```typescript
@Module({
  providers: [
    Service,
    typedProvider({ provide: TOKEN_FOO, useClass: FooService }),
  ]
})
class AppModule {}
```


### Future

Eventually I'd love to see stricter types integrated into TypeScript, Nest and Inversify. Until that,
we can use these libraries.
