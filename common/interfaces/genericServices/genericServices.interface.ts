import {UpdateResultInput} from '../domain/dto/update-result.dto'

export interface IGenericServices<D> {
  deleteById(id: number): Promise<UpdateResultInput>

  restoreById(id: number): Promise<D>

  findOne(id: number): Promise<D>

  findAll(): Promise<D[]>
}
