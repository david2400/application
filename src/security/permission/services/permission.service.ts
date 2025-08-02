import {HttpException, HttpStatus, Injectable, NotFoundException} from '@nestjs/common'
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
  constructor(
    @InjectRepository(Permission)
    private readonly permissionRepository: Repository<Permission>
  ) {
    super(Permission, PermissionInput)
  }

  protected getRepository(): Repository<Permission> {
    return this.permissionRepository
  }

  async createPermission(permission: CreatePermissionInput): Promise<any> {
    try {
      const newPermission = this.getRepository().create(permission)

      const results = await this.getRepository().save(newPermission)

      const permissionInput = Mapper.create().entityToDto(results, PermissionInput)

      return permissionInput
    } catch (error) {
      return error
    }
  }

  // async delete(id: number): Promise<UpdateResultDto> {
  //   const result = await this.getRepository().softDelete({id: id})

  //   if (result.affected === 0) {
  //     throw new HttpException(
  //       {message: 'The permission does not exist or could not be deleted!'},
  //       HttpStatus.NOT_FOUND
  //     )
  //   }

  //   return result
  // }

  // async restore(id: number) {
  //   const result = await this.getRepository().recover({id: id})

  //   if (result.delete_at === undefined) {
  //     throw new HttpException(
  //       {message: 'The permission does not exist or could not be restored!'},
  //       HttpStatus.NOT_FOUND
  //     )
  //   }

  //   return result
  // }

  async update(id: number, permission: UpdatePermissionInput): Promise<UpdateResultInput> {
    try {
      const newPermission = await this.getRepository().findOneById(id)

      if (!newPermission) {
        throw new HttpException(
          {message: 'The permission does not exist or could not be modify!'},
          HttpStatus.NOT_FOUND
        )
      }

      this.getRepository().merge(newPermission, permission)

      const result = await this.getRepository().update(id, newPermission)

      if (result.affected === 0) {
        throw new NotFoundException('motiveDevolution does not exist or could not be modify')
      }

      return result
    } catch (error) {
      return error
    }
  }

  async findOneByRolename(permission: any): Promise<PermissionInput[]> {
    const permissions = await this.getRepository().find({
      where: {name: permission.name},
    })

    return permissions
  }
}
