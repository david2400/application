import {AplicationsInput} from '@/src/security/aplications/dto/aplications.input'
import {Field, ObjectType} from '@nestjs/graphql'
import {UserInput} from '../../users/dto/user.input'
import { IsDate, IsNumber, IsString } from 'class-validator'

@ObjectType()
export class CompanyInput {
  @IsNumber()
  @Field(() => Number)
  id_company: number

  @IsString()
  @Field(() => String)
  name: string

  @IsString()
  @Field(() => String)
  nit: string

  @IsDate()
  @Field(() => Date)
  active_date: Date

  // @Field(() => [Permission])
  aplications?: AplicationsInput[]

  // @Field(() => [Permission])
  users?: UserInput[]
}
