import { Test } from '@nestjs/testing'

import { ConverterModule } from './converter.module'
import { ConverterService } from './converter.service'

describe('ConverterService', () => {
  let service: ConverterService

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [ConverterModule],
    }).compile()

    service = module.get(ConverterService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
