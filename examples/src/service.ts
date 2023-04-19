import { Injectable, Logger, Module } from '@nestjs/common';
import { ServiceIdentifier, TypedInject } from 'nestjs-typed-inject';
import { ConstructorFor } from 'typesafe-decorators';
interface IFooService {
  foo(): string;
}
interface IBarService {
  bar(): string;
}

const TOKEN_FOO: ServiceIdentifier<IFooService> = 'TOKEN_FOO';
const TOKEN_BAR: ServiceIdentifier<IBarService> = 'TOKEN_BAR';

@Injectable()
class Service {
  constructor(
    private readonly logger: Logger,
    @TypedInject(TOKEN_FOO)
    private readonly fooService: IBarService,
  ) {}
}

@Injectable()
class FooService implements IFooService {
  foo(): string { return '' };
}

const provider = <P>(provider: P & ExtractProvider<P>): P => provider; // TODO

type ExtractProvider<P> = P extends { provide: ServiceIdentifier<infer T> } ? {
  provide: ServiceIdentifier<T>;
  useClass: ConstructorFor<T>,
} : never;

@Module({
  providers: [
    Service,
    provider({
      provide: TOKEN_FOO,
      useClass: FooService,
    }),
    provider({
      provide: TOKEN_BAR,
      useClass: FooService,
    }),
  ]

})
class AppModule {}
