// src/modules/armor/dto/create-armor.input.ts
import { InputType, Field, Int, Float, registerEnumType } from '@nestjs/graphql';
import { IsNotEmpty, Min, IsOptional } from 'class-validator';
import { ArmorRarity, ArmorType } from '../enums/armorEnum';
import { ArmorSlot } from '../enums/armorEnum';


@InputType()
export class CreateArmorInput {
  @Field()
  @IsNotEmpty()
  name: string;

  @Field(() => ArmorType)
  @IsNotEmpty()
  type: ArmorType;

  @Field(() => ArmorSlot)
  @IsNotEmpty()
  slot: ArmorSlot;

  @Field(() => Int)
  @Min(1)
  defense: number;

  @Field(() => Float, { nullable: true })
  @IsOptional()
  weight: number;

  @Field(() => Int)
  @Min(0)
  value: number;

  @Field(() => ArmorRarity, { nullable: true })
  rarity: ArmorRarity;

}
