import {
  Injectable,
  BadRequestException,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { Prisma, InventoryItem } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateInventoryItemInput } from './dto/create-inventoryitem.input';
import { UpdateInventoryItemInput } from './dto/update-inventoryitem.input';

@Injectable()
export class InventoryService {
  constructor(private readonly prisma: PrismaService) {}

  /** Criar item no inventário */
  async create(data: CreateInventoryItemInput): Promise<InventoryItem> {
    if (!data.characterId?.trim()) throw new BadRequestException('characterId is required');
    if (!data.itemId?.trim()) throw new BadRequestException('itemId is required');
    if (data.quantity != null && data.quantity <= 0)
      throw new BadRequestException('Quantity must be greater than 0');

    try {
      return await this.prisma.inventoryItem.create({ data });
    } catch (error) {
      throw new InternalServerErrorException('Error adding item to inventory');
    }
  }

  /** Buscar todos os itens do inventário */
  async findAll(): Promise<InventoryItem[]> {
    return this.prisma.inventoryItem.findMany({
      include: { character: true, item: true },
    });
  }

  /** Buscar item do inventário pelo ID */
  async findOne(id: string): Promise<InventoryItem> {
    const inventoryItem = await this.prisma.inventoryItem.findUnique({
      where: { id },
      include: { character: true, item: true },
    });
    if (!inventoryItem) throw new NotFoundException(`Inventory item with ID ${id} not found`);
    return inventoryItem;
  }

  /** Atualizar item do inventário */
  async update(id: string, data: UpdateInventoryItemInput): Promise<InventoryItem> {
    if (data.quantity != null && data.quantity <= 0)
      throw new BadRequestException('Quantity must be greater than 0');

    try {
      return await this.prisma.inventoryItem.update({ where: { id }, data });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
        throw new NotFoundException(`Inventory item with ID ${id} not found`);
      }
      throw new InternalServerErrorException('Error updating inventory item');
    }
  }

  /** Remover item do inventário */
  async remove(id: string): Promise<InventoryItem> {
    try {
      return await this.prisma.inventoryItem.delete({ where: { id } });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
        throw new NotFoundException(`Inventory item with ID ${id} not found`);
      }
      throw new InternalServerErrorException('Error removing inventory item');
    }
  }
}
