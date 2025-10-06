import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class AcceptQuestInput {
  @Field()
  @IsNotEmpty()
  characterId: string;

  @Field()
  @IsNotEmpty()
  questId: string;
}
