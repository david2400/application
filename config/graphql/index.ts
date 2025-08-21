import {Module} from '@nestjs/common'
import {GraphQLModule} from '@nestjs/graphql'
import {ApolloDriver, ApolloDriverConfig} from '@nestjs/apollo'
import {ApolloServerPluginLandingPageLocalDefault} from '@apollo/server/plugin/landingPage/default'
import {DirectiveLocation, GraphQLDirective} from 'graphql'

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
      playground: false,
      installSubscriptionHandlers: true,
      buildSchemaOptions: {
        directives: [
          new GraphQLDirective({
            name: 'upper',
            locations: [DirectiveLocation.FIELD_DEFINITION],
          }),
        ],
      },
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
    }),
  ],
})
export class GraphqlModule {}
