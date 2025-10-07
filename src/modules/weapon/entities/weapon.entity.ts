
import { ObjectType, Field, Int, Float } from '@nestjs/graphql';

@ObjectType()
export class Weapon {
  @Field()
  id: string;

  @Field()
  name: string;

  @Field(() => String)
  type: string;

  @Field(() => Int)
  damage: number;

  @Field(() => Int, { nullable: true })
  range?: number;

  @Field(() => Float, { nullable: true })
  weight?: number;

  @Field(() => Int)
  value: number;

  @Field({ nullable: true })
  ammoType?: string;

  @Field({ nullable: true })
  rarity?: string;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;
}
