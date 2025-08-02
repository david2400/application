import {ObjectType} from '@nestjs/graphql'
import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm'

@Entity('Company')
@ObjectType()
export class Company {
  @PrimaryGeneratedColumn({type: 'int', unsigned: true, name: 'Id'})
  id: number

  @Column({
    type: 'varchar',
    nullable: false,
  })
  nombre: string

  @Column({
    type: 'varchar',
    nullable: false,
  })
  nit: string
}
