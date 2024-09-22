import {HttpException, HttpStatus, Injectable} from '@nestjs/common'
import {UpdateResult} from 'typeorm'
import {RolePermissionRepository} from '@modules/security/role-permission/repository/role-permission.repository'
import {CreateRolePermissionDto} from '@modules/security/role-permission/dto/create-role-permission.dto'
import {UpdateRolePermissionDto} from '@modules/security/role-permission/dto/update-role-permission.dto'

@Injectable()
export class RolePermissionService {
  constructor(private rolePermissionRepository: RolePermissionRepository) {}

  async create(rolePermision: CreateRolePermissionDto): Promise<any> {
    const result = await this.findOneByRoleAndPermision(
      rolePermision.permission_id,
      rolePermision.role_id
    )
    if (result.length != 0) {
      throw new HttpException(
        {message: 'The role has the permission already registered!'},
        HttpStatus.FOUND
      )
    }
    const newRole = this.rolePermissionRepository.create(rolePermision)

    const results = await this.rolePermissionRepository.save(newRole)

    return results
  }

  async delete(id: number): Promise<UpdateResult> {
    const result = await this.rolePermissionRepository.softDelete({id: id})
    if (result.affected === 0) {
      throw new HttpException(
        {message: 'The role permission does not exist or could not be deleted!'},
        HttpStatus.NOT_FOUND
      )
    }

    return result
  }

  async restore(id: number) {
    const result = await this.rolePermissionRepository.recover({id: id})

    if (result.DeleteAt === undefined) {
      throw new HttpException(
        {message: 'The role permission does not exist or could not be restored!'},
        HttpStatus.NOT_FOUND
      )
    }

    return result
  }

  async update(id: number, rolePermision: UpdateRolePermissionDto): Promise<any> {
    const newRolePermission = await this.findOne(id)

    if (!newRolePermission) {
      throw new HttpException(
        {message: 'The role permission does not exist or could not be modify!'},
        HttpStatus.NOT_FOUND
      )
    }

    this.rolePermissionRepository.merge(newRolePermission, rolePermision)

    const result = await this.rolePermissionRepository.save(newRolePermission)

    return result
  }

  async findOneByRoleAndPermision(idPermission: number, idRole: number) {
    const rolePermision = await this.rolePermissionRepository.find({
      where: {permission: {id: idPermission}, role: {id: idRole}},
    })
    return rolePermision
  }

  async findOne(id: number) {
    const rolePermision = await this.rolePermissionRepository.findOne({
      where: {id: id},
    })
    return rolePermision
  }

  async findAll() {
    const result = await this.rolePermissionRepository.find({withDeleted: true})
    return result
  }
}
