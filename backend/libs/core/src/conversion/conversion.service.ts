import { Injectable } from '@nestjs/common'

import { DatabaseService } from '@app/infrastructure'

@Injectable()
export class ConversionService {
  constructor(private readonly databaseService: DatabaseService) {
    //
  }

  async findAll() {
    return this.databaseService.conversion.findMany()
  }

  async findById(id: number) {
    return this.databaseService.conversion.findUnique({
      where: { id },
    })
  }

  async create({ from, to }: { from: string; to: string }) {
    return this.databaseService.conversion.create({
      data: { from, to },
    })
  }

  async withoutRates() {
    return this.databaseService.conversion.findMany({
      where: { rates: { none: {} } },
    })
  }
}
