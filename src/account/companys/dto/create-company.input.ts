import {Field, InputType} from '@nestjs/graphql'
import {IsDate, IsNotEmpty, IsString} from 'class-validator'

@InputType()
export class CreateCompanyInput {
  @IsNotEmpty()
  @IsString()
  @Field(() => String)
  name: string

  @IsNotEmpty()
  @IsString()
  @Field(() => String)
  nit: string

  @IsNotEmpty()
  @IsDate()
  @Field(() => Date)
  active_date: Date
}
