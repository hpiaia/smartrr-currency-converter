import { Test } from '@nestjs/testing'

import { WorkerController } from './worker.controller'
import { WorkerModule } from './worker.module'

describe('ConverterController', () => {
  let controller: WorkerController

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [WorkerModule],
    }).compile()

    controller = module.get(WorkerController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
