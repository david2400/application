import {Field, ID, InputType} from '@nestjs/graphql'
import {CreateProfileInput} from './create-profile.input'
import {PartialType} from '@nestjs/mapped-types'
import {IsNotEmpty, IsNumber} from 'class-validator'

@InputType()
export class UpdateProfileInput extends PartialType(CreateProfileInput) {
  @IsNumber()
  @IsNotEmpty()
  @Field(() => Number)
  readonly id_profile: number
}
