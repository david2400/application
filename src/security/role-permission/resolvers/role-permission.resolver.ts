import {Resolver, Query, Mutation, Args} from '@nestjs/graphql'
import {CreateRolePermissionInput} from '../dto/create-role-permission.input'
import {UpdateRolePermissionInput} from '../dto/update-role-permission.input'
import {RolePermissionService} from '../services/role-permission.service'
import {RolePermissionInput} from '../dto/role-permission.input'
import {UpdateResult} from 'typeorm'

@Resolver('RolePermission')
export class RolePermissionResolver {
  constructor(private readonly rolePermissionService: RolePermissionService) {}

  @Mutation(() => RolePermissionInput)
  async createRolePermission(
    @Args('rolePermission') createRolePermissionInput: CreateRolePermissionInput
  ) {
    return this.rolePermissionService.createRolePermission(createRolePermissionInput)
  }

  @Query(() => [RolePermissionInput])
  async findAllRolePermission() {
    return this.rolePermissionService.findAll()
  }

  @Query(() => RolePermissionInput)
  async findOneRolePermission(@Args('id') id: number) {
    return this.rolePermissionService.findOne(id)
  }

  @Mutation(() => UpdateResult)
  async updateRolePermission(
    @Args('rolePermission') updateRolePermissionInput: UpdateRolePermissionInput
  ) {
    return this.rolePermissionService.updateRolePermission(
      updateRolePermissionInput.id,
      updateRolePermissionInput
    )
  }

  @Mutation('removeRolePermission')
  async removeRolePermission(@Args('id') id: number) {
    return this.rolePermissionService.deleteById(id)
  }
}
