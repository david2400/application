import {ApiProperty} from '@nestjs/swagger'
import {PartialType} from '@nestjs/mapped-types'
import {DeepPartial} from 'typeorm'
import {IsArray, IsOptional, ValidateNested} from 'class-validator'
import {UpdateAplicationsDto} from '@modules/security/aplications/dto/update-aplications.dto'
import {PermissionDto} from '@modules/security/permission/dto/permission.dto'

export class AplicationsDto extends PartialType(UpdateAplicationsDto) {
  @ValidateNested()
  @IsArray()
  @IsOptional()
  @ApiProperty()
  Permission: DeepPartial<PermissionDto[]>
}
