import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common'
import { ApiBearerAuth, ApiParam, ApiTags } from '@nestjs/swagger'
import type Pusher from 'pusher'
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard'
import { type Message } from 'src/models/message.entity'
import { type User } from 'src/models/user.entity'
import { UsersService } from 'src/users/users.service'
import { AuthUser, BearerPayload } from 'src/util/util'
import { ChatService } from './chat.service'
import { Chat } from './chat.types'

// TODO: This filter should be moved to the bootstrap functio in main.ts to apply to all controllers
//  app.useGlobalFilters(new GlobalErrorFilter());
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
