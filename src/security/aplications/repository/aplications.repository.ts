import {Injectable} from '@nestjs/common'
import {InjectRepository} from '@nestjs/typeorm'
import {Repository} from 'typeorm'
import {BaseAbstractRepository} from '@common/class/base.abstract.repository'
import {Aplications} from '@modules/security/aplications/entities/aplications.entity'

@Injectable()
export class AplicationsRepository extends BaseAbstractRepository<Aplications> {
  constructor(
    @InjectRepository(Aplications)
    private readonly aplicationsRepository: Repository<Aplications>
  ) {
    super(aplicationsRepository)
  }
}
