import {Column, PrimaryGeneratedColumn} from 'typeorm'

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
