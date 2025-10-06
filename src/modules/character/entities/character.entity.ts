import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Armor } from 'src/modules/armor/entities/armor.entity';
import { Item } from 'src/modules/item/entities/item.entity';
import { Perk } from 'src/modules/perk/entities/perk.entity';
import { Weapon } from 'src/modules/weapon/entities/weapon.entity';

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

  @Field(() => [Weapon], { nullable: true })
  weapons?: Weapon[];

  @Field(() => [Armor], { nullable: true })
  armors?: Armor[];

  @Field(() => [Perk], { nullable: true })
  perks?: Perk[];

  @Field(() => [Item], { nullable: true })
  inventory?: Item[];

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;

  @Field({ nullable: true })
  userId?: string;
}
