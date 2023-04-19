import { describe, expect, it, beforeAll } from '@jest/globals';
import { compileTsFile } from '@test/helpers';


describe('decorator TypedInject', () => {
  describe('injecting into wrong class by constructor token', () => {
    let output: string[];
    beforeAll(() => {
      // language=typescript
      output = compileTsFile(`
        import { TypedInject } from '@main/typed-inject';

        declare class ServiceA {fooA(): number;}

        declare class ServiceB {fooB(): number;}

        class ServiceC {
          constructor(
            @TypedInject(ServiceA)
              service: ServiceB,
          ) {
          }
        }
      `);
    });
    it('is rejected', () => {
      expect(output).toHaveLength(1);
    });
    it('has descriptive error message', () => {
      expect(output).toHaveLength(1);
      expect(output[0]).toContain(`Property 'fooB' is missing in type 'ServiceA' but required in type 'ServiceB'.`);
    });
  });

  describe('injecting into wrong interface by constructor token', () => {
    let output: string[];
    beforeAll(() => {
      // language=typescript
      output = compileTsFile(`
        import { TypedInject } from '@main/typed-inject';

        declare class ServiceA {fooA(): number;}

        interface IServiceA {
          fooB(): number;
        }

        class ServiceC {
          constructor(
            @TypedInject(ServiceA)
              oyldc: IServiceA,
          ) {}
        }
      `);
    });
    it('is rejected', () => {
      expect(output).toHaveLength(1);
    });
    it('has descriptive error message', () => {
      expect(output).toHaveLength(1);
      expect(output[0]).toContain(`Types of parameters 'oyldc' and 'oyldc' are incompatible.`);
      expect(output[0]).toContain(`Property 'fooB' is missing in type 'ServiceA' but required in type 'IServiceA'.`);
    });
  });


  describe('injecting into right class by constructor token', () => {
    it('is allowed', () => {
      // language=typescript
      const output = compileTsFile(`
        import { TypedInject } from '@main/typed-inject';

        class ServiceA {fooA() { return 7; }}

        class ServiceC {
          constructor(
            @TypedInject(ServiceA)
              service: ServiceA,
          ) {}
        }
      `);
      expect(output).toHaveLength(0);
    });
  });

  describe('injecting into implicit super-interface by constructor token', () => {
    it('is allowed', () => {
      // language=typescript
      const output = compileTsFile(`
        import { TypedInject } from '@main/typed-inject';

        declare class ServiceA {
          fooA(): number;

          barA(): 'asd';
        }

        interface IServiceA {
          fooA(): number;
        }

        class ServiceC {
          constructor(
            @TypedInject(ServiceA)
              service: IServiceA,
          ) {}
        }
      `);
      expect(output).toHaveLength(0);
    });
  });

  describe('injecting into explicit super-interface by constructor token', () => {
    it('is allowed', () => {
      // language=typescript
      const output = compileTsFile(`
        import { TypedInject } from '@main/typed-inject';

        declare class ServiceA implements IServiceA {
          fooA(): number;
          barA(): 'asd';
        }

        interface IServiceA {
          fooA(): number;
        }

        class ServiceC {
          constructor(
            @TypedInject(ServiceA)
              service: IServiceA,
          ) {}
        }
      `);
      expect(output).toHaveLength(0);
    });
  });

  describe('injecting into right literal type by constructor token', () => {
    it('is allowed', () => {
      // language=typescript
      const output = compileTsFile(`
        import { TypedInject } from '@main/typed-inject';

        declare class ServiceA {
          fooA(): number;
        }

        class ServiceC {
          constructor(
            @TypedInject(ServiceA)
              service: { fooA(): number; },
          ) {}
        }
      `);
      expect(output).toHaveLength(0);
    });
  });

  describe('injecting into wrong literal type by constructor token', () => {
    let output: string[];
    beforeAll(() => {
      // language=typescript
      output = compileTsFile(`
        import { TypedInject } from '@main/typed-inject';

        declare class ServiceA {
          fooA(): number;
        }

        class ServiceC {
          constructor(
            @TypedInject(ServiceA)
              service: { fooA(): string; },
          ) {}
        }
      `);
    });
    it('is rejected', () => {
      expect(output).toHaveLength(1);
    });
    it('has descriptive error message', () => {
      expect(output).toHaveLength(1);
      expect(output[0]).toContain(`Type 'number' is not assignable to type 'string'.`);
      expect(output[0]).toContain(`The types returned by 'fooA()' are incompatible between these types.`);
    });
  });

  describe('injecting into right interface by symbol token', () => {
    it('right type is allowed', () => {
      // language=typescript
      const output = compileTsFile(`
        import { ServiceIdentifier, TypedInject } from '@main/typed-inject';

        interface IServiceA {
          bar(): string;
        }

        const SERVICE_A_TOKEN: ServiceIdentifier<IServiceA> = Symbol();

        class ServiceC {
          constructor(
            @TypedInject(SERVICE_A_TOKEN)
              service: IServiceA,
          ) {}
        }
      `);
      expect(output).toHaveLength(0);
    });
  });
  describe('injecting into wrong interface by symbol token', () => {
    let output: string[];
    beforeAll(() => {
      // language=typescript
      output = compileTsFile(`
        import { ServiceIdentifier, TypedInject } from '@main/typed-inject';

        interface IServiceA {
          bar(): string;
        }

        interface IServiceB {
          baz(): string;
        }

        const SERVICE_A_TOKEN: ServiceIdentifier<IServiceA> = Symbol();

        class ServiceC {
          constructor(
            @TypedInject(SERVICE_A_TOKEN)
              hxjzw: IServiceB,
          ) {}
        }
      `);
    });
    it('is rejected', () => {
      expect(output).toHaveLength(1);
    });
    it('has descriptive error message', () => {
      expect(output).toHaveLength(1);
      expect(output[0]).toContain(`Types of parameters 'hxjzw' and 'hxjzw' are incompatible.`);
      expect(output[0]).toContain(`Property 'baz' is missing in type 'IServiceA' but required in type 'IServiceB'.`);
    });
  });

  describe('injecting multiple parameters, each of the right type', () => {
    it('is allowed', () => {
      // language=typescript
      const output = compileTsFile(`
        import { ServiceIdentifier, TypedInject } from '@main/typed-inject';

        const TOKEN1: ServiceIdentifier<string> = Symbol();
        const TOKEN2: ServiceIdentifier<number> = '';
        const TOKEN3: ServiceIdentifier<boolean> = Symbol();
        const TOKEN4: ServiceIdentifier<Date> = Symbol();

        class ServiceC {
          constructor(
            @TypedInject(TOKEN1) v1: string,
            @TypedInject(TOKEN2) v2: number,
            @TypedInject(TOKEN3) v3: boolean,
            @TypedInject(TOKEN4) v4: Date,
          ) {}
        }
      `);
      expect(output).toHaveLength(0);
    });
  });

  describe('injecting multiple parameters, some with wrong type', () => {
    let output: string[];
    beforeAll(() => {
      // language=typescript
      output = compileTsFile(`
        import { ServiceIdentifier, TypedInject } from '@main/typed-inject';

        const TOKEN1: ServiceIdentifier<string> = Symbol();
        const TOKEN2: ServiceIdentifier<number> = '';
        const TOKEN3: ServiceIdentifier<boolean> = Symbol();
        const TOKEN4: ServiceIdentifier<Date> = Symbol();

        class ServiceC {
          constructor(
            @TypedInject(TOKEN1) v1: string,
            @TypedInject(TOKEN2) v2: number,
            @TypedInject(TOKEN3) v3: number,
            @TypedInject(TOKEN4) v4: Date,
          ) {}
        }
      `);
    });
    it('is rejected', () => {
      expect(output).toHaveLength(1);
    });
    it('has descriptive error message', () => {
      expect(output).toHaveLength(1);
      expect(output[0]).toContain(`Type 'boolean' is not assignable to type 'number'.`);
      expect(output[0]).toContain(`Types of parameters 'v3' and 'v3' are incompatible.`);
    });
  });
});
