import {Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn} from 'typeorm'
import {BaseEntity} from '@common/class/base.abstract.entities'
import {Profile} from '@modules/security/profile/entities/profile.entity'
import {RolePermission} from '@modules/security/role-permission/entities/role-permission.entity'

@Entity('Role')
export class Role extends BaseEntity {
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

  @ManyToMany(() => Profile, (profile) => profile.profile_role, {
    cascade: true,
    onUpdate: 'CASCADE',
    lazy: true,
  })
  @JoinTable({
    name: 'RoleProfile',
    joinColumn: {
      name: 'role_id',
    },
    inverseJoinColumn: {
      name: 'profile_id',
    },
  })
  role_profile: Profile[]

  @OneToMany(() => RolePermission, (rolePermission) => rolePermission.permission, {
    eager: true,
    lazy: true,
  })
  role_permission: RolePermission[]
}
