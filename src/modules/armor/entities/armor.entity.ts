// src/modules/armor/entities/armor.entity.ts
import { ObjectType, Field, Int, Float } from '@nestjs/graphql';
import { ArmorRarity, ArmorType } from '../enums/armorEnum';
import { ArmorSlot } from '../enums/armorEnum';


@ObjectType()
export class Armor {
  @Field()
  id: string;

  @Field()
  name: string;

  @Field(() => ArmorType)
  type: ArmorType;

  @Field(() => Int)
  defense: number;

  @Field(() => Float, { nullable: true })
  weight: number;

  @Field(() => Int)
  value: number;

  @Field(() => ArmorRarity)
  rarity: ArmorRarity;


  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;

  @Field(() => ArmorSlot)
  slot: ArmorSlot;
}
