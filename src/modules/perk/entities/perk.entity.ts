import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class Perk {
  @Field()
  id: string;

  @Field()
  name: string;

  @Field()
  description: string;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;
}
