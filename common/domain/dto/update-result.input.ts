import {Field, Int, ObjectType} from '@nestjs/graphql'
import GraphQLJSON from 'graphql-type-json'

@ObjectType()
export class UpdateResultInput {
  @Field(() => Int, {nullable: true})
  affected?: number

  @Field(() => GraphQLJSON, {nullable: true})
  raw?: any // stringify

  @Field(() => [GraphQLJSON], {nullable: true})
  generatedMaps?: any[] // stringify cada objeto
}
