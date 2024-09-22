import {ApiProperty} from '@nestjs/swagger'
import {IsNotEmpty, IsString} from 'class-validator'
import {BaseDto} from '@common/class/dto/base.abstract.dto'

export class CreateAplicationsDto extends BaseDto {
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
