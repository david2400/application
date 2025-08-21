import {IsArray, IsNotEmpty, IsNumber, IsOptional, IsString, ValidateNested} from 'class-validator'
import {RolePermissionInput} from '../../role-permission/dto/role-permission.input'
import {Field, ID, ObjectType} from '@nestjs/graphql'
import {AplicationsInput} from '../../aplications/dto/aplications.input'
import {BaseDto} from '@/common/domain/dto/base.abstract.dto'
import {ModulesAplicationInput} from '../../modules-aplications/dto/modules-aplication.input'

@ObjectType()
export class PermissionInput extends BaseDto {
  @IsNumber()
  @Field(() => Number)
  readonly id_permission: number

  @IsString()
  @Field(() => String)
  name: string

  @IsString()
  @Field(() => String)
  description: string

  @IsNumber()
  @Field(() => Number)
  aplications_id: number

  @IsOptional()
  aplications: AplicationsInput

  @IsNumber()
  @Field(() => Number)
  module_aplication_id?: number

  @IsOptional()
  module_aplication?: ModulesAplicationInput

  @ValidateNested()
  @IsOptional()
  @IsArray()
  role_permission?: RolePermissionInput[]
}
