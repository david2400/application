import {IsNotEmpty, IsNumber} from 'class-validator'
import {CreateClientInput} from './create-client.input'
import {InputType, Field, Int, PartialType} from '@nestjs/graphql'

@InputType()
export class UpdateClientInput extends PartialType(CreateClientInput) {
  @IsNumber()
  @IsNotEmpty()
  @Field(() => Number)
  readonly id_client: number
}
