import {Column, Entity, JoinColumn, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn} from 'typeorm'
import {BaseEntity} from '@/common/domain/entities/base.abstract.entities'
import {Permission} from '../../permission/entities/permission.entity'
import {Field, Int, ObjectType} from '@nestjs/graphql'
import {Role} from '../../role/entities/role.entity'

@Entity('RolePermission')
@ObjectType()
export class RolePermission extends BaseEntity {
  @Column({
    type: 'varchar',
    nullable: false,
  })
  @Field(() => String)
  level: string

  @PrimaryColumn({type: 'bigint', unsigned: true})
  @Field(() => Number)
  permission_id: number

  @ManyToOne(() => Permission, (permission) => permission.role_permission, {
    cascade: true,
    lazy: true,
    persistence: false,
  })
  @JoinColumn([{name: 'permission_id', referencedColumnName: 'id_permission'}])
  // @Field(() => Permission, {nullable: true})
  permission: Permission

  @PrimaryColumn({type: 'int', unsigned: true, nullable: false})
  @Field(() => Number)
  role_id: number

  @ManyToOne(() => Role, (role) => role.role_permission, {
    cascade: true,
    lazy: true,
    persistence: false,
    nullable: false,
  })
  @JoinColumn([{name: 'role_id', referencedColumnName: 'id_role'}])
  // @Field(() => Role, {nullable: true})
  role: Role
}
