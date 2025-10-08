import { registerEnumType } from "@nestjs/graphql";
import { ArmorRarity as PrismaArmorRarity, ArmorType as PrismaArmorType, ArmorSlot as PrismaArmorSlot } from '@prisma/client';

// Reexportando os enums para uso no projeto
export { PrismaArmorRarity as ArmorRarity };
export { PrismaArmorType as ArmorType };
export { PrismaArmorSlot as ArmorSlot };

// Registrando enums para GraphQL
registerEnumType(PrismaArmorRarity, {
  name: 'ArmorRarity',
  description: 'Raridade da armadura',
});

registerEnumType(PrismaArmorType, {
  name: 'ArmorType',
  description: 'Tipo da armadura',
});

registerEnumType(PrismaArmorSlot, {
  name: 'ArmorSlot',
  description: 'Slot da armadura',
});
