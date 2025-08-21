import {BaseDto} from '@/common/domain/dto/base.abstract.dto'
import {Field, InputType} from '@nestjs/graphql'
import {IsNotEmpty, IsOptional, IsString} from 'class-validator'

@InputType()
export class CreateAplicationsInput extends BaseDto {
  @IsString()
  @IsNotEmpty()
  @Field(() => String)
  name: string

  @IsString()
  @Field(() => String)
  description?: string

  @IsString()
  @IsNotEmpty()
  @Field(() => String)
  route: string
}
