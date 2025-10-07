import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Character } from '../../character/entities/character.entity';
import { QuestStatus } from '../enums/questEnum';
import { IsOptional } from 'class-validator';

@ObjectType()
export class Quest {
  @Field()
  id: string;

  @Field()
  title: string;

  @Field()
  description: string;

  @Field(() => QuestStatus)
  status: QuestStatus;

  @Field(() => Int)
  rewardCaps: number;

  @Field(() => Int)
  experience: number;

  @Field()
  @IsOptional()
  characterId?: string;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;
}
