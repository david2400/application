import {Column} from 'typeorm'

export class Signin {
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
}
