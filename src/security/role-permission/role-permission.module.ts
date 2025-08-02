import {Module} from '@nestjs/common'
import {TypeOrmModule} from '@nestjs/typeorm'
import {RolePermissionResolver} from './resolvers/role-permission.resolver'
import {RolePermissionService} from './services/role-permission.service'
import {RolePermission} from './entities/role-permission.entity'

@Module({
  imports: [TypeOrmModule.forFeature([RolePermission])],
  exports: [RolePermissionService],
  providers: [RolePermissionService, RolePermissionResolver],
})
export class RolePermisionModule {}
