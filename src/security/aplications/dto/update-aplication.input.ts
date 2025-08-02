import {ApiProperty} from '@nestjs/swagger'
import {PartialType} from '@nestjs/mapped-types'
import {IsOptional, IsUUID} from 'class-validator'
import {CreateAplicationsInput} from '@/src/security/aplications/dto/create-aplication.input'

export class UpdateAplicationsInput extends PartialType(CreateAplicationsInput) {
  @IsUUID()
  @IsOptional()
  @ApiProperty()
  readonly id_aplications: number
}
