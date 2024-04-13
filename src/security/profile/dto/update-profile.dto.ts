import {ApiProperty} from '@nestjs/swagger'
import {PartialType} from '@nestjs/mapped-types'
import {IsOptional, IsUUID} from 'class-validator'
import {CreateProfileDto} from '@modules/security/profile/dto/create-profile.dto'

export class UpdateProfileDto extends PartialType(CreateProfileDto) {
  @IsUUID()
  @IsOptional()
  @ApiProperty()
  readonly Id: number
}
