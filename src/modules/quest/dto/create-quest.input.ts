import { InputType, Field, Int } from '@nestjs/graphql';
import { IsNotEmpty, IsOptional, Min } from 'class-validator';
import { QuestStatus } from '../enums/questEnum';

@InputType()
export class QuestCreateInput {
    @Field()
    @IsNotEmpty()
    title: string;

    @Field()
    @IsNotEmpty()
    description: string;

    @Field(() => QuestStatus, { nullable: true })
    @IsOptional()
    status?: QuestStatus;

    @Field(() => Int)
    @Min(0)
    rewardCaps: number;

    @Field(() => Int)
    @Min(0)
    experience: number;

}
