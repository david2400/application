import {ApiProperty} from '@nestjs/swagger'
import {PartialType} from '@nestjs/mapped-types'
import {IsNumber, IsOptional} from 'class-validator'
import {CreateUserDto} from '@modules/account/user/dto/create-user.dto'

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsNumber()
  @IsOptional()
  @ApiProperty()
  readonly id: number
}
