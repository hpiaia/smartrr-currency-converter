import { ConversionService, RateService } from '@app/core'
import { NotFoundException } from '@nestjs/common'
import { Args, Parent, Query, ResolveField, Resolver, Subscription } from '@nestjs/graphql'
import { PubSub } from 'graphql-subscriptions'
import { Conversion } from './models/conversion.model'
import { Rate } from './models/rate.model'

@Resolver(() => Conversion)
export class ApiResolver {
  constructor(
    private readonly pubSub: PubSub,
    private readonly conversionService: ConversionService,
    private readonly rateService: RateService,
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

  @Subscription(() => Rate)
  rateAdded() {
    return this.pubSub.asyncIterator('rateAdded')
  }
}
