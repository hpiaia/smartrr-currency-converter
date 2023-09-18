import { Injectable } from '@nestjs/common'

import { BrokerService, DatabaseService } from '@app/infrastructure'

@Injectable()
export class RateService {
  constructor(
    private readonly databaseService: DatabaseService,
    private readonly brokerService: BrokerService,
  ) {
    //
  }

  /**
   * Create a rate.
   *
   * @param {number} conversionId - Conversion id
   * @param {number} amount - Amount
   * @param {number} date - Date (optional)
   *
   * @returns {Promise<Rate>} - Rate
   */
  async create({ conversionId, amount, date }: { conversionId: number; amount: number; date?: Date }) {
    const rate = await this.databaseService.rate.create({
      data: { conversionId, amount, date },
    })

    await this.brokerService.emit('rate.created', rate)

    return rate
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
      orderBy: { date: 'desc' },
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
      orderBy: { date: 'desc' },
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
      where: { date: { lte: limit } },
    })
  }
}
