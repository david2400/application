import { InputType } from '@nestjs/graphql';
import { CreateCompanyInput } from './create-company.input';
import { PartialType } from '@nestjs/mapped-types';

@InputType()
export class UpdateCompanyInput extends PartialType(CreateCompanyInput) {
  id: number;
}
