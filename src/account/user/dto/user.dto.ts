import {ApiProperty} from '@nestjs/swagger'
import {PartialType} from '@nestjs/mapped-types'
import {DeepPartial} from 'typeorm'
import {IsArray, IsOptional, ValidateNested} from 'class-validator'
import {UpdateUserDto} from '@modules/account/user/dto/update-user.dto'

export class UserDto extends PartialType(UpdateUserDto) {}
