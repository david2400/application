import {Module} from '@nestjs/common'
import {CompanysResolver} from './resolvers/companys.resolver'
import {CompanysService} from './services/companys.service'
import {Company} from './entities/company.entity'
import {TypeOrmModule} from '@nestjs/typeorm'

@Module({
  imports: [TypeOrmModule.forFeature([Company])],
  exports: [CompanysService],
  providers: [CompanysResolver, CompanysService],
})
export class CompanysModule {}
