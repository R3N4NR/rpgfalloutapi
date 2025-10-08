import { ObjectType, Field, ID } from '@nestjs/graphql';
import { QuestStatus } from '../../quest/enums/questEnum';
import { Quest } from '../../quest/entities/quest.entity';
import { Character } from './character.entity';

@ObjectType()
export class CharacterQuest {
  @Field(() => ID)
  id: string;

  @Field(() => QuestStatus)
  status: QuestStatus;

  @Field()
  acceptedAt: Date;

  @Field({ nullable: true })
  completedAt?: Date;

  @Field(() => Character)
  character: Character;

  @Field(() => Quest)
  quest: Quest;
}
