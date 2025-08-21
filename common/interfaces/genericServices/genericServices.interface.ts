import {UpdateResultInput} from '@/common/domain/dto/update-result.input'

export interface IGenericServices<D> {
  deleteById(id: number): Promise<UpdateResultInput>

  restoreById(id: number): Promise<D>

  findOne(id: number): Promise<D>

  findAll(): Promise<D[]>
}
