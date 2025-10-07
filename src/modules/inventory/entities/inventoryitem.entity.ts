import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Item } from 'src/modules/item/entities/item.entity';

@ObjectType()
export class InventoryItem {
  @Field()
  id: string;

  @Field()
  characterId: string;

  @Field()
  itemId: string;

  @Field(() => Int)
  quantity: number;

  @Field(() => Item, { nullable: true })
  item?: Item;
}
