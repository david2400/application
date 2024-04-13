import {Module} from '@nestjs/common'
import {TypeOrmModule} from '@nestjs/typeorm'
import {ProfileModule} from '@modules/security/profile/profile.module'
import {User} from '@modules/account/user/entities/user.entity'
import {UserRepository} from '@modules/account/user/repository/user.repository'
import {UserService} from '@modules/account/user/services/user.service'
import {UserController} from '@modules/account/user/controller/user.controller'

@Module({
  imports: [TypeOrmModule.forFeature([User]), ProfileModule],
  providers: [UserService, UserRepository],
  exports: [UserService],
  controllers: [UserController],
})
export class UserModule {}
