import {Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from 'typeorm'
import {BaseEntity} from '@common/class/entities/base.abstract.entities'
import {Permission} from '@modules/security/permission/entities/permission.entity'
import {Role} from '@modules/security/role/entities/role.entity'

@Entity('RolePermission')
export class RolePermission extends BaseEntity {
  @PrimaryGeneratedColumn({type: 'int', unsigned: true, name: 'Id'})
  Id: number

  @Column({
    type: 'varchar',
    nullable: false,
  })
  Level: string

  @ManyToOne(() => Permission, (permission) => permission.RolePermission, {
    cascade: true,
    lazy: true,
  })
  @JoinColumn([{name: 'PermissionId', referencedColumnName: 'Id'}])
  Permission: Permission

  @ManyToOne(() => Role, (role) => role.RolePermission, {
    cascade: true,
    lazy: true,
  })
  @JoinColumn([{name: 'RoleId', referencedColumnName: 'Id'}])
  Role: Role
}
