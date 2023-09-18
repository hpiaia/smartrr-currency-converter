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
})
