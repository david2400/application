import {Resolver, Query, Mutation, Args} from '@nestjs/graphql'
import {CreatePermissionInput} from '../dto/create-permission.input'
import {UpdatePermissionInput} from '../dto/update-permission.input'
import {PermissionService} from '../services/permission.service'
import {PermissionInput} from '../dto/permission.input'
import {UpdateResultInput} from '@/common/domain/dto/update-result.input'
import {Permission} from '../entities/permission.entity'

@Resolver(() => Permission)
export class PermissionResolver {
  constructor(private readonly permissionService: PermissionService) {}

  @Mutation(() => PermissionInput)
  async createPermission(@Args('permission') createPermissionInput: CreatePermissionInput) {
    return await this.permissionService.createPermission(createPermissionInput)
  }

  @Query(() => [PermissionInput])
  async findAllPermissions() {
    return await this.permissionService.findAll()
  }

  @Query(() => PermissionInput)
  async findOnePermission(@Args('id') id: number) {
    return await this.permissionService.findOne(id)
  }

  @Mutation(() => UpdateResultInput)
  async updatePermission(@Args('permission') updatePermissionInput: UpdatePermissionInput) {
    return await this.permissionService.update(
      updatePermissionInput.id_permission,
      updatePermissionInput
    )
  }

  @Mutation(() => UpdateResultInput)
  async removePermission(@Args('id') id: number) {
    return await this.permissionService.deleteById(id)
  }
}
