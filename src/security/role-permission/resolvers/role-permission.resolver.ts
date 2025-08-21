import {Resolver, Query, Mutation, Args} from '@nestjs/graphql'
import {CreateRolePermissionInput} from '../dto/create-role-permission.input'
import {RolePermissionService} from '../services/role-permission.service'
import {RolePermissionInput} from '../dto/role-permission.input'
import {UpdateResultInput} from '@/common/domain/dto/update-result.input'
import {RolePermission} from '../entities/role-permission.entity'

@Resolver(() => RolePermission)
export class RolePermissionResolver {
  constructor(private readonly rolePermissionService: RolePermissionService) {}

  @Mutation(() => RolePermissionInput)
  async createRolePermission(
    @Args('rolePermission') createRolePermissionInput: CreateRolePermissionInput
  ) {
    return await this.rolePermissionService.createRolePermission(createRolePermissionInput)
  }

  @Query(() => [RolePermissionInput])
  async findAllRolePermission() {
    return await this.rolePermissionService.findAll()
  }

  @Query(() => RolePermissionInput)
  async findOneRolePermission(@Args('id') id: number) {
    return await this.rolePermissionService.findOne(id)
  }

  // @Mutation(() => UpdateResultInput)
  // async updateRolePermission(
  //   @Args('rolePermission') updateRolePermissionInput: UpdateRolePermissionInput
  // ) {
  //   return await this.rolePermissionService.updateRolePermission(
  //     updateRolePermissionInput.,
  //     updateRolePermissionInput
  //   )
  // }

  @Mutation(() => UpdateResultInput)
  async removeRolePermission(@Args('id') id: number) {
    return await this.rolePermissionService.deleteById(id)
  }
}
