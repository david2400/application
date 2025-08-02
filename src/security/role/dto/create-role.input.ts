import {IsNotEmpty, IsString} from 'class-validator'
import {BaseDto} from '@/common/domain/dto/base.abstract.dto'

export class CreateRoleInput extends BaseDto {
  @IsString()
  @IsNotEmpty()
  name: string

  @IsString()
  @IsNotEmpty()
  description: string
}
