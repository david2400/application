import {CreateDateColumn, DeleteDateColumn, UpdateDateColumn} from 'typeorm'

export class BaseEntity {
  @CreateDateColumn()
  readonly CreatedAt: Date

  @UpdateDateColumn()
  readonly UpdateAt: Date

  @DeleteDateColumn()
  readonly DeleteAt: Date
}
