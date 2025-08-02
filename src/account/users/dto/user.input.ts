import {BaseDto} from '@/common/domain/dto/base.abstract.dto'
import { ObjectType } from '@nestjs/graphql'

@ObjectType()
export class UserInput extends BaseDto {
  name: string

  last_name: string

  card_id: string

  email: string

  gender: string

  address: string

  phone: string

  refresh_token?: string

  profile_id: number
}
