import {Module} from '@nestjs/common'
import {TypeOrmModule} from '@nestjs/typeorm'
import {RoleModule} from '../role/role.module'
import {ProfileResolver} from './resolvers/profile.resolver'
import {Profile} from './entities/profile.entity'
import {ProfileService} from './services/profile.service'

@Module({
  exports: [ProfileService],
  imports: [TypeOrmModule.forFeature([Profile]), RoleModule],
  providers: [ProfileService, ProfileResolver],
})
export class ProfileModule {}
