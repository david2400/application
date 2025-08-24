import {BaseEntity} from '@/common/domain/entities/base.abstract.entities'
import {Profile} from '@/src/account/profile/entities/profile.entity'
import {Field, ObjectType} from '@nestjs/graphql'
import * as bcrypt from 'bcrypt'
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm'
import {Client} from '../../clients/entities/client.entity'
import {Role} from '@/src/security/role/entities/role.entity'
import { Company } from '../../companys/entities/company.entity'

@Entity('User')
@ObjectType()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn({type: 'bigint', unsigned: true, name: 'id_user'})
  @Field(() => Number)
  id_user: number

  @Column({
    type: 'varchar',
    nullable: false,
    unique: true,
  })
  @Field(() => String)
  username: string

  @Column({
    type: 'text',
    nullable: false,
  })
  @Field(() => String)
  password: string

  @Column({
    type: 'date',
    nullable: true,
  })
  @Field(() => Date)
  last_login: Date

  @Column({
    type: 'text',
    nullable: true,
  })
  refresh_token: string

  @Column({
    type: 'int',
    unique: true,
    unsigned: true,
  })
  @Field(() => Number)
  company_id: number

  @ManyToOne(() => Company, (company) => company.users, {
    cascade: true,
    lazy: true,
    persistence: false,
  })
  @JoinColumn([{name: 'company_id', referencedColumnName: 'id_company'}])
  // @Field(() => Company)
  company: Company

  @Column({
    type: 'int',
    unique: true,
    unsigned: true,
  })
  @Field(() => Number)
  client_id: number

  @ManyToOne(() => Client, (client) => client.users, {
    cascade: true,
    lazy: true,
    persistence: false,
  })
  @JoinColumn([{name: 'client_id', referencedColumnName: 'id_client'}])
  // @Field(() => Client)
  client: Client

  @OneToMany(() => Profile, (profile) => profile.user, {
    lazy: true,
  })
  // @Field(() => [Permission])
  profile?: Profile[]

  @ManyToMany(() => Role, (role) => role.role_user, {
    cascade: true,
    onUpdate: 'CASCADE',
    lazy: true,
    eager: true,
  })
  @JoinTable({
    name: 'UserRole',
    joinColumn: {
      name: 'user_id',
    },
    inverseJoinColumn: {
      name: 'role_id',
    },
  })
  // @Field(() => [Profile], {nullable: true})
  user_role: Role[]
  //   @BeforeInsert()
  //   @BeforeUpdate()
  //   async hashPassword() {
  //     this.password = await bcrypt.hashSync(this.password, 10)
  //   }
}
