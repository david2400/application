import {ApiProperty} from '@nestjs/swagger'
import {PartialType} from '@nestjs/mapped-types'
import {DeepPartial} from 'typeorm'
import {IsArray, IsOptional, ValidateNested} from 'class-validator'
import {RolePermissionInput} from '../../role-permission/dto/role-permission.input'
import {UpdatePermissionInput} from './update-permission.input'
import { ObjectType } from '@nestjs/graphql'

@ObjectType()
export class PermissionInput extends PartialType(UpdatePermissionInput) {
  @ValidateNested()
  @IsArray()
  @IsOptional()
  @ApiProperty()
  role_permission: DeepPartial<RolePermissionInput[]>
}
