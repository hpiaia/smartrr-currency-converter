export interface IConverterApiService {
  convert({}: { from: string; to: string; date?: Date }): Promise<{ amount: number }>
}

export const IConverterApiService = Symbol('IConverterApiService')
