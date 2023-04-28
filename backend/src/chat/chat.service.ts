import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import type * as Pusher from 'pusher'
import { Message } from '../models/message.entity'
import { type User } from '../models/user.entity'
import { Repository } from 'typeorm'
import { ShadoCloudClient } from 'shado-cloud-sdk'
import { UploadedFileDB } from '../models/file.entity'
import * as path from 'path'
import { PusherService } from '../util/pusher/pusher.service'

@Injectable()
export class ChatService {
  private readonly cloud: ShadoCloudClient

  constructor (
    @InjectRepository(Message)
    private readonly messageRepository: Repository<Message>,
    @InjectRepository(UploadedFileDB)
    private readonly fileRepository: Repository<UploadedFileDB>,
    private readonly pusherService: PusherService
  ) {
    this.cloud = new ShadoCloudClient(
      process.env.SHADO_CLOUD_EMAIL ?? 'unset',
      process.env.SHADO_CLOUD_PASSWORD ?? 'unset'
    )
    this.cloud.auth.login().catch(() => {
      // throw new Error(
      //   "Unable to login to Shado Cloud. Won't be able to upload files. Error: " +
      // 		JSON.stringify(err)
      // )
      console.log(
        "Unable to login to Shado Cloud. Won't be able to upload files. Error: "
      )
    })
  }

  public async message (
    sender: User,
    receiver: User,
    message: string
  ): Promise<Pusher.Response> {
    const res = await this.pusherService.trigger(
      `message-${receiver.id}`,
      'message',
      {
        message,
        sender: sender.id
      }
    )
    // Push to db (we don't need to await --> save time)
    const msg = new Message()
    msg.message = message
    msg.senderId = sender.id
    msg.receiverId = receiver.id
    await this.messageRepository.save(msg)

    await this.pusherService.trigger(
      `user-${receiver.id}`,
      'message-notification',
      {
        user: {
          id: sender.id,
          firstName: sender.firstName,
          lastName: sender.lastName
        },
        message: msg
      }
    )

    return res
  }

  // get all conversations for a user
  public async allConversations (
    userId: number
  ): Promise<Array<{ userId: number, lastMessage: string }>> {
    const messages = await this.messageRepository.find({
      where: [{ senderId: userId }, { receiverId: userId }],
      select: ['id', 'senderId', 'receiverId', 'message', 'created_at'],
      order: { created_at: 'DESC' } // Order by createdAt in descending order
    })

    const conversationsMap = new Map<number, Message>()

    messages.forEach((message) => {
      const conversationPartnerId =
        message.senderId === userId ? message.receiverId : message.senderId

      if (
        !conversationsMap.has(conversationPartnerId) ||
        (conversationsMap.get(conversationPartnerId) as Message).created_at <
          message.created_at
      ) {
        conversationsMap.set(conversationPartnerId, message)
      }
    })

    const conversations: Array<{ userId: number, lastMessage: string }> = []

    conversationsMap.forEach((message, conversationId) => {
      conversations.push({
        userId: conversationId,
        lastMessage: message.message
      })
    })

    return conversations
  }

  public async conversation (
    id: number,
    withUserId: number
  ): Promise<Message[]> {
    return await this.messageRepository.find({
      where: [
        { senderId: id, receiverId: withUserId },
        { senderId: withUserId, receiverId: id }
      ]
    })
  }

  /**
   * TODO: move this to a separate service
   * @param file
   * @param userId
   */
  public async upload (
    file: Express.Multer.File,
    userId: number
  ): Promise<string> {
    const storedName = this.randomAlphaNumeric(30)
    const nameExt = storedName + path.extname(file.originalname)
    await this.cloud.file.upload({
      file: file.buffer,
      destFolder: '',
      name: nameExt,
      options: {
        contentType: file.mimetype,
        filename: nameExt
      }
    })

    const dbFileData = new UploadedFileDB()
    dbFileData.originalName = file.originalname
    dbFileData.storedName = storedName
    dbFileData.mime = file.mimetype
    dbFileData.userId = userId
    dbFileData.size = file.size

    // Create a temporary url
    const date = new Date()
    const res = (
      await this.cloud.tempUrls.generate({
        filepath: nameExt,
        expires_at: new Date(date.setMonth(date.getMonth() + 1)), // Now + 1 month
        is_readonly: true,
        max_requests: 1000
      })
    )
    console.log(res)
    const url = res.url
    dbFileData.url = url

    await this.fileRepository.save(dbFileData)

    return url
  }

  private randomAlphaNumeric (length: number): string {
    let result = ''
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    const charactersLength = characters.length
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength))
    }
    return result
  }
}
