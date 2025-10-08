import {
  Injectable,
  BadRequestException,
  ConflictException,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { Prisma, Item } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateItemInput } from './dto/create-item.input';
import { UpdateItemInput } from './dto/update-item.input';

@Injectable()
export class ItemService {
  constructor(private readonly prisma: PrismaService) {}

  /** Criar novo item */
  async create(data: CreateItemInput): Promise<Item> {
    if (!data.name?.trim()) throw new BadRequestException('Item name is required');
    if (!data.type) throw new BadRequestException('Item type is required');
    if (data.value != null && data.value < 0)
      throw new BadRequestException('Item value cannot be negative');

    try {
      return await this.prisma.item.create({ data });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
        throw new ConflictException('Item name already exists');
      }
      throw new InternalServerErrorException('Error creating item');
    }
  }

  /** Buscar todos os itens */
  async findAll(): Promise<Item[]> {
    return this.prisma.item.findMany();
  }

  /** Buscar item pelo ID */
  async findOne(id: string): Promise<Item> {
    const item = await this.prisma.item.findUnique({ where: { id } });
    if (!item) throw new NotFoundException(`Item with ID ${id} not found`);
    return item;
  }

  /** Atualizar item */
  async update(id: string, data: UpdateItemInput): Promise<Item> {
    if (data.name && !data.name.trim()) throw new BadRequestException('Item name cannot be empty');
    if (data.value != null && data.value < 0)
      throw new BadRequestException('Item value cannot be negative');

    try {
      return await this.prisma.item.update({ where: { id }, data });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') throw new NotFoundException(`Item with ID ${id} not found`);
        if (error.code === 'P2002') throw new ConflictException('Item name already exists');
      }
      throw new InternalServerErrorException('Error updating item');
    }
  }

  /** Remover item */
  async remove(id: string): Promise<Item> {
    try {
      return await this.prisma.item.delete({ where: { id } });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
        throw new NotFoundException(`Item with ID ${id} not found`);
      }
      throw new InternalServerErrorException('Error deleting item');
    }
  }
}
