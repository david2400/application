import {ApiProperty} from '@nestjs/swagger'
import {PartialType} from '@nestjs/mapped-types'
import {IsDate, IsOptional, IsUUID} from 'class-validator'
import {CreateAplicationsDto} from '@modules/security/aplications/dto/create-aplications.dto'

export class UpdateAplicationsDto extends PartialType(CreateAplicationsDto) {
  @IsUUID()
  @IsOptional()
  @ApiProperty()
  readonly Id: number
}
