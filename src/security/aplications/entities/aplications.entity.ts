import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from 'typeorm'
import {BaseEntity} from '@common/class/entities/base.abstract.entities'
import {Permission} from '@modules/security/permission/entities/permission.entity'

@Entity('Aplications')
export class Aplications extends BaseEntity {
  @PrimaryGeneratedColumn({type: 'int', unsigned: true, name: 'Id'})
  Id: number

  @Column({
    type: 'varchar',
    nullable: false,
  })
  Name: string

  @Column({
    type: 'varchar',
    nullable: false,
  })
  Description: string

  @OneToMany(() => Permission, (permission) => permission.Aplications, {
    lazy: true,
  })
  Permission: Permission[]
}
