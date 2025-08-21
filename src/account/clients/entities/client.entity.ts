import {ObjectType, Field, Int} from '@nestjs/graphql'
import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from 'typeorm'
import {User} from '../../users/entities/user.entity'

@Entity('Client')
@ObjectType()
export class Client {
  @PrimaryGeneratedColumn({type: 'int', unsigned: true, name: 'id_user'})
  id_client: number

  @Column({
    type: 'varchar',
    nullable: false,
  })
  first_name: string

  @Column({
    type: 'varchar',
  })
  second_name?: string

  @Column({
    type: 'varchar',
    nullable: false,
  })
  first_last_name: string

  @Column({
    type: 'varchar',
  })
  second_last_name?: string

  @Column({
    type: 'varchar',
    nullable: false,
    unique: true,
    length: 2,
  })
  type_id: string

  @Column({
    type: 'varchar',
    nullable: false,
    unique: true,
  })
  card_id: string

  @Column({
    type: 'varchar',
    nullable: false,
  })
  email: string

  @Column({
    type: 'varchar',
    nullable: false,
  })
  gender: string

  @Column({
    type: 'varchar',
    nullable: true,
  })
  address: string

  @Column({
    type: 'varchar',
    nullable: true,
  })
  phone: string

  @OneToMany(() => User, (user) => user.client, {
    lazy: true,
  })
  // @Field(() => [Permission])
  users?: User[]
}
