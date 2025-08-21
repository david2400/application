import {BaseDto} from '@/common/domain/dto/base.abstract.dto'
import {Field, InputType} from '@nestjs/graphql'
import {IsEmail, IsNotEmpty, IsNumber, IsNumberString, IsOptional, IsString} from 'class-validator'

@InputType()
export class CreateUserInput extends BaseDto {
  @IsString()
  @Field(() => String)
  username

  @IsString()
  // @isStrongPassword()
  @Field(() => String)
  password

  @IsNumber()
  @Field(() => Number)
  client_id: number
}
