import {BaseEntity} from '@/common/domain/entities/base.abstract.entities'
import {Profile} from '@/src/security/profile/entities/profile.entity'
import { ObjectType } from '@nestjs/graphql'
import * as bcrypt from 'bcrypt'
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm'

@Entity('User')
@ObjectType()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn({type: 'int', unsigned: true, name: 'id'})
  id: number

  @Column({
    type: 'varchar',
    nullable: false,
  })
  name: string

  @Column({
    type: 'varchar',
    nullable: false,
  })
  last_name: string

  @Column({
    type: 'varchar',
    nullable: false,
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

  @Column({
    type: 'text',
    nullable: true,
  })
  refresh_token: string

  @ManyToOne(() => Profile, (profile) => profile.user, {
    cascade: true,
    lazy: true,
  })
  @JoinColumn([{name: 'profile_id', referencedColumnName: 'id'}])
  profile: Profile

  // @BeforeInsert()
  // @BeforeUpdate()
  // async hashPassword() {
  //   this.password = await bcrypt.hashSync(this.password, 10)
  // }
}
