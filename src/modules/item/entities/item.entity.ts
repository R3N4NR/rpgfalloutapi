import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class Item {
  @Field()
  id: string;

  @Field()
  name: string;

  @Field({ nullable: true })
  description?: string;

  @Field({ nullable: true })
  type?: string;

  @Field(() => String, { nullable: true })
  effects?: string;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;
}
