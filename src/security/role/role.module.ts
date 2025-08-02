import {Module} from '@nestjs/common'
import {TypeOrmModule} from '@nestjs/typeorm'
import {RoleResolver} from './resolvers/role.resolver'
import {RoleService} from './services/role.service'
import {Role} from './entities/role.entity'

@Module({
  imports: [TypeOrmModule.forFeature([Role])],
  exports: [RoleService],
  providers: [RoleService, RoleResolver],
})
export class RoleModule {}
