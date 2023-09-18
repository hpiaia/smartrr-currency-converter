import { NotFoundException } from '@nestjs/common'
import { Args, Int, Mutation, Parent, Query, ResolveField, Resolver, Subscription } from '@nestjs/graphql'
import { PubSub } from 'graphql-subscriptions'

import { ConversionService, RateService } from '@app/core'

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

  /**
   * Get all conversions.
   *
   * @returns {Promise<Conversion[]>} - All conversions
   */
  @Query(() => [Conversion])
  async conversions() {
    return this.conversionService.findAll()
  }

  /**
   * Get a conversion by id.
   *
   * @param {number} id - Conversion id
   *
   * @returns {Promise<Conversion>} - Conversion
   */
  @Query(() => Conversion)
  async conversion(@Args('id', { type: () => Int }) id: number) {
    const conversion = await this.conversionService.findById(id)

    if (!conversion) {
      throw new NotFoundException()
    }

    return conversion
  }

  /**
   * Get the latest rate for a conversion.
   *
   * @param {Conversion} conversion - Conversion
   *
   * @returns {Promise<Rate>} - Latest rate
   */
  @ResolveField('latestRate', () => Rate)
  async latestRate(@Parent() conversion: Conversion) {
    return this.rateService.latestFromConversion(conversion.id)
  }

  /**
   * Get all rates for a conversion.
   *
   * @param {Conversion} conversion - Conversion
   *
   * @returns {Promise<Rate[]>} - All rates
   */
  @ResolveField('rates', () => [Rate])
  async rates(@Parent() conversion: Conversion) {
    return this.rateService.fromConversion(conversion.id)
  }

  /**
   * Subscribe to new rates.
   *
   * @param {number} conversionId - Conversion id to filter by
   *
   * @returns {AsyncIterator<Rate>} - New rates
   */
  @Subscription(() => Rate, {
    filter: (event: { rateAdded: Rate }, args: { conversionId: number }) =>
      args.conversionId ? event.rateAdded.conversionId === args.conversionId : true,
  })
  rateAdded(@Args('conversionId', { nullable: true, type: () => Int }) _?: number) {
    return this.pubSub.asyncIterator('rateAdded')
  }

  /**
   * Create a new conversion.
   *
   * @param {string} from - From currency
   * @param {string} to - To currency
   *
   * @returns {Promise<Conversion>} - New conversion
   */
  @Mutation(() => Conversion)
  async createConversion(@Args('from') from: string, @Args('to') to: string) {
    return this.conversionService.create({ from, to })
  }
}
