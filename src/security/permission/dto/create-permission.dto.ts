import {ApiProperty} from '@nestjs/swagger'
import {IsInt, IsNotEmpty, IsNumber, IsString} from 'class-validator'
import {BaseDto} from '@common/class/base.abstract.dto'

export class CreatePermissionDto extends BaseDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  name: string

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  description: string

  @IsInt()
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  aplications_id: number
}
