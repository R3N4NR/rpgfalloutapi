import { registerEnumType } from '@nestjs/graphql';

export enum ItemType {
  Consumable = 'Consumable',
  Aid = 'Aid',
  Ammo = 'Ammo',
  Material = 'Material',
  Quest = 'Quest',
}

registerEnumType(ItemType, {
  name: 'ItemType',
});
