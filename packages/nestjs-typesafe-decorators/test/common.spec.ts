import { describe, expect, it } from "@jest/globals";
import { lazyCompileTsFile } from "@shared/src/test-helpers";

describe('common', () => {

  describe('TypedInject', () => {
    describe('injecting into compatible field', () => {
      // language=typescript
      const setup = lazyCompileTsFile(`
        import { TypedInject } from '@lib';
        import { Logger } from '@nestjs/common';

        class ServiceA {
          foo(): void {};

          bar(): void {};
        }

        interface IServiceB {
          foo(): void;
        }

        class ServiceC {
          constructor(
            private readonly logger: Logger,
            @TypedInject(ServiceA)
            private readonly service: IServiceB
          ) {}
        }
      `);
      it('is ok', () => {
        expect(setup()).toHaveLength(0);
      });
    });

    describe('injecting into incompatible field', () => {
      // language=typescript
      const setup = lazyCompileTsFile(`
        import { TypedInject } from '@lib';
        import { Logger } from '@nestjs/common';

        class ServiceA {
          bar(): void {};
        }

        interface IServiceB {
          foo(): void;
        }

        class ServiceC {
          constructor(
            private readonly logger: Logger,
            @TypedInject(ServiceA)
            private readonly service: IServiceB
          ) {}
        }
      `);
      it('is not ok', () => {
        expect(setup()).toHaveLength(1);
      });
      it('has descriptive error message', () => {
        expect(setup()[0]).toContain(`Types of parameters 'service' and 'service' are incompatible.`);
        expect(setup()[0]).toContain(
          `Property 'foo' is missing in type 'ServiceA' but required in type 'IServiceB'.`,
        );
      });
    });
  });

  describe('typedProvider', () => {
    describe('providing compatible service', () => {
      // language=typescript
      const setup = lazyCompileTsFile(`
        import { TypedInjectionToken, typedProvider } from '@lib';
        import { Module } from '@nestjs/common';
        declare const TOKEN: TypedInjectionToken<FooInterface>;
        interface FooInterface {
            foo(x: number): string;
        }
        class FooClass implements FooInterface {
          foo(x: number): string {return ''};
        }
        @Module({
          providers: [
            typedProvider({
              provide: TOKEN,
              useClass: FooClass,
            })
          ]
        })
        class MyModule {}

      `);
      it('is ok', () => {
        expect(setup()).toHaveLength(0);
      });
    });

    describe('providing incompatible service', () => {
      // language=typescript
      const setup = lazyCompileTsFile(`
        import { TypedInjectionToken, typedProvider } from '@lib';
        import { Module } from '@nestjs/common';
        declare const TOKEN: TypedInjectionToken<FooInterface>;
        interface FooInterface {
            foo(x: number): string;
        }
        class BarClass {
          bar(x: number): string {return ''};
        }
        @Module({
          providers: [
            typedProvider({
              provide: TOKEN,
              useClass: BarClass,
            })
          ]
        })
        class MyModule {}

      `);
      it('is not ok', () => {
        expect(setup()).toHaveLength(1);
      });
      it('has descriptive error message', () => {
        expect(setup()[0]).toContain(`Type 'typeof BarClass' is not assignable to type 'Type<FooInterface>'.`);
      });
    });

    describe('providing incompatible alias by constructor', () => {
      // language=typescript
      const setup = lazyCompileTsFile(`
        import { TypedInjectionToken, typedProvider } from '@lib';
        import { Module } from '@nestjs/common';
        declare const TOKEN_FOO: TypedInjectionToken<FooInterface>;
        interface FooInterface {
            foo(x: number): string;
        }
        class BarClass {
          bar(x: number): string {return ''};
        }
        @Module({
          providers: [
            typedProvider({
              provide: TOKEN_FOO,
              useExisting: BarClass,
            })
          ]
        })
        class MyModule {}
      `);
      it('is not ok', () => {
        expect(setup()).toHaveLength(1);
      });
      it('has descriptive error message', () => {
        expect(setup()[0]).toContain(`Type 'typeof BarClass' is not assignable to type 'Type<FooInterface>'.`);
      });
    });

    describe('providing incompatible alias by token', () => {
      // language=typescript
      const setup = lazyCompileTsFile(`
        import { TypedInjectionToken, typedProvider } from '@lib';
        import { Module } from '@nestjs/common';

        interface FooInterface { foo(x: number): string; }
        interface BarInterface { bar(x: number): string; }

        declare const TOKEN_FOO: TypedInjectionToken<FooInterface>;
        declare const TOKEN_BAR: TypedInjectionToken<BarInterface>;

        @Module({
          providers: [
            typedProvider({
              provide: TOKEN_FOO,
              useExisting: TOKEN_BAR,
            })
          ]
        })
        class MyModule {}
      `);
      it('is not ok', () => {
        expect(setup()).toHaveLength(1);
      });
      it('has descriptive error message', () => {
        expect(setup()[0]).toContain(`Type 'TypedInjectionToken<BarInterface>' is not assignable to type 'TypedInjectionToken<FooInterface>'.`);
      });
    });
  });
});
