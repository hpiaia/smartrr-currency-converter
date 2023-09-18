import { TestBed } from '@automock/jest'

import { BrokerService, DatabaseService } from '@app/infrastructure'

import { RateService } from './rate.service'

describe(RateService.name, () => {
  let service: RateService
  let databaseService: DatabaseService
  let brokerService: BrokerService

  beforeAll(async () => {
    const { unit, unitRef } = TestBed.create(RateService).compile()

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
