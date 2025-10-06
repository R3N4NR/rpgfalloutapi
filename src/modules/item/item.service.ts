import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateItemInput } from './dto/create-item.input';
import { UpdateItemInput } from './dto/update-item.input';

@Injectable()
export class ItemService {
  constructor(private readonly prisma: PrismaService) {}

  create(data: CreateItemInput) {
    return this.prisma.item.create({ data });
  }

  findAll() {
    return this.prisma.item.findMany();
  }

  findOne(id: string) {
    return this.prisma.item.findUnique({ where: { id } });
  }

  update(id: string, data: UpdateItemInput) {
    return this.prisma.item.update({ where: { id }, data });
  }

  remove(id: string) {
    return this.prisma.item.delete({ where: { id } });
  }
}
