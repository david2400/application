import {Resolver, Query, Mutation, Args, Int} from '@nestjs/graphql'
import {ClientInput} from '../dto/client.input'
import {Client} from '../entities/client.entity'
import {UpdateClientInput} from '../dto/update-client.input'
import {CreateClientInput} from '../dto/create-client.input'
import {ClientsService} from '../services/clients.service'
import {UpdateResultInput} from '@/common/domain/dto/update-result.input'

@Resolver(() => Client)
export class ClientsResolver {
  constructor(private readonly clientsService: ClientsService) {}

  @Mutation(() => ClientInput)
  async createClient(@Args('client') createClientInput: CreateClientInput) {
    return await this.clientsService.createClient(createClientInput)
  }

  @Query(() => [ClientInput])
  async findAllClients(): Promise<ClientInput[]> {
    return await this.clientsService.findAll()
  }

  @Query(() => ClientInput)
  async findOneClient(@Args('id', {type: () => Int}) id: number): Promise<ClientInput> {
    return await this.clientsService.findOne(id)
  }

  @Mutation(() => UpdateResultInput)
  async updateClient(
    @Args('client') updateClientInput: UpdateClientInput
  ): Promise<UpdateResultInput> {
    return await this.clientsService.updateClient(updateClientInput.id_client, updateClientInput)
  }

  @Mutation(() => UpdateResultInput)
  async removeClient(@Args('id', {type: () => Int}) id: number): Promise<UpdateResultInput> {
    return await this.clientsService.deleteById(id)
  }
}
