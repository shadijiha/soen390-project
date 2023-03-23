import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common'
import { ApiBearerAuth, ApiParam, ApiTags } from '@nestjs/swagger'
import type Pusher from 'pusher'
import { JwtAuthGuard } from '../auth/jwt-auth.guard'
import { type Message } from '../models/message.entity'
import { type User } from '../models/user.entity'
import { UsersService } from '../users/users.service'
import { AuthUser, BearerPayload } from '../util/util'
import { ChatService } from './chat.service'
import { Chat } from './chat.types'

@Controller('chat')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@ApiTags('Chat')
export class ChatController {
  constructor (private readonly chatService: ChatService,
    private readonly userService: UsersService) { }

  @Get('allconversations')
  public async allConversations (@AuthUser() breaserPayload: BearerPayload): Promise<User[]> {
    const result: User[] = []
    const ids = await this.chatService.allConversations(breaserPayload.id)
    for (const id of ids) {
      result.push(await this.userService.findOneByIdNoRelations(id))
    }
    return result
  }

  @Get('conversation/:withUserId')
  @ApiParam({ name: 'withUserId', type: Number })
  public async conversation (@AuthUser() breaserPayload: BearerPayload, @Param('withUserId') withUserId: number): Promise<Message[]> {
    return await this.chatService.conversation(breaserPayload.id, withUserId)
  }

  @Post('message')
  public async message (@Body() body: Chat.MessageRequest, @AuthUser() breaer: BearerPayload): Promise<Pusher.Response> {
    const sender = await this.userService.findOneByIdNoRelations(breaer.id)
    const receiver = await this.userService.findOneByIdNoRelations(body.receiverId)

    return await this.chatService.message(sender, receiver, body.message)
  }
}
