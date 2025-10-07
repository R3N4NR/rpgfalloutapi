// src/modules/armor/dto/create-armor.input.ts
import { InputType, Field, Int, Float, registerEnumType } from '@nestjs/graphql';
import { IsNotEmpty, Min, IsOptional } from 'class-validator';
import { ArmorType } from '../enums/armorEnum'
import { ArmorSlot as PrismaArmorSlot } from '@prisma/client';

// registra o enum do Prisma para o GraphQL
registerEnumType(PrismaArmorSlot, { name: 'ArmorSlot' });

@InputType()
export class CreateArmorInput {
  @Field()
  @IsNotEmpty()
  name: string;

  @Field(() => ArmorType)
  @IsNotEmpty()
  type: ArmorType;

  @Field(() => PrismaArmorSlot)
  @IsNotEmpty()
  slot: PrismaArmorSlot;

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
