import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { QuestService } from './quest.service';

import { UpdateQuestInput } from './dto/update-quest.input';
import { Quest } from './entities/entity';
import { QuestCreateInput } from './dto/create-quest.input';

@Resolver(() => Quest)
export class QuestResolver {
    constructor(private readonly questService: QuestService) { }

    @Mutation(() => Quest)
    createQuest(@Args('data') data: QuestCreateInput) {
        return this.questService.create(data);
    }

    @Query(() => [Quest], { name: 'quests' })
    findAll() {
        return this.questService.findAll();
    }

    @Query(() => Quest, { name: 'quest' })
    findOne(@Args('id') id: string) {
        return this.questService.findOne(id);
    }

    @Mutation(() => Quest)
    updateQuest(@Args('id') id: string, @Args('data') data: UpdateQuestInput) {
        return this.questService.update(id, data);
    }

    @Mutation(() => Quest)
    removeQuest(@Args('id') id: string) {
        return this.questService.remove(id);
    }
}
