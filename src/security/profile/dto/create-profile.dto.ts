import {IsArray, IsNotEmpty, IsOptional, IsString} from 'class-validator'
import {ApiProperty} from '@nestjs/swagger'
import {DeepPartial} from 'typeorm'
import {BaseDto} from '@common/class/dto/base.abstract.dto'
import {RoleDto} from '@modules/security/role/dto/role.dto'

export class CreateProfileDto extends BaseDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  Name: string

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  Description: string

  @IsArray()
  @IsOptional()
  @ApiProperty()
  ProfileRole?: DeepPartial<RoleDto[]>
}
