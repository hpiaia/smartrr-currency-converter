import { Injectable } from '@nestjs/common'

import { DatabaseService } from '@app/infrastructure'

@Injectable()
export class RateService {
  constructor(private readonly databaseService: DatabaseService) {
    //
  }

  /**
   * Create a rate.
   *
   * @param {number} conversionId - Conversion id
   * @param {number} amount - Amount
   *
   * @returns {Promise<Rate>} - Rate
   */
  async create(conversionId: number, amount: number) {
    return this.databaseService.rate.create({
      data: { conversionId, amount },
    })
  }

  /**
   * Get the latest rate for a conversion.
   *
   * @param {number} conversionId - Conversion id
   *
   * @returns {Promise<Rate>} - Latest rate
   */
  async latestFromConversion(conversionId: number) {
    return this.databaseService.rate.findFirst({
      where: { conversionId },
      orderBy: { createdAt: 'desc' },
    })
  }

  /**
   * Get all rates for a conversion.
   *
   * @param {number} conversionId - Conversion id
   *
   * @returns {Promise<Rate[]>} - All rates
   */
  async fromConversion(conversionId: number) {
    return this.databaseService.rate.findMany({
      where: { conversionId },
    })
  }

  /**
   * Delete all rates older than a limit.
   *
   * @param {Date} limit - Limit
   *
   * @returns {Promise<Rate[]>} - Deleted rates
   */
  async deleteOldest(limit: Date) {
    return this.databaseService.rate.deleteMany({
      where: { createdAt: { lte: limit } },
    })
  }
}