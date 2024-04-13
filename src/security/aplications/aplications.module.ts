import {Module} from '@nestjs/common'
import {TypeOrmModule} from '@nestjs/typeorm'
import {Aplications} from '@modules/security/aplications/entities/aplications.entity'
import {AplicationsRepository} from '@modules/security/aplications/repository/aplications.repository'
import {AplicationsService} from '@modules/security/aplications/services/aplications.service'
import {AplicationsController} from '@modules/security/aplications/controller/aplications.controller'

@Module({
  imports: [TypeOrmModule.forFeature([Aplications])],
  exports: [AplicationsService],
  providers: [AplicationsService, AplicationsRepository],
  controllers: [AplicationsController],
})
export class AplicationsModule {}
