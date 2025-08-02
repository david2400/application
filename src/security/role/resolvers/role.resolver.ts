import {Resolver, Query, Mutation, Args} from '@nestjs/graphql'
import {RoleService} from '../services/role.service'
import {CreateRoleInput} from '../dto/create-role.input'
import {UpdateRoleInput} from '../dto/update-role.input'
import {RoleInput} from '../dto/role.input'
import { UpdateResultInput } from '@/common/domain/dto/update-result.input'

@Resolver('Role')
export class RoleResolver {
  constructor(private readonly roleService: RoleService) {}

  @Mutation(() => RoleInput)
  async create(@Args('role') createRoleInput: CreateRoleInput) {
    return this.roleService.createRole(createRoleInput)
  }

  @Query(() => [RoleInput])
  async findAll() {
    return this.roleService.findAll()
  }

  @Query(() => RoleInput)
  async findOne(@Args('id') id: number) {
    return this.roleService.findOne(id)
  }

  @Mutation(() => UpdateResultInput)
  async update(@Args('role') updateRoleInput: UpdateRoleInput) {
    return this.roleService.updateRole(updateRoleInput.id, updateRoleInput)
  }

  @Mutation(() => UpdateResultInput)
  async remove(@Args('id') id: number) {
    return this.roleService.deleteById(id)
  }
}
