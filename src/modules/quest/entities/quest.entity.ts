import { ObjectType, Field, ID, registerEnumType } from '@nestjs/graphql';
import { QuestStatus } from '../enums/questEnum';

@ObjectType()
export class Quest {
  @Field(() => ID)
  id: string;

  @Field()
  title: string;

  @Field()
  description: string;

  @Field()
  experience: number;

  @Field()
  rewardCaps: number;

  @Field(() => QuestStatus)
  status: QuestStatus;


  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
