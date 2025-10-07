import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateInventoryItemInput } from './dto/create-inventoryitem.input';
import { UpdateInventoryItemInput } from './dto/update-inventoryitem.input';

@Injectable()
export class InventoryService {
  constructor(private readonly prisma: PrismaService) {}

  create(data: CreateInventoryItemInput) {
    return this.prisma.inventoryItem.create({
      data: {
        characterId: data.characterId,
        itemId: data.itemId,
        quantity: data.quantity ?? 1,
      },
      include: { character: true, item: true },
    });
  }

  findAll() {
    return this.prisma.inventoryItem.findMany({
      include: { character: true, item: true },
    });
  }

  findByCharacter(characterId: string) {
    return this.prisma.inventoryItem.findMany({
      where: { characterId },
      include: { item: true },
    });
  }

  update(id: string, data: UpdateInventoryItemInput) {
    return this.prisma.inventoryItem.update({
      where: { id },
      data: { quantity: data.quantity },
      include: { character: true, item: true },
    });
  }

  remove(id: string) {
    return this.prisma.inventoryItem.delete({
      where: { id },
      include: { character: true, item: true },
    });
  }
}
