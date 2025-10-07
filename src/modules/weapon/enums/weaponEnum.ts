import { registerEnumType } from '@nestjs/graphql';

export enum WeaponType {
  Melee = 'Melee',
  Pistol = 'Pistol',
  Rifle = 'Rifle',
  Energy = 'Energy',
  Heavy = 'Heavy',
  Explosive = 'Explosive',
}

registerEnumType(WeaponType, {
  name: 'WeaponType',
});
