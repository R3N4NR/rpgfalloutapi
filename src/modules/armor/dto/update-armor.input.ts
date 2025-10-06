import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import { CreateArmorInput } from './create-armor.input';

@InputType()
export class UpdateArmorInput extends PartialType(CreateArmorInput) {
  @Field()
  id: string;
}
