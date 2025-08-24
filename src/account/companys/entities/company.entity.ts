import {BaseEntity} from '@/common/domain/entities/base.abstract.entities'
import {Field, ObjectType} from '@nestjs/graphql'
import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from 'typeorm'
import {User} from '../../users/entities/user.entity'
import { Aplications } from '@/src/security/aplications/entities/aplications.entity'

@Entity('Company')
@ObjectType()
export class Company extends BaseEntity {
  @PrimaryGeneratedColumn({type: 'int', unsigned: true, name: 'Id'})
  @Field(() => Number)
  id_company: number

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
  nit: string

  @Column({
    type: 'date',
    nullable: false,
  })
  @Field(() => Date)
  active_date: Date

  @OneToMany(() => Aplications, (aplications) => aplications.company, {
    lazy: true,
  })
  // @Field(() => [Permission])
  aplications?: Aplications[]

  @OneToMany(() => User, (user) => user.company, {
    lazy: true,
  })
  // @Field(() => [Permission])
  users?: User[]
}
