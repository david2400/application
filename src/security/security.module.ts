import {Module} from '@nestjs/common'
import {RoleModule} from '@modules/security/role/role.module'
import {PermissionModule} from '@modules/security/permission/permission.module'
import {RolePermisionModule} from '@modules/security/role-permission/role-permission.module'
import {AplicationsModule} from '@modules/security/aplications/aplications.module'
import {ProfileModule} from '@modules/security/profile/profile.module'

@Module({
  imports: [ProfileModule, RoleModule, PermissionModule, RolePermisionModule, AplicationsModule],
  exports: [ProfileModule, RoleModule, PermissionModule, RolePermisionModule, AplicationsModule],
})
export class SecurityModule {}
