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
      const newRole = this.getRepository().create(rolePermision)

      const results = await this.getRepository().save(newRole)

      const rolePermisionInput = Mapper.create().entityToDto(results, RolePermissionInput)

      return rolePermisionInput
    } catch (error) {
      return error
    }
  }

  // async delete(id: number): Promise<UpdateResultInput> {
  //   const result = await  this.getRepository().softDelete({id: id})
  //   if (result.affected === 0) {
  //     throw new HttpException(
  //       {message: 'The role permission does not exist or could not be deleted!'},
  //       HttpStatus.NOT_FOUND
  //     )
  //   }

  //   return result
  // }

  // async restore(id: number) {
  //   const result = await  this.getRepository().recover({id: id})

  //   if (result.delete_at === undefined) {
  //     throw new HttpException(
  //       {message: 'The role permission does not exist or could not be restored!'},
  //       HttpStatus.NOT_FOUND
  //     )
  //   }

  //   return result
  // }

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

  // async findOneByRoleAndPermision(idPermission: number, idRole: number) {
  //   const rolePermision = await this.getRepository().find({
  //     where: {permission: {id: idPermission}, role: {id: idRole}},
  //   })
  //   return rolePermision
  // }

  // async findOne(id: number) {
  //   const rolePermision = await this.getRepository().findOne({
  //     where: {id: id},
  //   })
  //   return rolePermision
  // }

  // async findAll() {
  //   const result = await  this.getRepository().find({withDeleted: true})
  //   return result
  // }
}
