import { Field, InputType } from '@nestjs/graphql';
import { CreateCompanyInput } from './create-company.input';
import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsNumber } from 'class-validator';

@InputType()
export class UpdateCompanyInput extends PartialType(CreateCompanyInput) {
  @IsNumber()
  @IsNotEmpty()
  @Field(() => Number)
  readonly id_company: number
}
