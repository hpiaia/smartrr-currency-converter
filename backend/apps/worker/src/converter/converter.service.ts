import { ConversionService, RateService } from '@app/core'
import { BrokerService } from '@app/infrastructure'
import { Process, Processor } from '@nestjs/bull'
import { Inject, Logger } from '@nestjs/common'
import { Job } from 'bull'
import { IConverterApiService } from './apis/converter-api.interface'

@Processor('conversions')
export class ConverterService {
  private readonly logger = new Logger(ConverterService.name)

  constructor(
    private readonly conversionService: ConversionService,
    private readonly rateService: RateService,
    @Inject('CONVERTER_API_SERVICE') private readonly converterApiService: IConverterApiService,
    private readonly brokerService: BrokerService,
  ) {
    //
  }

  @Process({ concurrency: 10 })
  async convert(job: Job<{ conversionId: number }>) {
    const conversion = await this.conversionService.findById(job.data.conversionId)

    this.logger.log(`Converting ${conversion.from} to ${conversion.to}`)

    const { amount } = await this.converterApiService.convert(conversion.from, conversion.to)
    const rate = await this.rateService.create(conversion.id, amount)

    this.logger.log(`Finished conversion of ${conversion.from} to ${conversion.to}`)

    this.brokerService.emit('rateAdded', rate)
  }
}
