import {Module} from '@nestjs/common'
import {ModulesAplicationsModule} from './modules-aplications/modules-aplications.module'
// import {ProfileModule} from './profile/profile.module'
import {RolePermisionModule} from './role-permission/role-permission.module'
import {PermissionModule} from './permission/permission.module'
import {AplicationsModule} from './aplications/aplications.module'
import {RoleModule} from './role/role.module'
import {ProfileModule} from '../account/profile/profile.module'

@Module({
  imports: [
    RoleModule,
    AplicationsModule,
    PermissionModule,
    RolePermisionModule,
    ModulesAplicationsModule,
  ],
  exports: [
    RoleModule,
    AplicationsModule,
    PermissionModule,
    RolePermisionModule,
    ModulesAplicationsModule,
  ],
})
export class SecurityModule {}
