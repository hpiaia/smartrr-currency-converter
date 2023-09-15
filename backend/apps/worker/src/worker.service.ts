import { InjectQueue } from '@nestjs/bull'
import { Injectable, Logger, OnModuleInit } from '@nestjs/common'
import { Cron, CronExpression } from '@nestjs/schedule'
import { Queue } from 'bull'

import { ConversionService, RateService } from '@app/core'

@Injectable()
export class WorkerService implements OnModuleInit {
  private readonly logger = new Logger(WorkerService.name)

  constructor(
    @InjectQueue('conversions') private readonly conversionsQueue: Queue<{ conversionId: number; date: Date }>,
    private readonly conversionService: ConversionService,
    private readonly rateService: RateService,
  ) {
    //
  }

  onModuleInit() {
    this.enqueueConversionsWithoutRates()
  }

  async enqueueConversionsWithoutRates() {
    const conversions = await this.conversionService.withoutRates()

    if (conversions.length) {
      this.logger.debug(`Found ${conversions.length} conversions without rates, enqueueing...`)

      // if the api supported historical rates by hour, here we would enqueue conversions for the past 24 hours
      //
      // const dates = Array.from({ length: 24 }, (_, i) => this.dateInPastHours(i + 1))
      // conversions.forEach(async (conversion) =>
      //   dates.forEach(async (date) => await this.enqueueConversion(conversion.id, date)),
      // )

      conversions.forEach(async (conversion) => await this.enqueueConversion(conversion.id))
    }
  }

  async enqueueConversion(conversionId: number, date?: Date) {
    return this.conversionsQueue.add({ conversionId, date: date ?? new Date() })
  }

  @Cron(CronExpression.EVERY_HOUR)
  async enqueueAllConversions() {
    const conversions = await this.conversionService.findAll()

    this.logger.debug(
      conversions.length ? `Enqueueing ${conversions.length} conversions...` : 'No conversions to enqueue...',
    )

    conversions.forEach(async (conversion) => await this.enqueueConversion(conversion.id))

    await this.deleteOldestRates()
  }

  async deleteOldestRates() {
    const limit = this.dateInPastHours(24)

    this.logger.debug(`Deleting rates older than ${limit.toISOString()}...`)

    await this.rateService.deleteOldest(limit)
  }

  private dateInPastHours(hours: number) {
    return new Date(Date.now() - 1000 * 60 * 60 * hours)
  }
}
