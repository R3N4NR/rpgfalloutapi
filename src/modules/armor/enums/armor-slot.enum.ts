import { registerEnumType } from '@nestjs/graphql';

export enum ArmorSlot {
  Head = 'Head',
  Chest = 'Chest',
  Legs = 'Legs',
  Arms = 'Arms',
  Shoulders = 'Shoulders',
  Hands = 'Hands',
  Feet = 'Feet',
}

registerEnumType(ArmorSlot, { name: 'ArmorSlot' });