import {
  Injectable,
  BadRequestException,
  ConflictException,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { Prisma, Perk } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';
import { CreatePerkInput } from './dto/create-perk.input';
import { UpdatePerkInput } from './dto/update-perk.input';

@Injectable()
export class PerkService {
  constructor(private readonly prisma: PrismaService) {}

  /** Criar perk */
  async create(data: CreatePerkInput): Promise<Perk> {
    if (!data.name?.trim()) throw new BadRequestException('Perk name is required');
    if (!data.description?.trim())
      throw new BadRequestException('Perk description is required');

    try {
      return await this.prisma.perk.create({ data });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
        throw new ConflictException('Perk name already exists');
      }
      throw new InternalServerErrorException('Error creating perk');
    }
  }

  /** Buscar todos os perks */
  async findAll(): Promise<Perk[]> {
    return this.prisma.perk.findMany();
  }

  /** Buscar perk pelo ID */
  async findOne(id: string): Promise<Perk> {
    const perk = await this.prisma.perk.findUnique({ where: { id } });
    if (!perk) throw new NotFoundException(`Perk with ID ${id} not found`);
    return perk;
  }

  /** Atualizar perk */
  async update(id: string, data: UpdatePerkInput): Promise<Perk> {
    if (data.name && !data.name.trim()) throw new BadRequestException('Perk name cannot be empty');
    if (data.description && !data.description.trim())
      throw new BadRequestException('Perk description cannot be empty');

    try {
      return await this.prisma.perk.update({ where: { id }, data });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') throw new NotFoundException(`Perk with ID ${id} not found`);
        if (error.code === 'P2002') throw new ConflictException('Perk name already exists');
      }
      throw new InternalServerErrorException('Error updating perk');
    }
  }

  /** Remover perk */
  async remove(id: string): Promise<Perk> {
    try {
      return await this.prisma.perk.delete({ where: { id } });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
        throw new NotFoundException(`Perk with ID ${id} not found`);
      }
      throw new InternalServerErrorException('Error deleting perk');
    }
  }
}
