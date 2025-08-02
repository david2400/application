import {ApiProperty} from '@nestjs/swagger'
import {PartialType} from '@nestjs/mapped-types'
import {DeepPartial} from 'typeorm'
import {IsArray, IsOptional, ValidateNested} from 'class-validator'
import {UpdateProfileInput} from './update-profile.input'
import {UserInput} from '@/src/account/users/dto/user.input'
import { ObjectType } from '@nestjs/graphql'

@ObjectType()
export class ProfileInput extends PartialType(UpdateProfileInput) {
  @ValidateNested()
  @IsArray()
  @IsOptional()
  @ApiProperty()
  user: DeepPartial<UserInput[]>
}
