import { Injectable, Logger, OnModuleInit } from '@nestjs/common'
import { PrismaClient } from '@prisma/client'
import { execSync } from 'child_process'

@Injectable()
export class DatabaseService extends PrismaClient implements OnModuleInit {
  private readonly logger = new Logger(DatabaseService.name)

  async onModuleInit() {
    await this.runMigrations()
    await this.runSeeds()

    await this.$connect()
  }

  private async runMigrations() {
    execSync('npx prisma migrate deploy')
  }

  private async runSeeds() {
    const conversions = await this.conversion.count()

    if (!conversions) {
      await this.conversion.createMany({
        data: [
          { from: 'USD', to: 'BRL' },
          { from: 'BRL', to: 'USD' },
        ],
      })
    }
  }
}