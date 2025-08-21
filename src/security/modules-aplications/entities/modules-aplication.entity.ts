import {Field, Int, ObjectType} from '@nestjs/graphql'
import {Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn} from 'typeorm'
import {Aplications} from '../../aplications/entities/aplications.entity'
import {Permission} from '../../permission/entities/permission.entity'
import {BaseEntity} from '@/common/domain/entities/base.abstract.entities'

@Entity('ModuleAplications')
@ObjectType()
export class ModulesAplication extends BaseEntity {
  @PrimaryGeneratedColumn({type: 'int', unsigned: true, name: 'id_modules_aplication'})
  @Field(() => Number)
  id_modules_aplication: number

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

  @Column({
    type: 'int',
    unique: true,
    unsigned: true,
  })
  @Field(() => Number)
  aplication_id: number

  @ManyToOne(() => Aplications, (aplications) => aplications.modules_aplication, {
    cascade: true,
    lazy: true,
    persistence: false,
  })
  @JoinColumn([{name: 'aplication_id', referencedColumnName: 'id_aplications'}])
  // @Field(() => Aplications)
  aplications: Aplications

  @OneToMany(() => Permission, (permission) => permission.module_aplication, {
    lazy: true,
  })
  permission: Permission[]
}
