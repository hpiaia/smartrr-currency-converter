import { TestBed } from '@automock/jest'

import { BrokerService, DatabaseService } from '@app/infrastructure'

import { ConversionService } from './conversion.service'

describe(ConversionService.name, () => {
  let service: ConversionService
  let databaseService: DatabaseService
  let brokerService: BrokerService

  beforeAll(async () => {
    const { unit, unitRef } = TestBed.create(ConversionService).compile()

    service = unit
    databaseService = unitRef.get(DatabaseService)
    brokerService = unitRef.get(BrokerService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
    expect(databaseService).toBeDefined()
    expect(brokerService).toBeDefined()
  })
})
