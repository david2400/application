import {IsNotEmpty, IsNumber, IsOptional, IsUUID} from 'class-validator'
import {CreatePermissionInput} from './create-permission.input'
import {PartialType} from '@nestjs/mapped-types'
import {Field, ID, InputType} from '@nestjs/graphql'

@InputType()
export class UpdatePermissionInput extends PartialType(CreatePermissionInput) {
  @IsNumber()
  @IsNotEmpty()
  @Field(() => Number)
  readonly id_permission: number
}
