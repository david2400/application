import {ApiProperty} from '@nestjs/swagger'
import {IsNotEmpty, IsNumber, IsString} from 'class-validator'
import {BaseDto} from '@common/class/dto/base.abstract.dto'

export class CreateRolePermissionDto extends BaseDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  level: string

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  permission_id: number

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  role_id: number
}
