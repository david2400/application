import {HttpException, HttpStatus, Injectable, NotFoundException, Logger} from '@nestjs/common'
import {Permission} from '../entities/permission.entity'
import {PermissionInput} from '../dto/permission.input'
import {GenericService} from '@/common/services'
import {InjectRepository} from '@nestjs/typeorm'
import {Repository} from 'typeorm'
import {UpdatePermissionInput} from '../dto/update-permission.input'
import {CreatePermissionInput} from '../dto/create-permission.input'
import {UpdateResultInput} from '@/common/domain/dto/update-result.input'
import {Mapper} from '@/common/mapper'

@Injectable()
export class PermissionService extends GenericService<Permission, PermissionInput> {
  private readonly logger = new Logger(PermissionService.name)

  constructor(
    @InjectRepository(Permission)
    private readonly permissionRepository: Repository<Permission>
  ) {
    super(Permission, PermissionInput)
  }

  protected getRepository(): Repository<Permission> {
    return this.permissionRepository
  }

  async createPermission(permission: CreatePermissionInput): Promise<PermissionInput> {
    try {
      this.logger.log(`Creating new permission: ${permission.name}`)

      const newPermission = this.getRepository().create(permission)
      const results = await this.getRepository().save(newPermission)

      const permissionInput = Mapper.create().entityToDto(results, PermissionInput)

      this.logger.log(`Permission created successfully with ID: ${results.id_permission}`)
      return permissionInput
    } catch (error) {
      return error
    }
  }

  async update(id: number, permission: UpdatePermissionInput): Promise<UpdateResultInput> {
    try {
      const newPermission = await this.getRepository().findOneById(id)

      if (!newPermission) {
        throw new HttpException(
          {message: 'The permission does not exist or could not be modified!'},
          HttpStatus.NOT_FOUND
        )
      }

      this.getRepository().merge(newPermission, permission)

      const result = await this.getRepository().update(id, newPermission)

      if (result.affected === 0) {
        throw new NotFoundException('Permission does not exist or could not be modified')
      }

      this.logger.log(`Permission updated successfully with ID: ${id}`)
      return result
    } catch (error) {
      return error
    }
  }
}
