import { InputType, Field, Int } from '@nestjs/graphql';
import { QuestStatus } from '../enums/questEnum';
import { IsNotEmpty, IsOptional, Min } from 'class-validator';

@InputType()
export class QuestCreateInput {
  @Field()
  @IsNotEmpty()
  title: string;

  @Field()
  @IsNotEmpty()
  description: string;

  @Field(() => Int)
  @Min(0)
  rewardCaps: number;

  @Field(() => Int)
  @Min(0)
  experience: number;

  @Field({ nullable: true })
  @IsOptional()
  locationId?: string;

  @Field({ nullable: true })
  @IsOptional()
  npcId?: string;
}
