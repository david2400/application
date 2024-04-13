import {ApiProperty} from '@nestjs/swagger'
import {IsNotEmpty, IsNumber, IsString} from 'class-validator'
import {BaseDto} from '@common/class/dto/base.abstract.dto'

export class CreateRolePermissionDto extends BaseDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  Level: string

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  PermissionId: number

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  RoleId: number
}
