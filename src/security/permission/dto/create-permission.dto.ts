import {ApiProperty} from '@nestjs/swagger'
import {IsInt, IsNotEmpty, IsNumber, IsString} from 'class-validator'
import {BaseDto} from '@common/class/dto/base.abstract.dto'

export class CreatePermissionDto extends BaseDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  Name: string

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  Description: string

  @IsInt()
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  AplicationsId: number
}
