import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Weapon {
  @Field()
  id: string;

  @Field()
  name: string;

  @Field(() => Int)
  damage: number;

  @Field({ nullable: true })
  type?: string;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;
}
