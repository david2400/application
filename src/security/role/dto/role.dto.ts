import {ApiProperty} from '@nestjs/swagger'
import {PartialType} from '@nestjs/mapped-types'
import {DeepPartial} from 'typeorm'
import {IsArray, IsOptional, ValidateNested} from 'class-validator'
import {UpdateRoleDto} from '@modules/security/role/dto/update-role.input'
import {RolePermissionDto} from '@modules/security/role-permission/dto/role-permission.dto'

export class RoleDto extends PartialType(UpdateRoleDto) {
  @ValidateNested()
  @IsArray()
  @IsOptional()
  @ApiProperty()
  RolePermission?: DeepPartial<RolePermissionDto[]>
}
