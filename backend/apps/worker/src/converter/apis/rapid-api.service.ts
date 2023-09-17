import { HttpService } from '@nestjs/axios'
import { Injectable, Logger } from '@nestjs/common'
import { AxiosError } from 'axios'
import { catchError, firstValueFrom } from 'rxjs'

import { IConverterApiService } from './converter-api.interface'

type ApiResponse = {
  base_currency_code: string
  base_currency_name: string
  amount: string
  updated_date: string
  rates: Record<
    string,
    {
      currency_name: string
      rate: string
      rate_for_amount: string
    }
  >
}

@Injectable()
export class RapidApiService implements IConverterApiService {
  private readonly logger = new Logger(RapidApiService.name)

  constructor(private readonly httpService: HttpService) {
    //
  }

  async convert({ from, to, date }: { from: string; to: string; date?: Date }) {
    // if api supported historical rates by hour, we use the date parameter to get the rate for that specific time
    // as it doen't, if data is passed, we just get the latest rate and mock it with a random variation of 0.5%

    const { data } = await firstValueFrom(
      this.httpService
        .get<ApiResponse>('https://currency-converter5.p.rapidapi.com/currency/convert', {
          params: { from, to },
          headers: {
            'X-RapidAPI-Key': process.env.RAPID_API_KEY,
          },
        })
        .pipe(
          catchError((error: AxiosError) => {
            this.logger.error(error.message)
            throw error
          }),
        ),
    )

    const amount = Number(data.rates[to].rate)

    // mock the rate with a random variation of 0.5%
    if (date && from !== to) {
      const variation = amount * 0.01
      const randomVariation = (Math.random() - 0.5) * 2 * variation

      return { amount: Number((amount + randomVariation).toFixed(4)) }
    }

    return { amount }
  }
}
