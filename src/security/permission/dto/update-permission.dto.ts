import {ApiProperty} from '@nestjs/swagger'
import {PartialType} from '@nestjs/mapped-types'
import {IsOptional, IsUUID} from 'class-validator'
import {CreatePermissionDto} from '@modules/security/permission/dto/create-permission.dto'

export class UpdatePermissionDto extends PartialType(CreatePermissionDto) {
  @IsUUID()
  @IsOptional()
  @ApiProperty()
  readonly Id: number
}
