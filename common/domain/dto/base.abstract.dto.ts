import {HideField, InputType} from '@nestjs/graphql'
import {IsOptional, IsDate, IsNumber} from 'class-validator'

@InputType({isAbstract: true})
export class BaseDto {
  @IsOptional()
  @IsNumber()
  @HideField()
  created_usr: number

  @IsOptional()
  @IsNumber()
  @HideField()
  updated_usr?: number

  @IsOptional()
  @IsDate()
  @HideField()
  readonly created_at?: Date

  @IsOptional()
  @IsDate()
  @HideField()
  readonly updated_at?: Date

  @IsOptional()
  @IsDate()
  @HideField()
  readonly deleted_at?: Date
}
