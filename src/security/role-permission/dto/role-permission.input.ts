import {PermissionInput} from '../../permission/dto/permission.input'
import {RoleInput} from '../../role/dto/role.input'
import {Field, Int, ObjectType} from '@nestjs/graphql'
import {IsNumber, IsString} from 'class-validator'
import {BaseDto} from '@/common/domain/dto/base.abstract.dto'
import {DeepPartial} from 'typeorm'

@ObjectType()
export class RolePermissionInput extends BaseDto {
  @IsString()
  @Field(() => String)
  level: string

  @IsNumber()
  @Field(() => Number)
  permission_id: number

  // @Field(() => PermissionInput, {nullable: true})
  permission: DeepPartial<PermissionInput>

  @IsNumber()
  @Field(() => Number)
  role_id: number

  // @Field(() => RoleInput, {nullable: true})
  role: DeepPartial<RoleInput>
}
