import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Armor {
  @Field()
  id: string;

  @Field()
  name: string;

  @Field(() => Int)
  defense: number;

  @Field({ nullable: true })
  type?: string; // leve, médio, pesado

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;
}
