import {ApiProperty} from '@nestjs/swagger'
import {PartialType} from '@nestjs/mapped-types'
import {IsOptional, IsUUID} from 'class-validator'
import {CreateRolePermissionDto} from '@modules/security/role-permission/dto/create-role-permission.dto'

export class UpdateRolePermissionDto extends PartialType(CreateRolePermissionDto) {
  @IsUUID()
  @IsOptional()
  @ApiProperty()
  readonly id: number
}
