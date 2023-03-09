import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import * as Pusher from 'pusher'
import { Message } from '../models/message.entity'
import { type User } from '../models/user.entity'
import { Repository } from 'typeorm'

@Injectable()
export class ChatService {
  private readonly pusher: Pusher
  constructor (
    @InjectRepository(Message)
    private readonly messageRepository: Repository<Message>) {
    // TODO: These should be in a .env file
    this.pusher = new Pusher({
      appId: process.env.PUSHER_APP_ID ?? 'unset',
      key: process.env.PUSHER_APP_KEY ?? 'unset',
      secret: process.env.PUSHER_APP_SECRET ?? 'unset',
      cluster: process.env.PUSHER_APP_CLUSTER ?? 'unset',
      useTLS: true
      // encrypted: true
    })
  }

  public async message (sender: User, receiver: User, message: string): Promise<Pusher.Response> {
    const res = await this.pusher.trigger(`message-${receiver.id}`, 'message', { message, sender: sender.id })
    // Push to db (we don't need to await --> save time)
    const msg = new Message()
    msg.message = message
    msg.senderId = sender.id
    msg.receiverId = receiver.id
    await this.messageRepository.save(msg)

    return res
  }

  public async allConversations (userId: number): Promise<number[]> {
    const messages = await this.messageRepository.find({
      where: [{ senderId: userId }, { receiverId: userId }],
      select: ['senderId', 'receiverId']
    })

    const conversations = new Set<number>()
    messages.forEach((message) => {
      conversations.add(message.senderId)
      conversations.add(message.receiverId)
    })

    return Array.from(conversations)
  }

  public async conversation (id: number, withUserId: number): Promise<Message[]> {
    return await this.messageRepository.find({
      where: [{ senderId: id, receiverId: withUserId }, { senderId: withUserId, receiverId: id }]
    })
  }
}
