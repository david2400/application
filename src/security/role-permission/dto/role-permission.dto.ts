import {ApiProperty} from '@nestjs/swagger'
import {PartialType} from '@nestjs/mapped-types'
import {UpdateRolePermissionDto} from '@modules/security/role-permission/dto/update-role-permission.dto'

export class RolePermissionDto extends PartialType(UpdateRolePermissionDto) {}
