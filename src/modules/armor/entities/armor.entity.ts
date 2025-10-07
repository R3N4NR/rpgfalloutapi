// src/modules/armor/entities/armor.entity.ts
import { ObjectType, Field, Int, Float } from '@nestjs/graphql';
import { ArmorSlot as PrismaArmorSlot } from '@prisma/client';

@ObjectType()
export class Armor {
  @Field()
  id: string;

  @Field()
  name: string;

  @Field(() => String)
  type: string;

  @Field(() => Int)
  defense: number;

  @Field(() => Float, { nullable: true })
  weight?: number;

  @Field(() => Int)
  value: number;

  @Field({ nullable: true })
  rarity?: string;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;

  @Field(() => PrismaArmorSlot)
  slot: PrismaArmorSlot; 
}
