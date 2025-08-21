import {PartialType} from '@nestjs/mapped-types'
import {IsNotEmpty, IsNumber} from 'class-validator'
import {CreateAplicationsInput} from '@/src/security/aplications/dto/create-aplication.input'
import {Field, InputType} from '@nestjs/graphql'

@InputType()
export class UpdateAplicationsInput extends PartialType(CreateAplicationsInput) {
  @IsNumber()
  @IsNotEmpty()
  @Field(() => Number)
  readonly id_aplications: number
}
