import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  BeforeInsert,
  BeforeUpdate,
  ManyToOne,
  JoinColumn,
} from 'typeorm'
import * as bcrypt from 'bcrypt'
import {BaseEntity} from '@common/class/entities/base.abstract.entities'
import {Profile} from '@modules/security/profile/entities/profile.entity'

@Entity('User')
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
    type: 'varchar',
    nullable: false,
  })
  username: string

  @Column({
    type: 'varchar',
    nullable: false,
  })
  password: string

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

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    this.password = await bcrypt.hashSync(this.password, 10)
  }
}
