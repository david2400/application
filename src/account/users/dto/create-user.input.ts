import {BaseDto} from '@/common/domain/dto/base.abstract.dto'
import {IsEmail, IsNotEmpty, IsNumber, IsNumberString, IsOptional, IsString} from 'class-validator'

export class CreateUserInput extends BaseDto {
  @IsString()
  @IsNotEmpty()
  name: string

  @IsString()
  @IsNotEmpty()
  last_name: string

  @IsNumberString()
  card_id: string

  @IsEmail()
  email: string

  @IsString()
  gender: string

  @IsString()
  address: string

  @IsNumberString()
  phone: string

  @IsOptional()
  @IsString()
  refresh_token?: string

  @IsNumber()
  @IsOptional()
  profile_id: number
}
