import {ApiProperty} from '@nestjs/swagger'
import {PartialType} from '@nestjs/mapped-types'
import {UpdateRolePermissionDto} from '@modules/security/role-permission/dto/update-role-permission.dto'
import {RoleDto} from '../../role/dto/role.dto'
import {PermissionDto} from '../../permission/dto/permission.dto'

export class RolePermissionDto extends PartialType(UpdateRolePermissionDto) {
  permission: PermissionDto

  role: RoleDto
}
