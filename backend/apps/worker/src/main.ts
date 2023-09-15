import { NestFactory } from '@nestjs/core'
import { MicroserviceOptions, Transport } from '@nestjs/microservices'

import { WorkerModule } from './worker.module'

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(WorkerModule, {
    transport: Transport.REDIS,
    options: {
      host: process.env.REDIS_HOST,
      port: parseInt(process.env.REDIS_PORT),
    },
  })

  await app.listen()
}

bootstrap()
