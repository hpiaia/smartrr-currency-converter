import { TestBed } from '@automock/jest'
import { PubSub } from 'graphql-subscriptions'

import { ConversionService, RateService } from '@app/core'

import { ApiResolver } from './api.resolver'

describe(ApiResolver.name, () => {
  let controller: ApiResolver
  let pubSub: PubSub
  let conversionService: ConversionService
  let rateService: RateService

  beforeAll(async () => {
    const { unit, unitRef } = TestBed.create(ApiResolver).compile()

    controller = unit
    pubSub = unitRef.get(PubSub)
    conversionService = unitRef.get(ConversionService)
    rateService = unitRef.get(RateService)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
    expect(pubSub).toBeDefined()
    expect(conversionService).toBeDefined()
    expect(rateService).toBeDefined()
  })
})
