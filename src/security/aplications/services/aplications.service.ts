import {HttpException, HttpStatus, Injectable} from '@nestjs/common'
import {UpdateResult} from 'typeorm'
import {Aplications} from '@modules/security/aplications/entities/aplications.entity'
import {CreateAplicationsDto} from '@modules/security/aplications/dto/create-aplications.dto'
import {UpdateAplicationsDto} from '@modules/security/aplications/dto/update-aplications.dto'
import {AplicationsRepository} from '@modules/security/aplications/repository/aplications.repository'

@Injectable()
export class AplicationsService {
  constructor(private permissionRepository: AplicationsRepository) {}

  async createAplication(permission: CreateAplicationsDto): Promise<any> {
    const result = await this.findOneByRolename(permission)
    if (result.length != 0) {
      throw new HttpException({message: 'The Aplication already registered!'}, HttpStatus.FOUND)
    }
    const newPermission = this.permissionRepository.create(permission)

    const results = await this.permissionRepository.save(newPermission)
    return results
  }

  async delete(id: number): Promise<UpdateResult> {
    const result = await this.permissionRepository.softDelete({id: id})
    if (result.affected === 0) {
      throw new HttpException(
        {message: 'The Aplication does not exist or could not be deleted!'},
        HttpStatus.NOT_FOUND
      )
    }

    return result
  }

  async restore(id: number) {
    const result = await this.permissionRepository.recover({id: id})
    if (result.DeleteAt === undefined) {
      throw new HttpException(
        {message: 'The Aplication does not exist or could not be restored!'},
        HttpStatus.NOT_FOUND
      )
    }

    return result
  }

  async update(id: number, permission: UpdateAplicationsDto): Promise<UpdateResult> {
    const newPermission = this.permissionRepository.create(permission)

    const result = await this.permissionRepository.update(id, newPermission)

    if (result.affected === 0) {
      throw new HttpException(
        {message: 'The Aplication does not exist or could not be modify!'},
        HttpStatus.NOT_FOUND
      )
    }

    return result
  }

  async findOneByRolename(permission: any): Promise<Aplications[]> {
    const permissions = await this.permissionRepository.find({
      where: {name: permission.name},
    })

    return permissions
  }

  async findOne(id: number): Promise<Aplications> {
    const permission = await this.permissionRepository.findOne({
      where: {id: id},
    })
    return permission
  }

  async findAll(): Promise<Aplications[]> {
    const result = await this.permissionRepository.find({withDeleted: true})
    return result
  }
}
