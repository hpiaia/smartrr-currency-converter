import { Process, Processor } from '@nestjs/bull'
import { Inject, Logger } from '@nestjs/common'
import { Job } from 'bull'

import { ConversionService, RateService } from '@app/core'
import { BrokerService } from '@app/infrastructure'

import { IConverterApiService } from './apis/converter-api.interface'

@Processor('conversions')
export class ConverterService {
  private readonly logger = new Logger(ConverterService.name)

  constructor(
    private readonly conversionService: ConversionService,
    private readonly rateService: RateService,
    @Inject(IConverterApiService) private readonly converterApiService: IConverterApiService,
    private readonly brokerService: BrokerService,
  ) {
    //
  }

  @Process({ concurrency: 10 })
  async convert(job: Job<{ conversionId: number; date: Date }>) {
    const { id, from, to } = await this.conversionService.findById(job.data.conversionId)

    this.logger.log(`Running conversion: id = ${id}, from = ${from}, to = ${to}`)

    const { amount } = await this.converterApiService.convert({ from, to })
    const rate = await this.rateService.create(id, amount)

    this.brokerService.emit('rateAdded', rate)
  }
}
