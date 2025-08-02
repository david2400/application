import {Field, Int, ObjectType} from '@nestjs/graphql'
import {Column, Entity, JoinColumn, ManyToOne} from 'typeorm'
import {Aplications} from '../../aplications/entities/aplications.entity'

@Entity('Aplications')
@ObjectType()
export class ModulesAplication {
  @Column({
    type: 'int',
    unique: true,
  })
  @Field(() => Int)
  aplication_id: number

  @ManyToOne(() => Aplications, (aplications) => aplications.modules_aplication, {
    cascade: true,
    lazy: true,
    persistence: false,
  })
  @JoinColumn([{name: 'aplication_id', referencedColumnName: 'id'}])
  aplications: Aplications
}
