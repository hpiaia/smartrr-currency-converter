import { Process, Processor } from '@nestjs/bull'
import { Inject, Logger } from '@nestjs/common'
import { Job } from 'bull'

import { ConversionService, RateService } from '@app/core'

import { IConverterApiService } from './apis/converter-api.interface'

const PROCESS_CONVERSIONS_CONCURRENCY = 3

export interface ConverterJobData {
  conversionId: number
  date: Date
}

@Processor('conversions')
export class ConverterService {
  private readonly logger = new Logger(ConverterService.name)

  constructor(
    private readonly conversionService: ConversionService,
    private readonly rateService: RateService,
    @Inject(IConverterApiService) private readonly converterApiService: IConverterApiService,
  ) {
    //
  }

  /**
   * Process a conversion job.
   * The concurrency number is how many jobs will be processed in parallel.
   *
   * @param {Job<ConverterJobData>} job - Job
   */
  @Process({ concurrency: PROCESS_CONVERSIONS_CONCURRENCY })
  async convert({ data: { conversionId, date } }: Job<ConverterJobData>) {
    const { id, from, to } = await this.conversionService.findById(conversionId)

    this.logger.log(`Running conversion: id = ${id}, from = ${from}, to = ${to}`)

    const { amount } = await this.converterApiService.convert({ from, to, date })
    await this.rateService.create({ conversionId, amount, date })
  }
}