import { Injectable, Logger, OnModuleInit } from '@nestjs/common'
import { PrismaClient } from '@prisma/client'
import { PrismaClientOptions } from '@prisma/client/runtime/library'

@Injectable()
export class DatabaseService extends PrismaClient<PrismaClientOptions, 'query' | 'error'> implements OnModuleInit {
  private readonly logger = new Logger(DatabaseService.name)

  constructor() {
    super({
      log: [
        { emit: 'event', level: 'query' },
        { emit: 'event', level: 'error' },
      ],
      errorFormat: 'pretty',
    })
  }

  onModuleInit() {
    this.$on('query', (e) => {
      this.logger.debug(e.query)
    })

    this.$on('error', (e) => {
      this.logger.error(e)
      throw e
    })
  }
}
