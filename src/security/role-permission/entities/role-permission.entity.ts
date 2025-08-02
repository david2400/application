import {Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from 'typeorm'
import {Role} from '../../role/entities/role.entity'
import {BaseEntity} from '@/common/domain/entities/base.abstract.entities'
import {Permission} from '../../permission/entities/permission.entity'
import {Field, Int} from '@nestjs/graphql'

@Entity('RolePermission')
export class RolePermission extends BaseEntity {
  @Column({
    type: 'varchar',
    nullable: false,
  })
  level: string

  @Column({
    type: 'int',
    unique: true,
  })
  @Field(() => Int)
  permission_id: number

  @ManyToOne(() => Permission, (permission) => permission.role_permission, {
    cascade: true,
    lazy: true,
    persistence: false,
  })
  @JoinColumn([{name: 'permission_id', referencedColumnName: 'id'}])
  permission: Permission

  @Column({
    type: 'int',
    unique: true,
  })
  @Field(() => Int)
  role_id: number

  @ManyToOne(() => Role, (role) => role.role_permission, {
    cascade: true,
    lazy: true,
    persistence: false,
  })
  @JoinColumn([{name: 'role_id', referencedColumnName: 'id'}])
  role: Role
}
