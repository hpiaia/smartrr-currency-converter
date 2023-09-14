import { DatabaseService } from '@app/common'
import { Injectable } from '@nestjs/common'

@Injectable()
export class RateService {
  constructor(private readonly databaseService: DatabaseService) {
    //
  }

  async insert(conversionId: number, amount: number) {
    return this.databaseService.rate.create({
      data: { conversionId, amount },
    })
  }
}
