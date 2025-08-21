import {Module} from '@nestjs/common'
import {ModulesAplicationsResolver} from './resolvers/modules-aplications.resolver'
import {ModulesAplicationsService} from './services/modules-aplications.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ModulesAplication } from './entities/modules-aplication.entity'

@Module({
  imports: [TypeOrmModule.forFeature([ModulesAplication])],
  exports: [ModulesAplicationsService],
  providers: [ModulesAplicationsResolver, ModulesAplicationsService],
})
export class ModulesAplicationsModule {}
