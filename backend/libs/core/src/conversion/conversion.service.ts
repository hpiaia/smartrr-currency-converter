import { DatabaseService } from '@app/common'
import { Injectable } from '@nestjs/common'

@Injectable()
export class ConversionService {
  constructor(private readonly databaseService: DatabaseService) {
    //
  }

  async findAll() {
    return this.databaseService.conversion.findMany()
  }

  async findById(id: number) {
    return this.databaseService.conversion.findUnique({ where: { id } })
  }

  async findWithRates(id: number) {
    return this.databaseService.conversion.findUnique({
      where: { id },
      include: { rates: true },
    })
  }
}
