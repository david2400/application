import {IsArray, IsNotEmpty, IsOptional, IsString} from 'class-validator'
import {ApiProperty} from '@nestjs/swagger'
import {DeepPartial} from 'typeorm'
import {BaseDto} from '@common/class/base.abstract.dto'
import {RoleDto} from '@modules/security/role/dto/role.dto'

export class CreateProfileDto extends BaseDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  name: string

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  description: string

  @IsArray()
  @IsOptional()
  @ApiProperty()
  profile_role?: DeepPartial<RoleDto[]>
}
