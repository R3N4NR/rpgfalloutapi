import { InputType, Field, Int } from '@nestjs/graphql';
import { IsNotEmpty, Min } from 'class-validator';

@InputType()
export class CreateWeaponInput {
  @Field()
  @IsNotEmpty()
  name: string;

  @Field(() => Int)
  @Min(1)
  damage: number;

  @Field({ nullable: true })
  type?: string; 
}
