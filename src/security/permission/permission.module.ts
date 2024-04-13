import {Module} from '@nestjs/common'
import {TypeOrmModule} from '@nestjs/typeorm'
import {AplicationsModule} from '@modules/security/aplications/aplications.module'
import {Permission} from '@modules/security/permission/entities/permission.entity'
import {PermissionRepository} from '@modules/security/permission/repository/permission.repository'
import {PermissionService} from '@modules/security/permission/services/permission.service'
import {PermissionController} from '@modules/security/permission/controller/permission.controller'

@Module({
  imports: [TypeOrmModule.forFeature([Permission]), AplicationsModule],
  exports: [PermissionService],
  providers: [PermissionService, PermissionRepository],
  controllers: [PermissionController],
})
export class PermissionModule {}
