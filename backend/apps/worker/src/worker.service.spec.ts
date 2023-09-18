import { TestBed } from '@automock/jest'

import { ConversionService, RateService } from '@app/core'

import { WorkerService } from './worker.service'

describe(WorkerService.name, () => {
  let service: WorkerService
  let conversionService: ConversionService
  let rateService: RateService

  beforeAll(async () => {
    const { unit, unitRef } = TestBed.create(WorkerService).compile()

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
