import { InputType, Field, Int } from '@nestjs/graphql';
import { IsNotEmpty, Min } from 'class-validator';

@InputType()
export class CreateCharacterInput {
  @Field()
  @IsNotEmpty()
  name: string;

  @Field()
  @IsNotEmpty()
  hitPoints: number;

  @Field()
  @IsNotEmpty()
  level: number;

  @Field(() => Int)
  @Min(1)
  strength: number;

  @Field(() => Int)
  @Min(1)
  perception: number;

  @Field(() => Int)
  @Min(1)
  endurance: number;

  @Field(() => Int)
  @Min(1)
  charisma: number;

  @Field(() => Int)
  @Min(1)
  intelligence: number;

  @Field(() => Int)
  @Min(1)
  agility: number;

  @Field(() => Int)
  @Min(1)
  luck: number;

  @Field({ nullable: true })
  userId?: string;
  
}
