import { Injectable } from '@nestjs/common'

import { DatabaseService } from '@app/infrastructure'

@Injectable()
export class RateService {
  constructor(private readonly databaseService: DatabaseService) {
    //
  }

  async create(conversionId: number, amount: number) {
    return this.databaseService.rate.create({
      data: { conversionId, amount },
    })
  }

  async fromConversion(conversionId: number) {
    return this.databaseService.rate.findMany({
      where: { conversionId },
    })
  }

  async deleteOldest(limit: Date) {
    return this.databaseService.rate.deleteMany({
      where: { createdAt: { lte: limit } },
    })
  }
}
