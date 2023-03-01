import { Body, Controller, Post, UseGuards } from '@nestjs/common'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import type Pusher from 'pusher'
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard'
import { UsersService } from 'src/users/users.service'
import { ChatService } from './chat.service'
import { Chat } from './chat.types'

@Controller('chat')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@ApiTags('Chat')
export class ChatController {
  constructor (private readonly chatService: ChatService,
    private readonly userService: UsersService) { }

  @Post('startConversation')
  public async message (@Body() body: Chat.MessageRequest): Promise<Pusher.Response> {
    const sender = await this.userService.findOneByIdNoRelations(body.senderId)
    const receiver = await this.userService.findOneByIdNoRelations(body.receiverId)

    return await this.chatService.message(sender, receiver, body.message)
  }
}
