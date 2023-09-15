import { Inject } from '@nestjs/common'
import { ClientProxy } from '@nestjs/microservices'

export class BrokerService {
  constructor(@Inject('MESSAGE_BROKER') private readonly clientProxy: ClientProxy) {
    //
  }

  async emit<T>(pattern: string, data: T) {
    return this.clientProxy.emit(pattern, data)
  }
}
