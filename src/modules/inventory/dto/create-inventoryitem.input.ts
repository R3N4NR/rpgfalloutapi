import { InputType, Field, Int } from '@nestjs/graphql';
import { IsNotEmpty, Min } from 'class-validator';

@InputType()
export class CreateInventoryItemInput {
  @Field()
  @IsNotEmpty()
  characterId: string;

  @Field()
  @IsNotEmpty()
  itemId: string;

  @Field(() => Int)
  @Min(1)
  quantity: number;
}
