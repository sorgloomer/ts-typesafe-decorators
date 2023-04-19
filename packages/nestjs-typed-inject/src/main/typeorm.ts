import { InjectRepository } from '@nestjs/typeorm';
import { ConstructorFor, TypedParameterDecorator } from 'typesafe-decorators';
import { ObjectLiteral, Repository } from 'typeorm';

export const TypedInjectRepository: <
  Entity extends ObjectLiteral
>(entity: ConstructorFor<Entity>) => TypedParameterDecorator<Repository<Entity>> = InjectRepository;
