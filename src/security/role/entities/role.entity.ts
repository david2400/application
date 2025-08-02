import {Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn} from 'typeorm'
import {BaseEntity} from '@/common/domain/entities/base.abstract.entities'
import {RolePermission} from '../../role-permission/entities/role-permission.entity'
import {Profile} from '../../profile/entities/profile.entity'
import {Field, Int, ObjectType} from '@nestjs/graphql'

@Entity('Role')
@ObjectType()
export class Role extends BaseEntity {
  @PrimaryGeneratedColumn({type: 'int', unsigned: true, name: 'id'})
  @Field(() => Int)
  id_role: number

  @Column({
    type: 'varchar',
    nullable: false,
  })
  @Field(() => String)
  name: string

  @Column({
    type: 'varchar',
    nullable: false,
  })
  @Field(() => String)
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
