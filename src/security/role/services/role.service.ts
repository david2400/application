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
      const newRole: Role = this.getRepository().create(role)

      const results: Role = await this.getRepository().save(newRole)

      const roleInput: RoleInput = Mapper.create().entityToDto(results, RoleInput)

      return roleInput
    } catch (error) {
      return error
    }
  }

  async updateRole(id: number, role: UpdateRoleInput): Promise<UpdateResultInput> {
    try {
      const newRole: Role = await this.getRepository().findOneById(id)
      if (!newRole) {
        throw new HttpException(
          {message: 'The subcategory does not exist or could not be modify!'},
          HttpStatus.NOT_FOUND
        )
      }

      this.getRepository().merge(newRole, role)

      const result: UpdateResult = await this.getRepository().update(id, newRole)
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
}
