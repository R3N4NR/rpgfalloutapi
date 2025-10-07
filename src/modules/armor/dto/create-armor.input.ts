import { InputType, Field, Int, Float } from '@nestjs/graphql';
import { IsNotEmpty, Min, IsOptional } from 'class-validator';
import { ArmorType } from '../enums/armorEnum';

@InputType()
export class CreateArmorInput {
  @Field()
  @IsNotEmpty()
  name: string;

  @Field(() => String)
  @IsNotEmpty()
  type: ArmorType;

  @Field(() => Int)
  @Min(1)
  defense: number;

  @Field(() => Float, { nullable: true })
  @IsOptional()
  weight?: number;

  @Field(() => Int)
  @Min(0)
  value: number;

  @Field({ nullable: true })
  @IsOptional()
  rarity?: string;
}
