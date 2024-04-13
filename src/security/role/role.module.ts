import {Module} from '@nestjs/common'
import {TypeOrmModule} from '@nestjs/typeorm'
import {Role} from '@modules/security/role/entities/role.entity'
import {RoleRepository} from '@modules/security/role/repository/role.repository'
import {RoleService} from '@modules/security/role/services/role.service'
import {RoleController} from '@modules/security/role/controller/role.controller'

@Module({
  imports: [TypeOrmModule.forFeature([Role])],
  exports: [RoleService],
  providers: [RoleService, RoleRepository],
  controllers: [RoleController],
})
export class RoleModule {}
