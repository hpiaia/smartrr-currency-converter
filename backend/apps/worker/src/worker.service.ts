import { ConversionService, RateService } from '@app/core'
import { InjectQueue } from '@nestjs/bull'
import { Injectable, Logger } from '@nestjs/common'
import { Cron, CronExpression } from '@nestjs/schedule'
import { Queue } from 'bull'

@Injectable()
export class WorkerService {
  private readonly logger = new Logger(WorkerService.name)

  constructor(
    @InjectQueue('conversions') private readonly conversionsQueue: Queue<{ conversionId: number }>,
    private readonly conversionService: ConversionService,
    private readonly rateService: RateService,
  ) {
    //
  }

  async deleteOldRates() {
    const limit = new Date(Date.now() - 1000 * 60 * 60 * 24) // 24 hours

    this.logger.debug(`Deleting rates older than ${limit.toISOString()}...`)

    await this.rateService.deleteOldest(limit)
  }

  async enqueueConversion(conversionId: number) {
    return this.conversionsQueue.add({ conversionId })
  }

  @Cron(CronExpression.EVERY_MINUTE)
  async enqueueAllConversions() {
    const conversions = await this.conversionService.findAll()

    this.logger.debug(
      conversions.length ? `Enqueueing ${conversions.length} conversions...` : 'No conversions to enqueue...',
    )

    conversions.forEach(async (conversion) => await this.enqueueConversion(conversion.id))

    await this.deleteOldRates()
  }
}
