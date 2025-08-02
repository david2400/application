import {PartialType} from '@nestjs/mapped-types'
import {CreateRolePermissionInput} from './create-role-permission.input'

export class UpdateRolePermissionInput extends PartialType(CreateRolePermissionInput) {
  id: number
}
