import { InputType, Field, Int } from '@nestjs/graphql';
import { IsNotEmpty, IsOptional, Min } from 'class-validator';
import GraphQLJSON from 'graphql-type-json';

@InputType()
export class CreatePerkInput {
  @Field()
  @IsNotEmpty()
  name: string;

  @Field()
  @IsNotEmpty()
  description: string;

  @Field(() => Int, { nullable: true })
  @IsOptional()
  @Min(1)
  requiredLevel?: number;

  @Field(() => GraphQLJSON, { nullable: true })
  @IsOptional()
  effects?: any;
}
