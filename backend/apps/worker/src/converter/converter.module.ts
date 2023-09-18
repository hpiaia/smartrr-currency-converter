import { HttpModule } from '@nestjs/axios'
import { Module } from '@nestjs/common'

import { CoreModule } from '@app/core'
import { BrokerModule } from '@app/infrastructure'

import { IConverterApiService } from './apis/converter-api.interface'
import { RapidApiService } from './apis/rapid-api.service'
import { ConverterService } from './converter.service'

@Module({
  imports: [HttpModule, CoreModule, BrokerModule],
  providers: [ConverterService, { provide: IConverterApiService, useClass: RapidApiService }],
  exports: [IConverterApiService],
})
export class ConverterModule {}
