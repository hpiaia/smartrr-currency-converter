import { Controller, Logger } from '@nestjs/common'
import { MessagePattern } from '@nestjs/microservices'

import { WorkerService } from './worker.service'

@Controller()
export class WorkerController {
  private readonly logger = new Logger(WorkerController.name)

  constructor(private readonly workerService: WorkerService) {
    //
  }

  /**
   * Handle conversion created event.
   *
   * @param {number} conversionId - Conversion id
   */
  @MessagePattern('conversion.created')
  async conversionCreated(conversionId: number) {
    await this.workerService.enqueueConversion(conversionId)
  }
}
