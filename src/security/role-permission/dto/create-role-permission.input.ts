import {BaseDto} from '@/common/domain/dto/base.abstract.dto'
import { InputType } from '@nestjs/graphql'
import {IsNotEmpty, IsNumber, IsString} from 'class-validator'

@InputType()
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
