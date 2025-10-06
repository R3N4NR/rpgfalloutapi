import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';
import { ItemType } from '../enums/itemEnum';

@InputType()
export class CreateItemInput {
    @Field()
    @IsNotEmpty()
    name: string;

    @Field({ nullable: true })
    description?: string;

    @Field({ nullable: true })
    value?: number;

    @Field({ nullable: true })
    weight?: number;

    @Field(() => ItemType)
    type: ItemType;

    @Field(() => String, { nullable: true })
    effects?: string;
}
