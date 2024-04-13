import {IsString} from 'class-validator'

export class CreateSigninDto {
  @IsString()
  Username: string

  @IsString()
  Password: string
}
