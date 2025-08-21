import {Field, ID, InputType} from '@nestjs/graphql'
import {IsNotEmpty, IsNumber, IsOptional, IsUUID} from 'class-validator'
import {CreateRoleInput} from './create-role.input'
import {PartialType} from '@nestjs/mapped-types'

@InputType()
export class UpdateRoleInput extends PartialType(CreateRoleInput) {
  @IsNumber()
  @IsNotEmpty()
  @Field(() => Number)
  readonly id_role: number
}
