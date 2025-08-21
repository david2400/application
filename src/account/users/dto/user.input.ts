import {BaseDto} from '@/common/domain/dto/base.abstract.dto'
import {Field, ObjectType} from '@nestjs/graphql'
import {IsNotEmpty, IsNumber, IsOptional, IsString, isStrongPassword} from 'class-validator'
import {ClientInput} from '../../clients/dto/client.input'

@ObjectType()
export class UserInput extends BaseDto {
  @IsNumber()
  @Field(() => Number)
  readonly id_user: number

  // @IsNotEmpty()
  @IsString()
  @Field(() => String)
  username

  // @IsNotEmpty()
  // @isStrongPassword()
  @Field(() => String)
  password

  @IsNotEmpty()
  @Field(() => Number)
  client_id: number

  @IsOptional()
  client: ClientInput

  @IsString()
  @Field(() => String)
  refresh_token?: string

  @IsOptional()
  @IsNumber()
  @Field(() => Number)
  profile_id: number
}
