import {IsNotEmpty, IsNumber, IsOptional, IsUUID} from 'class-validator'
import {CreateUserInput} from './create-user.input'
import {PartialType} from '@nestjs/mapped-types'
import {Field, InputType} from '@nestjs/graphql'

@InputType()
export class UpdateUserInput extends PartialType(CreateUserInput) {
  @IsNumber()
  @IsNotEmpty()
  @Field(() => Number)
  readonly id_user: number
}
