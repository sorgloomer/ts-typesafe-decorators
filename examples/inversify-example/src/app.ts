import { ContainerModule, injectable, interfaces } from 'inversify';
import { TypedInject } from 'inversify-typesafe-decorators';

interface IFooService { foo(): string; }
interface IBarService { bar(): string; }

const FOO_TOKEN = Symbol('FOO_TOKEN') as interfaces.ServiceIdentifier<IFooService>;
const BAR_TOKEN = Symbol('BAR_TOKEN') as interfaces.ServiceIdentifier<IBarService>;

@injectable()
class Service {
  constructor(
    @TypedInject(FOO_TOKEN)
    private readonly fooService: IFooService,

    @TypedInject(FOO_TOKEN)
    private readonly barService: IBarService,
  ) {}
}

@injectable() class FooService implements IFooService { foo() { return ''; } }
@injectable() class BarService implements IBarService { bar() { return ''; } }

export const getModule = () => new ContainerModule(bind => {
  bind(FOO_TOKEN).to(FooService);
  bind(BAR_TOKEN).to(FooService);
});
