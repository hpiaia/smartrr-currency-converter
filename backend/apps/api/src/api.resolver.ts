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

  @ResolveField('rates', () => [Rate])
  async rates(@Parent() conversion: Conversion) {
    return this.rateService.fromConversion(conversion.id)
  }

  @Subscription(() => Rate, {
    filter: ({ rateAdded }: { rateAdded: Rate }, { conversionId }: { conversionId: number }) =>
      rateAdded.conversionId === conversionId,
  })
  rateAdded(@Args('conversionId') _: number) {
    return this.pubSub.asyncIterator('rateAdded')
  }

  @Mutation(() => Conversion)
  async createConversion(@Args('from') from: string, @Args('to') to: string) {
    const conversion = await this.conversionService.create({ from, to })

    this.brokerService.emit('conversionCreated', conversion.id)

    return conversion
  }
}
