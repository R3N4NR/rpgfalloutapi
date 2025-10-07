import { Module } from '@nestjs/common';
import { WeaponResolver } from './weapon.resolver';
import { WeaponService } from './weapon.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  providers: [WeaponResolver, WeaponService, PrismaService]
})
export class WeaponModule {}
