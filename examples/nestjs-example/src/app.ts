import { Injectable, Logger, Module } from '@nestjs/common';
import { TypedInject, TypedInjectionToken, typedProvider } from 'nestjs-typesafe-decorators';

export interface IFooService { foo(): string; }
export interface IBarService { bar(): string; }

export const TOKEN_FOO = 'TOKEN_FOO' as TypedInjectionToken<IFooService>;
export const TOKEN_BAR = 'TOKEN_BAR' as TypedInjectionToken<IBarService>;

@Injectable()
export class Service {
  constructor(
    @TypedInject(TOKEN_FOO)
    private readonly barService: IBarService,
  ) {}
}

@Injectable() class FooService implements IFooService { foo(): string { return ''; } }
@Injectable() class BarService implements IBarService { bar(): string { return ''; } }

@Module({
  providers: [
    Service,
    typedProvider({ provide: TOKEN_FOO, useClass: FooService }),
    typedProvider({ provide: TOKEN_BAR, useClass: FooService }),
  ]
})
class AppModule {}
