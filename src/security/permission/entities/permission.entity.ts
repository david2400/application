import {Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn} from 'typeorm'
import {BaseEntity} from '@common/class/entities/base.abstract.entities'
import {Aplications} from '@modules/security/aplications/entities/aplications.entity'
import {RolePermission} from '@modules/security/role-permission/entities/role-permission.entity'

@Entity('Permission')
export class Permission extends BaseEntity {
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

  @ManyToOne(() => Aplications, (aplications) => aplications.Permission, {
    cascade: true,
    lazy: true,
  })
  @JoinColumn([{name: 'AplicationsId', referencedColumnName: 'Id'}])
  Aplications: Aplications

  @OneToMany(() => RolePermission, (rolePermission) => rolePermission.Permission, {
    eager: true,
    lazy: true,
  })
  RolePermission: RolePermission[]
}
