import { InputType, Field, Int, Float } from '@nestjs/graphql';
import { IsNotEmpty, Min, IsOptional } from 'class-validator';
import { WeaponType } from '../enums/weaponEnum';

@InputType()
export class CreateWeaponInput {
  @Field()
  @IsNotEmpty()
  name: string;

  @Field(() => String)
  @IsNotEmpty()
  type: WeaponType;

  @Field(() => Int)
  @Min(1)
  damage: number;

  @Field(() => Int, { nullable: true })
  @IsOptional()
  range?: number;

  @Field(() => Float, { nullable: true })
  @IsOptional()
  weight?: number;

  @Field(() => Int)
  @Min(0)
  value: number;

  @Field({ nullable: true })
  @IsOptional()
  ammoType?: string;

  @Field({ nullable: true })
  @IsOptional()
  rarity?: string;
}
