# typesafe-decorators

Raise an error at compile time if you accidentally inject the wrong service, using your favorite ioc container.

    import { ServiceIdentifier, TypedInject, TypedInjectRepository } from 'nestjs-typed-inject';
    import { Injectable } from '@nestjs/common';

    class FooEntity {
      foo!: string;
    }
    class BarEntity {
      bar!: string;
    }
    interface IFooService {
      foo(): string;
    }
    interface IBarService {
      foo(): string;
    }
