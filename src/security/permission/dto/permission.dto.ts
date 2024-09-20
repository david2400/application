import {ApiProperty} from '@nestjs/swagger'
import {PartialType} from '@nestjs/mapped-types'
import {DeepPartial} from 'typeorm'
import {IsArray, IsOptional, ValidateNested} from 'class-validator'
import {UpdatePermissionDto} from '@modules/security/permission/dto/update-permission.dto'
import {RolePermissionDto} from '@modules/security/role-permission/dto/role-permission.dto'

export class PermissionDto extends PartialType(UpdatePermissionDto) {
  @ValidateNested()
  @IsArray()
  @IsOptional()
  @ApiProperty()
  role_permission: DeepPartial<RolePermissionDto[]>
}
