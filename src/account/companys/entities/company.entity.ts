import {BaseEntity} from '@/common/domain/entities/base.abstract.entities'
import {ObjectType} from '@nestjs/graphql'
import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from 'typeorm'
import {User} from '../../users/entities/user.entity'

@Entity('Company')
@ObjectType()
export class Company extends BaseEntity {
  @PrimaryGeneratedColumn({type: 'int', unsigned: true, name: 'Id'})
  id_company: number

  @Column({
    type: 'varchar',
    nullable: false,
  })
  name: string

  @Column({
    type: 'varchar',
    nullable: false,
  })
  nit: string

  @Column({
    type: 'date',
  })
  active_date: string

  @OneToMany(() => User, (user) => user.company, {
    lazy: true,
  })
  // @Field(() => [Permission])
  users?: User[]
}
