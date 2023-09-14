import { CoreModule } from '@app/core'
import { Module } from '@nestjs/common'
import { ApiController } from './api.controller'
import { ConversionController } from './conversion/conversion.controller'

@Module({
  imports: [CoreModule],
  controllers: [ApiController, ConversionController],
})
export class ApiModule {}
