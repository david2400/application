import {HttpException, HttpStatus, Injectable, NotFoundException} from '@nestjs/common'
import {Repository} from 'typeorm'
import {GenericService} from '@/common/services'
import {RolePermission} from '../entities/role-permission.entity'
import {InjectRepository} from '@nestjs/typeorm'
import {RolePermissionInput} from '../dto/role-permission.input'
import {CreateRolePermissionInput} from '../dto/create-role-permission.input'
import {UpdateRolePermissionInput} from '../dto/update-role-permission.input'
import {Mapper} from '@/common/mapper'
import {UpdateResultInput} from '@/common/domain/dto/update-result.input'

@Injectable()
export class RolePermissionService extends GenericService<RolePermission, RolePermissionInput> {
  constructor(
    @InjectRepository(RolePermission)
    private readonly rolePermissionRepository: Repository<RolePermission>
  ) {
    super(RolePermission, RolePermissionInput)
  }

  protected getRepository(): Repository<RolePermission> {
    return this.rolePermissionRepository
  }

  async createRolePermission(
    rolePermision: CreateRolePermissionInput
  ): Promise<RolePermissionInput> {
    try {
      const newRole: RolePermission = this.getRepository().create(rolePermision)

      const results: RolePermission = await this.getRepository().save(newRole)

      const rolePermisionInput: RolePermissionInput = Mapper.create().entityToDto(
        results,
        RolePermissionInput
      )

      return rolePermisionInput
    } catch (error) {
      return error
    }
  }

  async updateRolePermission(
    id: number,
    rolePermision: UpdateRolePermissionInput
  ): Promise<UpdateResultInput> {
    try {
      const newRolePermission = await this.getRepository().findOneById(id)

      if (!newRolePermission) {
        throw new HttpException(
          {message: 'The role permission does not exist or could not be modify!'},
          HttpStatus.NOT_FOUND
        )
      }

      this.getRepository().merge(newRolePermission, rolePermision)

      const result = await this.getRepository().update(id, newRolePermission)

      if (result.affected === 0) {
        throw new NotFoundException('motiveDevolution does not exist or could not be modify')
      }

      return result
    } catch (error) {
      return error
    }
  }
}
