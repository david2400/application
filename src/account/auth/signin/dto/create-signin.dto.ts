import {IsString} from 'class-validator'

export class CreateSigninDto {
  @IsString()
  username: string

  @IsString()
  password: string
}
