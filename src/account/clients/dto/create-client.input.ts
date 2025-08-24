import {InputType, Int, Field} from '@nestjs/graphql'
import {IsEmail, IsNotEmpty, IsNumberString, IsOptional, IsString} from 'class-validator'

@InputType()
export class CreateClientInput {
  @IsString()
  @IsNotEmpty()
  @Field(() => String)
  first_name: string

  @IsOptional()
  @IsString()
  @Field(() => String)
  second_name?: string

  @IsString()
  @IsNotEmpty()
  @Field(() => String)
  first_last_name: string

  @IsOptional()
  @IsString()
  @Field(() => String)
  second_last_name?: string

  @IsString()
  @IsNotEmpty()
  @Field(() => String)
  type_id: string

  @IsNotEmpty()
  @IsNumberString()
  @Field(() => String)
  card_id: string

  // @IsNotEmpty()
  // @IsEmail()
  // email: string

  @IsNotEmpty()
  @IsString()
  @Field(() => String)
  sex: string

  @IsString()
  @Field(() => String)
  gender: string

  // @IsString()
  // address: string

  // @IsNotEmpty()
  // @IsNumberString()
  // phone: string
}
