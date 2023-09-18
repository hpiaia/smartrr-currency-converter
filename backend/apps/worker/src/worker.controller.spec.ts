import { TestBed } from '@automock/jest'

import { WorkerController } from './worker.controller'
import { WorkerService } from './worker.service'

describe(WorkerController.name, () => {
  let controller: WorkerController
  let workerService: WorkerService

  beforeAll(async () => {
    const { unit, unitRef } = TestBed.create(WorkerController).compile()

    controller = unit
    workerService = unitRef.get(WorkerService)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
    expect(workerService).toBeDefined()
  })

  it('should enqueue conversion when createConversion is called', async () => {
    await controller.conversionCreated(1)

    expect(workerService.enqueueConversion).toHaveBeenCalledWith(1)
  })
})