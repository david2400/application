import {IsArray, IsNumber, IsOptional, IsString, ValidateNested} from 'class-validator'
import {Field, ObjectType} from '@nestjs/graphql'
import {BaseDto} from '@/common/domain/dto/base.abstract.dto'
import {PermissionInput} from '../../permission/dto/permission.input'
import {ModulesAplicationInput} from '../../modules-aplications/dto/modules-aplication.input'

@ObjectType()
export class AplicationsInput extends BaseDto {
  @IsNumber()
  @Field(() => Number)
  readonly id_aplications: number

  @IsString()
  @Field(() => String)
  name: string

  @IsString()
  @Field(() => String)
  description?: string

  @IsString()
  @Field(() => String)
  route: string

  @ValidateNested()
  @IsArray()
  @IsOptional()
  // @Field(() => [PermissionInput])
  permission?: PermissionInput[]

  @ValidateNested()
  @IsArray()
  @IsOptional()
  // @Field(() => [ModulesAplicationInput])
  modules_aplication?: ModulesAplicationInput[]
}
