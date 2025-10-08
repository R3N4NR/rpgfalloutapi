import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { QuestStatus } from "./enums/questEnum";
import { UpdateQuestInput } from "./dto/update-quest.input";
import { QuestCreateInput } from "./dto/create-quest.input";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class QuestService {
  constructor(private readonly prisma: PrismaService) {}

  // Criar quest
  async create(data: QuestCreateInput) {
    return this.prisma.quest.create({ data });
  }

  async findAll() {
    return this.prisma.quest.findMany({ include: { characters: true } });
  }

  async findOne(id: string) {
    const quest = await this.prisma.quest.findUnique({
      where: { id },
      include: { characters: true },
    });
    if (!quest) throw new NotFoundException('Quest not found');
    return quest;
  }

  async update(id: string, data: UpdateQuestInput) {
    return this.prisma.quest.update({ where: { id }, data });
  }

  async remove(id: string) {
    return this.prisma.quest.delete({ where: { id } });
  }

  // 🎮 Métodos de sistema de quest para personagens
  async acceptQuest(characterId: string, questId: string) {
    // Verifica se já existe
    const existing = await this.prisma.characterQuest.findUnique({
      where: { characterId_questId: { characterId, questId } },
    });
    if (existing) throw new BadRequestException('Quest already accepted');

    return this.prisma.characterQuest.create({
      data: {
        characterId,
        questId,
        status: 'InProgress',
        acceptedAt: new Date(),
      },
    });
  }

  async completeQuest(characterId: string, questId: string) {
    return this.prisma.characterQuest.update({
      where: { characterId_questId: { characterId, questId } },
      data: { status: 'Completed', completedAt: new Date() },
    });
  }

  async failQuest(characterId: string, questId: string) {
    return this.prisma.characterQuest.update({
      where: { characterId_questId: { characterId, questId } },
      data: { status: 'Failed', completedAt: new Date() },
    });
  }

  async questsByCharacter(characterId: string) {
    return this.prisma.characterQuest.findMany({
      where: { characterId },
      include: { quest: true },
    });
  }

  async questsByStatus(status: QuestStatus) {
    return this.prisma.characterQuest.findMany({
      where: { status },
      include: { quest: true, character: true },
    });
  }
}
