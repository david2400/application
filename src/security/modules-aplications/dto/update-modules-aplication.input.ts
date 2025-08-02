import {InputType} from '@nestjs/graphql'
import {CreateModulesAplicationInput} from './create-modules-aplication.input'
import {PartialType} from '@nestjs/mapped-types'

@InputType()
export class UpdateModulesAplicationInput extends PartialType(CreateModulesAplicationInput) {
  id: number
}
