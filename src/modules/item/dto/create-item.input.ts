import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class CreateItemInput {
    @Field()
    @IsNotEmpty()
    name: string;

    @Field({ nullable: true })
    description?: string;

    @Field({ nullable: true })
    type?: string;
}
