import {BaseDto} from '@/common/domain/dto/base.abstract.dto'
import {Field, InputType, Int} from '@nestjs/graphql'
import {IsInt, IsNotEmpty, IsNumber, IsOptional, IsString} from 'class-validator'

@InputType()
export class CreatePermissionInput extends BaseDto {
  @IsString()
  @IsNotEmpty()
  @Field(() => String)
  name: string

  @IsString()
  @IsNotEmpty()
  @Field(() => String)
  description: string

  @IsInt()
  @IsNumber()
  @IsNotEmpty()
  @Field(() => Number)
  aplications_id: number

  @IsInt()
  @IsNumber()
  @IsOptional()
  @Field(() => Number)
  module_aplication_id: number
}
