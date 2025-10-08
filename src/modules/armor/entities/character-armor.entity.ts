import { ObjectType, Field } from '@nestjs/graphql';
import { Armor } from './armor.entity';
import { ArmorSlot } from '../enums/armorEnum';

@ObjectType()
export class CharacterArmor {
  @Field()
  id: string;

  @Field()
  characterId: string;

  @Field()
  armorId: string;

  @Field(() => ArmorSlot)
  slot: ArmorSlot;

  @Field()
  equipped: boolean;

  @Field(() => Armor)
  armor: Armor;
}
