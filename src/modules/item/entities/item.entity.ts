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
  type?: string; // exemplo: consumível, chave, crafting

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;
}
