import {
  Resolver,
  Query,
  Mutation,
  Args,
} from '@nestjs/graphql';
import {
  BadRequestException,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { QuestService } from './quest.service';
import { Quest } from './entities/quest.entity';
import { QuestCreateInput } from './dto/create-quest.input';
import { UpdateQuestInput } from './dto/update-quest.input';
import { QuestStatus } from './enums/questEnum';

@Resolver(() => Quest)
export class QuestResolver {
  constructor(private readonly questService: QuestService) { }

  /** 🧩 Criar Quest */
  @Mutation(() => Quest)
  async createQuest(@Args('data') data: QuestCreateInput): Promise<Quest> {
    try {
      const quest = await this.questService.create(data);
      return quest as Quest;
    } catch (error) {
      if (error instanceof BadRequestException) throw error;
      throw new InternalServerErrorException(`Error creating quest: ${error.message}`);
    }
  }

  /** 📋 Buscar todas as Quests */
  @Query(() => [Quest], { name: 'quests' })
  async findAll(): Promise<Quest[]> {
    try {
      return await this.questService.findAll();
    } catch (error) {
      throw new InternalServerErrorException(`Error fetching quests: ${error.message}`);
    }
  }

  /** 🔍 Buscar Quest por ID */
  @Query(() => Quest, { name: 'quest' })
  async findOne(@Args('id') id: string): Promise<Quest> {
    try {
      const quest = await this.questService.findOne(id);
      return quest;
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException(`Error fetching quest ${id}: ${error.message}`);
    }
  }

  /** 🎮 Buscar Quests de um personagem */
  @Query(() => [Quest], { name: 'questsByCharacter' })
  async findByCharacter(
    @Args('characterId') characterId: string,
  ): Promise<Quest[]> {
    if (!characterId) throw new BadRequestException('Character ID is required');

    try {
      return await this.questService.findByCharacter(characterId);
    } catch (error) {
      throw new InternalServerErrorException(`Error fetching character quests: ${error.message}`);
    }
  }

  /** 🧭 Buscar Quests por status */
  @Query(() => [Quest], { name: 'questsByStatus' })
  async findByStatus(
    @Args('status', { type: () => QuestStatus }) status: QuestStatus,
  ): Promise<Quest[]> {
    try {
      return await this.questService.findByStatus(status);
    } catch (error) {
      throw new InternalServerErrorException(`Error fetching quests by status: ${error.message}`);
    }
  }

  /** 🛠️ Atualizar Quest */
  @Mutation(() => Quest)
  async updateQuest(@Args('data') data: UpdateQuestInput): Promise<Quest> {
    try {
      return await this.questService.update(data.id, data);
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException(`Error updating quest ${data.id}: ${error.message}`);
    }
  }

  /** ❌ Deletar Quest */
  @Mutation(() => Quest)
  async removeQuest(@Args('id') id: string): Promise<Quest> {
    try {
      return await this.questService.remove(id);
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException(`Error deleting quest ${id}: ${error.message}`);
    }
  }
}
