import { DatabaseService } from '@app/infrastructure'
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
    return this.databaseService.conversion.findUnique({
      where: { id },
    })
  }

  async create({ from, to }: { from: string; to: string }) {
    return this.databaseService.conversion.create({
      data: { from, to },
    })
  }
}
