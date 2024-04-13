import {IsEmail, IsNotEmpty, IsNumber, IsNumberString, IsOptional, IsString} from 'class-validator'
import {ApiProperty} from '@nestjs/swagger'
import {BaseDto} from '@common/class/dto/base.abstract.dto'

export class CreateUserDto extends BaseDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  Name: string

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  LastName: string

  @IsNumberString()
  @ApiProperty()
  CardId: string

  @IsEmail()
  @ApiProperty()
  Email: string

  @IsString()
  @ApiProperty()
  Gender: string

  @IsString()
  @ApiProperty()
  Address: string

  @IsNumberString()
  @ApiProperty()
  Phone: string

  @IsNotEmpty()
  @ApiProperty()
  Username: string

  @IsNotEmpty()
  @ApiProperty()
  Password: string

  @IsOptional()
  @IsString()
  @ApiProperty()
  RefreshToken?: string

  @IsNumber()
  @IsOptional()
  @ApiProperty()
  ProfileId: number
}
