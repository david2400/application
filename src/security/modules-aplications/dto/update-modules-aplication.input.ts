import {Field, InputType} from '@nestjs/graphql'
import {CreateModulesAplicationInput} from './create-modules-aplication.input'
import {PartialType} from '@nestjs/mapped-types'
import {IsNotEmpty, IsNumber} from 'class-validator'

@InputType()
export class UpdateModulesAplicationInput extends PartialType(CreateModulesAplicationInput) {
  @IsNumber()
  @IsNotEmpty()
  @Field(() => Number)
  id_modules_aplication: number
}
