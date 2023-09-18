import { InjectQueue } from '@nestjs/bull'
import { Inject, Injectable, Logger } from '@nestjs/common'
import { Cron, CronExpression } from '@nestjs/schedule'
import { Queue } from 'bull'

import { ConversionService, RateService } from '@app/core'

import { IConverterApiService } from './converter/apis/converter-api.interface'
import { ConverterJobData } from './converter/converter.service'

const DELETE_RATES_OLDER_THAN = 24 // hours

@Injectable()
export class WorkerService {
  private readonly logger = new Logger(WorkerService.name)

  constructor(
    @InjectQueue('conversions') private readonly conversionsQueue: Queue<ConverterJobData>,
    private readonly conversionService: ConversionService,
    private readonly rateService: RateService,
    @Inject(IConverterApiService) private readonly converterApiService: IConverterApiService,
  ) {
    //
  }

  /**
   * Enqueue all the conversions without rates.
   * If the API does not support historical rates by hour, it will only enqueue the latest rate.
   * If the API supports historical rates by hour, it will enqueue the latest rate and the rates for the last 24 hours.
   */
  @Cron(CronExpression.EVERY_10_SECONDS)
  async enqueueConversionsWithoutRates() {
    const conversions = await this.conversionService.withoutRates()

    if (conversions.length) {
      this.logger.debug(`Found ${conversions.length} conversions without rates, enqueueing...`)

      conversions.forEach(async (conversion) => await this.enqueueConversion(conversion.id))

      if (!this.converterApiService.supportsHistoricalHours) {
        this.logger.debug('Converter API does not support historical rates by hour, queueing only latest rate...')
        return
      }

      const dates = Array.from({ length: 24 }, (_, i) => this.hoursInThePast(i + 1))

      return conversions.forEach(async (conversion) =>
        dates.forEach(async (date) => await this.enqueueConversion(conversion.id, date)),
      )
    }
  }

  /**
   * Enqueue a conversion for processing.
   *
   * @param {number} conversionId - Conversion id
   * @param {Date} date - date (defaults to now if not passed)
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
