import { ObjectType, Field, Int } from '@nestjs/graphql';
import { CharacterArmor } from 'src/modules/armor/entities/character-armor.entity';
import { InventoryItem } from 'src/modules/inventory/entities/inventoryitem.entity';
import { Perk } from 'src/modules/perk/entities/perk.entity';
import { CharacterWeapon } from './character-weapon.entity';

@ObjectType()
export class Character {
  @Field()
  id: string;

  @Field()
  name: string;

  @Field(() => Int)
  level: number;

  @Field(() => Int)
  strength: number;

  @Field(() => Int)
  perception: number;

  @Field(() => Int)
  endurance: number;

  @Field(() => Int)
  charisma: number;

  @Field(() => Int)
  intelligence: number;

  @Field(() => Int)
  agility: number;

  @Field(() => Int)
  luck: number;

  @Field(() => Int)
  hitPoints: number;

  @Field(() => [CharacterWeapon])
  weapons: CharacterWeapon[];


  @Field(() => [CharacterArmor], { nullable: true })
  armors?: CharacterArmor[];

  @Field(() => [Perk], { nullable: true })
  perks?: Perk[];

  @Field(() => [InventoryItem], { nullable: true })
  inventory?: InventoryItem[];

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;

  @Field({ nullable: true })
  userId?: string;
}
