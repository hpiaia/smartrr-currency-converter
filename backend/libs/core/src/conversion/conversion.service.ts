import { Injectable } from '@nestjs/common'

import { DatabaseService } from '@app/infrastructure'

@Injectable()
export class ConversionService {
  constructor(private readonly databaseService: DatabaseService) {
    //
  }

  /**
   * Get all conversions.
   *
   * @returns {Promise<Conversion[]>} - All conversions
   */
  async findAll() {
    return this.databaseService.conversion.findMany()
  }

  /**
   * Get a conversion by id.
   *
   * @param {number} id - Conversion id
   *
   * @returns {Promise<Conversion>} - Conversion
   */
  async findById(id: number) {
    return this.databaseService.conversion.findUnique({
      where: { id },
    })
  }

  /**
   * Create a conversion.
   *
   * @param {string} from - From currency
   * @param {string} to - To currency
   *
   * @returns {Promise<Conversion>} - Conversion
   */
  async create({ from, to }: { from: string; to: string }) {
    return this.databaseService.conversion.create({
      data: { from, to },
    })
  }

  /**
   * Get all the conversions without rates attached.
   *
   * @returns {Promise<Conversion[]>} - Conversions without rates
   */
  async withoutRates() {
    return this.databaseService.conversion.findMany({
      where: { rates: { none: {} } },
    })
  }
}
