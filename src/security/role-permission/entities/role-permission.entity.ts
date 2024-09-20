import {Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from 'typeorm'
import {BaseEntity} from '@common/class/entities/base.abstract.entities'
import {Permission} from '@modules/security/permission/entities/permission.entity'
import {Role} from '@modules/security/role/entities/role.entity'

@Entity('RolePermission')
export class RolePermission extends BaseEntity {
  @PrimaryGeneratedColumn({type: 'int', unsigned: true, name: 'id'})
  id: number

  @Column({
    type: 'varchar',
    nullable: false,
  })
  level: string

  @ManyToOne(() => Permission, (permission) => permission.role_permission, {
    cascade: true,
    lazy: true,
    persistence: true,
  })
  @JoinColumn([{name: 'permission_id', referencedColumnName: 'id'}])
  permission: Permission

  @ManyToOne(() => Role, (role) => role.role_permission, {
    cascade: true,
    lazy: true,
    persistence: true,
  })
  @JoinColumn([{name: 'role_id', referencedColumnName: 'id'}])
  role: Role
}
