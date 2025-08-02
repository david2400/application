import {ApiProperty} from '@nestjs/swagger'
import {PartialType} from '@nestjs/mapped-types'
import {DeepPartial} from 'typeorm'
import {IsArray, IsOptional, ValidateNested} from 'class-validator'
import {UpdateAplicationsInput} from '@/src/security/aplications/dto/update-aplication.input'
import {PermissionInput} from '../../permission/dto/permission.input'

export class AplicationsInput extends PartialType(UpdateAplicationsInput) {
  @ValidateNested()
  @IsArray()
  @IsOptional()
  @ApiProperty()
  permission: DeepPartial<PermissionInput[]>
}
