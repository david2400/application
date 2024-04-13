import {Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn} from 'typeorm'
import {BaseEntity} from '@common/class/entities/base.abstract.entities'
import {Profile} from '@modules/security/profile/entities/profile.entity'
import {RolePermission} from '@modules/security/role-permission/entities/role-permission.entity'

@Entity('Role')
export class Role extends BaseEntity {
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

  @ManyToMany(() => Profile, (profile) => profile.ProfileRole, {
    cascade: true,
    onUpdate: 'CASCADE',
    lazy: true,
  })
  @JoinTable({
    name: 'RoleProfile',
    joinColumn: {
      name: 'RoleId',
    },
    inverseJoinColumn: {
      name: 'ProfileId',
    },
  })
  RoleProfile: Profile[]

  @OneToMany(() => RolePermission, (rolePermission) => rolePermission.Permission, {
    eager: true,
    lazy: true,
  })
  RolePermission: RolePermission[]
}
