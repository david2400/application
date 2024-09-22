import {IsOptional, IsDate} from 'class-validator'
import {ApiProperty} from '@nestjs/swagger'

export class BaseDto {
  @IsOptional()
  @IsDate()
  @ApiProperty()
  readonly created_at: Date

  @IsOptional()
  @IsDate()
  @ApiProperty()
  readonly updated_at: Date

  @IsOptional()
  @IsDate()
  @ApiProperty()
  readonly deleted_at: Date
}
