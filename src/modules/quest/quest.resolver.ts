import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { QuestService } from './quest.service';

import { QuestCreateInput } from './dto/create-quest.input';
import { UpdateQuestInput } from './dto/update-quest.input';
import { UserInputError } from 'apollo-server-express';
import { Quest } from './entities/entity';

@Resolver(() => Quest)
export class QuestResolver {
  constructor(private readonly questService: QuestService) {}

  /** Criar nova quest */
  @Mutation(() => Quest)
  async createQuest(@Args('data') data: QuestCreateInput) {
    if (!data.title?.trim()) {
      throw new UserInputError('Quest title cannot be empty');
    }
    if (!data.description?.trim()) {
      throw new UserInputError('Quest description cannot be empty');
    }

    return this.questService.create(data);
  }

  /** Buscar todas as quests */
  @Query(() => [Quest], { name: 'quests' })
  findAll() {
    return this.questService.findAll();
  }

  /** Buscar uma quest pelo ID */
  @Query(() => Quest, { name: 'quest' })
  async findOne(@Args('id') id: string) {
    if (!id.match(/^[a-f0-9-]+$/i)) {
      throw new UserInputError('Invalid quest ID format');
    }
    return this.questService.findOne(id);
  }

  /** Atualizar quest */
  @Mutation(() => Quest)
  async updateQuest(@Args('id') id: string, @Args('data') data: UpdateQuestInput) {
    if (data.title && !data.title.trim()) {
      throw new UserInputError('Quest title cannot be empty');
    }
    if (data.description && !data.description.trim()) {
      throw new UserInputError('Quest description cannot be empty');
    }
    return this.questService.update(id, data);
  }

  /** Remover quest */
  @Mutation(() => Quest)
  async removeQuest(@Args('id') id: string) {
    if (!id.match(/^[a-f0-9-]+$/i)) {
      throw new UserInputError('Invalid quest ID format');
    }
    return this.questService.remove(id);
  }
}
