import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import { CreateInventoryItemInput } from './create-inventoryitem.input';
import { IsOptional, Min } from 'class-validator';

@InputType()
export class UpdateInventoryItemInput extends PartialType(CreateInventoryItemInput) {
  @Field({ nullable: true })
  @IsOptional()
  id: string;

  @Field(() => Int, { nullable: true })
  @IsOptional()
  @Min(1)
  quantity?: number;
}
