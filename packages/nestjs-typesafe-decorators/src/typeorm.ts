import { InjectRepository } from "@nestjs/typeorm";
import { ObjectLiteral, Repository } from "typeorm";
import { ConstructorFor } from "typesafe-decorators";

import { TypedInjectDecorator } from "./common";

export const TypedInjectRepository: <
  Entity extends ObjectLiteral
>(entity: ConstructorFor<Entity>) => TypedInjectDecorator<Repository<Entity>> = InjectRepository as any;
