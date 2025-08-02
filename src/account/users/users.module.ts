import {Module} from '@nestjs/common'
import {UsersResolver} from './resolvers/users.resolver'
import {User} from './entities/user.entity'
import {TypeOrmModule} from '@nestjs/typeorm'
import {UsersService} from './services/users.service'

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  exports: [UsersService],
  providers: [UsersService, UsersResolver],
})
export class UsersModule {}
