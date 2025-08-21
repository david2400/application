import {BaseDto} from '@/common/domain/dto/base.abstract.dto'
import {Field, InputType} from '@nestjs/graphql'
import {IsInt, IsNotEmpty, IsNumber, IsOptional, IsString} from 'class-validator'

@InputType()
export class CreateModulesAplicationInput extends BaseDto {
  @IsString()
  @IsNotEmpty()
  @Field(() => String)
  name: string

  @IsOptional()
  @IsString()
  @Field(() => String)
  description?: string

  @IsInt()
  @IsNumber()
  @IsNotEmpty()
  @Field(() => Number)
  aplication_id: number
}
