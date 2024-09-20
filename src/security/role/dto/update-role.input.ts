import {ApiProperty} from '@nestjs/swagger'
import {PartialType} from '@nestjs/mapped-types'
import {IsOptional, IsUUID} from 'class-validator'
import {CreateRoleDto} from '@modules/security/role/dto/create-role.dto'

export class UpdateRoleDto extends PartialType(CreateRoleDto) {
  @IsUUID()
  @IsOptional()
  @ApiProperty()
  readonly id: number
}
