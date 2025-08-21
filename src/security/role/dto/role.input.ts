import {DeepPartial} from 'typeorm'
import {IsArray, IsOptional, IsString, IsUUID, ValidateNested} from 'class-validator'
import {RolePermissionInput} from '../../role-permission/dto/role-permission.input'
import {Field, Int, ObjectType} from '@nestjs/graphql'
import {BaseDto} from '@/common/domain/dto/base.abstract.dto'
import {ProfileInput} from '../../../account/profile/dto/profile.input'

@ObjectType()
export class RoleInput extends BaseDto {
  @IsUUID()
  @IsOptional()
  @Field(() => Number)
  readonly id_role: number

  @IsString()
  @Field(() => String)
  name: string

  @IsString()
  @Field(() => String)
  description: string

  @ValidateNested()
  @IsArray()
  @IsOptional()
  // @Field(() => [ProfileInput], {nullable: true})
  role_profile?: ProfileInput[]

  @ValidateNested()
  @IsArray()
  @IsOptional()
  // @Field(() => [RolePermissionInput], {nullable: true})
  role_permission?: RolePermissionInput[]
}
