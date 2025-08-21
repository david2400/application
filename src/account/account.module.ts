import {Module} from '@nestjs/common'
import {UsersModule} from './users/users.module'
import {ClientsModule} from './clients/clients.module'
import {ProfileModule} from './profile/profile.module'
import {CompanysModule} from './companys/companys.module'

@Module({
  imports: [CompanysModule, ProfileModule, UsersModule, ClientsModule],
  exports: [CompanysModule, ProfileModule, UsersModule],
})
export class AccountModule {}
