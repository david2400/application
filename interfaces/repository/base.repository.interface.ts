import {DeepPartial, FindManyOptions, FindOneOptions} from 'typeorm'

export interface BaseInterfaceRepository<T> {
  create(data: DeepPartial<T>): T
  createMany(data: DeepPartial<T>[]): T[]
  save(data: DeepPartial<T>): Promise<T>
  saveMany(data: DeepPartial<T>[]): Promise<T[]>
  softDelete(data: DeepPartial<T>)
  findOne(filterCondition: FindOneOptions<T>): Promise<T>
  findOneById(id: number): Promise<T>
  find(options: FindManyOptions<T>): Promise<T[]>
  findByIds(options: T[]): Promise<T[]>
  findWithRelations(relations: FindManyOptions<T>): Promise<T[]>
  recover(data: DeepPartial<T>): Promise<any>
  preload(entityLike: DeepPartial<T>): Promise<T>
}
