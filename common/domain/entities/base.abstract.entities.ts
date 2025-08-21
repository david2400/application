import {Field, HideField, Int} from '@nestjs/graphql'
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  UpdateDateColumn,
} from 'typeorm'

export class BaseEntity {
  @Column({
    type: 'bigint',
    nullable: false,
  })
  @Field(() => Number)
  created_usr: number

  @Column({
    type: 'bigint',
    nullable: false,
  })
  @Field(() => Number)
  updated_usr: number

  @CreateDateColumn({
    readonly: true,
  })
  @HideField()
  readonly created_at: Date

  @UpdateDateColumn({
    readonly: true,
  })
  @HideField()
  readonly update_at: Date

  @DeleteDateColumn({
    readonly: true,
  })
  @HideField()
  readonly delete_at: Date

  @BeforeInsert()
  beforeInsert() {
    this.created_usr = 0
  }

  @BeforeUpdate()
  beforeUpdate() {
    this.updated_usr = 0
  }
}
