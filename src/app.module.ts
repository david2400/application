import {Module} from '@nestjs/common'
import {FiltersModule} from '@common/filters/filters.module'
import {AccountModule} from '@modules/account/account.module'
import {SecurityModule} from '@modules/security/security.module'

@Module({
  providers: [FiltersModule],
  imports: [SecurityModule, AccountModule],
})
export class AppModule {}
