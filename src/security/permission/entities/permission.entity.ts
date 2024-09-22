import {Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn} from 'typeorm'
import {BaseEntity} from '@common/class/base.abstract.entities'
import {Aplications} from '@modules/security/aplications/entities/aplications.entity'
import {RolePermission} from '@modules/security/role-permission/entities/role-permission.entity'

@Entity('Permission')
export class Permission extends BaseEntity {
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
  description: string

  @Column({
    type: 'int',
    nullable: false,
    unsigned: true,
  })
  aplications_id: number

  @ManyToOne(() => Aplications, (aplications) => aplications.permission, {
    cascade: true,
    lazy: true,
    persistence: false,
  })
  @JoinColumn([{name: 'aplications_id', referencedColumnName: 'id'}])
  aplications: Aplications

  @OneToMany(() => RolePermission, (rolePermission) => rolePermission.permission, {
    eager: true,
    lazy: true,
  })
  role_permission: RolePermission[]
}
