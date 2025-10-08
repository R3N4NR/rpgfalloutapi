import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';
import { ArmorSlot } from 'src/modules/armor/enums/armorEnum';

@InputType()
export class EquipArmorInput {
  @Field()
  @IsNotEmpty()
  characterId: string;

  @Field()
  @IsNotEmpty()
  armorId: string;

  @Field(() => ArmorSlot)
  @IsNotEmpty()
  slot: ArmorSlot;
}
