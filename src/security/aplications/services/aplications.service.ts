import {HttpException, HttpStatus, Injectable} from '@nestjs/common'
import {GenericService} from '@/common/services'
import {AplicationsInput} from '../dto/aplications.input'
import {UpdateResultInput} from '@/common/domain/dto/update-result.input'
import {CreateAplicationsInput} from '../dto/create-aplication.input'
import {Repository} from 'typeorm'
import {Aplications} from '../entities/aplications.entity'
import {InjectRepository} from '@nestjs/typeorm'
import {UpdateAplicationsInput} from '../dto/update-aplication.input'

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
      const result = await this.findOneByRolename(permission)
      if (result.length != 0) {
        throw new HttpException({message: 'The Aplication already registered!'}, HttpStatus.FOUND)
      }
      const newPermission = this.getRepository().create(permission)

      const results = await this.getRepository().save(newPermission)
      return results
    } catch (error) {
      return error
    }
  }

  // async delete(id: number): Promise<UpdateResultInput> {
  //   const result = await this.getRepository().softDelete({id: id})
  //   if (result.affected === 0) {
  //     throw new HttpException(
  //       {message: 'The Aplication does not exist or could not be deleted!'},
  //       HttpStatus.NOT_FOUND
  //     )
  //   }

  //   return result
  // }

  // async restore(id: number): Promise<AplicationsInput> {
  //   const result = await this.getRepository().recover({id: id})
  //   if (result.delete_at === undefined) {
  //     throw new HttpException(
  //       {message: 'The Aplication does not exist or could not be restored!'},
  //       HttpStatus.NOT_FOUND
  //     )
  //   }

  //   return result
  // }

  async update(id: number, permission: UpdateAplicationsInput): Promise<UpdateResultInput> {
    try {
      const newPermission = this.getRepository().create(permission)

      const result = await this.getRepository().update(id, newPermission)

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

  async findOneByRolename(permission: any): Promise<AplicationsInput[]> {
    const permissions = await this.getRepository().find({
      where: {name: permission.name},
    })

    return permissions
  }

  // async findOne(id: number): Promise<AplicationsInput> {
  //   const permission = await this.getRepository().findOne({
  //     where: {id: id},
  //   })
  //   return permission
  // }

  // async findAll(): Promise<AplicationsInput[]> {
  //   const result = await this.getRepository().find({withDeleted: true})
  //   return result
  // }
}
