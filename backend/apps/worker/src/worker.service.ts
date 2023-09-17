import { InjectQueue } from '@nestjs/bull'
import { Injectable, Logger } from '@nestjs/common'
import { Cron, CronExpression } from '@nestjs/schedule'
import { Queue } from 'bull'

import { ConversionService, RateService } from '@app/core'

import { ConverterJobData } from './converter/converter.service'

const DELETE_RATES_OLDER_THAN = 24 // hours

@Injectable()
export class WorkerService {
  private readonly logger = new Logger(WorkerService.name)

  constructor(
    @InjectQueue('conversions') private readonly conversionsQueue: Queue<ConverterJobData>,
    private readonly conversionService: ConversionService,
    private readonly rateService: RateService,
  ) {
    //
  }

  /**
   * Enqueue all the conversions without rates.
   */
  async enqueueConversionsWithoutRates() {
    const conversions = await this.conversionService.withoutRates()

    if (conversions.length) {
      this.logger.debug(`Found ${conversions.length} conversions without rates, enqueueing...`)

      // if the api supported historical rates by hour, here we enqueue conversions for the past 24 hours
      //
      // const dates = Array.from({ length: 24 }, (_, i) => this.hoursInThePast(i + 1))
      // conversions.forEach(async (conversion) =>
      //   dates.forEach(async (date) => await this.enqueueConversion(conversion.id, date)),
      // )

      conversions.forEach(async (conversion) => await this.enqueueConversion(conversion.id))
    }
  }

  /**
   * Enqueue a conversion for processing.
   *
   * @param {number} conversionId - Conversion id
   * @param {Date} date - date
   *
   * @returns {Promise<Job<{ conversionId: number; date: Date }>>} - Job
   */
  async enqueueConversion(conversionId: number, date?: Date) {
    return this.conversionsQueue.add({ conversionId, date: date ?? new Date() })
  }

  /**
   * Cron job to enqueue all conversions.
   * Runs every hour.
   */
  @Cron(CronExpression.EVERY_HOUR)
  async enqueueAllConversions() {
    const conversions = await this.conversionService.findAll()

    this.logger.debug(
      conversions.length ? `Enqueueing ${conversions.length} conversions...` : 'No conversions to enqueue...',
    )

    conversions.forEach(async (conversion) => await this.enqueueConversion(conversion.id))

    await this.rateService.deleteOldest(this.hoursInThePast(DELETE_RATES_OLDER_THAN))
  }

  /**
   * Get a date in the past.
   *
   * @param {number} hours - Number of hours to go back
   */
  private hoursInThePast(hours: number) {
    return new Date(Date.now() - 1000 * 60 * 60 * hours)
  }
}
