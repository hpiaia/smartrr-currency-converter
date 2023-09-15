import { NotFoundException } from '@nestjs/common'
import { Args, Mutation, Parent, Query, ResolveField, Resolver, Subscription } from '@nestjs/graphql'
import { PubSub } from 'graphql-subscriptions'

import { ConversionService, RateService } from '@app/core'
import { BrokerService } from '@app/infrastructure'

import { Conversion } from './models/conversion.model'
import { Rate } from './models/rate.model'

@Resolver(() => Conversion)
export class ApiResolver {
  constructor(
    private readonly pubSub: PubSub,
    private readonly conversionService: ConversionService,
    private readonly rateService: RateService,
    private readonly brokerService: BrokerService,
  ) {
    //
  }

  @Query(() => [Conversion])
  async conversions() {
    return this.conversionService.findAll()
  }

  @Query(() => Conversion)
  async conversion(@Args('id') id: number) {
    const conversion = await this.conversionService.findById(id)

    if (!conversion) {
      throw new NotFoundException()
    }

    return conversion
  }

  @ResolveField('latestRate', () => Rate)
  async latestRate(@Parent() conversion: Conversion) {
    return this.rateService.latestFromConversion(conversion.id)
  }

  @ResolveField('rates', () => [Rate])
  async rates(@Parent() conversion: Conversion) {
    return this.rateService.fromConversion(conversion.id)
  }

  @Subscription(() => Rate, {
    filter: (event: { rateAdded: Rate }, args: { conversionId: number }) =>
      args.conversionId ? event.rateAdded.conversionId === args.conversionId : true,
  })
  rateAdded(@Args('conversionId', { nullable: true }) _?: number) {
    return this.pubSub.asyncIterator('rateAdded')
  }

  @Mutation(() => Conversion)
  async createConversion(@Args('from') from: string, @Args('to') to: string) {
    const conversion = await this.conversionService.create({ from, to })

    this.brokerService.emit('conversionCreated', conversion.id)

    return conversion
  }
}