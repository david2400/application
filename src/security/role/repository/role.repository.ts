import {Injectable} from '@nestjs/common'
import {InjectRepository} from '@nestjs/typeorm'
import {Repository} from 'typeorm'
import {BaseAbstractRepository} from '@common/class/base.abstract.repository'
import {Role} from '@modules/security/role/entities/role.entity'

@Injectable()
export class RoleRepository extends BaseAbstractRepository<Role> {
  constructor(
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>
  ) {
    super(roleRepository)
  }
}
