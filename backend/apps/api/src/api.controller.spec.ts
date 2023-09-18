import { Test } from '@nestjs/testing'

import { ApiController } from './api.controller'
import { ApiModule } from './api.module'

describe('RapidApiService', () => {
  let controller: ApiController

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [ApiModule],
    }).compile()

    controller = module.get(ApiController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
