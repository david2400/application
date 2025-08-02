import {Module} from '@nestjs/common'
import {ModulesAplicationsModule} from './modules-aplications/modules-aplications.module'
import {ProfileModule} from './profile/profile.module'
import {RoleModule} from './role/role.module'
import {RolePermisionModule} from './role-permission/role-permission.module'
import {PermissionModule} from './permission/permission.module'
import {AplicationsModule} from './aplications/aplications.module'

@Module({
  imports: [
    ProfileModule,
    RoleModule,
    PermissionModule,
    RolePermisionModule,
    AplicationsModule,
    ModulesAplicationsModule,
  ],
  exports: [
    ProfileModule,
    RoleModule,
    PermissionModule,
    RolePermisionModule,
    AplicationsModule,
    ModulesAplicationsModule,
  ],
})
export class SecurityModule {}
