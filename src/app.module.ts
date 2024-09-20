import {Module} from '@nestjs/common'
import {ConfigsModule} from '@config/config.module'
import {FiltersModule} from '@common/filters/filters.module'
import {AccountModule} from '@modules/account/account.module'
import {SecurityModule} from '@modules/security/security.module'

@Module({
  providers: [FiltersModule],
  imports: [ConfigsModule, SecurityModule, AccountModule],
})
export class AppModule {}
