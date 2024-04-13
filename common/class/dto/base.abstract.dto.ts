import {IsOptional, IsDate} from 'class-validator'
import {ApiProperty} from '@nestjs/swagger'

export class BaseDto {
  @IsOptional()
  @IsDate()
  @ApiProperty()
  readonly CreatedAt: Date

  @IsOptional()
  @IsDate()
  @ApiProperty()
  readonly UpdatedAt: Date

  @IsOptional()
  @IsDate()
  @ApiProperty()
  readonly DeletedAt: Date
}
