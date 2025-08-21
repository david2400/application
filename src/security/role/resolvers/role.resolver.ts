import {Resolver, Query, Mutation, Args} from '@nestjs/graphql'
import {RoleService} from '../services/role.service'
import {CreateRoleInput} from '../dto/create-role.input'
import {UpdateRoleInput} from '../dto/update-role.input'
import {RoleInput} from '../dto/role.input'
import {UpdateResultInput} from '@/common/domain/dto/update-result.input'
import {Role} from '../entities/role.entity'

@Resolver(() => Role)
export class RoleResolver {
  constructor(private readonly roleService: RoleService) {}

  @Mutation(() => RoleInput)
  async createRole(@Args('role') createRoleInput: CreateRoleInput) {
    return await this.roleService.createRole(createRoleInput)
  }

  @Query(() => [RoleInput])
  async findAllRole() {
    return await this.roleService.findAll()
  }

  @Query(() => RoleInput)
  async findOneRole(@Args('id') id: number) {
    return await this.roleService.findOne(id)
  }

  @Mutation(() => UpdateResultInput)
  async updateRole(@Args('role') updateRoleInput: UpdateRoleInput) {
    return await this.roleService.updateRole(updateRoleInput.id_role, updateRoleInput)
  }

  @Mutation(() => UpdateResultInput)
  async removeRole(@Args('id') id: number) {
    return await this.roleService.deleteById(id)
  }
}
