import {IsEmail, IsNotEmpty, IsNumber, IsNumberString, IsOptional, IsString} from 'class-validator'
import {ApiProperty} from '@nestjs/swagger'
import {BaseDto} from '@common/class/base.abstract.dto'

export class CreateUserDto extends BaseDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  name: string

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  last_name: string

  @IsNumberString()
  @ApiProperty()
  card_id: string

  @IsEmail()
  @ApiProperty()
  email: string

  @IsString()
  @ApiProperty()
  gender: string

  @IsString()
  @ApiProperty()
  address: string

  @IsNumberString()
  @ApiProperty()
  phone: string

  @IsNotEmpty()
  @ApiProperty()
  username: string

  @IsNotEmpty()
  @ApiProperty()
  password: string

  @IsOptional()
  @IsString()
  @ApiProperty()
  refresh_token?: string

  @IsNumber()
  @IsOptional()
  @ApiProperty()
  profile_id: number
}
