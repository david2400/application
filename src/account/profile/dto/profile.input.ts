import {DeepPartial} from 'typeorm'
import {IsArray, IsNotEmpty, IsNumber, IsOptional, IsString, ValidateNested} from 'class-validator'
import {Field, ID, ObjectType} from '@nestjs/graphql'
import {RoleInput} from '../../../security/role/dto/role.input'
import {BaseDto} from '@/common/domain/dto/base.abstract.dto'
import {UserInput} from '@/src/account/users/dto/user.input'

@ObjectType()
export class ProfileInput extends BaseDto {
  @IsNumber()
  @IsNotEmpty()
  @Field(() => Number)
  readonly id_profile: number

  @IsString()
  @Field(() => String)
  name: string

  @IsString()
  @Field(() => String)
  description: string

  @IsArray()
  @IsOptional()
  // @Field(() => [RoleInput])
  profile_role?: RoleInput[]

  // @IsArray()
  // @IsOptional()
  // @Field(() => [UserInput])
  // profile_user?: UserInput[]
}
