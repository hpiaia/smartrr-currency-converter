import { ConversionService } from '@app/core'
import { Controller, Get, NotFoundException, Param } from '@nestjs/common'

@Controller('conversions')
export class ConversionController {
  constructor(private readonly conversionService: ConversionService) {
    //
  }

  @Get()
  async index() {
    return this.conversionService.findAll()
  }

  @Get(':id')
  async show(@Param('id') id: string) {
    const conversion = await this.conversionService.findWithRates(Number(id))

    if (!conversion) {
      throw new NotFoundException()
    }

    return conversion
  }
}
