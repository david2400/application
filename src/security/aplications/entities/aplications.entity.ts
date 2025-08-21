import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from 'typeorm'
import {BaseEntity} from '@/common/domain/entities/base.abstract.entities'
import {Permission} from '../../permission/entities/permission.entity'
import {ModulesAplication} from '../../modules-aplications/entities/modules-aplication.entity'
import {Field, Int, ObjectType} from '@nestjs/graphql'

@Entity('Aplications')
@ObjectType()
export class Aplications extends BaseEntity {
  @PrimaryGeneratedColumn({type: 'int', unsigned: true, name: 'id_aplications'})
  @Field(() => Number)
  id_aplications: number

  @Column({
    type: 'varchar',
    nullable: false,
    unique: true,
  })
  @Field(() => String)
  name: string

  @Column({
    type: 'text',
  })
  @Field(() => String)
  description?: string

  @Column({
    type: 'varchar',
    nullable: false,
  })
  @Field(() => String)
  route: string

  @OneToMany(() => Permission, (permission) => permission.aplications, {
    lazy: true,
  })
  // @Field(() => [Permission])
  permission?: Permission[]

  @OneToMany(() => ModulesAplication, (modules) => modules.aplications, {
    lazy: true,
  })
  // @Field(() => [ModulesAplication])
  modules_aplication?: ModulesAplication[]
}
