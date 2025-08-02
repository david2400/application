import {Resolver, Query, Mutation, Args} from '@nestjs/graphql'
import {UpdateResultInput} from '@/common/domain/dto/update-result.input'
import {CreateAplicationsInput} from '../dto/create-aplication.input'
import {UpdateAplicationsInput} from '../dto/update-aplication.input'
import {AplicationsInput} from '../dto/aplications.input'
import {Aplications} from '../entities/aplications.entity'
import {AplicationsService} from '../services/aplications.service'

@Resolver(() => Aplications)
export class AplicationsResolver {
  constructor(private readonly aplicationsService: AplicationsService) {}

  @Mutation(() => CreateAplicationsInput)
  async createAplications(@Args() createAplicationInput: CreateAplicationsInput) {
    return this.aplicationsService.createAplication(createAplicationInput)
  }

  @Query(() => [AplicationsInput])
  async findAllAplications() {
    return this.aplicationsService.findAll()
  }

  @Query(() => AplicationsInput)
  async findOneAplications(@Args('id') id: number) {
    return this.aplicationsService.findOne(id)
  }

  @Mutation(() => UpdateResultInput)
  async updateAplications(@Args() updateAplicationInput: UpdateAplicationsInput) {
    return this.aplicationsService.update(
      updateAplicationInput.id_aplications,
      updateAplicationInput
    )
  }

  @Mutation(() => UpdateResultInput)
  async removeAplications(@Args('id') id: number) {
    return this.aplicationsService.deleteById(id)
  }
}
