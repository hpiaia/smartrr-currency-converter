import { CoreModule } from '@app/core'
import { Module } from '@nestjs/common'
import { ScheduleModule } from '@nestjs/schedule'
import { BullModule } from '@nestjs/bull'
import { WorkerController } from './worker.controller'
import { WorkerService } from './worker.service'
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
  controllers: [WorkerController],
  providers: [WorkerService],
})
export class WorkerModule {}
