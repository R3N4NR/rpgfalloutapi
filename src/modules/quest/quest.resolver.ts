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
import { CharacterQuest } from '../character/entities/character-quest.entity';

@Resolver(() => Quest)
export class QuestResolver {
  constructor(private readonly questService: QuestService) {}

  @Mutation(() => Quest)
  createQuest(@Args('data') data: QuestCreateInput) {
    return this.questService.create(data);
  }

  @Query(() => [Quest])
  quests() {
    return this.questService.findAll();
  }

  @Query(() => Quest)
  quest(@Args('id') id: string) {
    return this.questService.findOne(id);
  }

  @Mutation(() => CharacterQuest)
  acceptQuest(@Args('characterId') characterId: string, @Args('questId') questId: string) {
    return this.questService.acceptQuest(characterId, questId);
  }

  @Mutation(() => CharacterQuest)
  completeQuest(@Args('characterId') characterId: string, @Args('questId') questId: string) {
    return this.questService.completeQuest(characterId, questId);
  }

  @Mutation(() => CharacterQuest)
  failQuest(@Args('characterId') characterId: string, @Args('questId') questId: string) {
    return this.questService.failQuest(characterId, questId);
  }

  @Query(() => [CharacterQuest])
  questsByCharacter(@Args('characterId') characterId: string) {
    return this.questService.questsByCharacter(characterId);
  }

  @Query(() => [CharacterQuest])
  questsByStatus(@Args('status', { type: () => QuestStatus }) status: QuestStatus) {
    return this.questService.questsByStatus(status);
  }
}

