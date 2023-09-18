export interface IConverterApiService {
  /**
   * Determines if the API supports historical rates by hour.
   * If it does, the date parameter will be passed to the convert method.
   * If it doesn't, the date parameter will be ignored.
   */
  supportsHistoricalHours: boolean

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
