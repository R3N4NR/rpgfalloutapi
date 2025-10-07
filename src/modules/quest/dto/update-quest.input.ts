import { InputType, Field, PartialType } from '@nestjs/graphql';
import { QuestCreateInput } from './create-quest.input';
import { QuestStatus } from '../enums/questEnum';

@InputType()
export class UpdateQuestInput extends PartialType(QuestCreateInput) {
    @Field()
    id: string;

    @Field(() => QuestStatus, { nullable: true })
    status?: QuestStatus;
}
