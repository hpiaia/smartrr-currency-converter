import { Controller, Get } from '@nestjs/common'

@Controller()
export class ApiController {
  @Get()
  index() {
    return { ok: true }
  }
}
