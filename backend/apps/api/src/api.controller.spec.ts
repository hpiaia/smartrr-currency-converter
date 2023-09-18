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
})
