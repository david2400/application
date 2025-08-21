import {BaseDto} from '@/common/domain/dto/base.abstract.dto'
import {Field, InputType, Int} from '@nestjs/graphql'
import {IsNotEmpty, IsNumber, IsString} from 'class-validator'

@InputType()
export class CreateRolePermissionInput extends BaseDto {
  @IsString()
  @IsNotEmpty()
  @Field(() => String)
  level: string

  @IsNumber()
  @IsNotEmpty()
  @Field(() => Number)
  permission_id: number

  @IsNumber()
  @IsNotEmpty()
  @Field(() => Number)
  role_id: number
}
