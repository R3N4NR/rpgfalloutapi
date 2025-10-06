import { InputType, Field, Int } from '@nestjs/graphql';
import { IsNotEmpty, Min } from 'class-validator';

@InputType()
export class CreateArmorInput {
  @Field()
  @IsNotEmpty()
  name: string;

  @Field(() => Int)
  @Min(1)
  defense: number;

  @Field({ nullable: true })
  type?: string;
}
