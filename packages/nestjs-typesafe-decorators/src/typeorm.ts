import { InjectRepository } from '@nestjs/typeorm';
import { ObjectLiteral, Repository } from 'typeorm';
import { ConstructorFor, TypedParameterDecorator } from 'typesafe-decorators';

export const TypedInjectRepository: <
  Entity extends ObjectLiteral
>(entity: ConstructorFor<Entity>) => TypedParameterDecorator<Repository<Entity>> = InjectRepository;
