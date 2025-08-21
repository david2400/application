import {InputType, Int, Field, ObjectType} from '@nestjs/graphql'
import {IsArray, IsNumber, IsOptional, IsString} from 'class-validator'
import {UserInput} from '../../users/dto/user.input'

@ObjectType()
export class ClientInput {
  @IsNumber()
  @Field(() => Number)
  readonly id_client: number

  @IsString()
  @Field(() => String)
  first_name: string

  @IsOptional()
  @IsString()
  @Field(() => String)
  second_name: string

  @IsString()
  @Field(() => String)
  first_last_name: string

  @IsOptional()
  @IsString()
  @Field(() => String)
  second_last_name?: string

  @IsString()
  @Field(() => String)
  card_id: string

  @IsString()
  @Field(() => String)
  type_id: string

  @IsString()
  @Field(() => String)
  email: string

  @IsString()
  @Field(() => String)
  gender: string

  @IsString()
  @Field(() => String)
  address: string

  @IsString()
  @Field(() => String)
  phone: string

  @IsArray()
  users?: UserInput[]
}
