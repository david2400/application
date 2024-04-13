import {DeepPartial, FindManyOptions, FindOneOptions, Repository, UpdateResult} from 'typeorm'
import {BaseInterfaceRepository} from '@common/interface/repository/base.repository.interface'

interface HasId {
  Id: any
}

export abstract class BaseAbstractRepository<T extends HasId>
  implements BaseInterfaceRepository<T>
{
  private entity: Repository<T>

  constructor(entity: Repository<T>) {
    this.entity = entity
  }

  create(data: DeepPartial<T>): T {
    return this.entity.create(data)
  }

  createMany(data: DeepPartial<T>[]): T[] {
    return this.entity.create(data)
  }

  merge(entity: T, dto: any): T {
    return this.entity.merge(entity, dto)
  }

  async softDelete(data: DeepPartial<T>): Promise<UpdateResult> {
    return await this.entity.softDelete(data)
  }

  async save(data: DeepPartial<T>): Promise<T> {
    return await this.entity.save(data)
  }

  async saveMany(data: DeepPartial<T>[]): Promise<T[]> {
    return await this.entity.save(data)
  }

  async update(id: any, data: DeepPartial<T>): Promise<UpdateResult> {
    const updateResult: UpdateResult = await this.entity.update(id, data)
    return updateResult
  }

  async recover(data: DeepPartial<T>): Promise<any> {
    return await this.entity.recover(data)
  }

  async findOneById(id: any): Promise<T> {
    const options: FindOneOptions<T> = {
      where: {Id: id},
    }

    return await this.entity.findOne(options)
  }

  async findOne(filterCondition: FindOneOptions<T>): Promise<T> {
    return await this.entity.findOne(filterCondition)
  }

  async findWithRelations(relations: FindManyOptions<T>): Promise<T[]> {
    return await this.entity.find(relations)
  }

  async find(options?: FindManyOptions<T>): Promise<T[]> {
    return await this.entity.find(options)
  }

  async findByIds(options: DeepPartial<T[]>): Promise<T[]> {
    return await this.entity.findByIds(options)
  }

  async preload(entityLike: DeepPartial<T>): Promise<T> {
    return await this.entity.preload(entityLike)
  }

  async query(sentency: string, parametres: Array<any>): Promise<T> {
    return await this.entity.query(sentency, parametres)
  }
}
