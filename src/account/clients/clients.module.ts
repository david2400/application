import {Module} from '@nestjs/common'
import {TypeOrmModule} from '@nestjs/typeorm'
import {Client} from './entities/client.entity'
import {ClientsService} from './services/clients.service'
import {ClientsResolver} from './resolvers/clients.resolver'

@Module({
  imports: [TypeOrmModule.forFeature([Client])],
  exports: [ClientsService],
  providers: [ClientsService, ClientsResolver],
})
export class ClientsModule {}
