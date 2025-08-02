import {TypeOrmModule} from '@nestjs/typeorm'
import {Module} from '@nestjs/common'
import {AplicationsModule} from '../aplications/aplications.module'
import {Permission} from './entities/permission.entity'
import {PermissionService} from './services/permission.service'
import {PermissionResolver} from './resolvers/permission.resolver'

@Module({
  imports: [TypeOrmModule.forFeature([Permission]), AplicationsModule],
  exports: [PermissionService],
  providers: [PermissionService, PermissionResolver],
})
export class PermissionModule {}
