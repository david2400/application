import {BaseDto} from '@/common/domain/dto/base.abstract.dto'
import {IsNotEmpty, IsNumber, IsString} from 'class-validator'

export class CreateRolePermissionInput extends BaseDto {
  @IsString()
  @IsNotEmpty()
  level: string

  @IsNumber()
  @IsNotEmpty()
  permission_id: number

  @IsNumber()
  @IsNotEmpty()
  role_id: number
}
