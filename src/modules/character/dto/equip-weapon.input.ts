import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class EquipWeaponInput {
  @Field()
  @IsNotEmpty()
  characterId: string;

  @Field()
  @IsNotEmpty()
  weaponId: string;
}
