import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm'
// import {Role} from '../../role/entities/role.entity'
import {BaseEntity} from '@/common/domain/entities/base.abstract.entities'
import {Field, Int, ObjectType} from '@nestjs/graphql'
import {Role} from '../../../security/role/entities/role.entity'
import {User} from '@/src/account/users/entities/user.entity'

@Entity('Profile')
@ObjectType()
export class Profile extends BaseEntity {
  @PrimaryGeneratedColumn({type: 'bigint', unsigned: true, name: 'id_profile'})
  @Field(() => Number)
  id_profile: number

  @Column({
    type: 'bigint',
    unique: true,
    unsigned: true,
  })
  @Field(() => Number)
  user_id: number

  @ManyToOne(() => User, (user) => user.profile, {
    cascade: true,
    lazy: true,
    persistence: false,
  })
  @JoinColumn([{name: 'user_id', referencedColumnName: 'id_user'}])
  // @Field(() => [Profile], {nullable: true})
  user: User

  // @OneToMany(() => User, (user) => user.profile, {
  //   eager: true,
  //   lazy: true,
  // })
  // @Field(() => [User])
  // user?: User[]
}
