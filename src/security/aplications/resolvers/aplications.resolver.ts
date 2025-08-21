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

  @Mutation(() => AplicationsInput)
  async createAplications(
    @Args('aplication') createAplicationInput: CreateAplicationsInput
  ): Promise<AplicationsInput> {
    return await this.aplicationsService.createAplication(createAplicationInput)
  }

  @Query(() => [AplicationsInput])
  async findAllAplications(): Promise<AplicationsInput[]> {
    return await this.aplicationsService.findAll()
  }

  @Query(() => AplicationsInput)
  async findOneAplications(@Args('id') id: number): Promise<AplicationsInput> {
    return await this.aplicationsService.findOne(id)
  }

  @Mutation(() => UpdateResultInput)
  async updateAplications(
    @Args('aplication') updateAplicationInput: UpdateAplicationsInput
  ): Promise<UpdateResultInput> {
    return await this.aplicationsService.updateAplication(
      updateAplicationInput.id_aplications,
      updateAplicationInput
    )
  }

  @Mutation(() => UpdateResultInput)
  async removeAplications(@Args('id') id: number): Promise<UpdateResultInput> {
    return await this.aplicationsService.deleteById(id)
  }
}
