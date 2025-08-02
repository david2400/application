import { InputType } from '@nestjs/graphql'
import {CreateProfileInput} from './create-profile.input'
import {PartialType} from '@nestjs/mapped-types'

@InputType()
export class UpdateProfileInput extends PartialType(CreateProfileInput) {
  id: number
}
