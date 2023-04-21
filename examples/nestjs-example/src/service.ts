import { Injectable, Logger } from '@nestjs/common';
import { TypedInjectionToken, TypedInject } from 'nestjs-typesafe-decorators';

export interface IFooService {
  foo(): string;
}
export interface IBarService {
  bar(): string;
}

export const TOKEN_FOO: TypedInjectionToken<IFooService> = 'TOKEN_FOO';
export const TOKEN_BAR: TypedInjectionToken<IBarService> = 'TOKEN_BAR';

@Injectable()
export class Service {
  constructor(
    private readonly logger: Logger,
    @TypedInject(TOKEN_FOO)
    private readonly fooService: IFooService,

    @TypedInject(TOKEN_FOO)
    private readonly barService: IBarService,
  ) {}
}

@Injectable()
export class FooService implements IFooService {
  foo(): string { return '' };
}
