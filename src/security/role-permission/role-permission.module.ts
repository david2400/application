import {Module} from '@nestjs/common'
import {TypeOrmModule} from '@nestjs/typeorm'
import {RoleModule} from '@modules/security/role/role.module'
import {RolePermission} from '@modules/security/role-permission/entities/role-permission.entity'
import {RolePermissionRepository} from '@modules/security/role-permission/repository/role-permission.repository'
import {RolePermissionService} from '@modules/security/role-permission/services/role-permission.service'
import {RolePermisionController} from '@modules/security/role-permission/controller/role-permission.controller'
import {PermissionModule} from '@modules/security/permission/permission.module'

@Module({
  imports: [TypeOrmModule.forFeature([RolePermission]), RoleModule, PermissionModule],
  exports: [RolePermissionService],
  providers: [RolePermissionService, RolePermissionRepository],
  controllers: [RolePermisionController],
})
export class RolePermisionModule {}
