import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import { CreateWeaponInput } from './create-weapon.input';

@InputType()
export class UpdateWeaponInput extends PartialType(CreateWeaponInput) {
  @Field()
  id: string;
}
