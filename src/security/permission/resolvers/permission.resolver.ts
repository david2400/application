import {Resolver, Query, Mutation, Args} from '@nestjs/graphql'
import {CreatePermissionInput} from '../dto/create-permission.input'
import {UpdatePermissionInput} from '../dto/update-permission.input'
import {PermissionService} from '../services/permission.service'
import {PermissionInput} from '../dto/permission.input'
import {UpdateResultInput} from '@/common/domain/dto/update-result.input'

@Resolver('Permission')
export class PermissionResolver {
  constructor(private readonly permissionService: PermissionService) {}

  @Mutation(() => PermissionInput)
  async createPermission(
    @Args('createPermissionInput') createPermissionInput: CreatePermissionInput
  ) {
    return this.permissionService.createPermission(createPermissionInput)
  }

  @Query(() => [PermissionInput])
  async findAllPermissions() {
    return this.permissionService.findAll()
  }

  @Query(() => PermissionInput)
  async findOnePermission(@Args('id') id: number) {
    return this.permissionService.findOne(id)
  }

  @Mutation(() => UpdateResultInput)
  async updatePermission(
    @Args('updatePermissionInput') updatePermissionInput: UpdatePermissionInput
  ) {
    return this.permissionService.update(updatePermissionInput.id, updatePermissionInput)
  }

  @Mutation(() => UpdateResultInput)
  async removePermission(@Args('id') id: number) {
    return this.permissionService.deleteById(id)
  }
}
