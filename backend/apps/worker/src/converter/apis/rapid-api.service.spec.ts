import { HttpModule } from '@nestjs/axios'
import { Test } from '@nestjs/testing'

import { RapidApiService } from './rapid-api.service'

describe('RapidApiService', () => {
  let service: RapidApiService

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [HttpModule],
      providers: [RapidApiService],
    }).compile()

    service = module.get(RapidApiService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  it('should not support historical hours', () => {
    expect(service.supportsHistoricalHours).toBe(false)
  })
})
