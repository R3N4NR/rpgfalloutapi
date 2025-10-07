import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreatePerkInput } from './dto/create-perk.input';
import { UpdatePerkInput } from './dto/update-perk.input';

@Injectable()
export class PerkService {
  constructor(private readonly prisma: PrismaService) {}

  create(data: CreatePerkInput) {
    return this.prisma.perk.create({ data });
  }

  findAll() {
    return this.prisma.perk.findMany();
  }

  findOne(id: string) {
    return this.prisma.perk.findUnique({ where: { id } });
  }

  update(id: string, data: UpdatePerkInput) {
    return this.prisma.perk.update({
      where: { id },
      data,
    });
  }

  remove(id: string) {
    return this.prisma.perk.delete({ where: { id } });
  }
}
