import { NestFactory } from '@nestjs/core'
import { MicroserviceOptions, Transport } from '@nestjs/microservices'

import { ApiModule } from './api.module'

async function bootstrap() {
  const app = await NestFactory.create(ApiModule)

  await app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.REDIS,
    options: {
      host: process.env.REDIS_HOST,
      port: parseInt(process.env.REDIS_PORT),
    },
  })

  app.enableCors()

  await app.startAllMicroservices()
  await app.listen(3001)
}

bootstrap()
