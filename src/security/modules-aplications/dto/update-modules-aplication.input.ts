import { CreateModulesAplicationInput } from './create-modules-aplication.input';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateModulesAplicationInput extends PartialType(CreateModulesAplicationInput) {
  id: number;
}
