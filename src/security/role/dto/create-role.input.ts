import {IsArray, IsNotEmpty, IsOptional, IsString} from 'class-validator'
import {BaseDto} from '@/common/domain/dto/base.abstract.dto'
import {Field, InputType} from '@nestjs/graphql'
import {RoleInput} from './role.input'
import {ProfileInput} from '../../../account/profile/dto/profile.input'

@InputType()
export class CreateRoleInput extends BaseDto {
  @IsString()
  @IsNotEmpty()
  @Field(() => String)
  name: string

  @IsString()
  @Field(() => String)
  description: string

  // @IsOptional()
  // @IsArray()
  // @Field(() => [ProfileInput])
  // role_profile: ProfileInput[]
}
