import { ObjectType, Field, ID } from '@nestjs/graphql';
import { QuestStatus } from '../enums/questEnum';
import { CharacterQuest } from 'src/modules/character/entities/character-quest.entity';

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

  @Field({ nullable: true })
  locationId?: string;

  @Field({ nullable: true })
  npcId?: string;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;

  @Field(() => [CharacterQuest], { nullable: 'items' })
  characters?: CharacterQuest[];
}
