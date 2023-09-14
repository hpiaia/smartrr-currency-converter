import { DatabaseService } from '@app/common'
import { Injectable } from '@nestjs/common'

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
}
