import { InputType, Field, PartialType } from '@nestjs/graphql';
import { CreateQuestInput } from './create-quest.input';
import { QuestStatus } from '../enums/questEnum';

@InputType()
export class UpdateQuestInput extends PartialType(CreateQuestInput) {
    @Field()
    id: string;

    @Field(() => QuestStatus, { nullable: true })
    status?: QuestStatus;
}
