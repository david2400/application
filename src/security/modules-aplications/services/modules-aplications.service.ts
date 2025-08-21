import {HttpException, HttpStatus, Injectable, NotFoundException} from '@nestjs/common'
import {CreateModulesAplicationInput} from '../dto/create-modules-aplication.input'
import {UpdateModulesAplicationInput} from '../dto/update-modules-aplication.input'
import {InjectRepository} from '@nestjs/typeorm'
import {ModulesAplication} from '../entities/modules-aplication.entity'
import {Repository} from 'typeorm'
import {Mapper} from '@/common/mapper'
import {ModulesAplicationInput} from '../dto/modules-aplication.input'
import {GenericService} from '@/common/services'
import { UpdateResultInput } from '@/common/domain/dto/update-result.input'

@Injectable()
export class ModulesAplicationsService extends GenericService<
  ModulesAplication,
  ModulesAplicationInput
> {
  constructor(
    @InjectRepository(ModulesAplication)
    private readonly modulesAplicationRepository: Repository<ModulesAplication>
  ) {
    super(ModulesAplication, ModulesAplicationInput)
  }

  protected getRepository(): Repository<ModulesAplication> {
    return this.modulesAplicationRepository
  }

  async createModulesAplication(
    rolePermision: CreateModulesAplicationInput
  ): Promise<ModulesAplicationInput> {
    try {
      const newRole = this.getRepository().create(rolePermision)

      const results = await this.getRepository().save(newRole)

      const rolePermisionInput = Mapper.create().entityToDto(results, ModulesAplicationInput)

      return rolePermisionInput
    } catch (error) {
      return error
    }
  }

  // async delete(id: number): Promise<UpdateResultInput> {
  //   const result = await  this.getRepository().softDelete({id: id})
  //   if (result.affected === 0) {
  //     throw new HttpException(
  //       {message: 'The role permission does not exist or could not be deleted!'},
  //       HttpStatus.NOT_FOUND
  //     )
  //   }

  //   return result
  // }

  // async restore(id: number) {
  //   const result = await  this.getRepository().recover({id: id})

  //   if (result.delete_at === undefined) {
  //     throw new HttpException(
  //       {message: 'The role permission does not exist or could not be restored!'},
  //       HttpStatus.NOT_FOUND
  //     )
  //   }

  //   return result
  // }

  async updateModulesAplication(
    id: number,
    rolePermision: UpdateModulesAplicationInput
  ): Promise<UpdateResultInput> {
    try {
      const newModulesAplication = await this.getRepository().findOneById(id)

      if (!newModulesAplication) {
        throw new HttpException(
          {message: 'The role permission does not exist or could not be modify!'},
          HttpStatus.NOT_FOUND
        )
      }

      this.getRepository().merge(newModulesAplication, rolePermision)

      const result = await this.getRepository().update(id, newModulesAplication)

      if (result.affected === 0) {
        throw new NotFoundException('motiveDevolution does not exist or could not be modify')
      }

      return result
    } catch (error) {
      return error
    }
  }

}
