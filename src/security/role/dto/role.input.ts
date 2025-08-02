import {ApiProperty} from '@nestjs/swagger'
import {PartialType} from '@nestjs/mapped-types'
import {DeepPartial} from 'typeorm'
import {IsArray, IsOptional, ValidateNested} from 'class-validator'
import {RolePermissionInput} from '../../role-permission/dto/role-permission.input'
import {UpdateRoleInput} from './update-role.input'
import { ObjectType } from '@nestjs/graphql'

@ObjectType()
export class RoleInput extends PartialType(UpdateRoleInput) {
  @ValidateNested()
  @IsArray()
  @IsOptional()
  @ApiProperty()
  role_permission?: DeepPartial<RolePermissionInput[]>
}
