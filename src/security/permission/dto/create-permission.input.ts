import {BaseDto} from '@/common/domain/dto/base.abstract.dto'
import { InputType } from '@nestjs/graphql'
import {ApiProperty} from '@nestjs/swagger'
import {IsInt, IsNotEmpty, IsNumber, IsString} from 'class-validator'

@InputType()
export class CreatePermissionInput extends BaseDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  name: string

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  description: string

  @IsInt()
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  aplications_id: number
}
