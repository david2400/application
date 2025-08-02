import {Module} from '@nestjs/common'
import {ModulesAplicationsResolver} from './resolvers/modules-aplications.resolver'
import {ModulesAplicationsService} from './services/modules-aplications.service'

@Module({
  providers: [ModulesAplicationsResolver, ModulesAplicationsService],
})
export class ModulesAplicationsModule {}
