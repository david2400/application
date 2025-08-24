import {HttpException, HttpStatus, Injectable} from '@nestjs/common'
import {Client} from '../entities/client.entity'
import {GenericService} from '@/common/services'
import {CreateClientInput} from '../dto/create-client.input'
import {InjectRepository} from '@nestjs/typeorm'
import {UpdateClientInput} from '../dto/update-client.input'
import {Repository} from 'typeorm'
import {ClientInput} from '../dto/client.input'
import {UpdateResultInput} from '@/common/domain/dto/update-result.input'

@Injectable()
export class ClientsService extends GenericService<Client, ClientInput> {
  constructor(
    @InjectRepository(Client)
    private readonly clientRepository: Repository<Client>
  ) {
    super(Client, ClientInput)
  }

  protected getRepository(): Repository<Client> {
    return this.clientRepository
  }

  async createClient(client: CreateClientInput) {
    // const result = await this.findOneByEmail(client.email) // || (await this.findOneByUsername(client.username))
    // if (result != null) {
    //   throw new HttpException({message: 'User already registered'}, HttpStatus.NOT_FOUND)
    // }
    const newUser = this.getRepository().create(client)

    const results = await this.getRepository().save(newUser)
    // const sendEmail = await this.sendEmail()

    return results
  }

  //   async findOneByUsername(username: string): Promise<UserInput> {
  //     const client = await this.getRepository().findOne({
  //       relations: {
  //         profile: true,
  //       },
  //       where: {username: username},
  //     })
  //     return client
  //   }

  // async findOneByEmail(email: string): Promise<any> {
  //   const client = await this.getRepository().findOne({
  //     where: {email: email},
  //   })

  //   return client
  // }

  // async getRefreshTokenOfUserId(user_id: number) {
  //   const client = await this.getRepository().findOne({
  //     select: {id: true, username: true, refresh_token: true},
  //     where: {id: user_id},
  //   })

  //   return client
  // }

  async updateClient(id: number, client: UpdateClientInput): Promise<UpdateResultInput> {
    const newUser = await this.getRepository().findOneById(id)
    if (!newUser) {
      throw new HttpException(
        {message: 'client does not exist or could not be modify!'},
        HttpStatus.NOT_FOUND
      )
    }

    this.getRepository().merge(newUser, client)

    const result = await this.getRepository().update(id, newUser)

    return result
  }
}
