import {Reflector} from '@nestjs/core'
import {CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable} from '@nestjs/common'
import {Observable} from 'rxjs'
import {PUBLIC_KEY} from '@/constants'
import {SigninService} from '@modules/account/auth/signin/services/signin.service'

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly reflector: Reflector, private readonly authService: SigninService) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const isPublic = this.reflector.get<boolean>(PUBLIC_KEY, context.getHandler())
    if (isPublic) {
      return true
    }
    const req = context.switchToHttp().getRequest<Request>()
    const token = req.headers['token']

    if (!token || Array.isArray(token)) {
      throw new HttpException({message: 'The user are not login'}, HttpStatus.UNAUTHORIZED)
    }

    const manageToken: any = this.authService.decodeToken(token)
    if (manageToken.isExpired) {
      throw new HttpException({message: 'Token expired!'}, HttpStatus.UNAUTHORIZED)
    }

    return true
  }
}
