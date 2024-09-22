import {Injectable} from '@nestjs/common'
import {InjectRepository} from '@nestjs/typeorm'
import {Repository} from 'typeorm'
import {BaseAbstractRepository} from '@common/class/base.abstract.repository'
import {RolePermission} from '@modules/security/role-permission/entities/role-permission.entity'

@Injectable()
export class RolePermissionRepository extends BaseAbstractRepository<RolePermission> {
  constructor(
    @InjectRepository(RolePermission)
    private readonly rolePermissionRepository: Repository<RolePermission>
  ) {
    super(rolePermissionRepository)
  }
}
