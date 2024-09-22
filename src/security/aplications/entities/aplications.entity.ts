import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from 'typeorm'
import {BaseEntity} from '@common/class/base.abstract.entities'
import {Permission} from '@modules/security/permission/entities/permission.entity'

@Entity('Aplications')
export class Aplications extends BaseEntity {
  @PrimaryGeneratedColumn({type: 'int', unsigned: true, name: 'id'})
  id: number

  @Column({
    type: 'varchar',
    nullable: false,
  })
  name: string

  @Column({
    type: 'varchar',
    nullable: false,
  })
  route: string

  @Column({
    type: 'varchar',
  })
  description: string

  @OneToMany(() => Permission, (permission) => permission.aplications, {
    lazy: true,
  })
  permission: Permission[]
}
