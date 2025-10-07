import { Field, ObjectType } from "@nestjs/graphql";
import { Weapon } from "src/modules/weapon/entities/weapon.entity";

@ObjectType()
export class CharacterWeapon {
  @Field()
  id: string;

  @Field(() => Weapon)
  weapon: Weapon;

  @Field()
  equipped: boolean;
}