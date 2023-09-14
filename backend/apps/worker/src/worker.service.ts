import { ConversionService } from '@app/core'
import { InjectQueue } from '@nestjs/bull'
import { Injectable, Logger } from '@nestjs/common'
import { Cron, CronExpression } from '@nestjs/schedule'
import { Queue } from 'bull'

@Injectable()
export class WorkerService {
  private readonly logger = new Logger(WorkerService.name)

  constructor(
    @InjectQueue('conversions') private readonly conversionsQueue: Queue,
    private readonly conversionService: ConversionService,
  ) {
    //
  }

  @Cron(CronExpression.EVERY_10_MINUTES)
  async enqueueConversions() {
    const conversions = await this.conversionService.findAll()

    this.logger.debug(`Enqueueing ${conversions.length} conversion(s)`)

    conversions.forEach((conversion) => {
      this.conversionsQueue.add({ conversionId: conversion.id })
    })
  }
}
