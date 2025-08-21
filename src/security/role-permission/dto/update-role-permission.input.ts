import {PartialType} from '@nestjs/mapped-types'
import {CreateRolePermissionInput} from './create-role-permission.input'
import {Field, ID, InputType} from '@nestjs/graphql'
import {IsNotEmpty, IsNumber} from 'class-validator'

@InputType()
export class UpdateRolePermissionInput extends PartialType(CreateRolePermissionInput) {}
