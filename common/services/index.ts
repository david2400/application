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
// import {Mapper} from '../mapper'

@Injectable()
export abstract class GenericService<T, D> implements IGenericServices<D> {
  @Inject(DataSource)
  protected readonly dataSource: DataSource

  constructor(
    @Inject(DataSource)
    private readonly entityClass: EntityTarget<T>,
    private readonly dtoClass: new (...args: any[]) => D
  ) {}

  protected abstract getRepository(): Repository<T>

  getPrimaryGeneratedColumnName(): string | undefined {
    const metadata = this.dataSource.getMetadata(this.entityClass)

    // Encuentra la columna primaria generada
    const primaryGeneratedColumn = metadata.columns.find(
      (column) => column.isPrimary && column.isGenerated
    )

    return primaryGeneratedColumn?.databaseName // <-- Nombre en la base de datos
  }

  async deleteById(id: number): Promise<UpdateResultInput> {
    try {
      const column = this.getPrimaryGeneratedColumnName()
      const where = {[column]: id} as FindOptionsWhere<T>

      const result: UpdateResult = await this.getRepository().softDelete(where)

      if (result.affected === 0) {
        throw new HttpException(
          'MotiveDevolution does not exist or could not be deleted!',
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
      const entity = {[column]: id} as DeepPartial<T>

      const result: T = await this.getRepository().recover(entity)

      if (!result) {
        throw new HttpException(
          {message: 'Register does not exist or could not be restored!'},
          HttpStatus.NOT_FOUND
        )
      }

      const newResult: D = Mapper.create().entityToDto(result, this.dtoClass)

      return newResult
    } catch (error) {
      return error
    }
  }

  async findOne(id: number): Promise<D> {
    const column = this.getPrimaryGeneratedColumnName()
    const entity = await this.getRepository().findOne({
      where: {[column]: id} as FindOptionsWhere<T>,
    })

    const newResult: D = Mapper.create().entityToDto(entity, this.dtoClass)

    return newResult
  }

  async findByIds(entity: DeepPartial<D[]>): Promise<D[]> {
    const result = await this.getRepository().findByIds(entity)

    const newResult: D[] = Mapper.create().convertToListDto(result, this.dtoClass)

    return newResult
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
    const result = await this.getRepository().find({withDeleted: true})

    const newResult: D[] = Mapper.create().convertToListDto(result, this.dtoClass)

    return newResult
  }
}
