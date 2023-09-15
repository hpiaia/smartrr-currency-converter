export interface IConverterApiService {
  /**
   * Convert an amount from one currency to another at a given date.
   *
   * @param {string} from - Currency to convert from
   * @param {string} to - Currency to convert to
   * @param {Date} date - Date to convert at
   *
   * @returns {Promise<{ amount: number }>} - Amount
   */
  convert({}: { from: string; to: string; date?: Date }): Promise<{ amount: number }>
}

export const IConverterApiService = Symbol('IConverterApiService')
