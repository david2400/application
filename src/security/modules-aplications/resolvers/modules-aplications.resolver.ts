import {Resolver, Query, Mutation, Args} from '@nestjs/graphql'
import {CreateModulesAplicationInput} from '../dto/create-modules-aplication.input'
import {UpdateModulesAplicationInput} from '../dto/update-modules-aplication.input'
import {ModulesAplicationsService} from '../services/modules-aplications.service'
import {ModulesAplication} from '../entities/modules-aplication.entity'
import {UpdateResultInput} from '@/common/domain/dto/update-result.input'
import {ModulesAplicationInput} from '../dto/modules-aplication.input'

@Resolver(() => ModulesAplication)
export class ModulesAplicationsResolver {
  constructor(private readonly modulesAplicationsService: ModulesAplicationsService) {}

  @Mutation(() => ModulesAplicationInput)
  async createModulesAplication(
    @Args('modulesAplication') createModulesAplicationInput: CreateModulesAplicationInput
  ) {
    return await this.modulesAplicationsService.createModulesAplication(
      createModulesAplicationInput
    )
  }

  @Query(() => ModulesAplicationInput)
  async findAllModulesAplications() {
    return await this.modulesAplicationsService.findAll()
  }

  @Query(() => ModulesAplicationInput)
  async findOneModuleAplication(@Args('id') id: number) {
    return await this.modulesAplicationsService.findOne(id)
  }

  @Mutation(() => UpdateResultInput)
  async updateModuleAplication(
    @Args('modulesAplication') updateModulesAplicationInput: UpdateModulesAplicationInput
  ) {
    return await this.modulesAplicationsService.updateModulesAplication(
      updateModulesAplicationInput.id_modules_aplication,
      updateModulesAplicationInput
    )
  }

  @Mutation(() => UpdateResultInput)
  async removeModuleAplication(@Args('id') id: number) {
    return await this.modulesAplicationsService.deleteById(id)
  }
}
