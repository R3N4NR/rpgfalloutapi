import { ObjectType, Field, Int } from '@nestjs/graphql';

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
  hitPoints: number;
}
