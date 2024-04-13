import {ApiProperty} from '@nestjs/swagger'
import {PartialType} from '@nestjs/mapped-types'
import {DeepPartial} from 'typeorm'
import {IsArray, IsOptional, ValidateNested} from 'class-validator'
import {UpdateProfileDto} from '@modules/security/profile/dto/update-profile.dto'
import {UserDto} from '@modules/account/user/dto/user.dto'

export class ProfileDto extends PartialType(UpdateProfileDto) {
  @ValidateNested()
  @IsArray()
  @IsOptional()
  @ApiProperty()
  User: DeepPartial<UserDto[]>
}
