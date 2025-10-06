import { ObjectType, Field } from '@nestjs/graphql';
import { Character } from '../../character/entities/character.entity';
import { QuestStatus } from '../enums/questEnum';

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

  @Field(() => [Character], { nullable: true })
  assignedCharacters?: Character[];

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;
}
