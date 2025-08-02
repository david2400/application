import {Module} from '@nestjs/common'
import {AplicationsResolver} from './resolvers/aplications.resolver'
import {AplicationsService} from './services/aplications.service'
import {TypeOrmModule} from '@nestjs/typeorm'
import {Aplications} from './entities/aplications.entity'

@Module({
  imports: [TypeOrmModule.forFeature([Aplications])],
  exports: [AplicationsService],
  providers: [AplicationsService, AplicationsResolver],
})
export class AplicationsModule {}
