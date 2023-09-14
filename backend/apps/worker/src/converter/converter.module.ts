import { CoreModule } from '@app/core'
import { Module } from '@nestjs/common'
import { HttpModule } from '@nestjs/axios'
import { ConverterService } from './converter.service'
import { RapidApiService } from './apis/rapid-api.service'
import { ClientsModule, Transport } from '@nestjs/microservices'

@Module({
  imports: [
    HttpModule,
    ClientsModule.register([
      {
        name: 'MS_SERVICE',
        transport: Transport.REDIS,
        options: {
          host: process.env.REDIS_HOST,
          port: parseInt(process.env.REDIS_PORT),
        },
      },
    ]),
    CoreModule,
  ],
  providers: [
    ConverterService,
    {
      provide: 'CONVERTER_API_SERVICE',
      useClass: RapidApiService,
    },
  ],
})
export class ConverterModule {}
