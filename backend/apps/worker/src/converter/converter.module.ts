import { CoreModule } from '@app/core'
import { BrokerModule } from '@app/infrastructure'
import { Module } from '@nestjs/common'
import { HttpModule } from '@nestjs/axios'
import { ConverterService } from './converter.service'
import { IConverterApiService } from './apis/converter-api.interface'
import { RapidApiService } from './apis/rapid-api.service'

@Module({
  imports: [HttpModule, CoreModule, BrokerModule],
  providers: [ConverterService, { provide: IConverterApiService, useClass: RapidApiService }],
})
export class ConverterModule {}
