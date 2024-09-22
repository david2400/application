import {CreateDateColumn, DeleteDateColumn, UpdateDateColumn} from 'typeorm'

export class BaseEntity {
  @CreateDateColumn()
  readonly created_at: Date

  @UpdateDateColumn()
  readonly update_at: Date

  @DeleteDateColumn()
  readonly delete_at: Date
}
