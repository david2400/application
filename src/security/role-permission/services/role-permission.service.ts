import {HttpException, HttpStatus, Injectable} from '@nestjs/common'
import {UpdateResult} from 'typeorm'
import {RoleService} from '@modules/security/role/services/role.service'
import {PermissionService} from '@modules/security/permission/services/permission.service'
import {RolePermissionRepository} from '@modules/security/role-permission/repository/role-permission.repository'
import {CreateRolePermissionDto} from '@modules/security/role-permission/dto/create-role-permission.dto'
import {UpdateRolePermissionDto} from '@modules/security/role-permission/dto/update-role-permission.dto'

@Injectable()
export class RolePermissionService {
  constructor(
    private rolePermissionRepository: RolePermissionRepository,
    private permissionService: PermissionService,
    private roleService: RoleService
  ) {}

  async create(rolePermision: CreateRolePermissionDto): Promise<any> {
    const result = await this.findOneByRoleAndPermision(
      rolePermision.PermissionId,
      rolePermision.RoleId
    )
    if (result.length != 0) {
      throw new HttpException(
        {message: 'The role has the permission already registered!'},
        HttpStatus.FOUND
      )
    }
    const newRole = this.rolePermissionRepository.create(rolePermision)

    if (rolePermision.PermissionId) {
      const permission = await this.permissionService.findOne(rolePermision.PermissionId)
      if (!permission) {
        throw new HttpException({message: 'The permission does not exist!'}, HttpStatus.NOT_FOUND)
      }
      newRole.Permission = permission
    }

    if (rolePermision.RoleId) {
      const role = await this.roleService.findOne(rolePermision.RoleId)
      if (!role) {
        throw new HttpException({message: 'The role does not exist!'}, HttpStatus.NOT_FOUND)
      }
      newRole.Role = role
    }

    const results = await this.rolePermissionRepository.save(newRole)
    return results
  }

  async delete(id: number): Promise<UpdateResult> {
    const result = await this.rolePermissionRepository.softDelete({Id: id})
    if (result.affected === 0) {
      throw new HttpException(
        {message: 'The role permission does not exist or could not be deleted!'},
        HttpStatus.NOT_FOUND
      )
    }

    return result
  }

  async restore(id: number) {
    const result = await this.rolePermissionRepository.recover({Id: id})

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

    if (newRolePermission.Permission.Id != rolePermision.PermissionId) {
      const permission = await this.permissionService.findOne(rolePermision.PermissionId)
      if (!permission) {
        throw new HttpException({message: 'The permission does not exist!'}, HttpStatus.NOT_FOUND)
      }
      newRolePermission.Permission = permission
    }

    if (newRolePermission.Permission.Id != rolePermision.RoleId) {
      const role = await this.roleService.findOne(rolePermision.RoleId)
      if (!role) {
        throw new HttpException({message: 'The role does not exist!'}, HttpStatus.NOT_FOUND)
      }
      newRolePermission.Role = role
    }

    this.rolePermissionRepository.merge(newRolePermission, rolePermision)

    const result = await this.rolePermissionRepository.save(newRolePermission)

    return result
  }

  async findOneByRoleAndPermision(idPermission: number, idRole: number) {
    const rolePermision = await this.rolePermissionRepository.find({
      where: {Permission: {Id: idPermission}, Role: {Id: idRole}},
    })
    return rolePermision
  }

  async findOne(id: number) {
    const rolePermision = await this.rolePermissionRepository.findOne({
      where: {Id: id},
    })
    return rolePermision
  }

  async findAll() {
    const result = await this.rolePermissionRepository.find({withDeleted: true})
    return result
  }
}
