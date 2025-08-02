import {Resolver, Query, Mutation, Args} from '@nestjs/graphql'
import {CreateModulesAplicationInput} from '../dto/create-modules-aplication.input'
import {UpdateModulesAplicationInput} from '../dto/update-modules-aplication.input'
import {ModulesAplicationsService} from '../services/modules-aplications.service'

@Resolver('ModulesAplication')
export class ModulesAplicationsResolver {
  constructor(private readonly modulesAplicationsService: ModulesAplicationsService) {}

  @Mutation('createModulesAplication')
  create(
    @Args('createModulesAplicationInput') createModulesAplicationInput: CreateModulesAplicationInput
  ) {
    return this.modulesAplicationsService.create(createModulesAplicationInput)
  }

  @Query('modulesAplications')
  findAll() {
    return this.modulesAplicationsService.findAll()
  }

  @Query('modulesAplication')
  findOne(@Args('id') id: number) {
    return this.modulesAplicationsService.findOne(id)
  }

  @Mutation('updateModulesAplication')
  update(
    @Args('updateModulesAplicationInput') updateModulesAplicationInput: UpdateModulesAplicationInput
  ) {
    return this.modulesAplicationsService.update(
      updateModulesAplicationInput.id,
      updateModulesAplicationInput
    )
  }

  @Mutation('removeModulesAplication')
  remove(@Args('id') id: number) {
    return this.modulesAplicationsService.remove(id)
  }
}
