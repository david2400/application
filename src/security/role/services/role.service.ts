import {HttpException, HttpStatus, Injectable} from '@nestjs/common'
import {CreateRoleInput} from '../dto/create-role.input'
import {UpdateRoleInput} from '../dto/update-role.input'
import {DeepPartial, Repository, UpdateResult} from 'typeorm'
import {Role} from '../entities/role.entity'
import {RoleInput} from '../dto/role.input'
import {GenericService} from '@/common/services'
import {InjectRepository} from '@nestjs/typeorm'
import {Mapper} from '@/common/mapper'
import {UpdateResultInput} from '@/common/domain/dto/update-result.input'

@Injectable()
export class RoleService extends GenericService<Role, RoleInput> {
  constructor(
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>
  ) {
    super(Role, RoleInput)
  }

  protected getRepository(): Repository<Role> {
    return this.roleRepository
  }

  async createRole(role: CreateRoleInput): Promise<RoleInput> {
    try {
      const result = await this.findOneByRolename(role)
      if (result.length != 0) {
        throw new HttpException({message: 'The role already registered!'}, HttpStatus.FOUND)
      }
      const newRole = this.getRepository().create(role)

      const results = await this.getRepository().save(newRole)

      const roleInput = Mapper.create().entityToDto(results, RoleInput)

      return roleInput
    } catch (error) {
      return error
    }
  }

  // async delete(id: number): Promise<UpdateResult> {
  //   const result = await this.getRepository().softDelete({id: id})
  //   if (result.affected === 0) {
  //     throw new HttpException(
  //       {message: 'The role does not exist or could not be deleted!'},
  //       HttpStatus.NOT_FOUND
  //     )
  //   }

  //   return result
  // }

  // async restore(id: number) {
  //   const result = await this.getRepository().recover({id: id})
  //   if (result.delete_at === undefined) {
  //     throw new HttpException(
  //       {message: 'The role does not exist or could not be restored!'},
  //       HttpStatus.NOT_FOUND
  //     )
  //   }

  //   return result
  // }

  async updateRole(id: number, role: UpdateRoleInput): Promise<UpdateResultInput> {
    try {
      const newRole = this.getRepository().create(role)
      const result = await this.getRepository().update(id, newRole)
      if (result.affected === 0) {
        throw new HttpException(
          {message: 'The role does not exist or could not be modify!'},
          HttpStatus.NOT_FOUND
        )
      }

      return result
    } catch (error) {
      return error
    }
  }

  async findOneByRolename(role: any) {
    const roles = await this.getRepository().find({
      where: {name: role.name},
    })

    return roles
  }

  // async findOne(id: number) {
  //   const role = await this.getRepository().findOne({
  //     where: {id: id},
  //   })
  //   return role
  // }

  // async findRoleUser(userid: number): Promise<any[]> {
  //   const user = await this.getRepository().findWithRelations({
  //     select: {name: true},
  //     relations: {
  //       permission: true,
  //     },
  //     where: {permission: {id: userid}},
  //   })
  //   return user
  // }

  // async findByIds(roles: DeepPartial<RoleInput[]>) {
  //   const result = await this.getRepository().findByIds(roles)
  //   return result
  // }

  // async findAll() {
  //   const result = await this.getRepository().find({withDeleted: true})
  //   return result
  // }
}
