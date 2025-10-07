import { registerEnumType } from "@nestjs/graphql";

export enum ArmorType {
    Light = 'Light',
    Medium = 'Medium',
    Heavy = 'Heavy',
    PowerArmor = 'PowerArmor',
}

registerEnumType(ArmorType, { name: 'ArmorType' });