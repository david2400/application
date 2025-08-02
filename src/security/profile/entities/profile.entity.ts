import {Column, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn} from 'typeorm'
import {Role} from '../../role/entities/role.entity'
import {User} from '@/src/account/users/entities/user.entity'
import {BaseEntity} from '@/common/domain/entities/base.abstract.entities'
import {Field, Int, ObjectType} from '@nestjs/graphql'

@Entity('Profile')
@ObjectType()
export class Profile extends BaseEntity {
  @PrimaryGeneratedColumn({type: 'int', unsigned: true, name: 'id'})
  @Field(() => Int)
  id: number

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
  description: string

  @ManyToMany(() => Role, (role) => role.role_profile, {lazy: true, eager: true})
  profile_role: Role[]

  @OneToMany(() => User, (user) => user.profile, {
    eager: true,
    lazy: true,
  })
  user: User[]
}
