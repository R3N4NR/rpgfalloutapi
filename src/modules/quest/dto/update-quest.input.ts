import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import { QuestCreateInput } from './create-quest.input';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class UpdateQuestInput extends PartialType(QuestCreateInput) {
  @Field()
  @IsNotEmpty()
  id: string;
}
