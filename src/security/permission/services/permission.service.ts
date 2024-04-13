import {HttpException, HttpStatus, Injectable} from '@nestjs/common'
import {UpdateResult} from 'typeorm'
import {AplicationsService} from '@modules/security/aplications/services/aplications.service'
import {Permission} from '@modules/security/permission/entities/permission.entity'
import {CreatePermissionDto} from '@modules/security/permission/dto/create-permission.dto'
import {UpdatePermissionDto} from '@modules/security/permission/dto/update-permission.dto'
import {PermissionRepository} from '@modules/security/permission/repository/permission.repository'

@Injectable()
export class PermissionService {
  constructor(
    private permissionRepository: PermissionRepository,
    private readonly aplicationService: AplicationsService
  ) {}

  async createPermission(permission: CreatePermissionDto): Promise<any> {
    const result = await this.findOneByRolename(permission)

    if (result.length != 0) {
      throw new HttpException({message: 'The permission already registered!'}, HttpStatus.FOUND)
    }

    const newPermission = this.permissionRepository.create(permission)

    const aplications = await this.aplicationService.findOne(permission.AplicationsId)
    if (!aplications) {
      throw new HttpException({message: 'The aplication does not exist!'}, HttpStatus.NOT_FOUND)
    }
    newPermission.Aplications = aplications

    const results = await this.permissionRepository.save(newPermission)

    return results
  }

  async delete(id: number): Promise<UpdateResult> {
    const result = await this.permissionRepository.softDelete({Id: id})

    if (result.affected === 0) {
      throw new HttpException(
        {message: 'The permission does not exist or could not be deleted!'},
        HttpStatus.NOT_FOUND
      )
    }

    return result
  }

  async restore(id: number) {
    const result = await this.permissionRepository.recover({Id: id})

    if (result.DeleteAt === undefined) {
      throw new HttpException(
        {message: 'The permission does not exist or could not be restored!'},
        HttpStatus.NOT_FOUND
      )
    }

    return result
  }

  async update(id: number, permission: UpdatePermissionDto): Promise<any> {
    const newPermission = await this.findOne(id)

    if (!newPermission) {
      throw new HttpException(
        {message: 'The permission does not exist or could not be modify!'},
        HttpStatus.NOT_FOUND
      )
    }

    if (newPermission.Aplications.Id != permission.AplicationsId) {
      const aplications = await this.aplicationService.findOne(permission.AplicationsId)
      if (!aplications) {
        throw new HttpException({message: 'The aplication does not exist!'}, HttpStatus.NOT_FOUND)
      }
      newPermission.Aplications = aplications
    }

    this.permissionRepository.merge(newPermission, permission)

    const result = await this.permissionRepository.save(newPermission)

    return result
  }

  async findOneByRolename(permission: any): Promise<Permission[]> {
    const permissions = await this.permissionRepository.find({
      where: {Name: permission.Name},
    })

    return permissions
  }

  async findOne(id: number): Promise<Permission> {
    const permission = await this.permissionRepository.findOne({
      where: {Id: id},
    })
    return permission
  }

  async findAll(): Promise<Permission[]> {
    const result = await this.permissionRepository.find({withDeleted: true})
    return result
  }
}
