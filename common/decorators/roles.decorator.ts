import {SetMetadata} from '@nestjs/common'
import {ROLES_KEY} from '@/constants'
import {Role} from '@common/enums/role.enum'

export const hasRoles = (...roles: Role[]) => {
  return SetMetadata(ROLES_KEY, roles)
}
