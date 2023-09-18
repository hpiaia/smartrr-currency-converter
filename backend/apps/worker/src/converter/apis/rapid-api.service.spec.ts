import { TestBed } from '@automock/jest'
import { HttpService } from '@nestjs/axios'
import { from } from 'rxjs'

import { RapidApiService } from './rapid-api.service'

describe(RapidApiService.name, () => {
  let service: RapidApiService
  let httpService: HttpService

  beforeAll(async () => {
    const { unit, unitRef } = TestBed.create(RapidApiService)
      .mock(HttpService)
      .using({
        get: jest.fn().mockReturnValue(
          from([
            {
              data: {
                base_currency_code: 'USD',
                base_currency_name: 'US Dollar',
                amount: '1',
                updated_date: '2021-03-26 00:00:00',
                rates: {
                  BRL: {
                    currency_name: 'Brazilian Real',
                    rate: '5.5875',
                    rate_for_amount: '5.5875',
                  },
                },
              },
            },
          ]),
        ),
      })
      .compile()

    service = unit
    httpService = unitRef.get(HttpService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
    expect(httpService).toBeDefined()
  })

  it('should not support historical hours', () => {
    expect(service.supportsHistoricalHours).toBe(false)
  })

  it('should call the api with the correct parameters', async () => {
    await service.convert({ from: 'USD', to: 'BRL' })

    expect(httpService.get).toHaveBeenCalled()
    expect(httpService.get).toHaveBeenCalledWith('https://currency-converter5.p.rapidapi.com/currency/convert', {
      headers: { 'X-RapidAPI-Key': undefined },
      params: { from: 'USD', to: 'BRL' },
    })
  })

  it('should return the correct value', async () => {
    const result = await service.convert({ from: 'USD', to: 'BRL' })

    expect(result).toEqual({ amount: 5.5875 })
  })
})
