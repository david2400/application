import {BaseDto} from '@/common/domain/dto/base.abstract.dto'
import {ApiProperty} from '@nestjs/swagger'
import {IsNotEmpty, IsString} from 'class-validator'

export class CreateAplicationsInput extends BaseDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  name: string

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  description: string

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  route: string
}
