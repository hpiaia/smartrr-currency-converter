import { TestBed } from '@automock/jest'
import { PubSub } from 'graphql-subscriptions'

import { ApiController } from './api.controller'

describe(ApiController.name, () => {
  let controller: ApiController
  let pubSub: PubSub

  beforeAll(async () => {
    const { unit, unitRef } = TestBed.create(ApiController).compile()

    controller = unit
    pubSub = unitRef.get(PubSub)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
    expect(pubSub).toBeDefined()
  })

  it('should return status ok on index', () => {
    expect(controller.index()).toEqual({ status: 'ok' })
  })

  it('should publish rateAdded when rate.created is received', async () => {
    const rate = {
      id: 1,
      conversionId: 1,
      amount: 1,
      date: new Date(),
    }

    await controller.rateCreated(rate)

    expect(pubSub.publish).toHaveBeenCalledWith('rateAdded', { rateAdded: rate })
  })
})