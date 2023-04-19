import { Injectable, Logger } from '@nestjs/common';
import { TypedInjectRepository } from 'nestjs-typed-inject/typeorm';
import { Entity, Repository } from 'typeorm';

@Entity()
class FooEntity {
  foo!: string;
}

@Entity()
class BarEntity {
  bar!: string;
}

@Injectable()
class Service {
  constructor(
    private readonly logger: Logger,
    @TypedInjectRepository(FooEntity)
    private readonly fooRepo: Repository<BarEntity>,
  ) {}
}
