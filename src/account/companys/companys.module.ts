import {Module} from '@nestjs/common'
import {CompanysResolver} from './resolvers/companys.resolver'
import {CompanysService} from './services/companys.service'

@Module({
  providers: [CompanysResolver, CompanysService],
})
export class CompanysModule {}
