import { Module } from '@nestjs/common'
import { DatabaseModule } from '@app/common'
import { ConversionService } from './conversion/conversion.service'
import { RateService } from './rate/rate.service'

@Module({
  imports: [DatabaseModule],
  providers: [ConversionService, RateService],
  exports: [DatabaseModule, ConversionService, RateService],
})
export class CoreModule {}
