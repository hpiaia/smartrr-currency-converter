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

  it('should return conversions', async () => {
    await controller.conversions()

    expect(conversionService.findAll).toHaveBeenCalled()
  })

  it('should return a single conversion', () => {
    expect(() => controller.conversion(1)).rejects.toThrow()
    expect(conversionService.findById).toHaveBeenCalledWith(1)
  })

  it('should create a conversion', async () => {
    await controller.createConversion('USD', 'BRL')

    expect(conversionService.create).toHaveBeenCalledWith({ from: 'USD', to: 'BRL' })
  })
})