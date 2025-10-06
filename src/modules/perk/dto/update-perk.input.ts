import { InputType, Field, PartialType } from '@nestjs/graphql';
import { CreatePerkInput } from './create-perk.input';

@InputType()
export class UpdatePerkInput extends PartialType(CreatePerkInput) {
    @Field()
    id: string;
}
