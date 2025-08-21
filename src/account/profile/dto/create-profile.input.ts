import {IsArray, IsNotEmpty, IsOptional, IsString} from 'class-validator'
import {DeepPartial} from 'typeorm'
import {RoleInput} from '../../../security/role/dto/role.input'
import {BaseDto} from '@/common/domain/dto/base.abstract.dto'
import {Field, InputType} from '@nestjs/graphql'
import {UserInput} from '@/src/account/users/dto/user.input'

@InputType()
export class CreateProfileInput extends BaseDto {
  @IsString()
  @IsNotEmpty()
  @Field(() => String)
  name: string

  @IsString()
  @Field(() => String)
  description: string

  @IsArray()
  @IsOptional()
  // @Field(() => [RoleInput], {nullable: true})
  profile_role?: RoleInput[]

  // @IsArray()
  // @IsOptional()
  // user?: DeepPartial<UserInput[]>
}
