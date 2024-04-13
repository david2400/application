import {Module} from '@nestjs/common'
import {TypeOrmModule} from '@nestjs/typeorm'
import {RoleModule} from '@modules/security/role/role.module'
import {Profile} from '@modules/security/profile/entities/profile.entity'
import {ProfileRepository} from '@modules/security/profile/repository/profile.repository'
import {ProfileService} from '@modules/security/profile/services/profile.service'
import {ProfileController} from '@modules/security/profile/controller/profile.controller'

@Module({
  imports: [TypeOrmModule.forFeature([Profile]), RoleModule],
  providers: [ProfileService, ProfileRepository],
  exports: [ProfileService],
  controllers: [ProfileController],
})
export class ProfileModule {}
