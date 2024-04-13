import {Column, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn} from 'typeorm'
import {BaseEntity} from '@common/class/entities/base.abstract.entities'
import {Role} from '@modules/security/role/entities/role.entity'
import {User} from '@modules/account/user/entities/user.entity'

@Entity('Profile')
export class Profile extends BaseEntity {
  @PrimaryGeneratedColumn({type: 'int', unsigned: true, name: 'Id'})
  Id: number

  @Column({
    type: 'varchar',
    nullable: false,
  })
  Name: string

  @Column({
    type: 'varchar',
    nullable: false,
  })
  Description: string

  @ManyToMany(() => Role, (role) => role.RoleProfile, {lazy: true, eager: true})
  ProfileRole: Role[]

  @OneToMany(() => User, (user) => user.Profile, {
    eager: true,
    lazy: true,
  })
  User: User[]
}
