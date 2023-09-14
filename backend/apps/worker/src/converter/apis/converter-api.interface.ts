export interface IConverterApiService {
  convert(from: string, to: string): Promise<{ amount: number }>
}
