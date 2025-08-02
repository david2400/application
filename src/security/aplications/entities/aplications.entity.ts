import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from 'typeorm'
import {BaseEntity} from '@/common/domain/entities/base.abstract.entities'
import {Permission} from '../../permission/entities/permission.entity'
import {ModulesAplication} from '../../modules-aplications/entities/modules-aplication.entity'
import {Field, Int, ObjectType} from '@nestjs/graphql'

@Entity('Aplications')
@ObjectType()
export class Aplications extends BaseEntity {
  @PrimaryGeneratedColumn({type: 'int', unsigned: true, name: 'id'})
  @Field(() => Int)
  id_aplications: number

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
  route: string

  @Column({
    type: 'varchar',
  })
  @Field(() => String)
  description: string

  @OneToMany(() => Permission, (permission) => permission.aplications, {
    lazy: true,
  })
  permission: Permission[]

  @OneToMany(() => ModulesAplication, (modules) => modules.aplications, {
    eager: true,
    lazy: true,
  })
  modules_aplication: ModulesAplication[]
}
