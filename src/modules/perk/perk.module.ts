import { Module } from '@nestjs/common';
import { PerkResolver } from './perk.resolver';
import { PerkService } from './perk.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  providers: [PerkResolver, PerkService, PrismaService]
})
export class PerkModule { }
