import {IsOptional, IsUUID} from 'class-validator'
import {CreatePermissionInput} from './create-permission.input'
import {PartialType} from '@nestjs/mapped-types'
import { InputType } from '@nestjs/graphql'

@InputType()
export class UpdatePermissionInput extends PartialType(CreatePermissionInput) {
  @IsUUID()
  @IsOptional()
  readonly id: number
}
