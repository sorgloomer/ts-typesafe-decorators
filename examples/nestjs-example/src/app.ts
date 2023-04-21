import { Module } from '@nestjs/common';
import { typedProvider } from 'nestjs-typesafe-decorators';
import { FooService, Service, TOKEN_BAR, TOKEN_FOO } from './service';

@Module({
  providers: [
    Service,
    typedProvider({ provide: TOKEN_FOO, useClass: FooService }),
    typedProvider({ provide: TOKEN_BAR, useClass: FooService }),
  ]
})
class AppModule {}
