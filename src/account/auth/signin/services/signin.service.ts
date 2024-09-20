import {
  Injectable,
  Inject,
  forwardRef,
  NotFoundException,
  HttpException,
  HttpStatus,
} from '@nestjs/common'
import {ConfigService} from '@nestjs/config'
import {JwtService} from '@nestjs/jwt'
import * as bcrypt from 'bcrypt'
import {jwtConstants} from '@/constants'
import type {JwtPayload} from '@common/interface/login/signin.interface'
import {UserService} from '@modules/account/user/services/user.service'
import {CreateSigninDto} from '@modules/account/auth/signin/dto/create-signin.dto'

@Injectable()
export class SigninService {
  constructor(
    @Inject(forwardRef(() => UserService)) private userServices: UserService,
    private jwtService: JwtService,
    private configService: ConfigService
  ) {}

  async comparePasswords(newPassword: string, hashPassword: string): Promise<boolean | any> {
    const isMatch = (await bcrypt.compare(newPassword, hashPassword)) || false
    return isMatch
  }

  async decodeToken(token: string): Promise<any> {
    const result = this.jwtService.decode(token)
    const currentDate = new Date()
    const expireDate = new Date(result.exp)

    // return {
    //   sub: result.sub,
    //   roles: result.role,
    //   username: result.username,
    //   isExpired: +expireDate <= +currentDate / 1000,
    // }

    return result
  }

  private getRefreshToken(sub: number): string {
    return this.jwtService.sign(
      {sub},
      {
        secret: jwtConstants.secret,
        expiresIn: '7d', // Set greater than the expiresIn of the access_token
      }
    )
  }

  async generateTokenJWT(user: any) {
    const payload: JwtPayload = {
      sub: user.id,
      username: user.username,
      roles: user.user_role,
    }

    return {
      access_token: this.jwtService.sign(payload),
      refresh_token: this.getRefreshToken(payload.sub),
    }
  }

  async login(loginUserDto: CreateSigninDto): Promise<any> {
    const user = await this.userServices.findOneByUsername(loginUserDto.username)
    if (!user) {
      throw new HttpException({message: 'User not found'}, HttpStatus.NOT_FOUND)
    }
    const isMatchPassword = await this.comparePasswords(loginUserDto.password, user.password)

    if (!user || !isMatchPassword) {
      throw new HttpException({message: 'password is not match'}, HttpStatus.NOT_FOUND)
    }
    const token = await this.generateTokenJWT(user)

    await this.userServices.updateUserRefreshToken(user.id, token.refresh_token)

    const resObj = {
      id: user.id,
      role: user,
      token: token,
    }
    return resObj
  }

  async logout(user_id: number) {
    return await this.userServices.removeRefreshToken(user_id)
  }
}
