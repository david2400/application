import {Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn} from 'typeorm'
import {BaseEntity} from '@/common/domain/entities/base.abstract.entities'
import {RolePermission} from '../../role-permission/entities/role-permission.entity'
import {Profile} from '../../../account/profile/entities/profile.entity'
import {Field, ObjectType} from '@nestjs/graphql'
import { User } from '@/src/account/users/entities/user.entity'

@Entity('Role')
@ObjectType()
export class Role extends BaseEntity {
  @PrimaryGeneratedColumn({type: 'int', unsigned: true, name: 'id_role'})
  @Field(() => Number)
  id_role: number

  @Column({
    type: 'varchar',
    nullable: false,
    unique: true,
  })
  @Field(() => String)
  name: string

  @Column({
    type: 'varchar',
    nullable: false,
  })
  @Field(() => String)
  description: string

  @ManyToMany(() => User, (user) => user.user_role, {lazy: true})
  // @Field(() => [Role])
  role_user?: User[]

  @OneToMany(() => RolePermission, (rolePermission) => rolePermission.permission, {
    lazy: true,
  })
  // @Field(() => [RolePermission], {nullable: true})
  role_permission: RolePermission[]
}
