import { Injectable } from '@nestjs/common'
import * as Pusher from 'pusher'

@Injectable()
export class PusherService {
  pusher: Pusher

  constructor () {
    this.pusher = new Pusher({
      appId: process.env.PUSHER_APP_ID as string,
      key: process.env.PUSHER_APP_KEY as string,
      secret: process.env.PUSHER_APP_SECRET as string,
      cluster: process.env.PUSHER_APP_CLUSTER as string // if `host` is present, it will override the `cluster` option.
    })
  }

  async triggerNotification (channel: string, event: string, data: any): Promise<Pusher.Response> {
    return await this.pusher.trigger(channel, event, {
      message: data
    })
  }

  async trigger (channel: string, event: string, data: any): Promise<Pusher.Response> {
    return await this.pusher.trigger(channel, event, data)
  }
}
