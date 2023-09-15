import { CoreModule } from '@app/core'
import { BrokerModule } from '@app/infrastructure'
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import { Module } from '@nestjs/common'
import { GraphQLModule } from '@nestjs/graphql'
import { PubSub } from 'graphql-subscriptions'
import { ApiResolver } from './api.resolver'
import { ApiController } from './api.controller'

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
      installSubscriptionHandlers: true,
    }),
    CoreModule,
    BrokerModule,
  ],
  controllers: [ApiController],
  providers: [ApiResolver, PubSub],
})
export class ApiModule {}
