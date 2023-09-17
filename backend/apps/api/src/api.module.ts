import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import { Module } from '@nestjs/common'
import { GraphQLModule } from '@nestjs/graphql'
import { PubSub } from 'graphql-subscriptions'

import { CoreModule } from '@app/core'
import { BrokerModule } from '@app/infrastructure'

import { ApiController } from './api.controller'
import { ApiResolver } from './api.resolver'

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
      installSubscriptionHandlers: true,
      subscriptions: {
        'subscriptions-transport-ws': true,
        'graphql-ws': true,
      },
    }),
    CoreModule,
    BrokerModule,
  ],
  controllers: [ApiController],
  providers: [ApiResolver, PubSub],
})
export class ApiModule {}
