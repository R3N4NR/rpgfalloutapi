import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class EquipArmorInput {
  @Field()
  @IsNotEmpty()
  characterId: string;

  @Field()
  @IsNotEmpty()
  armorId: string;

  @Field()
  @IsNotEmpty()
  slot: string;
}
