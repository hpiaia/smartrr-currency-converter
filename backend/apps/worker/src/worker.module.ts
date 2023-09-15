import { BullModule } from '@nestjs/bull'
import { Module } from '@nestjs/common'
import { ScheduleModule } from '@nestjs/schedule'

import { CoreModule } from '@app/core'

import { ConverterModule } from './converter/converter.module'
import { WorkerController } from './worker.controller'
import { WorkerService } from './worker.service'

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
  controllers: [WorkerController],
  providers: [WorkerService],
})
export class WorkerModule {}
