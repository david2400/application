import {Injectable} from '@nestjs/common'
import {InjectRepository} from '@nestjs/typeorm'
import {Repository} from 'typeorm'
import {BaseAbstractRepository} from '@common/repository/base.abstract.repository'
import {Permission} from '@modules/security/permission/entities/permission.entity'

@Injectable()
export class PermissionRepository extends BaseAbstractRepository<Permission> {
  constructor(
    @InjectRepository(Permission)
    private readonly permissionRepository: Repository<Permission>
  ) {
    super(permissionRepository)
  }
}
