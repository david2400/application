import {InputType} from '@nestjs/graphql'
import {IsOptional, IsUUID} from 'class-validator'
import {CreateRoleInput} from './create-role.input'
import {PartialType} from '@nestjs/mapped-types'

@InputType()
export class UpdateRoleInput extends PartialType(CreateRoleInput) {
  @IsUUID()
  @IsOptional()
  readonly id_role: number
}
