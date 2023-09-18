import { TestBed } from '@automock/jest'

import { ConversionService, RateService } from '@app/core'

import { ConverterService } from './converter.service'

describe(ConverterService.name, () => {
  let service: ConverterService
  let conversionService: ConversionService
  let rateService: RateService

  beforeAll(async () => {
    const { unit, unitRef } = TestBed.create(ConverterService).compile()

    service = unit
    conversionService = unitRef.get(ConversionService)
    rateService = unitRef.get(RateService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
    expect(conversionService).toBeDefined()
    expect(rateService).toBeDefined()
  })
})
