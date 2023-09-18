import { Test } from '@nestjs/testing'

import { ApiModule } from './api.module'
import { ApiResolver } from './api.resolver'

describe('RapidApiService', () => {
  let resolver: ApiResolver

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [ApiModule],
    }).compile()

    resolver = module.get(ApiResolver)
  })

  it('should be defined', () => {
    expect(resolver).toBeDefined()
  })
})
