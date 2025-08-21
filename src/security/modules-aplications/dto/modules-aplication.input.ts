import {Field, ObjectType} from '@nestjs/graphql'
import {AplicationsInput} from '../../aplications/dto/aplications.input'
import {Permission} from '../../permission/entities/permission.entity'
import {IsArray, IsInt, IsNumber, IsOptional, IsString, ValidateNested} from 'class-validator'
import {DeepPartial} from 'typeorm'
import {PermissionInput} from '../../permission/dto/permission.input'

@ObjectType()
export class ModulesAplicationInput {
  @IsNumber()
  @Field(() => Number)
  readonly id_modules_aplication: number

  @IsString()
  @Field(() => String)
  name: string

  @IsString()
  @Field(() => String)
  description?: string

  @IsInt()
  @IsNumber()
  @Field(() => Number)
  aplication_id: number

  @IsOptional()
  // @Field(() => AplicationsInput)
  aplications?: AplicationsInput

  @ValidateNested()
  @IsArray()
  @IsOptional()
  // @Field(() => [PermissionInput])
  permission?: PermissionInput[]
}
