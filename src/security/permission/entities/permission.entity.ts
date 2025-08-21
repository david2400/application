import {Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn} from 'typeorm'
import {BaseEntity} from '@/common/domain/entities/base.abstract.entities'
import {RolePermission} from '../../role-permission/entities/role-permission.entity'
import {Aplications} from '../../aplications/entities/aplications.entity'
import {Field, Int, ObjectType} from '@nestjs/graphql'
import {ModulesAplication} from '../../modules-aplications/entities/modules-aplication.entity'

@Entity('Permission')
@ObjectType()
export class Permission extends BaseEntity {
  @PrimaryGeneratedColumn({type: 'bigint', unsigned: true, name: 'id_permission'})
  @Field(() => Number)
  id_permission: number

  @Column({
    type: 'varchar',
    nullable: false,
    unique: true,
  })
  @Field(() => String)
  name: string

  @Column({
    type: 'varchar',
  })
  @Field(() => String)
  description: string

  @Column({
    type: 'int',
    nullable: false,
    unsigned: true,
  })
  @Field(() => Number)
  aplications_id: number

  @ManyToOne(() => Aplications, (aplications) => aplications.permission, {
    cascade: true,
    lazy: true,
    persistence: false,
  })
  @JoinColumn([{name: 'aplications_id', referencedColumnName: 'id_aplications'}])
  // @Field(() => Aplications)
  aplications: Aplications

  @Column({
    type: 'int',
    unsigned: true,
  })
  @Field(() => Number)
  module_aplication_id?: number

  @ManyToOne(() => ModulesAplication, (moduleAplication) => moduleAplication.permission, {
    cascade: true,
    lazy: true,
    persistence: false,
  })
  @JoinColumn([{name: 'module_aplication_id', referencedColumnName: 'id_modules_aplication'}])
  // @Field(() => ModulesAplication)
  module_aplication?: ModulesAplication

  @OneToMany(() => RolePermission, (rolePermission) => rolePermission.permission, {
    lazy: true,
  })
  role_permission?: RolePermission[]
}
