import {InputType, Int, Field} from '@nestjs/graphql'
import {IsEmail, IsNotEmpty, IsNumberString, IsOptional, IsString} from 'class-validator'

@InputType()
export class CreateClientInput {
  @IsString()
  @IsNotEmpty()
  first_name: string

  @IsOptional()
  @IsString()
  second_name?: string

  @IsString()
  @IsNotEmpty()
  first_last_name: string

  @IsOptional()
  @IsString()
  second_last_name?: string

  @IsString()
  @IsNotEmpty()
  type_id: string

  @IsNotEmpty()
  @IsNumberString()
  card_id: string

  @IsNotEmpty()
  @IsEmail()
  email: string

  @IsString()
  gender: string

  @IsString()
  address: string

  @IsNotEmpty()
  @IsNumberString()
  phone: string
}
