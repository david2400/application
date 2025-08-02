import {Module} from '@nestjs/common'
import {CompanysModule} from './companys/companys.module'
import {UsersModule} from './users/users.module'

@Module({
  imports: [CompanysModule, UsersModule],
  exports: [CompanysModule, UsersModule],
})
export class AccountModule {}
