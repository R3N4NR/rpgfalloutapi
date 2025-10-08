import {
  Injectable,
  BadRequestException,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { Prisma} from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';
import { QuestCreateInput } from './dto/create-quest.input';
import { UpdateQuestInput } from './dto/update-quest.input';
import { QuestStatus } from './enums/questEnum';
import { Quest } from './entities/quest.entity';

@Injectable()
export class QuestService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: QuestCreateInput): Promise<Quest> {
    if (!data.title?.trim()) throw new BadRequestException('Quest title is required');
    if (!data.description?.trim()) throw new BadRequestException('Quest description is required');

    try {
      return await this.prisma.quest.create({ data });
    } catch (error) {
      throw new InternalServerErrorException('Error creating quest');
    }
  }

  async findAll(): Promise<Quest[]> {
    return this.prisma.quest.findMany({
      include: {  character: true, location: true},
    });
  }

  async findOne(id: string): Promise<Quest> {
    const quest = await this.prisma.quest.findUnique({
      where: { id },
      include: { character: true, location: true },
    });

    if (!quest) throw new NotFoundException(`Quest with ID ${id} not found`);
    return quest;
  }

  async update(id: string, data: UpdateQuestInput): Promise<Quest> {
    try {
      return await this.prisma.quest.update({ where: { id }, data });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025')
        throw new NotFoundException(`Quest with ID ${id} not found`);
      throw new InternalServerErrorException('Error updating quest');
    }
  }

  async remove(id: string): Promise<Quest> {
    try {
      return await this.prisma.quest.delete({ where: { id } });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025')
        throw new NotFoundException(`Quest with ID ${id} not found`);
      throw new InternalServerErrorException('Error deleting quest');
    }
  }


  async findByCharacter(characterId: string): Promise<Quest[]> {
    return this.prisma.quest.findMany({ where: { characterId } });
  }


  async findByStatus(status: QuestStatus): Promise<Quest[]> {
    return this.prisma.quest.findMany({ where: { status } });
  }
}
