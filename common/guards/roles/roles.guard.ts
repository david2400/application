import {CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable} from '@nestjs/common'
import {Reflector} from '@nestjs/core'
import {Observable} from 'rxjs'
import {PUBLIC_KEY, ROLES_KEY} from '@/constants'
import {Role} from '@common/enums/role.enum'

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    // valida los roles
    const isPublic = this.reflector.get<boolean>(PUBLIC_KEY, context.getHandler())
    if (isPublic) {
      return true
    }
    const roles = this.reflector.get<Array<keyof typeof Role>>(ROLES_KEY, context.getHandler())

    const req = context.switchToHttp().getRequest<Request>()

    // const isAuth = roles.some((role) => role === roleUser)

    // if (!isAuth) {
    //   throw new HttpException(
    //     {message: 'No tienes permisos para esta operacion'},
    //     HttpStatus.UNAUTHORIZED
    //   )
    // }
    return true
  }
}
