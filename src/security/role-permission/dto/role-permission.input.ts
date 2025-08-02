import {PartialType} from '@nestjs/mapped-types'
import {PermissionInput} from '../../permission/dto/permission.input'
import {RoleInput} from '../../role/dto/role.input'
import {UpdateRolePermissionInput} from './update-role-permission.input'
import { ObjectType } from '@nestjs/graphql'

@ObjectType()
export class RolePermissionInput extends PartialType(UpdateRolePermissionInput) {
  permission: PermissionInput

  role: RoleInput
}
