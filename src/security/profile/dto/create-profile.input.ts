import {IsArray, IsNotEmpty, IsOptional, IsString} from 'class-validator'
import {DeepPartial} from 'typeorm'
import {RoleInput} from '../../role/dto/role.input'
import {BaseDto} from '@/common/domain/dto/base.abstract.dto'

export class CreateProfileInput extends BaseDto {
  @IsString()
  @IsNotEmpty()
  name: string

  @IsString()
  @IsNotEmpty()
  description: string

  @IsArray()
  @IsOptional()
  profile_role?: DeepPartial<RoleInput[]>
}
