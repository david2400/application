import {HttpException, HttpStatus, Inject, Injectable} from '@nestjs/common'
import {
  Repository,
  //   FindOptionsWhere,
  //   FindManyOptions,
  //   FindOneOptions,
  EntityTarget,
  DataSource,
  FindOptionsWhere,
  DeepPartial,
  UpdateResult,
  // FindManyOptions,
} from 'typeorm'
import {Mapper} from '../mapper'
import {IGenericServices} from '../interfaces/genericServices/genericServices.interface'
import {UpdateResultInput} from '../domain/dto/update-result.input'

@Injectable()
export abstract class GenericService<T, D> implements IGenericServices<D> {
  @Inject(DataSource)
  protected readonly dataSource: DataSource

  // protected readonly logger = new Logger(this.constructor.name)

  constructor(
    @Inject(DataSource)
    private readonly entityClass: EntityTarget<T>,
    private readonly dtoClass: new (...args: any[]) => D
  ) {}

  protected abstract getRepository(): Repository<T>

  getPrimaryGeneratedColumnName(): string | undefined {
    try {
      const metadata = this.dataSource.getMetadata(this.entityClass)
      const primaryGeneratedColumn = metadata.columns.find(
        (column) => column.isPrimary && column.isGenerated
      )
      return primaryGeneratedColumn?.databaseName
    } catch (error) {
      throw new HttpException(
        'Error getting primary column information',
        HttpStatus.INTERNAL_SERVER_ERROR
      )
    }
  }

  async deleteById(id: number): Promise<UpdateResultInput> {
    try {
      const column = this.getPrimaryGeneratedColumnName()
      if (!column) {
        throw new HttpException('Primary column not found', HttpStatus.INTERNAL_SERVER_ERROR)
      }

      const where = {[column]: id} as FindOptionsWhere<T>
      const result: UpdateResult = await this.getRepository().softDelete(where)

      if (result.affected === 0) {
        throw new HttpException(
          'Entity does not exist or could not be deleted!',
          HttpStatus.NOT_FOUND
        )
      }
      return result
    } catch (error) {
      return error
    }
  }

  async restoreById(id: number): Promise<D> {
    try {
      const column = this.getPrimaryGeneratedColumnName()
      if (!column) {
        throw new HttpException('Primary column not found', HttpStatus.INTERNAL_SERVER_ERROR)
      }

      const entity = {[column]: id} as DeepPartial<T>
      const result: T = await this.getRepository().recover(entity)

      if (!result) {
        throw new HttpException(
          {message: 'Entity does not exist or could not be restored!'},
          HttpStatus.NOT_FOUND
        )
      }

      return Mapper.create().entityToDto(result, this.dtoClass)
    } catch (error) {
      return error
    }
  }

  async findOne(id: number): Promise<D> {
    try {
      const column = this.getPrimaryGeneratedColumnName()
      if (!column) {
        throw new HttpException('Primary column not found', HttpStatus.INTERNAL_SERVER_ERROR)
      }

      const entity = await this.getRepository().findOne({
        where: {[column]: id} as FindOptionsWhere<T>,
      })

      if (!entity) {
        throw new HttpException('Entity not found', HttpStatus.NOT_FOUND)
      }

      return Mapper.create().entityToDto(entity, this.dtoClass)
    } catch (error) {
      return error
    }
  }

  async findByIds(ids: number[]): Promise<D[]> {
    try {
      if (!ids || ids.length === 0) {
        return []
      }

      const result = await this.getRepository().findByIds(ids)
      return Mapper.create().convertToListDto(result, this.dtoClass)
    } catch (error) {
      return error
    }
  }

  //   async getAllPaginable(
  //     page = 0,
  //     size = 10,
  //     sort: keyof T = 'id' as keyof T,
  //     order: 'ASC' | 'DESC' = 'ASC'
  //   ): Promise<{data: T[]; total: number}> {
  //     const [data, total] = await this.getRepository().findAndCount({
  //       skip: page * size,
  //       take: size,
  //       order: {[sort]: order},
  //     } as FindManyOptions<T>)

  //     return {data, total}
  //   }

  async findAll(): Promise<D[]> {
    try {
      const result = await this.getRepository().find({withDeleted: true})
      return Mapper.create().convertToListDto(result, this.dtoClass)
    } catch (error) {
      return error
    }
  }
}
