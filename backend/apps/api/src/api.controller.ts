import { Controller, Get, Logger } from '@nestjs/common'
import { EventPattern } from '@nestjs/microservices'
import { PubSub } from 'graphql-subscriptions'

import { Rate } from './models/rate.model'

@Controller()
export class ApiController {
  private readonly logger = new Logger(ApiController.name)

  constructor(private readonly pubSub: PubSub) {
    //
  }

  /**
   * Health check.
   *
   * @returns {status: 'ok'} - Status
   */
  @Get()
  index() {
    return { status: 'ok' }
  }

  /**
   * Handle rate created event.
   *
   * @param {Rate} rate - Rate
   */
  @EventPattern('rate.created')
  async rateCreated(rate: Rate) {
    this.pubSub.publish('rateAdded', { rateAdded: rate })
  }
}
