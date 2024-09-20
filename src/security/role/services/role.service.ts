import {HttpException, HttpStatus, Injectable} from '@nestjs/common'
import {DeepPartial, UpdateResult} from 'typeorm'
import {RoleRepository} from '@modules/security/role/repository/role.repository'
import {Role} from '@modules/security/role/entities/role.entity'
import {CreateRoleDto} from '@modules/security/role/dto/create-role.dto'
import {UpdateRoleDto} from '@modules/security/role/dto/update-role.input'

@Injectable()
export class RoleService {
  constructor(private roleRepository: RoleRepository) {}

  async createRole(role: CreateRoleDto): Promise<any> {
    const result = await this.findOneByRolename(role)
    if (result.length != 0) {
      throw new HttpException({message: 'The role already registered!'}, HttpStatus.FOUND)
    }
    const newRole = this.roleRepository.create(role)

    const results = await this.roleRepository.save(newRole)

    return results
  }

  async delete(id: number): Promise<UpdateResult> {
    const result = await this.roleRepository.softDelete({id: id})
    if (result.affected === 0) {
      throw new HttpException(
        {message: 'The role does not exist or could not be deleted!'},
        HttpStatus.NOT_FOUND
      )
    }

    return result
  }

  async restore(id: number) {
    const result = await this.roleRepository.recover({id: id})
    if (result.DeleteAt === undefined) {
      throw new HttpException(
        {message: 'The role does not exist or could not be restored!'},
        HttpStatus.NOT_FOUND
      )
    }

    return result
  }

  async update(id: number, role: UpdateRoleDto): Promise<UpdateResult> {
    const newRole = this.roleRepository.create(role)
    const result = await this.roleRepository.update(id, newRole)
    if (result.affected === 0) {
      throw new HttpException(
        {message: 'The role does not exist or could not be modify!'},
        HttpStatus.NOT_FOUND
      )
    }

    return result
  }

  async findOneByRolename(role: any) {
    const roles = await this.roleRepository.find({
      where: {name: role.name},
    })

    return roles
  }

  async findOne(id: number) {
    const role = await this.roleRepository.findOne({
      where: {id: id},
    })
    return role
  }

  // async findRoleUser(userid: number): Promise<any[]> {
  //   const user = await this.roleRepository.findWithRelations({
  //     select: {name: true},
  //     relations: {
  //       permission: true,
  //     },
  //     where: {permission: {id: userid}},
  //   })
  //   return user
  // }

  async findByIds(roles: DeepPartial<Role[]>) {
    const result = await this.roleRepository.findByIds(roles)
    return result
  }

  async findAll() {
    const result = await this.roleRepository.find({withDeleted: true})
    return result
  }
}
