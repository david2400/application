import {PartialType} from '@nestjs/mapped-types'
import {CreateRolePermissionInput} from './create-role-permission.input'
import {InputType} from '@nestjs/graphql'

@InputType()
export class UpdateRolePermissionInput extends PartialType(CreateRolePermissionInput) {
  id: number
}
