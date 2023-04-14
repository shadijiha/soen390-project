import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors
} from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { ApiBearerAuth, ApiConsumes, ApiParam, ApiTags } from '@nestjs/swagger'
import type Pusher from 'pusher'
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard'
import { type Message } from 'src/models/message.entity'
import { type User } from 'src/models/user.entity'
import { UsersService } from 'src/users/users.service'
import { ApiFile, AuthUser, BearerPayload } from 'src/util/util'
import { ChatService } from './chat.service'
import { Chat } from './chat.types'

@Controller('chat')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@ApiTags('Chat')
export class ChatController {
  constructor (
    private readonly chatService: ChatService,
    private readonly userService: UsersService
  ) {}

  // get all conversations for a user
  @Get('allconversations')
  public async allConversations (
    @AuthUser() breaserPayload: BearerPayload
  ): Promise<Array<{ user: User, lastMessage: string }>> {
    const result: Array<{ user: User, lastMessage: string }> = []
    const conv = await this.chatService.allConversations(breaserPayload.id)
    for (const e of conv) {
      result.push({
        user: await this.userService.findOneByIdNoRelations(e.userId),
        lastMessage: e.lastMessage
      })
    }
    return result
  }

  // get all messages between two users
  @Get('conversation/:withUserId')
  @ApiParam({ name: 'withUserId', type: Number })
  public async conversation (
    @AuthUser() breaserPayload: BearerPayload,
      @Param('withUserId') withUserId: number
  ): Promise<Message[]> {
    return await this.chatService.conversation(breaserPayload.id, withUserId)
  }

  // send a message to another user
  @Post('message')
  public async message (
    @Body() body: Chat.MessageRequest,
      @AuthUser() breaer: BearerPayload
  ): Promise<Pusher.Response> {
    const sender = await this.userService.findOneByIdNoRelations(breaer.id)
    const receiver = await this.userService.findOneByIdNoRelations(
      body.receiverId
    )

    return await this.chatService.message(sender, receiver, body.message)
  }

  @Post('upload')
  @ApiConsumes('multipart/form-data')
  @ApiFile()
  @UseInterceptors(FileInterceptor('file'))
  public async upload (
    @UploadedFile('file') file: Express.Multer.File,
      @AuthUser() bearer: BearerPayload
  ): Promise<string> {
    return await this.chatService.upload(file, bearer.id)
  }
}
