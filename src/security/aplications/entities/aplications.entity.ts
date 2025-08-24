import {Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn} from 'typeorm'
import {BaseEntity} from '@/common/domain/entities/base.abstract.entities'
import {Permission} from '../../permission/entities/permission.entity'
import {ModulesAplication} from '../../modules-aplications/entities/modules-aplication.entity'
import {Field, Int, ObjectType} from '@nestjs/graphql'
import {Company} from '../../../account/companys/entities/company.entity'

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

  @Column({
    type: 'boolean',
    default: false,
  })
  @Field(() => Boolean)
  maintenance_mode?: boolean

  @Column({
    type: 'date',
    nullable: false,
  })
  @Field(() => Date)
  publication_date: Date

  @Column({
    type: 'int',
    unique: true,
    unsigned: true,
  })
  @Field(() => Number)
  company_id: number

  @ManyToOne(() => Company, (company) => company.aplications, {
    cascade: true,
    lazy: true,
    persistence: false,
  })
  @JoinColumn([{name: 'company_id', referencedColumnName: 'id_company'}])
  // @Field(() => [Profile], {nullable: true})
  company: Company

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
