import { Module } from '@nestjs/common'

import { BrokerModule, DatabaseModule } from '@app/infrastructure'

import { ConversionService } from './conversion/conversion.service'
import { RateService } from './rate/rate.service'

@Module({
  imports: [DatabaseModule, BrokerModule],
  providers: [ConversionService, RateService],
  exports: [ConversionService, RateService],
})
export class CoreModule {}
