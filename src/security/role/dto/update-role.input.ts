import {IsOptional, IsUUID} from 'class-validator'
import {CreateRoleInput} from './create-role.input'
import {PartialType} from '@nestjs/mapped-types'

export class UpdateRoleInput extends PartialType(CreateRoleInput) {
  @IsUUID()
  @IsOptional()
  readonly id: number
}
