import {HttpException, HttpStatus, Injectable} from '@nestjs/common'
import {GenericService} from '@/common/services'
import {AplicationsInput} from '../dto/aplications.input'
import {UpdateResultInput} from '@/common/domain/dto/update-result.input'
import {CreateAplicationsInput} from '../dto/create-aplication.input'
import {Repository} from 'typeorm'
import {Aplications} from '../entities/aplications.entity'
import {InjectRepository} from '@nestjs/typeorm'
import {UpdateAplicationsInput} from '../dto/update-aplication.input'
import {Mapper} from '@/common/mapper'

@Injectable()
export class AplicationsService extends GenericService<Aplications, AplicationsInput> {
  constructor(
    @InjectRepository(Aplications)
    private readonly permissionRepository: Repository<Aplications>
  ) {
    super(Aplications, AplicationsInput)
  }

  protected getRepository(): Repository<Aplications> {
    return this.permissionRepository
  }

  async createAplication(permission: CreateAplicationsInput): Promise<AplicationsInput> {
    try {
      const newAplication: Aplications = this.getRepository().create(permission)

      const results: Aplications = await this.getRepository().save(newAplication)

      const aplicationInput: AplicationsInput = Mapper.create().entityToDto(results, AplicationsInput)

      return aplicationInput
    } catch (error) {
      return error
    }
  }

  async updateAplication(
    id: number,
    aplications: UpdateAplicationsInput
  ): Promise<UpdateResultInput> {
    try {
      const newAplication: Aplications = await this.getRepository().findOneById(id)
      if (!newAplication) {
        throw new HttpException(
          {message: 'The subcategory does not exist or could not be modify!'},
          HttpStatus.NOT_FOUND
        )
      }

      this.getRepository().merge(newAplication, aplications)

      const result = await this.getRepository().update(id, newAplication)

      if (result.affected === 0) {
        throw new HttpException(
          {message: 'The Aplication does not exist or could not be modify!'},
          HttpStatus.NOT_FOUND
        )
      }

      return result
    } catch (error) {
      return error
    }
  }
}
