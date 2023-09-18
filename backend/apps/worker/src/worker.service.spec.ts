import { Test } from '@nestjs/testing'

import { WorkerModule } from './worker.module'
import { WorkerService } from './worker.service'

describe('ConverterService', () => {
  let service: WorkerService

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [WorkerModule],
    }).compile()

    service = module.get(WorkerService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
