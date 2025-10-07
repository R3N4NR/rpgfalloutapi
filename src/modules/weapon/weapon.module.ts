import { Module } from '@nestjs/common';
import { WeaponResolver } from './weapon.resolver';
import { WeaponService } from './weapon.service';

@Module({
  providers: [WeaponResolver, WeaponService]
})
export class WeaponModule {}
