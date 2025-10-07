import { Module } from '@nestjs/common';
import { ArmorService } from './armor.service';
import { ArmorResolver } from './armor.resolver';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  providers: [ArmorService, ArmorResolver, PrismaService]
})
export class ArmorModule {}
