import { CoreModule } from '@app/core'
import { Module } from '@nestjs/common'
import { ScheduleModule } from '@nestjs/schedule'
import { WorkerService } from './worker.service'
import { BullModule } from '@nestjs/bull'
import { ConverterModule } from './converter/converter.module'

@Module({
  imports: [
    ScheduleModule.forRoot(),
    BullModule.registerQueue({
      name: 'conversions',
      redis: {
        host: process.env.REDIS_HOST,
        port: parseInt(process.env.REDIS_PORT),
      },
    }),
    CoreModule,
    ConverterModule,
  ],
  providers: [WorkerService],
})
export class WorkerModule {}
