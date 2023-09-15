import { Inject } from '@nestjs/common'
import { ClientProxy } from '@nestjs/microservices'

export class BrokerService {
  constructor(@Inject('MESSAGE_BROKER') private readonly clientProxy: ClientProxy) {
    //
  }

  /**
   * Emit an event to the message broker.
   *
   * @param {string} pattern - Event pattern (channel)
   * @param {T} data - Event data
   */
  async emit<T>(pattern: string, data: T) {
    this.clientProxy.emit(pattern, data)
  }
}
