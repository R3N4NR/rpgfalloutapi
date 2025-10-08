import {
  Injectable,
  BadRequestException,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { Prisma, Quest } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';
import { QuestCreateInput } from './dto/create-quest.input';
import { UpdateQuestInput } from './dto/update-quest.input';

@Injectable()
export class QuestService {
  constructor(private readonly prisma: PrismaService) {}

  /** Criar nova quest */
  async create(data: QuestCreateInput): Promise<Quest> {
    if (!data.title?.trim()) {
      throw new BadRequestException('Quest title is required');
    }
    if (!data.description?.trim()) {
      throw new BadRequestException('Quest description is required');
    }

    try {
      return await this.prisma.quest.create({ data });
    } catch (error) {
      throw new InternalServerErrorException('Error creating quest');
    }
  }

  /** Buscar todas as quests */
  async findAll(): Promise<Quest[]> {
    return this.prisma.quest.findMany({
      include: { assignedTo: true },
    });
  }

  /** Buscar uma quest pelo ID */
  async findOne(id: string): Promise<Quest> {
    const quest = await this.prisma.quest.findUnique({
      where: { id },
      include: { assignedTo: true },
    });

    if (!quest) {
      throw new NotFoundException(`Quest with ID ${id} not found`);
    }

    return quest;
  }

  /** Atualizar quest */
  async update(id: string, data: UpdateQuestInput): Promise<Quest> {
    try {
      return await this.prisma.quest.update({
        where: { id },
        data,
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
        throw new NotFoundException(`Quest with ID ${id} not found`);
      }
      throw new InternalServerErrorException('Error updating quest');
    }
  }

  /** Remover quest */
  async remove(id: string): Promise<Quest> {
    try {
      return await this.prisma.quest.delete({ where: { id } });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
        throw new NotFoundException(`Quest with ID ${id} not found`);
      }
      throw new InternalServerErrorException('Error deleting quest');
    }
  }
}
